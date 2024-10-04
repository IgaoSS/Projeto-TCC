
class PageLoader {
    constructor() {
        this.mainContent = document.getElementById('main-content');;
    }

    async loadContent(page) {
        try {
            const response = await fetch(`${page}.html`);
            if (!response.ok) throw new Error(`Erro ao carregar ${page}`);
            this.mainContent.innerHTML = await response.text();
            this.initializeProductEvents(); // Inicializar eventos após o carregamento da página
        } catch (error) {
            this.mainContent.innerHTML = `<p>Erro ao carregar a página: ${error.message}</p>`;
        }
    }

    initializeProductEvents() {
        const products = document.querySelectorAll('.wrap-product');
        products.forEach((item) => {
            item.addEventListener('click', (event) => {
                console.log(event);
                this.loadContent('pages/product');
            });
        });
    }
}

const pageLoader = new PageLoader();
//pageLoader.loadContent('pages/home');
pageLoader.loadContent('pages/product');
