// دالة للتأكد من تحميل جميع المكونات
function ensureComponentsLoaded() {
    const components = ['custom-navbar', 'custom-footer', 'custom-movie-card', 'custom-actor-card'];
    
    return new Promise((resolve) => {
        let attempts = 0;
        const maxAttempts = 50; // 5 ثواني كحد أقصى
        
        const checkComponents = () => {
            attempts++;
            const allLoaded = components.every(component => 
                customElements.get(component.toLowerCase())
            );
            
            if (allLoaded || attempts >= maxAttempts) {
                console.log('المكونات المحملة:', components.filter(comp => customElements.get(comp.toLowerCase())));
                resolve();
            } else {
                setTimeout(checkComponents, 100);
            }
        };
        
        checkComponents();
    });
}

// دالة لتهيئة الصفحة الرئيسية
function initHomePage() {
    console.log('بدء تهيئة الصفحة الرئيسية');
    
    try {
        // إعداد event listeners لبطاقات الأفلام
        setupMovieCards();
        
        // إعداد البحث
        setupSearch();
        
        // إعداد التمرير السلس
        setupSmoothScroll();
        
        // تحميل الأفلام من localStorage إذا وجدت
        loadMoviesFromStorage();
        
        // إعداد تصفية الأقسام
        setupCategoryFilter();
        
        // إعداد الرسوم المتحركة
        setupAnimations();
        
        // تحديث الأيقونات
        feather.replace();
        
        console.log('تم تهيئة الصفحة الرئيسية بنجاح');
    } catch (error) {
        console.error('خطأ في تهيئة الصفحة الرئيسية:', error);
    }
}

// إعداد بطاقات الأفلام
function setupMovieCards() {
    console.log('جاري إعداد بطاقات الأفلام...');
    
    // Event delegation for movie cards
    document.addEventListener('click', function(e) {
        const movieCard = e.target.closest('custom-movie-card');
        if (movieCard) {
            // يتم التعامل مع النقر في المكون نفسه
            return;
        }
        
        // للفيلم المميز
        if (e.target.closest('.featured button') && e.target.closest('.featured button').textContent.includes('شاهد الآن')) {
            e.preventDefault();
            const featuredMovie = {
                id: "11",
                title: "الرحلة",
                image: "https://via.placeholder.com/400x600/1e293b/ffffff?text=الرحلة",
                rating: "8.7",
                year: "2023",
                category: "دراما",
                description: "فيلم درامي يحكي قصة شاب مصري يقرر السفر إلى أوروبا بحثاً عن حياة أفضل، لكنه يواجه العديد من التحديات والصعوبات في رحلته.",
                director: "محمد النجار",
                language: "العربية",
                country: "مصر",
                quality: "FHD 1080p",
                duration: "2h 15m",
                cast: ["أحمد عز", "منى زكي", "خالد الصاوي"],
                videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            };
            
            localStorage.setItem('currentMovie', JSON.stringify(featuredMovie));
            window.location.href = 'movie-details.html';
        }
    });
}

// إعداد البحث
function setupSearch() {
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            if (searchTerm.length > 2) {
                performSearch(searchTerm);
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(e.target.value);
            }
        });
    }
}

// تنفيذ البحث
function performSearch(searchTerm) {
    const allMovies = JSON.parse(localStorage.getItem('movies')) || [];
    const defaultMovies = [
        {
            id: "1",
            title: "الخروج من القاهرة",
            image: "https://c.top4top.io/p_3618clc1s1.jpg",
            rating: "8.2",
            year: "2023",
            category: "دراما"
        },
        {
            id: "2",
            title: "الممر",
            image: "https://via.placeholder.com/320x480/334155/ffffff?text=الممر",
            rating: "7.9",
            year: "2022",
            category: "أكشن"
        },
        {
            id: "3", 
            title: "يوم الدين",
            image: "https://via.placeholder.com/320x480/334155/ffffff?text=يوم+الدين",
            rating: "8.5",
            year: "2023",
            category: "دراما"
        }
    ];
    
    const allAvailableMovies = [...allMovies, ...defaultMovies];
    
    const results = allAvailableMovies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    showSearchResults(results, searchTerm);
}

