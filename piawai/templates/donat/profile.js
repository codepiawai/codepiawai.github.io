
var profile={
imagecrop:{},
public:true,
model:{
host:'http://localhost/donat/api/lms/index.php',
table:{id:'profile',data:[
{id:1,induk:0,nama:"admin",email:'sa',pin:"123",akses:"sa"},
{id:2,induk:0,nama:"user",email:'user',pin:"123",akses:"user"},
]},

data:{email:'sa',pin:'123'},

profile:{
id:'profile',
avatar:['man',2],
username:'Wawan',
input:{data:{email:'',pin:''},tipe:[ {id:"pin",nama:"password",arr:'1,2'},],},
button:{data:[
{id:1,nama:"Signout",icon:"person",url:"login.controller.signout()"},
{id:1,nama:"Edit",icon:"pen",url:"profile.controller.editavatar()"},
]},
card:{id:"card", data:[
{id:1,nama:"Pesan",isi:"2",icon:"envelope",url:"d.url('pesan');"},
{id:2,nama:"Setting",isi:"2",icon:"setting",url:"d.url('setting');"},
{id:3,nama:"Kursus",isi:"2",icon:"lock",url:"d.url('kursus');"},
// {id:3,nama:"Param",isi:"2",icon:"lock",url:"param.controller.view()"},
]},
}, //end profile
}, //end model

view:{

profile:function(arr){
avt=avatar.view.svg(avatar.view.man(avatar.model.man[2]));


out=`
<div id="profile" class="row shadow">
<div class="col-1-3">
<div  class="user-avatar img">
<img id="avatar" class="user-avatar img" src="/piawai/templates/donat/me.jpg"> </div>
<div class="tengah">
${d.view.button(arr.button)}
</div>
</div>
<div class="col-2-3">
<h1 id="username">${arr.username} </h1>
<div class="">Web Developer </div>
${svg.icon('geo')}${svg.icon('linkedin')}${svg.icon('facebook')}${svg.icon('x')}
</div>
</div>

<div class="row shadow"> ${d.view.card(arr.card)}
</div>

<div class="row shadow">
<h3>Profile</h3>
<div class="row"> ${d.view.input(arr.input)} </div>
<div class="gButton kanan"><button>Simpan</button></div>
</div>

<div class="row shadow">
<h3>Profile</h3>
<div class="row"> ${d.view.input(arr.input)} </div>
<div class="gButton kanan"><button>Simpan</button></div>
</div>


<div class="row shadow">
<h3>Setting</h3>
<div class="row"> ${d.view.input(arr.input)} </div>
<div class="gButton kanan">
<button>Simpan</button>
</div>
</div>


`;
return out;

},

editavatar:function(arr){

out=`

<div class="tengah">
<canvas id="canvas" width="300" height="300" class="img crop" ></canvas>
Zoom <input type="range" id="zoom" min="0.5" max="3" step="0.01" value="1">
<input type="file" id="file" accept="image/*">
<div class="gButton">
<button id="btnPreview">Preview</button>
<button id="btnSave">Simpan</button>
</div>
</div>
 </div>

`;

d.modal(out);

},

kursus:function(arr){
log(arr)
step=arr.length;
out=`<div class="row shadow"><div id="card" class="col-1-1">`;

if (step>4){step=4;}
for(i in arr){var {id_kursus,kursus,progress_kursus,status,icon,url}=arr[i];
out+=`<div class="col-1-${step}"  >
<div class="ag"> ${svg.icon(icon)}
<div class="ag-menu" >
<div class="ag-title">${id_kursus} ${kursus}</div>
<div class="ag-desc">
<input type="button" onclick="kursus.controller.materi(${id_kursus})" value="${status}" >
</div>
</div>
</div>
</div>`;
}
out+=`</div></div>`;
return out;
},
}, //end view

controller:{
  view:function(i){
      data=d.getls('data');
      if(data) { this.profile(i);  }
      else { login.controller.signform(1); }
  },

  editavatar:function(){

    profile.view.editavatar(0)
    profile.imagecrop.init(
      'crop',
      'upload',
      'zoom'
    )

  },

edit:function(){
  d.controller.edit(0)

},

public:function(){
d.gebi('content').innerHTML=profile.view.profile(profile.model.profile);
profile.public=true;

},
  profile:function(){
// http://localhost/donat/api/lms/?mod=view_peserta_kursus&nama=wawan
d.gebi('content').innerHTML=profile.view.profile(profile.model.profile);

const u = getUrlParam("u");
if (u) {

d.service.host=profile.model.host;
d.service.param={t:'view_peserta_kursus', mod:'view_peserta_kursus',nama:u};
d.service.get(callback);
function callback(json){res=JSON.parse(json);

arr=res.data;
profile.model.profile.username=u;
d.gebi('kursus').innerHTML=profile.view.kursus(arr);
}
}
profile.imagecrop.setavatar();
},


}, //end controller

}; // end login


