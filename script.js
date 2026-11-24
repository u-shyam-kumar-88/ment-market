document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.querySelector("#product-grid");
    const productCards = Array.from(document.querySelectorAll(".product-card"));
    const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
    const searchInput = document.querySelector("#product-search");
    const resultsCount = document.querySelector("#results-count");
    const emptyResults = document.querySelector("#empty-results");
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector("#primary-navigation");
    const drawer = document.querySelector("#cart-drawer");
    const backdrop = document.querySelector("#cart-backdrop");
    const openCartButton = document.querySelector("#open-cart");
    const closeCartButton = document.querySelector("#close-cart");
    const continueShoppingButton = document.querySelector("#continue-shopping");
    const cartItemsList = document.querySelector("#cart-items");
    const cartEmpty = document.querySelector("#cart-empty");
    const cartCount = document.querySelector("#cart-count");
    const drawerCount = document.querySelector("#drawer-count");
    const cartSubtotal = document.querySelector("#cart-subtotal");
    const cartStatus = document.querySelector("#cart-status");
    const newsletterForm = document.querySelector("#newsletter-form");
    const newsletterStatus = document.querySelector("#newsletter-status");

    const currency = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    });

    const products = new Map(productCards.map((card) => {
        const image = card.querySelector("img");
        const title = card.querySelector("h3");
        return [card.dataset.productId, {
            id: card.dataset.productId,
            name: title.textContent,
            price: Number(card.dataset.price),
            image: image.src,
            imageAlt: image.alt
        }];
    }));

    const cart = new Map();
    let activeCategory = "all";

    function updateProducts() {
        const query = searchInput.value.trim().toLocaleLowerCase();
        let visibleCount = 0;

        productCards.forEach((card) => {
            const matchesCategory = activeCategory === "all" || card.dataset.category === activeCategory;
            const matchesSearch = !query || card.textContent.toLocaleLowerCase().includes(query);
            const isVisible = matchesCategory && matchesSearch;

            card.hidden = !isVisible;
            if (isVisible) {
                visibleCount += 1;
            }
        });

        resultsCount.textContent = `${visibleCount} ${visibleCount === 1 ? "campus find" : "campus finds"}`;
        emptyResults.hidden = visibleCount > 0;
    }

    function setCategory(category) {
        activeCategory = category;

        filterButtons.forEach((button) => {
            const isActive = button.dataset.filter === category;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        updateProducts();
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => setCategory(button.dataset.filter));
    });

    searchInput.addEventListener("input", updateProducts);

    document.querySelectorAll("[data-category-jump]").forEach((control) => {
        control.addEventListener("click", (event) => {
            event.preventDefault();
            setCategory(control.dataset.categoryJump);
            document.querySelector("#shop").scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
            });
        });
    });

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            const willOpen = navToggle.getAttribute("aria-expanded") !== "true";
            navToggle.setAttribute("aria-expanded", String(willOpen));
            navLinks.classList.toggle("is-open", willOpen);
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navToggle.setAttribute("aria-expanded", "false");
                navLinks.classList.remove("is-open");
            });
        });
    }

    function totalQuantity() {
        return Array.from(cart.values()).reduce((total, quantity) => total + quantity, 0);
    }

    function renderCart() {
        cartItemsList.replaceChildren();

        let subtotal = 0;
        cart.forEach((quantity, productId) => {
            const product = products.get(productId);
            if (!product) {
                return;
            }

            subtotal += product.price * quantity;

            const item = document.createElement("li");
            item.className = "cart-item";
            item.dataset.productId = product.id;

            const image = document.createElement("img");
            image.src = product.image;
            image.alt = product.imageAlt;
            image.loading = "lazy";

            const details = document.createElement("div");
            const name = document.createElement("p");
            name.className = "cart-item-name";
            name.textContent = product.name;

            const price = document.createElement("p");
            price.className = "cart-item-price";
            price.textContent = currency.format(product.price * quantity);

            const quantityControls = document.createElement("div");
            quantityControls.className = "quantity-controls";

            const decrease = document.createElement("button");
            decrease.type = "button";
            decrease.dataset.cartAction = "decrease";
            decrease.setAttribute("aria-label", `Remove one ${product.name}`);
            decrease.textContent = "−";

            const quantityLabel = document.createElement("span");
            quantityLabel.textContent = String(quantity);
            quantityLabel.setAttribute("aria-label", `Quantity ${quantity}`);

            const increase = document.createElement("button");
            increase.type = "button";
            increase.dataset.cartAction = "increase";
            increase.setAttribute("aria-label", `Add one ${product.name}`);
            increase.textContent = "+";

            quantityControls.append(decrease, quantityLabel, increase);
            details.append(name, price, quantityControls);

            const remove = document.createElement("button");
            remove.type = "button";
            remove.className = "cart-remove";
            remove.dataset.cartAction = "remove";
            remove.setAttribute("aria-label", `Remove ${product.name} from bag`);
            remove.textContent = "Remove";

            item.append(image, details, remove);
            cartItemsList.append(item);
        });

        const count = totalQuantity();
        cartCount.textContent = String(count);
        cartCount.setAttribute("aria-label", `${count} items in bag`);
        openCartButton.setAttribute("aria-label", `Open shopping bag, ${count} ${count === 1 ? "item" : "items"}`);
        drawerCount.textContent = `(${count})`;
        cartSubtotal.textContent = currency.format(subtotal);
        cartEmpty.hidden = count > 0;
    }

    function openCart() {
        drawer.hidden = false;
        backdrop.hidden = false;
        drawer.setAttribute("aria-hidden", "false");
        drawer.classList.add("is-open");
        document.body.classList.add("cart-open");
        closeCartButton.focus();
    }

    function closeCart() {
        drawer.classList.remove("is-open");
        drawer.hidden = true;
        backdrop.hidden = true;
        drawer.setAttribute("aria-hidden", "true");
        document.body.classList.remove("cart-open");
        openCartButton.focus();
    }

    function addToCart(productId) {
        const product = products.get(productId);
        if (!product) {
            return;
        }

        cart.set(productId, (cart.get(productId) || 0) + 1);
        renderCart();
        cartStatus.textContent = `${product.name} added to your bag.`;
    }

    productGrid.addEventListener("click", (event) => {
        const addButton = event.target.closest("[data-add-to-cart]");
        if (!addButton) {
            return;
        }

        const productCard = addButton.closest(".product-card");
        addToCart(productCard.dataset.productId);
    });

    cartItemsList.addEventListener("click", (event) => {
        const actionButton = event.target.closest("[data-cart-action]");
        if (!actionButton) {
            return;
        }

        const item = actionButton.closest(".cart-item");
        const productId = item.dataset.productId;
        const currentQuantity = cart.get(productId) || 0;

        if (actionButton.dataset.cartAction === "increase") {
            cart.set(productId, currentQuantity + 1);
        } else if (actionButton.dataset.cartAction === "decrease" && currentQuantity > 1) {
            cart.set(productId, currentQuantity - 1);
        } else {
            cart.delete(productId);
        }

        renderCart();
    });

    openCartButton.addEventListener("click", openCart);
    closeCartButton.addEventListener("click", closeCart);
    continueShoppingButton.addEventListener("click", closeCart);
    backdrop.addEventListener("click", closeCart);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !drawer.hidden) {
            closeCart();
        }
    });

    newsletterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        newsletterStatus.textContent = "Thanks for stopping by! This demo doesn't send or store signups.";
    });

    renderCart();
    updateProducts();
});
