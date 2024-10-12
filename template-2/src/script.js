class PageLoader {
    constructor() {
        this.mainContent = document.getElementById('main-content');
    }

    async loadContent(page) {
        try {
            const response = await fetch(`${page}.html`);
            if (!response.ok) throw new Error(`Erro ao carregar a página ${page}`);
            this.mainContent.innerHTML = await response.text();
            this.initializeProductEvents();
        } catch (error) {
            this.displayError(error.message);
        }
    }

    displayError(message) {
        this.mainContent.innerHTML = `<p>Erro ao carregar a página: ${message}</p>`;
    }

    initializeProductEvents() {
        this.initializeProductClickEvents();
        this.handleProductDetailsToggle();
        this.handleProductQuantityChange();
    }

    initializeProductClickEvents() {
        const products = document.querySelectorAll('.wrap-product');
        products.forEach(item => {
            item.addEventListener('click', () => {
                this.loadContent('pages/product');
            });
        });
    }

    handleProductDetailsToggle() {
        const toggleButtons = document.querySelectorAll('.toggle-title');
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.toggleProductDetails(button);
            });
        });
    }

    toggleProductDetails(button) {
        const parentElement = button.closest('.product-wrap-toggle');
        const detailsElement = parentElement.querySelector('.toggle-details');
        const icon = button.querySelector('i');

        if (icon.classList.contains('ph-plus')) {
            this.switchIcon(icon, 'ph-minus', 'ph-plus');
            detailsElement.classList.remove('hide');
        } else {
            this.switchIcon(icon, 'ph-plus', 'ph-minus');
            detailsElement.classList.add('hide');
        }
    }

    switchIcon(icon, addClass, removeClass) {
        icon.classList.add(addClass);
        icon.classList.remove(removeClass);
    }

    handleProductQuantityChange() {
        const buttons = document.querySelectorAll(".wrap-input button");
        buttons.forEach(button => {
            button.addEventListener("click", (event) => {
                this.updateProductQuantity(event.currentTarget);
            });
        });
    }

    updateProductQuantity(button) {
        const parent = button.parentNode;
        const numberContainer = parent.querySelector(".number");
        const number = parseFloat(numberContainer.textContent);
        const increment = parent.querySelector(".plus");
        const decrement = parent.querySelector(".minus");
        const newNumber = button.classList.contains("plus") ? number + 1 : number - 1;

        this.setProductQuantity(numberContainer, newNumber, increment, decrement);
    }

    setProductQuantity(container, number, increment, decrement) {
        const minValue = 1;
        const maxValue = 10;

        container.textContent = number;

        if (number <= minValue) {
            decrement.disabled = true;
            container.classList.add("dim");
        } else if (number >= maxValue) {
            increment.disabled = true;
        } else {
            decrement.disabled = false;
            increment.disabled = false;
            container.classList.remove("dim");
        }
    }
}

const pageLoader = new PageLoader();
pageLoader.loadContent('pages/list-products');
