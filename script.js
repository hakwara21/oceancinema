// ✅ تهيئة التطبيق الرئيسي
class CinemaApp {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeFeatherIcons();
            this.initializeSearch();
            this.initializeParallax();
            this.initializeVideoPlayer();
            this.initializeAdminProtection();
            this.initializeSmoothScroll();
            this.initializeMovieInteractions();
        });
    }

    // ✅ تهيئة Feather Icons
    initializeFeatherIcons() {
        if (window.feather) {
            feather.replace();
            
            // إعادة تهيئة الأيقونات كل ثانيتين (للمحتوى الديناميكي)
            setInterval(() => {
                feather.replace();
            }, 2000);
        }
    }

    // ✅ تهيئة وظيفة البحث
    initializeSearch() {
        // البحث سيعمل من خلال الـ navbar component
        // هذا كود احتياطي للبحث العام
        document.addEventListener('keypress', (e) => {
            if (e.key === '/' && e.target.tagName !== 'INPUT') {
                e.preventDefault();
                this.focusSearchInput();
            }
        });
    }

    focusSearchInput() {
        // محاولة الوصول لحقل البحث في الـ navbar
        const navbar = document.querySelector('custom-navbar');
        if (navbar && navbar.shadowRoot) {
            const searchInput = navbar.shadowRoot.querySelector('.search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }
    }

    // ✅ تأثير Parallax للقسم الرئيسي
    initializeParallax() {
        const hero = document.querySelector('.hero');
        if (hero) {
            // إزالة تأثير Parallax على الجوال
            if (window.innerWidth > 768) {
                window.addEventListener('scroll', () => {
                    const scrollPosition = window.pageYOffset;
                    hero.style.transform = `translateY(${scrollPosition * 0.3}px)`;
                });
            }
        }
    }

    // ✅ تهيئة مشغل الفيديو
    initializeVideoPlayer() {
        // معالجة أزرار المشاهدة في الصفحة الرئيسية
        const watchButtons = document.querySelectorAll('[href="#"], .watch-now-btn');
        watchButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleWatchButton(button);
            });
        });

        // معالجة أزرار المشاهدة في الأفلام المميزة
        const featuredWatchBtn = document.querySelector('.featured .bg-red-600');
        if (featuredWatchBtn) {
            featuredWatchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.playFeaturedMovie();
            });
        }
    }

    handleWatchButton(button) {
        const movieCard = button.closest('.movie-card, custom-movie-card');
        if (movieCard) {
            const movieId = movieCard.getAttribute('data-id') || 
                           movieCard.querySelector('custom-movie-card')?.getAttribute('data-id');
            
            if (movieId) {
                // الانتقال لصفحة التفاصيل
                window.location.href = `movie-details.html?id=${movieId}`;
            } else {
                this.showQuickPreview();
            }
        } else {
            this.showQuickPreview();
        }
    }

    playFeaturedMovie() {
        const videoPlayer = document.querySelector('video-player');
        if (videoPlayer) {
            // استخدام فيديو تجريبي
            const sampleVideo = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
            
            // استخدام الدالة الصحيحة حسب المكون
            if (typeof videoPlayer.setVideo === 'function') {
                videoPlayer.setVideo(sampleVideo, '', 'الفيلم المميز');
            } else if (typeof videoPlayer.openPlayer === 'function') {
                videoPlayer.openPlayer(sampleVideo, 'الفيلم المميز');
            } else {
                // fallback: فتح في نافذة جديدة
                window.open(sampleVideo, '_blank');
            }
        } else {
            this.showQuickPreview();
        }
    }

    showQuickPreview() {
        // عرض نافذة معاينة سريعة
        alert('🚀 جاري تحميل الفيلم...\n\nفي التطبيق الكامل، سيشغل هذا الفيلم مباشرة.');
    }

    // ✅ حماية صفحة الإدارة
    initializeAdminProtection() {
        if (window.location.href.includes('admin.html')) {
            const password = prompt('🔐 الرجاء إدخال كلمة مرور المشرف:');
            if (password !== 'admin123') { // في التطبيق الحقيقي، استخدم مصادقة آمنة
                alert('❌ كلمة المرور غير صحيحة');
                window.location.href = 'index.html';
                return;
            }
            
            // إذا كانت كلمة المرور صحيحة، تهيئة لوحة التحكم
            this.initializeAdminPanel();
        }
    }

    initializeAdminPanel() {
        console.log('✅ لوحة التحكم جاهزة');
        // هنا يمكنك إضافة وظائف إدارة المحتوى
    }

    // ✅ التمرير السلس
    initializeSmoothScroll() {
        // معالجة الروابط التي تبدأ بـ #
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }

    // ✅ تفاعلات الأفلام
    initializeMovieInteractions() {
        // إضافة تأثيرات hover للأفلام
        this.initializeMovieHoverEffects();
        
        // معالجة النقر على بطاقات الأفلام
        this.initializeMovieCardClicks();
    }

    initializeMovieHoverEffects() {
        // التأثيرات معالجة في الـ CSS للـ movie-card component
        // هذا كود إضافي لأي تأثيرات إضافية
        document.addEventListener('mouseover', (e) => {
            const movieCard = e.target.closest('.movie-card, custom-movie-card');
            if (movieCard && !movieCard.classList.contains('hovering')) {
                movieCard.classList.add('hovering');
            }
        });

        document.addEventListener('mouseout', (e) => {
            const movieCard = e.target.closest('.movie-card, custom-movie-card');
            if (movieCard) {
                movieCard.classList.remove('hovering');
            }
        });
    }

    initializeMovieCardClicks() {
        // النقر على بطاقات الأفلام معالجة في الـ movie-card component
        // هذا كود احتياطي
        document.addEventListener('click', (e) => {
            const movieCard = e.target.closest('.movie-card');
            if (movieCard && !e.target.closest('a, button')) {
                const movieId = movieCard.getAttribute('data-id');
                if (movieId) {
                    window.location.href = `movie-details.html?id=${movieId}`;
                }
            }
        });
    }

    // ✅ وظائف مساعدة
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            z-index: 10000;
            transition: all 0.3s ease;
            background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // ✅ إدارة المستخدم
    setUser(userData) {
        this.currentUser = userData;
        this.updateUIForUser();
    }

    updateUIForUser() {
        // تحديث الـ UI بناءً على حالة المستخدم
        const loginBtn = document.querySelector('.login-btn');
        if (loginBtn && this.currentUser) {
            loginBtn.textContent = `مرحباً، ${this.currentUser.name}`;
        }
    }

    // ✅ البحث المتقدم
    searchContent(query) {
        console.log('البحث عن:', query);
        // في التطبيق الحقيقي، هنا ستقوم بعملية البحث في قاعدة البيانات
        this.showNotification(`جاري البحث عن: "${query}"`, 'info');
        
        // محاكاة نتائج البحث
        setTimeout(() => {
            this.showNotification(`تم العثور على 5 نتائج لـ "${query}"`, 'success');
        }, 1000);
    }
}

// ✅ تهيئة التطبيق
const cinemaApp = new CinemaApp();

// ✅ جعل التطبيق متاحاً globally للاستخدام من المكونات الأخرى
window.cinemaApp = cinemaApp;

// ✅ تصدير للتطوير المستقبلي
export default cinemaApp;