// عرض نتائج البحث
function showSearchResults(results, searchTerm) {
    // إزالة نتائج البحث السابقة
    const existingResults = document.getElementById('searchResults');
    if (existingResults) {
        existingResults.remove();
    }
    
    if (results.length === 0) {
        // لا توجد نتائج
        const noResults = document.createElement('div');
        noResults.id = 'searchResults';
        noResults.className = 'absolute top-full left-0 right-0 bg-gray-800 border border-gray-700 rounded-lg mt-2 p-4 z-50';
        noResults.innerHTML = `
            <p class="text-gray-400 text-center">لا توجد نتائج لـ "${searchTerm}"</p>
        `;
        
        const searchContainer = document.querySelector('.relative');
        if (searchContainer) {
            searchContainer.appendChild(noResults);
        }
        return;
    }
    
    // عرض النتائج
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'searchResults';
    resultsContainer.className = 'absolute top-full left-0 right-0 bg-gray-800 border border-gray-700 rounded-lg mt-2 max-h-80 overflow-y-auto z-50';
    
    resultsContainer.innerHTML = `
        <div class="p-2">
            <p class="text-gray-400 text-sm mb-2">نتائج البحث عن "${searchTerm}"</p>
            ${results.map(movie => `
                <div class="flex items-center gap-3 p-2 hover:bg-gray-700 rounded cursor-pointer transition duration-200 search-result-item"
                     data-movie-id="${movie.id}">
                    <img src="${movie.image}" alt="${movie.title}" 
                         class="w-12 h-16 object-cover rounded"
                         onerror="this.src='https://via.placeholder.com/48x64/334155/ffffff?text=صورة'">
                    <div class="flex-1">
                        <h4 class="text-white font-medium text-sm">${movie.title}</h4>
                        <div class="flex gap-2 text-xs text-gray-400">
                            <span>${movie.year}</span>
                            <span>${movie.category}</span>
                            <span class="text-red-500">⭐ ${movie.rating}</span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    const searchContainer = document.querySelector('.relative');
    if (searchContainer) {
        searchContainer.appendChild(resultsContainer);
        
        // إضافة event listeners لنتائج البحث
        resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', function() {
                const movieId = this.getAttribute('data-movie-id');
                const movie = results.find(m => m.id == movieId);
                if (movie) {
                    navigateToMovieDetails(
                        movie.id,
                        movie.title,
                        movie.image,
                        movie.rating,
                        movie.year,
                        movie.category
                    );
                }
            });
        });
        
        // إخفاء نتائج البحث عند النقر خارجها
        document.addEventListener('click', function hideResults(e) {
            if (!resultsContainer.contains(e.target) && !e.target.closest('input[type="text"]')) {
                resultsContainer.remove();
                document.removeEventListener('click', hideResults);
            }
        });
    }
}

// إعداد التمرير السلس
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// تحميل الأفلام من localStorage
function loadMoviesFromStorage() {
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    if (storedMovies && storedMovies.length > 0) {
        console.log('تم تحميل الأفلام من التخزين المحلي:', storedMovies.length);
    }
}

// دالة للانتقال إلى تفاصيل الفيلم
function navigateToMovieDetails(movieId, title, image, rating, year, category) {
    const movieData = {
        id: movieId,
        title: title,
        image: image,
        rating: rating,
        year: year,
        category: category,
        description: getMovieDescription(title),
        director: getMovieDirector(title),
        language: "العربية",
        country: "مصر",
        quality: "FHD 1080p",
        duration: "2h 18m",
        cast: getMovieCast(title),
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    };
    
    localStorage.setItem('currentMovie', JSON.stringify(movieData));
    window.location.href = 'movie-details.html';
}

