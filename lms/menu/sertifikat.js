var sertifikat = {
  storageKey: 'sertifikat_data',
  bgImage: 'templates/donat/lms/cert.png',
  generator: {}
};

sertifikat.generator.bg = new Image();
sertifikat.generator.bg.src = sertifikat.bgImage;

sertifikat.generator.getData = function(){
  return JSON.parse(localStorage.getItem(sertifikat.storageKey)) || [];
};

sertifikat.generator.saveData = function(data){
  localStorage.setItem(sertifikat.storageKey, JSON.stringify(data));
};

sertifikat.generator.render = function(){
  var tbody = document.getElementById('data');
  tbody.innerHTML = '';
  sertifikat.generator.getData().forEach(function(d,i){
    tbody.innerHTML += `
      <tr>
        <td>${d.nama}</td>
        <td>${d.judul}</td>
        <td>${d.tanggal}</td>
        <td class="actions">
          <button onclick="sertifikat.generator.edit(${i})">Edit</button>
          <button onclick="sertifikat.generator.hapus(${i})">Hapus</button>
          <button onclick="sertifikat.generator.preview(${i})">Sertifikat</button>
        </td>
      </tr>`;
  });
};

sertifikat.generator.simpan = function(){
  var obj = {
    nama: nama.value,
    judul: judul.value,
    tanggal: tanggal.value
  };
  var data = sertifikat.generator.getData();
  if(id.value === '') data.push(obj);
  else data[id.value] = obj;

  sertifikat.generator.saveData(data);
  id.value = nama.value = judul.value = tanggal.value = '';
  sertifikat.generator.render();
};

sertifikat.generator.edit = function(i){
  var d = sertifikat.generator.getData()[i];
  id.value = i;
  nama.value = d.nama;
  judul.value = d.judul;
  tanggal.value = d.tanggal;
};

sertifikat.generator.hapus = function(i){
  var data = sertifikat.generator.getData();
  data.splice(i,1);
  sertifikat.generator.saveData(data);
  sertifikat.generator.render();
};
sertifikat.generator.preview = function(i){
  var d = sertifikat.generator.getData()[i];
  var c = document.getElementById('canvas');
  var ctx = c.getContext('2d');

  ctx.clearRect(0,0,c.width,c.height);
  ctx.drawImage(sertifikat.generator.bg,0,0,c.width,c.height);

  ctx.fillStyle = '#000';
  ctx.textAlign = 'center';

  // Judul
  ctx.font = 'bold 48px serif';
  ctx.fillText('SERTIFIKAT', c.width/2, 270);

  ctx.font = '22px serif';
  ctx.fillText('Diberikan kepada:', c.width/2, 320);

  ctx.font = 'bold 40px serif';
  ctx.fillText(d.nama, c.width/2, 370);

  ctx.font = '24px serif';
  ctx.fillText(d.judul, c.width/2, 430);

  // Bawah: tanggal & tanda tangan
  var yBawah = c.height - 200;

  ctx.textAlign = 'left';
  ctx.font = '18px serif';
  ctx.fillText('Tanggal:', 200, yBawah);
  ctx.fillText(d.tanggal, 200, yBawah + 30);

  ctx.beginPath();
  ctx.moveTo(180, yBawah + 60);
  ctx.lineTo(420, yBawah + 60);
  ctx.stroke();

  ctx.textAlign = 'right';
  ctx.fillText('Penanggung Jawab', c.width - 200, yBawah);
  ctx.fillText('(__________________)', c.width - 200, yBawah + 60);
};


sertifikat.generator.downloadPNG = function(){
  var canvas = document.getElementById('canvas');
  canvas.toBlob(function(blob){
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sertifikat.png';
    link.click();
    URL.revokeObjectURL(link.href);
  });
};

// sertifikat.generator.render();
