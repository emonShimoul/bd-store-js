const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product border border-3 border-info rounded-3">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h4 class="pt-3 text-info fw-bold">${product.title}</h4>
      <p><span class="fw-bold text-danger">Category:</span> ${product.category}</p>
      <h4><span class="fw-bold text-danger">Price:</span> $ ${product.price}</h4>
      <h6><span class="fw-bold text-danger">No. Of Ratings:</span> ${product.rating.count}</h6>
      <h6 class="mb-5"><span class="fw-bold text-danger">Rating:</span> ${product.rating.rate}</h6>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success fw-bold">add to cart</button>
      <button id="details-btn" onclick="loadSingleProduct(${product.id})" class="btn btn-warning text-white fw-bold">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;

  document.getElementById(id).innerText = parseFloat(total.toFixed(2));
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value.toFixed(2));
};

// update delivery charge and total Tax
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

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal.toFixed(2));
};

// to show the details for single product
const loadSingleProduct = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayDetails(data));
}

const displayDetails = (data) => {
  console.log(data);
  const displayDetails = document.getElementById('display-details');
  displayDetails.textContent = '';
  const div = document.createElement('div');
  div.classList.add('border', 'border-3', 'rounded-3', 'border-secondary', 'p-3');
  div.innerHTML = `
  <p><span class="text-danger fw-bold">Title:</span> ${data.title}<p>
  <p><span class="text-danger fw-bold">Description:</span> ${data.description}<p>
  `;
  displayDetails.appendChild(div);
}

