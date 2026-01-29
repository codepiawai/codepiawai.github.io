var profile={
imagecrop:{},
public:true,
model:{
host:'http://localhost/donat/api/lms/index.php',
table:{id:'profile',rpp:5,page:1,data:[
  {id:101,Nama:"Pemrograman Web",Sertifikat:'2024-12-01',Progress:"selesai",url:"kursus.controller.menu(1)"},
  {id:107,Nama:"Desain Web",Sertifikat:'2024-12-01',Progress:"selesai",url:"kursus.controller.menu(1)"},
  {id:113,Nama:"Pemrograman Mobile",Sertifikat:'2024-12-01',Progress:"selesai",url:"kursus.controller.menu(1)"},
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
{id:1,nama:"Kursus",isi:"3",icon:"edu",url:"d.url('pesan');"},
{id:2,nama:"Project",isi:"3",icon:"setting",url:"d.url('exam');"},
{id:2,nama:"Sertifikat",isi:"3",icon:"file",url:"d.url('cert');"},
// {id:3,nama:"Param",isi:"2",icon:"lock",url:"param.controller.view()"},
]},
}, //end profile
}, //end model

view:{

profile:function(arr){
avt=avatar.view.svg(avatar.view.man(avatar.model.man[2]));

log(profile.model.table)
out=`
<div id="profile" class="row shadow">
<div class="col-1-3">

<div  class="user-avatar img">
<img id="avatar" class="user-avatar img" src="/piawai/templates/donat/me.jpg"> </div>
</div>

<div class="col-2-3">
<h1 id="username">${arr.username} </h1>
<div id="desc" class="row">Web Developer </div>
${svg.icon('geo')}${svg.icon('linkedin')}${svg.icon('facebook')}${svg.icon('x')}
</div>
</div>

<div class="row shadow"> ${d.view.card(arr.card)}
</div>

<div class="row shadow">
<h3>Kursus Instruktur</h3>
<div class="row"> ${d.view.table(profile.model.table)}</div>
</div>

<div class="row shadow">
<h3>Kursus Peserta</h3>
<div class="row"> ${d.view.table(profile.model.table)}</div>
</div>

</div>
`;
return out;

},


}, //end view

controller:{
view:function(i){
data=d.getls('data');
if(data) { this.profile(i);  }
else { login.controller.signform(1); }
},

detail:function(){ d.modal(detail)},

profile:function(){

  log(public)
  public=true;
  log(public)

d.gebi('content').innerHTML=profile.view.profile(profile.model.profile);
profile.public=true;
},

}, //end controller
}; // end login

const ui = {
  buttonDetail(id){
    log('manah')
    return `
      <button
        class="${css.button}"
        data-action="detail"
        data-id="${id}">
        <span>Detail</span>
      </button>
    `;
  }
};

document.addEventListener('click', function(e){
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;

  const action = btn.dataset.action;
  const id     = btn.dataset.id;

  // routing ke controller
  if (d.controller && typeof d.controller[action] === 'function') {
    d.controller[action](id);
  }
});


d.view.aksi = ui.buttonDetail;

d.controller.detail = function(id){
  log('detail clicked:', id);
  d.modal(id)
};