profile.imagecrop = {

  /* ---------- config ---------- */
  MAX_SIZE: 2 * 1024 * 1024,
  OUTPUT_SIZE: 200,
  STORAGE_KEY: 'profile_images',
  DEFAULT_IMAGE_ID: 1767542646839,

  /* ---------- state ---------- */
  canvas: null,
  ctx: null,
  img: new Image(),
  scale: 1,
  ox: 0,
  oy: 0,
  drag: false,
  px: 0,
  py: 0,

  /* ---------- init ---------- */
  init() {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')

    this.bindUI()
    this.bindCanvas()
    // this.autoLoad()
  },

  /* ---------- UI bindings ---------- */
  bindUI() {
    document.getElementById('file').onchange = e => this.loadFile(e)
    document.getElementById('zoom').oninput = e => {
      this.scale = parseFloat(e.target.value)
      this.draw()
    }
    document.getElementById('btnPreview').onclick = () => this.preview()
    document.getElementById('btnSave').onclick = () => this.save()
  },

  bindCanvas() {
    const c = this.canvas

    c.onmousedown = e => {
      this.drag = true
      this.px = e.offsetX
      this.py = e.offsetY
    }

    c.onmouseup = () => this.drag = false

    c.onmousemove = e => {
      if (!this.drag) return
      this.ox += e.offsetX - this.px
      this.oy += e.offsetY - this.py
      this.px = e.offsetX
      this.py = e.offsetY
      this.draw()
    }
  },

  /* ---------- core logic ---------- */
  loadFile(e) {
    const f = e.target.files[0]
    if (!f || f.size > this.MAX_SIZE) {
      alert('Max 2MB')
      return
    }

    const r = new FileReader()
    r.onload = () => {
      this.img.onload = () => {
        this.scale = 1
        this.ox = this.oy = 0
        this.draw()
      }
      this.img.src = r.result
    }
    r.readAsDataURL(f)
  },

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    if (!this.img.src) return
    this.ctx.drawImage(
      this.img,
      this.ox,
      this.oy,
      this.img.width * this.scale,
      this.img.height * this.scale
    )
  },

  getDataURI() {
    const c = document.createElement('canvas')
    c.width = c.height = this.OUTPUT_SIZE
    c.getContext('2d').drawImage(this.canvas, 0, 0, this.OUTPUT_SIZE, this.OUTPUT_SIZE)
    return c.toDataURL('image/png')
  },

  /* ---------- CRUD ---------- */
  save() {
    const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]')
    const id = Date.now()
    data.push({ id, img: this.getDataURI() })
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data))
    alert('Tersimpan ID: ' + id)

    this.DEFAULT_IMAGE_ID=id;
    this.setavatar();

  },

  preview() {
    // document.getElementById('imgview').src = this.getDataURI()
    document.getElementById('avatar').src = this.getDataURI()

  },

  autoLoad() {
    const list = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]')
    const row = list.find(r => r.id === this.DEFAULT_IMAGE_ID)
    if (row) document.getElementById('imgview').src = row.img
  },

  setavatar() {
    const list = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]')
    const row = list.find(r => r.id === this.DEFAULT_IMAGE_ID)
    if (row) document.getElementById('avatar').src = row.img
  }


}

// window.addEventListener('load', () => profile.imagecrop.init())
