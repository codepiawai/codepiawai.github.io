pdf = function(pdfUrl) {
  // pdf('1hiQbIHP6d2zRCjtuCjJSt_hJReyOm_3e');



  out = `
  <div class="pdf-responsive-container">
      <div class="pdf-ratio-box">
          <iframe
              id="pdf-frame"
              src="https://drive.google.com/file/d/${pdfUrl}/preview"
              frameborder="0"
              allow="autoplay">
          </iframe>
      </div>
      <div class="modal-footer-lms">
          <div id="loading-timer">Mohon baca materi sebelum menandai selesai...</div>
          <button id="btn-complete" class="btn-finish" onclick="markAsDone()" disabled>
              Tandai Selesai & Lanjut
          </button>
      </div>
  </div>
  `;

d.modal(out);

   // const modal = document.getElementById('pdf-modal');
   const iframe = document.getElementById('pdf-frame');
   const btn = document.getElementById('btn-complete');
   const timerText = document.getElementById('loading-timer');

   // Reset tombol
   btn.disabled = true;
   btn.innerText = "Tandai Selesai & Lanjut";
   timerText.style.display = "block";

   // Tampilkan modal & muat PDF
   // iframe.src = `https://drive.google.com/file/d/${fileId}/preview`;
   // iframe.src = `https://drive.google.com/file/d/1hiQbIHP6d2zRCjtuCjJSt_hJReyOm_3e/preview`;

   // Timer 10 detik sebelum tombol aktif (mencegah klik asal)
   setTimeout(() => {
       btn.disabled = false;
       timerText.style.display = "none";
   }, 10000);
};