// دوال مساعدة للحصول على بيانات الأفلام
function getMovieDescription(title) {
    const descriptions = {
        "الخروج من القاهرة": "فيلم درامي مثير يحكي قصة شاب مصري يحلم بالسفر والهجرة، لكنه يواجه معضلات أخلاقية وتحديات كبيرة تختبر قيمه ومبادئه. رحلة من القاهرة إلى عالم جديد مليء بالمفاجآت.",
        "الممر": "فيلم أكشن تاريخي يستعرض بطولات الجيش المصري في حرب أكتوبر المجيدة من خلال قصة مجموعة من الجنود الأبطال الذين دافعوا عن أراضي الوطن.",
        "يوم الدين": "فيلم درامي عميق يتناول قضايا اجتماعية مهمة من خلال قصة عائلة تواجه تحديات الحياة في مجتمع متغير، مع التركيز على القيم والمبادئ.",
        "ليلة هنا وسرور": "فيلم كوميدي خفيف الظل يحكي قصة شابين يواجهان مواقف مضحكة في رحلة البحث عن الحب والسعادة في القاهرة.",
        "الكنز": "فيلم مغامرات مشوق يتبع رحلة مجموعة من الأصدقاء في البحث عن كنز مفقود، يواجهون خلالها تحديات وخطورة.",
        "الرحلة": "فيلم درامي يحكي قصة شاب مصري يقرر السفر إلى أوروبا بحثاً عن حياة أفضل، لكنه يواجه العديد من التحديات والصعوبات في رحلته.",
        "الاختيار 3": "مسلسل تاريخي ضخم يروي قصة حرب أكتوبر المجيدة من خلال عيون الجنود والضباط الذين شاركوا في هذه الملحمة التاريخية.",
        "الملك": "مسلسل درامي تاريخي يستعرض فترة مهمة من تاريخ مصر من خلال قصة حاكم عادل يسعى لتحقيق العدالة والمساواة لشعبه.",
        "العميل 1001": "مسلسل تشويق وإثارة يدور حول عميل مخابرات يواجه مهمات خطيرة وأسرار عميقة تهدد الأمن القومي.",
        "حدود الشر": "مسلسل درامي اجتماعي يتناول قضايا الشر والخير في المجتمع من خلال شخصيات متنوعة ومواقف إنسانية عميقة.",
        "ليالي أوجيني": "مسلسل رومانسي درامي يحكي قصة حب تتشابك فيها العلاقات والمشاعر في إطار من الأحداث المشوقة."
    };
    
    return descriptions[title] || "فيلم رائع مليء بالأحداث المشوقة والأداء التمثيلي المتميز الذي سيأخذكم في رحلة سينمائية لا تنسى.";
}

function getMovieDirector(title) {
    const directors = {
        "الخروج من القاهرة": "محمد ياسين",
        "الممر": "شريف عرفة",
        "يوم الدين": "مريم أبو عوف",
        "ليلة هنا وسرور": "أحمد عبد الله",
        "الكنز": "خالد الحسيني",
        "الرحلة": "خالد مرعي",
        "الاختيار 3": "بيتر ميمي",
        "الملك": "محمد سامي",
        "العميل 1001": "نادر جلال",
        "حدود الشر": "أحمد خالد موسى",
        "ليالي أوجيني": "سامح عبد العزيز"
    };
    
    return directors[title] || "مخرج معروف";
}

function getMovieCast(title) {
    const casts = {
        "الخروج من القاهرة": ["أحمد عز", "منى زكي", "خالد الصاوي", "هند صبري", "عمرو يوسف"],
        "الممر": ["أحمد عز", "أحمد الفيشاوي", "محمد ممدوح", "أمير كرارة"],
        "يوم الدين": ["كريم عبد العزيز", "نيللي كريم", "محمد ممدوح", "صلاح عبدالله"],
        "ليلة هنا وسرور": ["محمد هنيدي", "أحمد حلمي", "منى زكي", "هاني رمزي"],
        "الكنز": ["تيم حسن", "باسم ياخور", "نادين نجيم", "نيكول سابا"],
        "الرحلة": ["تيم حسن", "سوزان نجم الدين", "عباس النوري", "سلاف فواخرجي"],
        "الاختيار 3": ["كرم حسن", "محمد ممدوح", "أحمد عز", "محمود عبد المغني"],
        "الملك": ["أيمن زيدان", "سلاف فواخرجي", "قصي خولي", "باسل خياط"],
        "العميل 1001": ["أسعد فضة", "تيم حسن", "نادين نسيب نجيم", "أيمن زيدان"],
        "حدود الشر": ["فيفي عبده", "محمود عبد المغني", "صلاح عبدالله", "سهر الصايغ"],
        "ليالي أوجيني": ["تيم حسن", "نادين نسيب نجيم", "أيمن زيدان", "سلاف فواخرجي"]
    };
    
    return casts[title] || ["ممثل رئيسي", "ممثلة رئيسية", "ممثل مساعد", "ممثلة مساعدة"];
}

// إعداد الرسوم المتحركة للعناصر
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // مراقبة العناصر للرسوم المتحركة
    document.querySelectorAll('.movie-card, .category-card, .featured').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// إدارة حالة التحميل
function showLoading() {
    const loading = document.createElement('div');
    loading.id = 'globalLoading';
    loading.className = 'fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50';
    loading.innerHTML = `
        <div class="text-center">
            <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p class="text-white">جاري التحميل...</p>
        </div>
    `;
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.getElementById('globalLoading');
    if (loading) {
        loading.remove();
    }
}

