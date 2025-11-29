class ActorCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const name = this.getAttribute('name') || 'ممثل';
        const image = this.getAttribute('image') || 'https://via.placeholder.com/150/334155/ffffff?text=No+Image';
        const role = this.getAttribute('role') || 'ممثل';

        this.innerHTML = `
            <div class="actor-card text-center group cursor-pointer">
                <div class="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-gray-600 group-hover:border-red-500 transition-all duration-300 transform group-hover:scale-105 shadow-lg">
                    <img src="${image}" alt="${name}" class="w-full h-full object-cover"
                         onerror="this.src='https://via.placeholder.com/150/334155/ffffff?text=صورة'">
                </div>
                <h4 class="font-bold text-white text-sm md:text-base mb-1 group-hover:text-red-400 transition-colors duration-300">${name}</h4>
                <p class="text-gray-400 text-xs md:text-sm group-hover:text-gray-300 transition-colors duration-300">${role}</p>
            </div>
        `;

        this.addEventListener('click', () => {
            this.showActorDetails(name, image, role);
        });
    }

    showActorDetails(name, image, role) {
        // يمكن إضافة وظيفة لعرض تفاصيل الممثل
        console.log(`الممثل: ${name}, الدور: ${role}`);
        // يمكن فتح modal أو الانتقال لصفحة الممثل
    }
}

customElements.define('custom-actor-card', ActorCard);