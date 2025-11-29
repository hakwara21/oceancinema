class MovieCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const id = this.getAttribute('data-id') || '1';
        const title = this.getAttribute('title') || 'فيلم بدون عنوان';
        const image = this.getAttribute('image') || 'https://via.placeholder.com/320x240/334155/ffffff?text=No+Image';
        const rating = this.getAttribute('rating') || '0.0';
        const year = this.getAttribute('year') || '2023';
        const category = this.getAttribute('category') || this.getDefaultCategory(title); // استخدام دالة للحصول على التصنيف الافتراضي

        this.innerHTML = `
            <div class="movie-card bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg" data-category="${category}">
                <div class="relative">
                    <img src="${image}" alt="${title}" class="w-full h-48 object-cover" 
                         onerror="this.src='https://via.placeholder.com/320x240/334155/ffffff?text=خطأ+في+الصورة'">
                    <div class="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                        ⭐ ${rating}
                    </div>
                    <div class="absolute top-2 right-2 bg-gray-900 bg-opacity-80 text-white px-2 py-1 rounded text-sm">
                        ${year}
                    </div>
                    <div class="absolute bottom-2 left-2 bg-gray-900 bg-opacity-70 text-white px-2 py-1 rounded text-xs category-badge">
                        ${category}
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="font-bold text-white mb-2 text-lg line-clamp-2">${title}</h3>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-400 text-sm category-text">${category}</span>
                        <button class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition">
                            تفاصيل
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.addEventListener('click', () => {
            this.navigateToMovieDetails(id, title, image, rating, year, category);
        });
    }

    // دالة للحصول على التصنيف الافتراضي بناءً على عنوان الفيلم
    getDefaultCategory(title) {
        const categoryMap = {
            "الممر": "أكشن",
            "الخروج من القاهرة": "دراما", 
            "يوم الدين": "دراما",
            "ليلة هنا وسرور": "كوميدي",
            "الكنز": "مغامرات",
            "الاختيار 3": "تاريخي",
            "الملك": "دراما",
            "العميل 1001": "تشويق",
            "حدود الشر": "دراما",
            "ليالي أوجيني": "رومانسي",
            "الرحلة": "دراما"
        };
        
        return categoryMap[title] || "دراما";
    }

    navigateToMovieDetails(movieId, title, image, rating, year, category) {
        const movieData = {
            id: movieId,
            title: title,
            image: image,
            rating: rating,
            year: year,
            category: category,
            description: this.getMovieDescription(title),
            director: this.getMovieDirector(title),
            language: "العربية",
            country: "مصر",
            quality: "FHD 1080p",
            duration: "2h 18m",
            cast: this.getMovieCast(title),
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        };
        
        localStorage.setItem('currentMovie', JSON.stringify(movieData));
        window.location.href = 'movie-details.html';
    }

    getMovieDescription(title) {
        const descriptions = {
            "الخروج من القاهرة": "فيلم درامي مثير يحكي قصة شاب مصري يحلم بالسفر والهجرة، لكنه يواجه معضلات أخلاقية وتحديات كبيرة تختبر قيمه ومبادئه. رحلة من القاهرة إلى عالم جديد مليء بالمفاجآت.",
            "الممر": "فيلم أكشن تاريخي يستعرض بطولات الجيش المصري في حرب أكتوبر المجيدة من خلال قصة مجموعة من الجنود الأبطال الذين دافعوا عن أراضي الوطن.",
            "يوم الدين": "فيلم درامي عميق يتناول قضايا اجتماعية مهمة من خلال قصة عائلة تواجه تحديات الحياة في مجتمع متغير، مع التركيز على القيم والمبادئ.",
            "ليلة هنا وسرور": "فيلم كوميدي خفيف الظل يحكي قصة شابين يواجهان مواقف مضحكة في رحلة البحث عن الحب والسعادة في القاهرة.",
            "الكنز": "فيلم مغامرات مشوق يتبع رحلة مجموعة من الأصدقاء في البحث عن كنز مفقود، يواجهون خلالها تحديات وخطورة.",
            "الاختيار 3": "مسلسل تاريخي ضخم يروي قصة حرب أكتوبر المجيدة من خلال عيون الجنود والضباط الذين شاركوا في هذه الملحمة التاريخية.",
            "الملك": "مسلسل درامي تاريخي يستعرض فترة مهمة من تاريخ مصر من خلال قصة حاكم عادل يسعى لتحقيق العدالة والمساواة لشعبه.",
            "العميل 1001": "مسلسل تشويق وإثارة يدور حول عميل مخابرات يواجه مهمات خطيرة وأسرار عميقة تهدد الأمن القومي.",
            "حدود الشر": "مسلسل درامي اجتماعي يتناول قضايا الشر والخير في المجتمع من خلال شخصيات متنوعة ومواقف إنسانية عميقة.",
            "ليالي أوجيني": "مسلسل رومانسي درامي يحكي قصة حب تتشابك فيها العلاقات والمشاعر في إطار من الأحداث المشوقة.",
            "الرحلة": "فيلم درامي يحكي قصة شاب مصري يقرر السفر إلى أوروبا بحثاً عن حياة أفضل، لكنه يواجه العديد من التحديات والصعوبات في رحلته."
        };
        
        return descriptions[title] || "فيلم رائع مليء بالأحداث المشوقة والأداء التمثيلي المتميز الذي سيأخذكم في رحلة سينمائية لا تنسى.";
    }

    getMovieDirector(title) {
        const directors = {
            "الخروج من القاهرة": "محمد ياسين",
            "الممر": "شريف عرفة",
            "يوم الدين": "مريم أبو عوف",
            "ليلة هنا وسرور": "أحمد عبد الله",
            "الكنز": "خالد الحسيني",
            "الاختيار 3": "بيتر ميمي",
            "الملك": "محمد سامي",
            "العميل 1001": "نادر جلال",
            "حدود الشر": "أحمد خالد موسى",
            "ليالي أوجيني": "سامح عبد العزيز",
            "الرحلة": "خالد مرعي"
        };
        
        return directors[title] || "مخرج معروف";
    }

    getMovieCast(title) {
        const casts = {
            "الخروج من القاهرة": ["أحمد عز", "منى زكي", "خالد الصاوي", "هند صبري", "عمرو يوسف"],
            "الممر": ["أحمد عز", "أحمد الفيشاوي", "محمد ممدوح", "أمير كرارة"],
            "يوم الدين": ["كريم عبد العزيز", "نيللي كريم", "محمد ممدوح", "صلاح عبدالله"],
            "ليلة هنا وسرور": ["محمد هنيدي", "أحمد حلمي", "منى زكي", "هاني رمزي"],
            "الكنز": ["تيم حسن", "باسم ياخور", "نادين نجيم", "نيكول سابا"],
            "الاختيار 3": ["كرم حسن", "محمد ممدوح", "أحمد عز", "محمود عبد المغني"],
            "الملك": ["أيمن زيدان", "سلاف فواخرجي", "قصي خولي", "باسل خياط"],
            "العميل 1001": ["أسعد فضة", "تيم حسن", "نادين نسيب نجيم", "أيمن زيدان"],
            "حدود الشر": ["فيفي عبده", "محمود عبد المغني", "صلاح عبدالله", "سهر الصايغ"],
            "ليالي أوجيني": ["تيم حسن", "نادين نسيب نجيم", "أيمن زيدان", "سلاف فواخرجي"],
            "الرحلة": ["تيم حسن", "سوزان نجم الدين", "عباس النوري", "سلاف فواخرجي"]
        };
        
        return casts[title] || ["ممثل رئيسي", "ممثلة رئيسية", "ممثل مساعد", "ممثلة مساعدة"];
    }
}

customElements.define('custom-movie-card', MovieCard);