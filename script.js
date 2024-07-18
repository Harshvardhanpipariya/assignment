console.log("====================================");
console.log("Connected");
console.log("====================================");

const MenFilterSelector = document.querySelector("#mens");
const WomenFilterSelector = document.querySelector("#womens");
const KidsFilterSelector = document.querySelector("#kids");
const productsContainer = document.querySelector(".itemSection");

const MensNavImage = document.querySelector('#imgDisplay1')
const WomensNavImage = document.querySelector('#imgDisplay2')
const KidsNavImage = document.querySelector('#imgDisplay3')
let ProductCount = 0;

var currentSelection = MenFilterSelector;

const apiUrl =
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";

const fetchData = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const Mens = data.categories[0];
    const Womens = data.categories[1];
    const Kids = data.categories[2];

    return { Mens, Womens, Kids }; // Return an object containing the values
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Return null in case of an error
  }
};

async function changeFilterSelection(toChange) {
  //for checking .filterCurrentSelected class

//   console.log(toChange)
  if (toChange == "MenFilterSelector") {
    console.log(1);
    if (!MenFilterSelector.classList.contains("filterCurrentSelected")) {
   
      MenFilterSelector.classList.add("filterCurrentSelected");
      currentSelection.classList.remove("filterCurrentSelected");
      currentSelection = MenFilterSelector;
      productsContainer.innerHTML = '';
      appendProducts("Mens");
      ProductCount= 0;
  
    }
  }
  if (toChange == "WomenFilterSelector") {
    console.log(2);

    if (!WomenFilterSelector.classList.contains("filterCurrentSelected")) {

        WomenFilterSelector.classList.add("filterCurrentSelected");
        currentSelection.classList.remove("filterCurrentSelected");
      currentSelection = WomenFilterSelector;
      productsContainer.innerHTML = '';
      appendProducts("Womens");
      ProductCount = 0;
     
    }
  }

  if (toChange == "KidsFilterSelector") {
    console.log(3);
    if (!KidsFilterSelector.classList.contains("filterCurrentSelected")) {

      KidsFilterSelector.classList.add("filterCurrentSelected");
      currentSelection.classList.remove("filterCurrentSelected");
      currentSelection = KidsFilterSelector;
      productsContainer.innerHTML = '';
      appendProducts("Kids");
      ProductCount = 0;

    }
  }
}


MenFilterSelector.addEventListener("click", () => {
  changeFilterSelection("MenFilterSelector");
});
WomenFilterSelector.addEventListener("click", () => {
  changeFilterSelection("WomenFilterSelector");
});
KidsFilterSelector.addEventListener("click", () => {
  changeFilterSelection("KidsFilterSelector");
});

// Create product card HTML structure
const createProductCard = (product) => {
    if(ProductCount>=4)
    {
        return;
    }


  const card = document.createElement("div");
  card.className = "card";

  const discount = calculateDiscountPercentage(
    product.compare_at_price,
    product.price
  );

  card.innerHTML = ``;
  card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" id="productImage"/>
      <div class="NameDetail">
<span id="nameOfProduct" class="titleCard">${
    product.title.length > 10
      ? product.title.slice(0, 9) + ".."
      : product.title
  }</span>
        <div class="littleDott"></div>
        <span id="vendorName" class="vendor">${product.vendor}</span>
      </div>
      <div class="priceDetails">
        <span id="currentPrice" class="price">${"Rs " + product.price}</span>
        <span id="beforeSalePrice" class="compare_at_price">${
          product.compare_at_price
        }</span>
        <span id="totalDiscount" class="discount">${discount}% Off</span></span>
      </div>
      <div class="addToCardButton">Add to Cart</div>
    `;
  ProductCount = ProductCount + 1;

  return card;
};

// Append product cards to the container
const appendProducts = async (Category="Mens") => {
 
  const { Mens, Womens, Kids } = await fetchData();

    if(Category==="Mens"){
        Mens.category_products.forEach((product) => {
            const productCard = createProductCard(product);
            productsContainer.appendChild(productCard);
          });
    }

    if(Category==="Womens"){
        Womens.category_products.forEach((product) => {
            const productCard = createProductCard(product);
            productsContainer.appendChild(productCard);
          });
    }

    if(Category==="Kids"){
        Kids.category_products.forEach((product) => {
            const productCard = createProductCard(product);
            productsContainer.appendChild(productCard);
          });
    }







};

function calculateDiscountPercentage(originalPrice, discountedPrice) {
  if (originalPrice <= 0) {
    throw new Error("Original price should be greater than zero.");
  }

  const discountAmount = originalPrice - discountedPrice;
  const discountPercentage = (discountAmount / originalPrice) * 100;

  return discountPercentage.toFixed(2); // returns percentage with 2 decimal places
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("start");
  appendProducts();
});
