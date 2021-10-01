// Scroll Up/Down Add/Remove Class
window.onscroll = function () {
    const body = document.getElementById('body');
    if (window.pageYOffset > 390) {
        body.classList.add("scrolling");
    } else {
        body.classList.remove("scrolling");
    }

    if (window.pageYOffset > 1000) {
        body.classList.add("longScroll");
    } else {
        body.classList.remove("longScroll");
    }
}

// Click Search Button -> Get Input Value
const productSearch = () => {
    const inputField = document.getElementById('searchProduct');
    const textValue = inputField.value;
    const url = `https://fakestoreapi.com/products/category/${textValue}`;

    fetch(url)
        .then(res => res.json())
        .then(json => console.log(json))

    inputField.value = '';
}

// Enter Btn Key Press Action
const enterBtnAction = () => {
    let input = document.getElementById("searchProduct");
    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("searchBtn").click();
        }
    });
}
enterBtnAction();

// Data File
const loadProducts = () => {
    // Optional Url Fetch Data
    const url = 'https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json';

    const productsContainer = document.getElementById("all-products");
    productsContainer.innerHTML = `
        <div class="activity"></div>
        <div class="col-md-4 mb-4 placeholder">
            <img class="img-fluid" src="assets/image/placeholder.jpg" alt="placeholder image">
        </div>
        <div class="col-md-4 mb-4 placeholder">
            <img class="img-fluid" src="assets/image/placeholder.jpg" alt="placeholder image">
        </div>
        <div class="col-md-4 mb-4 placeholder">
            <img class="img-fluid" src="assets/image/placeholder.jpg" alt="placeholder image">
        </div>
        <div class="col-md-4 mb-4 placeholder">
            <img class="img-fluid" src="assets/image/placeholder.jpg" alt="placeholder image">
        </div>
        <div class="col-md-4 mb-4 placeholder">
            <img class="img-fluid" src="assets/image/placeholder.jpg" alt="placeholder image">
        </div>
        <div class="col-md-4 mb-4 placeholder">
            <img class="img-fluid" src="assets/image/placeholder.jpg" alt="placeholder image">
        </div>
    `;

    fetch(url)
        .then((response) => response.json())
        .then((data) => showProducts(data));
};

// Show all product in UI
const showProducts = (products) => {

    // Clean Loader Placeholder
    const productsContainer = document.getElementById('all-products');
    productsContainer.textContent = '';

    const allProducts = products.map((pd) => pd);
    for (const product of allProducts) {
        const div = document.createElement("div");
        div.classList.add("col-md-4");
        div.innerHTML = `
            <div class="card mb-4">
                <img src="${product.image ? product.image : `assets/image/image_not_found.png`}" class="card-img-top img-fluid p-4 border-bottom" alt="${product.title}">
                <div class="card-body">
                    <p class="mb-1 category" title="${product.category}">Category: <span class="themeLetter" style="display: inline-block"> ${product.category} </span></p>
                    <h5 class="card-title themeLetter" title="Title: ${product.title}">
                        <span class="themeLetter" style="display: inline-block"> ${product.title} </span>
                    </h5>
                    <div class="media">
                        <h2 class="align-self-center mr-3 price" title="Price: $${product.price}"> $${product.price} </h2>
                        <div class="media-body">
                            <div class="rating-progressbar my-3">
                                <p class="rating-value"> ${product.rating.rate} </p>
                                <svg style="display:none;">
                                    <defs>
                                        <symbol id="fivestars">
                                            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
                                                  fill="white" fill-rule="evenodd"/>
                                            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
                                                  fill="white" fill-rule="evenodd"
                                                  transform="translate(24)"/>
                                            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
                                                  fill="white" fill-rule="evenodd"
                                                  transform="translate(48)"/>
                                            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
                                                  fill="white" fill-rule="evenodd"
                                                  transform="translate(72)"/>
                                            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
                                                  fill="white" fill-rule="evenodd"
                                                  transform="translate(96)"/>
                                        </symbol>
                                    </defs>
                                </svg>
                                <div class="rating">
                                    <progress class="rating-bg" value="${product.rating.rate}" max="5"></progress>
                                    <svg>
                                        <use xlink:href="#fivestars"/>
                                    </svg>
                                </div>
                                <p class="total-rating"> Total Rating: ${product.rating.count} </p>
                            </div>
                        </div>
                    </div>
                    <div class="btn-group d-flex justify-content-between" role="group" aria-label="Basic example">
                        <button type="button" onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="btn btn-warning text-white" title="Add to Cart"><i class="fas fa-shopping-cart"></i></button>
                        <button type="button" class="btn btn-secondary text-white" title="Details" data-toggle="modal" data-target="#details-${product.id}"><i class="fas fa-info-circle"></i></button>
                    </div>
                </div>
            </div>
            
            <!-- Product Item Details Showing Modal -->
            <div class="modal fade" id="details-${product.id}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Product More Inof...</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="card">
                                <img src="${product.image ? product.image : `assets/image/image_not_found.png`}" class="card-img-top img-fluid p-4 border-bottom" alt="${product.title}">
                                <div class="card-body">
                                    <h3 class="mb-3"> <span class="font-weight-bold themeLetter" style="display: inline-block">Product Name:</span> ${product.title} </h3>
                                    <h3 class="m-0"> <span class="font-weight-bold themeLetter" style="display: inline-block">Product Details:</span> ${product.description} </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
      `;
        productsContainer.appendChild(div);
    }
};

