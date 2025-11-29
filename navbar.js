class Navbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <nav class="bg-gray-800 shadow-lg sticky top-0 z-50">
                <div class="container mx-auto px-4">
                    <div class="flex justify-between items-center py-4">
                        <!-- Logo -->
                        <div class="flex items-center">
                            <a href="index.html" class="text-2xl font-bold text-white flex items-center gap-2">
                                🎬 سينما العرب
                            </a>
                        </div>

                        <!-- Navigation Links - Desktop -->
                        <div class="hidden md:flex items-center space-x-6 space-x-reverse">
                            <a href="index.html" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                                🏠 الرئيسية
                            </a>
                            <a href="#movies" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                                📽️ الأفلام
                            </a>
                            <a href="#series" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                                📺 المسلسلات
                            </a>
                            <a href="admin.html" class="text-green-500 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                                ⚙️ لوحة التحكم
                            </a>
                        </div>

                        <!-- Search and User -->
                        <div class="flex items-center space-x-4 space-x-reverse">
                            <div class="relative hidden md:block">
                                <input type="text" placeholder="ابحث في الأفلام..." 
                                       class="bg-gray-700 text-white px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-64 transition duration-300">
                                <i data-feather="search" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"></i>
                            </div>
                            
                            <div class="flex items-center space-x-3 space-x-reverse">
                                <a href="#" class="text-gray-300 hover:text-white transition duration-300">
                                    <i data-feather="heart" class="w-5 h-5"></i>
                                </a>
                                <button class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white text-sm font-medium transition duration-300 flex items-center gap-2">
                                    <i data-feather="user" class="w-4 h-4"></i>
                                    تسجيل الدخول
                                </button>
                            </div>
                        </div>

                        <!-- Mobile menu button -->
                        <div class="md:hidden">
                            <button id="mobile-menu-button" class="text-gray-300 hover:text-white focus:outline-none transition duration-300">
                                <i data-feather="menu" class="w-6 h-6"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Mobile menu -->
                    <div id="mobile-menu" class="hidden md:hidden pb-4 border-t border-gray-700 pt-4">
                        <div class="space-y-2">
                            <a href="index.html" class="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300">🏠 الرئيسية</a>
                            <a href="#movies" class="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300">📽️ الأفلام</a>
                            <a href="#series" class="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300">📺 المسلسلات</a>
                            <a href="admin.html" class="block text-green-500 hover:text-green-400 px-3 py-2 rounded-md text-base font-medium transition duration-300">⚙️ لوحة التحكم</a>
                        </div>
                        
                        <!-- Mobile Search -->
                        <div class="mt-4 px-3">
                            <input type="text" placeholder="ابحث..." 
                                   class="bg-gray-700 text-white px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500">
                        </div>
                    </div>
                </div>
            </nav>
        `;

        this.setupMobileMenu();
        feather.replace();
    }

    setupMobileMenu() {
        const mobileMenuButton = this.querySelector('#mobile-menu-button');
        const mobileMenu = this.querySelector('#mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                const icon = mobileMenuButton.querySelector('i');
                if (mobileMenu.classList.contains('hidden')) {
                    icon.setAttribute('data-feather', 'menu');
                } else {
                    icon.setAttribute('data-feather', 'x');
                }
                feather.replace();
            });
        }
    }
}

customElements.define('custom-navbar', Navbar);