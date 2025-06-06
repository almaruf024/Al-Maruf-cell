document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    // Handle Registration
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nama = document.getElementById('nama').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Simulasi: Cek jika email sudah terdaftar
            if (localStorage.getItem(email)) {
                alert('Email sudah terdaftar!');
                return;
            }

            // Simpan data user ke localStorage
            const userData = {
                nama: nama,
                password: password // Dalam aplikasi nyata, password harus di-hash!
            };
            localStorage.setItem(email, JSON.stringify(userData));
            
            alert('Pendaftaran berhasil! Silakan login.');
            window.location.href = 'login.html';
        });
    }

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Ambil data user dari localStorage
            const storedData = localStorage.getItem(email);
            if (!storedData) {
                alert('Email tidak ditemukan!');
                return;
            }

            const userData = JSON.parse(storedData);

            // Cek password
            if (userData.password === password) {
                alert('Login berhasil!');
                // Simpan info user yang sedang login
                localStorage.setItem('currentUser', JSON.stringify({
                    nama: userData.nama,
                    email: email
                }));
                window.location.href = 'dashboard.html';
            } else {
                alert('Password salah!');
            }
        });
    }
});