// إعداد تصفية الأقسام
function setupCategoryFilter() {
    const categoryCards = document.querySelectorAll('.category-card[data-category]');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            // إزالة النشط من جميع الأقسام
            categoryCards.forEach(c => {
                c.classList.remove('active-category', 'bg-red-600', 'text-white');
                c.classList.add('bg-gray-800', 'text-gray-300');
            });
            
            // إضافة النشط للقسم المحدد
            this.classList.add('active-category', 'bg-red-600', 'text-white');
            this.classList.remove('bg-gray-800', 'text-gray-300');
            
            // تصفية المحتوى
            const category = this.getAttribute('data-category');
            filterContentByCategory(category);
            
            // التمرير إلى قسم الأفلام
            document.getElementById('movies').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// دالة تصفية المحتوى حسب القسم
function filterContentByCategory(category) {
    const allMovieCards = document.querySelectorAll('custom-movie-card');
    let hasVisibleContent = false;

    allMovieCards.forEach(card => {
        const cardCategory = card.getAttribute('category');
        const shouldShow = category === 'all' || cardCategory === category;
        
        if (shouldShow) {
            card.style.display = 'block';
            card.style.opacity = '1';
            hasVisibleContent = true;
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
    
    // عرض رسالة إذا لم يكن هناك محتوى
    showNoContentMessage(hasVisibleContent, category);
}

// عرض رسالة عدم وجود محتوى
function showNoContentMessage(hasContent, category) {
    // إزالة الرسالة السابقة إذا وجدت
    const existingMessage = document.getElementById('no-content-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    if (!hasContent && category !== 'all') {
        const moviesSection = document.getElementById('movies');
        const message = document.createElement('div');
        message.id = 'no-content-message';
        message.className = 'col-span-full text-center py-12';
        message.innerHTML = `
            <div class="bg-gray-800 rounded-2xl p-8 max-w-md mx-auto">
                <i data-feather="film" class="w-16 h-16 mx-auto mb-4 text-gray-500"></i>
                <h3 class="text-xl font-bold text-white mb-2">لا يوجد محتوى</h3>
                <p class="text-gray-400">لا توجد أفلام أو مسلسلات في قسم "${category}" حالياً</p>
                <button onclick="resetCategoryFilter()" class="mt-4 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition duration-300">
                    عرض الكل
                </button>
            </div>
        `;
        
        moviesSection.appendChild(message);
        feather.replace();
    }
}

// إعادة تعيين التصفية
function resetCategoryFilter() {
    const categoryCards = document.querySelectorAll('.category-card[data-category]');
    categoryCards.forEach(card => {
        card.classList.remove('active-category', 'bg-red-600', 'text-white');
        card.classList.add('bg-gray-800', 'text-gray-300');
    });
    
    // تعيين قسم "الكل" كنشط
    const allCategory = document.querySelector('.category-card[data-category="all"]');
    if (allCategory) {
        allCategory.classList.add('active-category', 'bg-red-600', 'text-white');
        allCategory.classList.remove('bg-gray-800', 'text-gray-300');
    }
    
    filterContentByCategory('all');
    
    const message = document.getElementById('no-content-message');
    if (message) {
        message.remove();
    }
}

// معالجة الأخطاء العالمية
window.addEventListener('error', function(e) {
    console.error('حدث خطأ:', e.error);
    hideLoading(); // إخفاء التحميل في حالة خطأ
});

// التهيئة الرئيسية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', async function() {
    console.log('بدء تحميل الصفحة...');
    
    try {
        showLoading();
        
        // الانتظار حتى تحميل جميع المكونات (بحد أقصى 5 ثواني)
        await Promise.race([
            ensureComponentsLoaded(),
            new Promise(resolve => setTimeout(resolve, 5000)) // timeout بعد 5 ثواني
        ]);
        
        console.log('المكونات جاهزة، بدء التهيئة...');
        
        // تهيئة الصفحة الرئيسية
        if (document.querySelector('custom-movie-card') || document.querySelector('.category-card')) {
            initHomePage();
        } else {
            console.log('لا توجد عناصر للتهيئة');
        }
        
        // إخفاء التحميل بعد تهيئة كل شيء
        setTimeout(hideLoading, 500);
        
    } catch (error) {
        console.error('خطأ في التهيئة:', error);
        hideLoading(); // تأكد من إخفاء التحميل في حالة الخطأ
    }
});

// جعل الدوال متاحة globally للاستخدام في HTML
window.navigateToMovieDetails = navigateToMovieDetails;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.resetCategoryFilter = resetCategoryFilter;

// fallback في حالة فشل التحميل
setTimeout(() => {
    if (document.getElementById('globalLoading')) {
        console.log('تم تجاوز timeout، إخفاء التحميل');
        hideLoading();
    }
}, 10000); // 10 ثواني كحد أقصى