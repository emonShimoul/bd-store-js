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
    // console.log(product);
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