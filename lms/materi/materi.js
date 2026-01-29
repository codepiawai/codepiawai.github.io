var materi={
model:{
host:'http://localhost/api/lms/materi.php',
role:'tutor',
table:{id:'menu',data:[
{id:1,induk:0,nama:"Pemrograman Web",isi:1,icon:"code",url:"materi.controller.menu(1)"},
{id:2,induk:1,nama:"Modul 01",isi:1,icon:"eye",url:"materi.controller.video('WpW36ldAqnM')"},
{id:3,induk:1,nama:"Modul 02",isi:2,icon:"eye",url:"pdf('pdf01.pdf')"},
{id:4,induk:1,nama:"Kuis",isi:2,icon:"eye",url:"kuis.controller('kuis-web')"},
{id:5,induk:1,nama:"Sertifikat",isi:2,icon:"eye",url:"sertifikat.controller('kuis-web')"},
]},

kursus:{
input:{data:{email:'',pin:''},tipe:[ {id:"pin",nama:"password",arr:'1,2'},],},
button:{data:[
{id:1,nama:"Update",icon:"pen",url:"profile.controller.editavatar()"},
]},
},

materi:{
input:{data:{email:'',pin:''},tipe:[ {id:"pin",nama:"password",arr:'1,2'},],},
button:{data:[
{id:1,nama:"Signout",icon:"person",url:"login.controller.signout()"},
{id:1,nama:"Edit",icon:"pen",url:"profile.controller.editavatar()"},
]},
},


},



view:{
view2:function(){

  arr=d.model['edit'];

  out=`
  <div class="row shadow">
  <div id="ext"></div>
  <div class=""> ${d.view.input(arr.input)} </div>
  <div class=""> ${d.view.button(materi.model.kursus.button)} </div>
  </div>
  `;

  out+=d.view.view(d.model.view);
return out;

},


materi: function(arr) {
if (!arr.kursus || arr.kursus.length === 0) {
return `<div class="row"><div class="col-1-1">Data kursus tidak ditemukan.</div></div>`;
}

// Mengambil data dari baris pertama array kursus
const k = arr.kursus[0];

// Gunakan nilai default jika field kosong agar tidak muncul 'undefined'
const judulKursus = k.judul || k.kursus || "Judul Tidak Tersedia";
const kategori = k.kategori || "Umum";
const progres = k.progress_kursus || 0;
const deskripsi = k.deskripsi || "Belum ada deskripsi untuk kursus ini.";
const instruktur = k.instruktur || "Anonim";
const lembaga = k.lembaga || "Piawai";

// 2. Build UI Header

// <input type="button" onclick="materi.controller.baca()" value="${'enrol'}" >

let out = `
<div class="row">
<div class="ag"> ${svg.icon('buku')}
<div class="ag-menu">
<div class="ag-title">
<small>${kategori}</small>
<h1 style="margin: 5px 0;">${judulKursus}</h1>
</div>
<div >
<input type="button" value="${'enrol'}" >

</div>

<div class="row">
<strong>${progres}% Progres</strong><br>
<small>72 Jam | Gratis | ${k.peserta_count || 0} Peserta</small>
</div>
</div>
</div>

<div class="ag" style="margin-top: 20px;">
<div class="row">
<h3>Deskripsi</h3>
<p>${deskripsi}</p>
</div>
<div class="row" style="margin-top:10px; border-top: 1px solid #eee; padding-top: 10px;">
<strong>Instruktur:</strong> <a href="#">${instruktur}</a> |
<strong>Lembaga:</strong> <a href="#">${lembaga}</a>
</div>
</div>

<h3 style="margin-left: 10px; margin-top: 30px;">Modul Pembelajaran</h3>
`;

if (arr.modul && arr.modul.length > 0) {
// Batasi kolom maksimal 4 agar tidak terlalu lebar jika modul sedikit
let step = arr.modul.length;
if (step > 4) step = 4;
if (step < 1) step = 1;

for (let i in arr.modul) {
var m = arr.modul[i];
out += `
<div class="col-1-${step}">
<div class="ag"> ${svg.icon(m.icon || 'eye')}
<div class="ag-menu">
<div class="ag-title">${m.nama}</div>
<div class="ag-desc">
<input type="button"
onclick="materi.controller.baca(${m.id}, ${m.url})"
value="${m.status_modul || 'Buka'}"
style="width: 100%;">
</div>
</div>
</div>
</div>`;
}
} else {
out += `<div class="col-1-1"><p style="padding-left: 10px;">Belum ada modul yang tersedia.</p></div>`;
}

out += `</div>`;
return out;
},


pdf:function(){
  return `
  <iframe id="pdf-frame" src="" width="100%" height="75%" frameborder="0"></iframe>

  <div class="modal-footer-lms">
      <div id="loading-timer" style="font-size: 13px; color: #7f8c8d; margin-bottom: 5px;">
          Mohon baca materi sebelum menandai selesai...
      </div>
      <button id="btn-complete" class="btn-finish" onclick="markAsDone()" disabled>
          Tandai Selesai & Lanjut
      </button>
  </div>
  `;
}
},


controller:{
view:function(){
d.service.host=materi.model.host;
d.service.param={t:'materi', mod:'table',nama:'users'};
d.service.get(callback);
function callback(json){
res=JSON.parse(json);
table.data=res.data;
d.controller.view()
}
},

view2:function(i){
materi.controller.view(i)
d.url=materi.controller.url;
},

url:function(id){
var slug = window.location.search.replace("?", "").toLowerCase();
const [action, ids] = slug.split("/");

materi.controller.view(ids)
},


view:function(i){
d.service.host=materi.model.host;
d.service.param={t:'materi', mod:'kursus_materi',nama:i};
d.service.get(callback);
function callback(json){
res=JSON.parse(json);
log(res)
table.data=res.data;
// d.model.edit.induk=induk; // dev

d.model.edit.input.data=res.kursus[0];
// d.model.view


table.data=res.materi
d.gebi('content').innerHTML=materi.view.view2();

// d.view.view(d.model.view);
d.controller.tabs();

}
},

materi:function(idk){
d.service.host=materi.model.host;
d.service.param={mod:'materi',nama:idk};
d.service.get(callback);
function callback(json){
res=JSON.parse(json);
log(res)
d.gebi('content').innerHTML=materi.view.materi(res);
}
},

baca: async function(i, func){
// await materi.controller.dibaca(i);

},

dibaca:function(i){
d.service.host=materi.model.host;
d.service.param={t:'view_kursus', mod:'dibaca',nama:i};
d.service.get(callback);
function callback(json){res=JSON.parse(json);}
},

video:function(vid){
var vid=mp4.view();
d.modal(vid)
mp4.controller();

document.querySelectorAll('.modalcontent').forEach(el => {
if (el.querySelector('.player')) {
el.classList.add('has-player');
}
});

},

 pdf:function(fileId) {

   // pdf('1hiQbIHP6d2zRCjtuCjJSt_hJReyOm_3e');

    const modal = document.getElementById('pdf-modal');
    const iframe = document.getElementById('pdf-frame');
    const btn = document.getElementById('btn-complete');
    const timerText = document.getElementById('loading-timer');

    // Reset tombol
    btn.disabled = true;
    btn.innerText = "Tandai Selesai & Lanjut";
    timerText.style.display = "block";

    // Tampilkan modal & muat PDF
    modal.style.display = 'block';
    iframe.src = `https://drive.google.com/file/d/${fileId}/preview`;

    // Timer 10 detik sebelum tombol aktif (mencegah klik asal)
    setTimeout(() => {
        btn.disabled = false;
        timerText.style.display = "none";
    }, 10000);
},


},
};