// Update Price Function
let count = 0;
const addToCart = (id, price) => {
    count = count + 1;
    updatePrice("price", price);

    updateTaxAndCharge();
    const productQuantity = document.getElementById("total-Products").innerText = count;

    updateTotal();

    const button = document.getElementById('buyBtn');
    if (productQuantity > 0) {
        button.style.cursor = "pointer";
        button.disabled = false;
    }
};

// Id Converter Funcion
const getInputValue = (id) => {
    const element = document.getElementById(id).innerText;
    const converted = parseFloat(element);
    return converted;
};

// Main price update function
const updatePrice = (id, value) => {
    const convertedOldPrice = getInputValue(id);
    const convertPrice = parseFloat(value);
    const total = convertedOldPrice + convertPrice;
    document.getElementById(id).innerText = total.toFixed(2);
};

// Set innerText function
const setInnerText = (id, value) => {
    document.getElementById(id).innerText = Math.round(value);
};

// Update delivery charge and total Tax
const updateTaxAndCharge = () => {
    const priceConverted = getInputValue("price");
    if (priceConverted > 200) {
        setInnerText("delivery-charge", 30);
        setInnerText("total-tax", priceConverted * 0.2);
    }
    if (priceConverted > 400) {
        setInnerText("delivery-charge", 50);
        setInnerText("total-tax", priceConverted * 0.3);
    }
    if (priceConverted > 500) {
        setInnerText("delivery-charge", 60);
        setInnerText("total-tax", priceConverted * 0.4);
    }
};

// Grand Total update function
const updateTotal = () => {
    const grandTotal =
        getInputValue("price") + getInputValue("delivery-charge") +
        getInputValue("total-tax");
    document.getElementById("total").innerText = grandTotal.toFixed(2);
};
loadProducts();

// Buy Now Button Handler
function buyNow() {
    document.getElementById('total-Products').textContent = '0';
    document.getElementById('price').textContent = '0';
    document.getElementById('delivery-charge').textContent = '20';
    document.getElementById('total-tax').textContent = '0';
    document.getElementById('total').textContent = '0';

    const buyModal = document.getElementById('body');
    buyModal.classList.add('modalShow');

    const modalContent = document.getElementById('buy-now-modal');
    modalContent.innerHTML = `
        <div class="buy-modal">
            <div class="row">
                <div class="col-md-6 col-12 mx-auto">
                    <div class="sbd-modal-content text-center">
                        <h2> Your order has been confirmed. </h2>
                        <h2> Please wait for product delivery. </h2>
                        <button class="btn btn-warning px-5 text-white border-0 mt-5"
                                style="font-size: 16px; text-transform: uppercase;" onclick="closeModal()"> Okay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Buy Now Button Disable
    const button = document.getElementById('buyBtn');
    button.style.cursor = "not-allowed";
    button.disabled = true;
}

// Custom Modal
function closeModal() {
    const buyModal = document.getElementById('body');
    buyModal.classList.remove('modalShow');
}