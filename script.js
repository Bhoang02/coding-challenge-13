// U89173488

document.addEventListener('DOMContentLoaded', () => {
    const apiEndpoint = 'https://course-api.com/react-store-products';
    let products = [];
    let currentIndex = 0;

    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const productDiv = document.getElementById('product');
    const navigationDiv = document.getElementById('navigation');

    const productImage = document.getElementById('product-image');
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const productDescription = document.getElementById('product-description');

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    const fetchData = async () => {
        try {
            const response = await fetch(apiEndpoint);
            if (!response.ok) throw new Error('Network response was not ok');
            products = await response.json();
            displayProduct();
        } catch (error) {
            showError();
        } finally {
            loadingDiv.classList.add('hidden');
        }
    };

    const displayProduct = () => {
        if (products.length === 0) return;
        const product = products[currentIndex];
        productImage.src = product.image;
        productName.textContent = product.name;
        productPrice.textContent = `$${product.price}`;
        productDescription.textContent = product.description;

        productDiv.classList.remove('hidden');
        navigationDiv.classList.remove('hidden');
    };

    const showError = () => {
        errorDiv.classList.remove('hidden');
    };

    const showLoading = () => {
        loadingDiv.classList.remove('hidden');
    };

    const handlePrev = () => {
        currentIndex = (currentIndex - 1 + products.length) % products.length;
        displayProduct();
    };

    const handleNext = () => {
        currentIndex = (currentIndex + 1) % products.length;
        displayProduct();
    };

    prevBtn.addEventListener('click', handlePrev);
    nextBtn.addEventListener('click', handleNext);

    showLoading();
    fetchData();
});
