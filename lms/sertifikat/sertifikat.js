var sertifikat={
model:{
data:[
  {peserta:'Roy Mubarak',kursus:'Enkripsi blockchain',tanggal:'08 Sep 2025',kredensial:'202509080101'},
  {peserta:'Asruyddin',kursus:'Digital Foreksik',tanggal:'08 Sep 2025',kredensial:'202509080102'},
  {peserta:'Wawan Sismadi',kursus:'IoT',tanggal:'08 Sep 2025',kredensial:'202509080103'},
]
  },
view:function(){
out=`
<canvas id="canvas" width="1000" height="700">ss</canvas>
<button onclick="download()">Download</button>
`;
return out;
},

controller:function(id){
// const targetKredensial = '202509080101';
const arr = sertifikat.model.data.find(item => item.kredensial === id);
d.gebi('content').innerHTML=sertifikat.view();
const img = { bg: "cert.png"}
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let bgImage = new Image();
let currentIndex = 0;

bgImage.src = img.bg;
bgImage.onload = () => {
generate(currentIndex);
};

generate=function(index) {

const peserta = arr.peserta;
log(peserta)

if (!peserta) return;

// Bersihkan dan gambar latar
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

// Tambahkan teks
ctx.fillStyle = "#000";
ctx.textAlign = "center";

ctx.font = "bold 36px serif";
ctx.fillText("SERTIFIKAT", canvas.width / 2, 230);

ctx.font = "28px sans-serif";
ctx.fillText(arr.peserta, canvas.width / 2, 270);

ctx.font = "22px sans-serif";
ctx.fillText(arr.kursus, canvas.width / 2, 310);
ctx.fillText(arr.tanggal, canvas.width / 2, 350);
ctx.fillText(arr.kredensial, canvas.width / 2, 400);
}
download=function() {
const peserta = arr.peserta;
const link = document.createElement("a");
link.download = `sertifikat_${peserta.replace(/\s/g, "_")}.png`;
link.href = canvas.toDataURL("image/png");
link.click();
}

},
};
