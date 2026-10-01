/* ============================================================
   ERTUĞRUL HUKUK BÜROSU — main.js
   İşlev: Hamburger menü, aktif sayfa, header scroll, form validasyonu
   ============================================================ */

(function () {
    'use strict';

    // --- 1. HEADER SCROLL GÖLGE ---
    var header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // --- 2. AKTİF SAYFA NAV VURGULAMA ---
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.nav-link, .mobile-nav .nav-link');
    navLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // --- 3. HAMBURGEr MENÜ ---
    var hamburger = document.getElementById('hamburger');
    var mobileNav = document.getElementById('mobile-nav');
    var mobileClose = document.getElementById('mobile-nav-close');

    function openMobileNav() {
        if (!mobileNav) return;
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeMobileNav() {
        if (!mobileNav) return;
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    }

    if (hamburger) {
        hamburger.addEventListener('click', openMobileNav);
    }
    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileNav);
    }

    // Mobil menüde bir linke tıklanınca kapat
    if (mobileNav) {
        mobileNav.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', closeMobileNav);
        });
    }

    // Escape tuşuyla kapat
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMobileNav();
    });

    // --- 4. İLETİŞİM FORMU VALİDASYONU ---
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var valid = true;

            // Zorunlu alanları kontrol et
            var required = contactForm.querySelectorAll('[data-required]');
            required.forEach(function (field) {
                var group = field.closest('.form-group');
                if (!field.value.trim()) {
                    if (group) group.classList.add('has-error');
                    valid = false;
                } else {
                    if (group) group.classList.remove('has-error');
                }
            });

            // E-posta format kontrolü
            var emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                var emailGroup = emailField.closest('.form-group');
                if (!emailRegex.test(emailField.value.trim())) {
                    if (emailGroup) emailGroup.classList.add('has-error');
                    valid = false;
                }
            }

            if (valid) {
                // Firebase bağlandığında bu kısım işlenecek
                // Şimdilik başarı mesajı göster
                var successMsg = document.getElementById('form-success');
                if (successMsg) {
                    successMsg.style.display = 'block';
                    contactForm.reset();
                }
            }
        });

        // Yazarken hata mesajını kaldır
        contactForm.querySelectorAll('input, select, textarea').forEach(function (field) {
            field.addEventListener('input', function () {
                var group = field.closest('.form-group');
                if (group) group.classList.remove('has-error');
            });
        });
    }

})();
