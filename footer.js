class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <footer class="bg-gray-800 text-white mt-20">
                <div class="container mx-auto px-4 py-12">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <!-- Logo and Description -->
                        <div class="col-span-1 md:col-span-2">
                            <h3 class="text-2xl font-bold mb-4 flex items-center gap-2">
                                🎬 سينما العرب
                            </h3>
                            <p class="text-gray-400 mb-6 leading-relaxed">
                                منصة متخصصة لعشاق السينما العربية، نقدم لك أحدث الأفلام والمسلسلات العربية بجودة عالية وواجهة مستخدم سهلة. استمتع بتجربة مشاهدة فريدة مع محتوى عربي مميز.
                            </p>
                            <div class="flex space-x-4 space-x-reverse">
                                <a href="#" class="text-gray-400 hover:text-white transition duration-300 bg-gray-700 p-2 rounded-lg">
                                    <i data-feather="facebook" class="w-5 h-5"></i>
                                </a>
                                <a href="#" class="text-gray-400 hover:text-white transition duration-300 bg-gray-700 p-2 rounded-lg">
                                    <i data-feather="twitter" class="w-5 h-5"></i>
                                </a>
                                <a href="#" class="text-gray-400 hover:text-white transition duration-300 bg-gray-700 p-2 rounded-lg">
                                    <i data-feather="instagram" class="w-5 h-5"></i>
                                </a>
                                <a href="#" class="text-gray-400 hover:text-white transition duration-300 bg-gray-700 p-2 rounded-lg">
                                    <i data-feather="youtube" class="w-5 h-5"></i>
                                </a>
                            </div>
                        </div>

                        <!-- Quick Links -->
                        <div>
                            <h4 class="text-lg font-bold mb-6 text-white">روابط سريعة</h4>
                            <ul class="space-y-3">
                                <li><a href="index.html" class="text-gray-400 hover:text-white transition duration-300 flex items-center gap-2"><i data-feather="home" class="w-4 h-4"></i> الرئيسية</a></li>
                                <li><a href="#movies" class="text-gray-400 hover:text-white transition duration-300 flex items-center gap-2"><i data-feather="film" class="w-4 h-4"></i> الأفلام</a></li>
                                <li><a href="#series" class="text-gray-400 hover:text-white transition duration-300 flex items-center gap-2"><i data-feather="tv" class="w-4 h-4"></i> المسلسلات</a></li>
                                <li><a href="#" class="text-gray-400 hover:text-white transition duration-300 flex items-center gap-2"><i data-feather="heart" class="w-4 h-4"></i> المفضلة</a></li>
                                <li><a href="#" class="text-gray-400 hover:text-white transition duration-300 flex items-center gap-2"><i data-feather="mail" class="w-4 h-4"></i> اتصل بنا</a></li>
                            </ul>
                        </div>

                        <!-- Categories -->
                        <div>
                            <h4 class="text-lg font-bold mb-6 text-white">التصنيفات</h4>
                            <ul class="space-y-3">
                                <li><a href="#" class="text-gray-400 hover:text-white transition duration-300 flex items-center gap-2"><i data-feather="award" class="w-4 h-4"></i> أكشن</a></li>
                                <li><a href="#" class="text-gray-400 hover:text-white transition duration-300 flex items-center gap-2"><i data-feather="heart" class="w-4 h-4"></i> دراما</a></li>
                                <li><a href="#" class="text-gray-400 hover:text-white transition duration-300 flex items-center gap-2"><i data-feather="smile" class="w-4 h-4"></i> كوميدي</a></li>
                                <li><a href="#" class="text-gray-400 hover:text-white transition duration-300 flex items-center gap-2"><i data-feather="users" class="w-4 h-4"></i> رومانسي</a></li>
                                <li><a href="#" class="text-gray-400 hover:text-white transition duration-300 flex items-center gap-2"><i data-feather="zap" class="w-4 h-4"></i> تشويق</a></li>
                            </ul>
                        </div>
                    </div>

                    <!-- Bottom Bar -->
                    <div class="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p class="text-gray-400 text-sm flex items-center gap-2">
                            <i data-feather="copyright" class="w-4 h-4"></i>
                            2024 سينما العرب. جميع الحقوق محفوظة.
                        </p>
                        <div class="flex space-x-6 space-x-reverse mt-4 md:mt-0">
                            <a href="#" class="text-gray-400 hover:text-white text-sm transition duration-300">شروط الاستخدام</a>
                            <a href="#" class="text-gray-400 hover:text-white text-sm transition duration-300">سياسة الخصوصية</a>
                            <a href="#" class="text-gray-400 hover:text-white text-sm transition duration-300">الإبلاغ عن مشكلة</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;

        feather.replace();
    }
}

customElements.define('custom-footer', Footer);