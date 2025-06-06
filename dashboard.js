document.addEventListener('DOMContentLoaded', () => {
    // === PENTING: GANTI NOMOR WHATSAPP DI SINI ===
    const NOMOR_WHATSAPP_PENJUAL = '6285792698607'; // Ganti dengan nomor Anda, format 62xxx

    // Cek apakah user sudah login
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Anda harus login terlebih dahulu!');
        window.location.href = 'login.html';
        return;
    }

    // Tampilkan nama user di judul beranda
    document.getElementById('welcome-title').innerHTML = `Halo, ${currentUser.nama.split(' ')[0]}! <br>Selamat Datang di <span class="highlight">Al-Ma'ruf Cell</span>`;

    // Data Produk (Anda bisa menambahkan atau mengubah di sini)
    const produk = {
        pulsa: [
            { nama: 'Pulsa 10.000', harga: 12000, img: 'img/7c0eed0a_410686bf_xl.jpg' },
            { nama: 'Pulsa 25.000', harga: 27000, img: 'img/7c0eed0a_410686bf_xl.jpg' },
            { nama: 'Pulsa 50.000', harga: 52000, img: 'img/7c0eed0a_410686bf_xl.jpg' },
            { nama: 'Pulsa 100.000', harga: 102000, img: 'img/7c0eed0a_410686bf_xl.jpg' },

            { nama: 'Pulsa 10.000', harga: 12000, img: 'img/telkomsel.jpg' },
            { nama: 'Pulsa 25.000', harga: 27000, img: 'img/telkomsel.jpg' },
            { nama: 'Pulsa 50.000', harga: 52000, img: 'img/telkomsel.jpg' },
            { nama: 'Pulsa 100.000', harga: 102000, img: 'img/telkomsel.jpg' },

             { nama: 'Pulsa 10.000', harga: 12000, img: 'img/im3.png' },
            { nama: 'Pulsa 25.000', harga: 27000, img: 'img/im3.png' },
            { nama: 'Pulsa 50.000', harga: 52000, img: 'img/im3.png' },
            { nama: 'Pulsa 100.000', harga: 102000, img: 'img/im3.png' },

             { nama: 'Pulsa 10.000', harga: 12000, img: 'img/axis.png' },
            { nama: 'Pulsa 25.000', harga: 27000, img: 'img/axis.png' },
            { nama: 'Pulsa 50.000', harga: 52000, img: 'img/axis.png' },
            { nama: 'Pulsa 100.000', harga: 102000, img: 'img/axis.png' },
        ],
        data: [
            { nama: 'Data 1GB', harga: 15000, img: 'img/7c0eed0a_410686bf_xl.jpg' },
            { nama: 'Data 5GB', harga: 45000, img: 'img/7c0eed0a_410686bf_xl.jpg' },
            { nama: 'Data 8GB', harga: 60000, img: 'img/7c0eed0a_410686bf_xl.jpg' },
            { nama: 'Data 10GB', harga: 80000, img: 'img/7c0eed0a_410686bf_xl.jpg' },

            { nama: 'Data 1GB', harga: 15000, img: 'img/telkomsel.jpg' },
            { nama: 'Data 5GB', harga: 45000, img: 'img/telkomsel.jpg' },
            { nama: 'Data 8GB', harga: 60000, img: 'img/telkomsel.jpg' },
            { nama: 'Data 10GB', harga: 80000, img: 'img/telkomsel.jpg' },

            { nama: 'Data 1GB', harga: 15000, img: 'img/im3.png' },
            { nama: 'Data 5GB', harga: 45000, img: 'img/im3.png' },
            { nama: 'Data 8GB', harga: 60000, img: 'img/im3.png' },
            { nama: 'Data 10GB', harga: 80000, img: 'img/im3.png' },

            { nama: 'Data 1GB', harga: 15000, img: 'img/axis.png' },
            { nama: 'Data 5GB', harga: 45000, img: 'img/axis.png' },
            { nama: 'Data 8GB', harga: 60000, img: 'img/axis.png' },
            { nama: 'Data 10GB', harga: 80000, img: 'img/axis.png' },
        ],
        token: [
            { nama: 'Token Listrik 20k', harga: 22000, img: 'img/0c40e51d_token.jpg' },
            { nama: 'Token Listrik 50k', harga: 52000, img: 'img/0c40e51d_token.jpg' },
            { nama: 'Token Listrik 100k', harga: 102000, img: 'img/0c40e51d_token.jpg' },
        ],
        topup: [
            { nama: 'Diamonds ML 86', harga: 51500, img: 'img/Diamond.jpg' },
            { nama: 'Diamonds ML 145', harga: 101500, img: 'img/Diamond.jpg' },
            { nama: 'Diamonds ML 30', harga: 25000, img: 'img/Diamond.jpg' },
        ]
    };

    // Fungsi untuk membuat kartu produk (saya tambahkan gambar custom)
    function createProductCard(item) {
        return `
            <div class="product-card">
                <img src="${item.img}" alt="${item.nama}">
                <h3>${item.nama}</h3>
                <p class="price">Rp ${item.harga.toLocaleString('id-ID')}</p>
                <button class="buy-button" data-nama="${item.nama}" data-harga="${item.harga}">Beli</button>
            </div>
        `;
    }

    // Muat semua produk ke dalam grid yang sesuai
    document.getElementById('pulsa-grid').innerHTML = produk.pulsa.map(createProductCard).join('');
    document.getElementById('data-grid').innerHTML = produk.data.map(createProductCard).join('');
    document.getElementById('token-grid').innerHTML = produk.token.map(createProductCard).join('');
    document.getElementById('topup-grid').innerHTML = produk.topup.map(createProductCard).join('');


        // ===================================================================
    // BAGIAN INI DIPERBAIKI (DENGAN TAMBAHAN SCROLL)
    // ===================================================================
    const navLinks = document.querySelectorAll('.nav-link');
    const pageContents = document.querySelectorAll('.page-content');
    const produkDropdownLink = document.querySelector('.dropdown > a.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');

            if (!targetId) {
                return;
            }

            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                // Sembunyikan semua konten terlebih dahulu
                pageContents.forEach(page => {
                    page.classList.remove('active');
                });
                // Tampilkan konten yang dituju
                targetContent.classList.add('active');

                // Atur style 'active' pada link navigasi
                navLinks.forEach(nav => nav.classList.remove('active'));
                link.classList.add('active');

                if (link.closest('.dropdown-content')) {
                    if (produkDropdownLink) {
                        produkDropdownLink.classList.add('active');
                    }
                }

                // INI BARIS YANG DITAMBAHKAN UNTUK SCROLL OTOMATIS
                if (targetId !== 'beranda') { // Jangan scroll jika kembali ke beranda
                    targetContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else { // Jika kembali ke beranda, scroll ke paling atas
                     window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        });
    });
    // ===================================================================
    // AKHIR DARI BAGIAN YANG DIPERBAIKI
    // ===================================================================

    // Logika tombol Beli (WhatsApp)
    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const namaProduk = e.target.getAttribute('data-nama');
            const hargaProduk = e.target.getAttribute('data-harga');
            const namaUser = currentUser.nama;

            const pesan = `Halo Al-Ma'ruf Cell, saya ${namaUser} mau beli produk ${namaProduk} dengan harga Rp ${parseInt(hargaProduk).toLocaleString('id-ID')}`;
            
            const pesanEncoded = encodeURIComponent(pesan);
            const urlWhatsApp = `https://api.whatsapp.com/send?phone=${NOMOR_WHATSAPP_PENJUAL}&text=${pesanEncoded}`;

            window.open(urlWhatsApp, '_blank');
        });
    });

    // Logika Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        if (confirm('Apakah Anda yakin ingin logout?')) {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        }
    });
});