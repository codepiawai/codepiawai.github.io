modul="kursus";
var kursus={
model:{
host:'http://localhost/api/lms/kursus.php',
role:'tutor',
table:{id:'menu',data:[
{id:1,induk:0,nama:"Pemrograman Web",isi:1,icon:"code",url:"kursus.controller.menu(1)"},
{id:2,induk:1,nama:"Modul 01",isi:1,icon:"eye",url:"kursus.controller.video('WpW36ldAqnM')"},
{id:3,induk:1,nama:"Modul 02",isi:2,icon:"eye",url:"pdf('pdf01.pdf')"},
{id:4,induk:1,nama:"Kuis",isi:2,icon:"eye",url:"kuis.controller('kuis-web')"},
{id:5,induk:1,nama:"Sertifikat",isi:2,icon:"eye",url:"sertifikat.controller('kuis-web')"},
]},
},

view:{
menu:function(arr){
out=`
<div class="row shadow">
<div id="card" class="col-1-1">  ${d.view.card(arr)}
</div>
</div>`;
return out;
},

kursus: function(arr) {
var { data } = arr;

// Mengambil daftar unik untuk filter agar checkbox otomatis mengikuti isi data
const kategoris = [...new Set(data.map(item => item.kategori))];
const instrukturs = [...new Set(data.map(item => item.instruktur))];
const lembagas = [...new Set(data.map(item => item.lembaga))];

let out = `
<div class="row shadow" style="padding: 20px; background: #fff; margin-bottom: 20px; border-radius: 10px; border: 1px solid #eee;">
<div class="col-1-1" style="margin-bottom: 15px;">
<input type="text" id="searchKursus" placeholder="Cari judul kursus..."
onkeyup="kursus.controller.filter()"
style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #ddd; font-size: 16px;">
</div>

<div class="col-1-3">
<strong>Kategori:</strong><br>
${kategoris.map(k => `<label style="display:block;"><input type="checkbox" class="f-kat" value="${k}" onchange="kursus.controller.filter()"> ${k}</label>`).join('')}
</div>
<div class="col-1-3">
<strong>Instruktur:</strong><br>
${instrukturs.map(i => `<label style="display:block;"><input type="checkbox" class="f-ins" value="${i}" onchange="kursus.controller.filter()"> ${i}</label>`).join('')}
</div>
<div class="col-1-3">
<strong>Lembaga:</strong><br>
${lembagas.map(l => `<label style="display:block;"><input type="checkbox" class="f-lem" value="${l}" onchange="kursus.controller.filter()"> ${l}</label>`).join('')}
</div>
</div>

<div class="row shadow">
<div id="card-container" class="col-1-1">
${this.renderCards(data)}
</div>
</div>`;
return out;
},

renderCards: function(data) {
if (data.length === 0) return "<div style='padding:40px; text-align:center; width:100%;'><h3>Kursus tidak ditemukan.</h3></div>";

let step = data.length > 4 ? 4 : data.length;
let out = "";
for (let i in data) {
var { id, judul, icon, instruktur, lembaga } = data[i];
out += `
<div class="col-1-${step}">
<div class="ag"> ${svg.icon(icon)}
<div class="ag-menu">
<div class="ag-title">${judul}</div>
<div class="ag-desc">
<small>${instruktur} | ${lembaga}</small><br><br>
<input type="button" onclick="d.goto('/lms/materi/?${id}')" value="Lihat Materi">
</div>
</div>
</div>
</div>`;
}
return out;
},


},

controller:{
masterData: [],

view:function(){
// d.model.edit.button.data.push({id:2,nama:"Materi",icon:"x",url:"d.goto('/lms/materi/?admin')"});
d.service.host=kursus.model.host;
d.service.param={t:'kursus', mod:'table',nama:'users'};
d.service.get(callback);
function callback(json){
res=JSON.parse(json);
table.data=res.data;
log(res.data)
// table.data=materi.model.table.data;
d.controller.view()
d.controller.edit=kursus.controller.edit;
}
},

edit:function(i){ //controller.edit

induk=table.data[i].id; // dev
d.model.edit.induk=induk; // dev
d.setls('induk',induk);
d.model.edit.button.data=[
  {id:1,nama:"Cancel",icon:"x",url:"tutup()"},
  {id:2,nama:"Update",icon:"pen",url:"d.service.update()"},
  {id:3,nama:"Materi",icon:"x",url:"d.goto(`/lms/materi/?admin/${induk}`)"}
];
d.model.edit.input.data=table.data[i];
d.modal(d.view.edit(d.model['edit']));

},



daftar: async function(idpeserta,idkursus,func){
await kursus.controller.didaftar(idpeserta,idkursus);
},

kursus: function(i) {
d.service.host = kursus.model.host;
d.service.param = { t: 'kursus', mod: 'table', nama: 'users' }; // Sesuaikan param API Anda
d.service.get((json) => {
let res = JSON.parse(json);
// Simpan data ke masterData untuk keperluan filter
kursus.controller.masterData = res.data;
d.gebi('content').innerHTML = kursus.view.kursus(res);
});
},

filter: function() {
let search = d.gebi('searchKursus').value.toLowerCase();

// Fungsi helper untuk mengambil value checkbox yang tercentang
let getChecked = (cls) => Array.from(document.querySelectorAll(cls + ':checked')).map(el => el.value);

let selKategori = getChecked('.f-kat');
let selInstruktur = getChecked('.f-ins');
let selLembaga = getChecked('.f-lem');

// Proses Filter Data
let filtered = kursus.controller.masterData.filter(item => {
// Cocokkan judul (case insensitive)
let matchSearch = item.judul.toLowerCase().includes(search);

// Cocokkan checkbox (jika kosong berarti tampilkan semua)
let matchKat = selKategori.length === 0 || selKategori.includes(item.kategori);
let matchIns = selInstruktur.length === 0 || selInstruktur.includes(item.instruktur);
let matchLem = selLembaga.length === 0 || selLembaga.includes(item.lembaga);

return matchSearch && matchKat && matchIns && matchLem;
});

// Update tampilan card saja
d.gebi('card-container').innerHTML = kursus.view.renderCards(filtered);
},
},
};
