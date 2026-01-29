async function loadModularComponent(sourceId, targetId, dataArray) {
  // const res = await fetch('content.html');
  const res = await fetch('/piawai/templates/admin/content.html');
    const htmlText = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    const template = doc.getElementById(sourceId);

    const container = document.getElementById(targetId);

    dataArray.forEach(item => {
        // 1. Ambil konten template sebagai string untuk replace {{ key }}
        let contentHTML = template.innerHTML;

        for (const key in item) {
            const regex = new RegExp(`{{ ${key} }}`, 'g');
            contentHTML = contentHTML.replace(regex, item[key]);
        }

        // 2. Gunakan Range untuk mengubah string kembali ke elemen agar <script> bisa jalan
        const range = document.createRange();
        const fragment = range.createContextualFragment(contentHTML);

        container.appendChild(fragment);

        // svg.di();

    });
}

// Inisialisasi data dan panggil fungsi
async function init() {
    // Data untuk notifikasi
    loadModularComponent('temp-alert', 'target-notifikasi',
      [{ pesan: "Server akan maintenance pukul 00:00 WIB" } ]
    );

    // Data untuk produk
    const res = await fetch('data.json');
    const data = await res.json();
    loadModularComponent('temp-card', 'target-produk', data.barang);
    loadModularComponent('temp-footer', 'target-footer',[{ pesan: "piawai" } ]);
}

// init();

async function ActiveMenu(targetMenu) {
      const currentActive = document.querySelector('#leftmenu a.active');
      if (currentActive) currentActive.classList.remove('active');
      const target = document.querySelector(`#leftmenu a[data-info="${targetMenu}"]`);
      if (target) target.classList.add('active');
}
