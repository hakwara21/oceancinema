class VideoPlayer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const videoUrl = this.getAttribute('video-url') || '';
        const posterUrl = this.getAttribute('poster-url') || '';
        
        // جعل حجم المشغل 75% ومتجاوب مع الشاشة
        const width = this.getAttribute('width') || '75%';
        const height = this.getAttribute('height') || 'auto';
        const maxHeight = this.getAttribute('max-height') || '70vh';
        const aspectRatio = this.getAttribute('aspect-ratio') || '16/9';

        this.innerHTML = `
            <div class="video-player-container bg-black rounded-xl overflow-hidden relative shadow-2xl mx-auto" 
                 style="width: ${width}; height: ${height}; max-height: ${maxHeight}; aspect-ratio: ${aspectRatio};">
                
                <video 
                    id="videoPlayer"
                    class="w-full h-full object-contain"
                    controls
                    playsinline
                    poster="${posterUrl}"
                    onerror="this.closest('custom-video-player').handleVideoError()"
                >
                    <source src="${videoUrl}" type="video/mp4">
                    <source src="${videoUrl}" type="video/webm">
                    <source src="${videoUrl}" type="video/ogg">
                    متصفحك لا يدعم تشغيل الفيديو.
                </video>
                
                <!-- Loading Spinner -->
                <div id="loadingSpinner" class="absolute inset-0 flex items-center justify-center bg-black/50 hidden">
                    <div class="flex flex-col items-center">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-2"></div>
                        <p class="text-white text-sm">جاري التحميل...</p>
                    </div>
                </div>
                
                <!-- Error Message -->
                <div id="errorMessage" class="absolute inset-0 flex items-center justify-center bg-black/80 hidden">
                    <div class="text-white text-center p-6">
                        <i data-feather="alert-triangle" class="w-16 h-16 mx-auto mb-4 text-red-500"></i>
                        <h4 class="text-xl font-bold mb-2">عذراً!</h4>
                        <p class="text-gray-300 mb-4">حدث خطأ في تحميل الفيديو</p>
                        <button onclick="location.reload()" class="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition duration-300">
                            إعادة المحاولة
                        </button>
                    </div>
                </div>
            </div>
        `;

        feather.replace();
    }

    handleVideoError() {
        const errorMessage = this.querySelector('#errorMessage');
        const loadingSpinner = this.querySelector('#loadingSpinner');
        const video = this.querySelector('#videoPlayer');
        
        loadingSpinner.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        video.style.display = 'none';
    }
}

customElements.define('custom-video-player', VideoPlayer);