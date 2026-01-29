d.service.host = "http://localhost/api/presensi/presensi.php"; // Sesuaikan path host Anda

let video=document.getElementById("video");
let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d",{willReadFrequently:true});
let classifier, scanning=false;
let lastFrame=performance.now(), lastPresensi=0;

const THRESHOLD=0.85, DELAY=3000, TOP_K=5;

/* CAMERA */
async function initCamera(){
  const s=await navigator.mediaDevices.getUserMedia({video:true});
  video.srcObject=s;
  await new Promise(r=>video.onloadedmetadata=r);
  video.play();
}

/* FACE */
function getFace(){
  ctx.drawImage(video,0,0,320,240);
  let src=cv.imread(canvas);
  let gray=new cv.Mat();
  cv.cvtColor(src,gray,cv.COLOR_RGBA2GRAY);

  let faces=new cv.RectVector();
  classifier.detectMultiScale(gray,faces,1.3,5);
  if(faces.size()===0){
    src.delete();gray.delete();faces.delete();
    return null;
  }

  let r=faces.get(0);
  ctx.strokeStyle="lime";ctx.lineWidth=2;
  ctx.strokeRect(r.x,r.y,r.width,r.height);

  let roi=gray.roi(r).clone();
  cv.resize(roi,roi,new cv.Size(50,50));

  let vec=Array.from(roi.data);
  let mean=vec.reduce((a,b)=>a+b,0)/vec.length;

  fROI.innerText=`${r.width}×${r.height}`;
  fDim.innerText=vec.length;
  fMean.innerText=mean.toFixed(2);

  src.delete();gray.delete();faces.delete();roi.delete();
  return {vec,mean};
}

/* COSINE */
function cosine(a,b){
  let d=0,na=0,nb=0;
  for(let i=0;i<a.length;i++){
    d+=a[i]*b[i]; na+=a[i]*a[i]; nb+=b[i]*b[i];
  }
  if(na===0||nb===0) return 0;
  return d/(Math.sqrt(na)*Math.sqrt(nb));
}




/* ENROLL (Daftar Wajah ke Server) */
function enroll() {
    let n = document.getElementById("nama").value;
    if (!n) return alert("Isi nama");

    let f = getFace();
    if (!f) return alert("Wajah tidak terdeteksi");

    // Persiapkan data untuk dikirim ke profile.php
    // Kita kirim vector wajah sebagai string JSON
    let vectorStr = JSON.stringify(f.vec);

    d.service.host = "http://localhost/presensi/api/presensi.php"; // Sesuaikan path host Anda
    d.service.param = {t: 'profile',mod: 'enrol',nama: {'nama':n,'vector': vectorStr} };

    d.service.get(function(json) {
        let res = JSON.parse(json);
        if(res.status === "success") {
            // Tetap simpan di localstorage untuk pencarian cepat (cache)
            let db = JSON.parse(localStorage.getItem("faces") || "{}");
            db[n] = f;
            localStorage.setItem("faces", JSON.stringify(db));
            alert("Berhasil mendaftar ke Database!");
        }
    });
}

/* PRESENSI (Kirim Log ke Server) */
function presensi(r) {
    let now = Date.now();
    if (now - lastPresensi < DELAY) return;
    lastPresensi = now;

    // Kirim data presensi ke server
    d.service.host = "http://localhost/presensi/api/presensi.php"; // Sesuaikan path host Anda
    d.service.param = {
        t: 'profile',
        mod: 'absen',
        nama: {'nama':r.nama,'skor': (r.score * 100).toFixed(2)}
    };

    d.service.get(function(json) {
        let res = JSON.parse(json);
        console.log("Presensi tersimpan di DB");

        // Update tabel log di UI
        log1.innerHTML += `<tr>
            <td>${r.nama}</td>
            <td>${(r.score * 100).toFixed(2)}</td>
            <td>${new Date().toLocaleString()}</td>
        </tr>`;
    });
}


/* VERIFY */
function verifyAll(input){
  let db=JSON.parse(localStorage.getItem("faces")||"{}");
  let coarse=[],res=[];
  for(let n in db)
    coarse.push({n,d:Math.abs(input.mean-db[n].mean)});
  coarse.sort((a,b)=>a.d-b.d);
  coarse.slice(0,TOP_K).forEach(c=>{
    res.push({nama:c.n,score:cosine(input.vec,db[c.n].vec)});
  });
  fSize.innerText=Object.keys(db).length;
  return res.sort((a,b)=>b.score-a.score);
}

/* LOOP */
function loop(){
  if(!scanning) return;
  let now=performance.now();
  fFPS.innerText=(1000/(now-lastFrame)).toFixed(1);
  lastFrame=now;

  let f=getFace();
  if(f){
    let r=verifyAll(f);
    updateRanking(r);
    if(r[0]){
      fTop1.innerText=(r[0].score*100).toFixed(2)+"%";
      let ok=r[0].score>THRESHOLD;
      fDecision.innerText=ok?"MATCH":"NO MATCH";
      fDecision.className=ok?"match":"nomatch";
      if(ok) presensi(r[0]);
      //alert(ok)

    }
  }
  requestAnimationFrame(loop);
}

/* UI */
function updateRanking(r){
  rankTable.innerHTML="";
  r.forEach(e=>{
    let p=(e.score*100).toFixed(1);
    rankTable.innerHTML+=`
    <tr>
      <td>${e.nama}</td>
      <td>${p}</td>
      <td class="bar"><svg>
        <rect width="${1.4*p}" height="16" fill="${p>85?"#4CAF50":"#F44336"}"/>
      </svg></td>
      <td class="${p>85?"match":"nomatch"}">${p>85?"MATCH":"NO"}</td>
    </tr>`;
  });
}


function startScan(){scanning=true;status.innerText="Status: scanning";loop();}
function stopScan(){scanning=false;status.innerText="Status: stopped";}


/* SYNC DATA DARI DATABASE KE LOCALSTORAGE */
function syncFaces() {
    console.log("Syncing faces from database...");

    d.service.host = "http://localhost/presensi/api/presensi.php";
    d.service.param = {
        t: 'profile',
        mod: 'getFaces'
    };

    d.service.get(function(json) {
        try {
            let res = JSON.parse(json);
            if(res.status === "success" && res.data) {
                let db = {};
                res.data.forEach(item => {
                    // Karena vector disimpan sebagai string JSON di DB, kita parse kembali
                    db[item.nama] = {
                        vec: JSON.parse(item.vector),
                        mean: JSON.parse(item.vector).reduce((a, b) => a + b, 0) / JSON.parse(item.vector).length
                    };
                });

                // Simpan ke localStorage untuk digunakan oleh fungsi verifyAll()
                localStorage.setItem("faces", JSON.stringify(db));
                fSize.innerText = Object.keys(db).length;
                console.log("Sync Complete. Loaded " + Object.keys(db).length + " faces.");
            }
        } catch(e) {
            console.error("Sync failed:", e);
        }
    });
}

/* UPDATE PADA INIT */
cv.onRuntimeInitialized = async () => {
    await initCamera();
    classifier = new cv.CascadeClassifier();

    // Load XML model
    let r = await fetch("haarcascade_frontalface_default.xml");
    let data = new Uint8Array(await r.arrayBuffer());
    cv.FS_createDataFile("/", "face.xml", data, true, false, false);
    classifier.load("face.xml");

    console.log("OpenCV Ready");

    // JALANKAN SYNC SETELAH OPENCV SIAP
    syncFaces();
};
