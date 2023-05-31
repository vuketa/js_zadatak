const cartDOM = document.querySelector(".Cart_Drawer");
const cartSubtotal = document.getElementById("Price");
const cartContent = document.querySelector(".Cart_Items");
const cartItems = document.querySelector(".qty_value");

const productsDOM = document.getElementById("products");

const url = "https://api.cleverchoice.cc";

let cart = [];

const fetchProducts = async () => {
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const formatPrice = (price) => {
  let formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));
  return formattedPrice;
};

const addToCart = (id) => {
  console.log(id);
};

const increment = (id) => {
  let cartItems = cart.find((item) => item.id === id);
  if (cartItems === undefined) {
    let tempCart = { id, item: 2 };
    cart = [...cart, tempCart];
  } else {
    cartItems.item += 1;
  }
  update(id);
};

const decrement = (id) => {
  let cartItems = cart.find((item) => item.id === id);
  if (cartItems.item === 1) return;
  else {
    cartItems.item -= 1;
  }
  update(id);
};

const update = (id) => {
  let updateItem = cart.find((item) => item.id === id);
  //   console.log(updateItem.item);
  document.getElementById(id).value = updateItem.item;
};

const displayProducts = (item) => {
  const productItems = item
    .map((item) => {
      const { id, name, image, price, currency } = item;
      //   const formatPrice = price / 100;
      return `
    <!--   single product  -->
                <div class="col-sm-6 col-md-3 Single_Product" >
                    <div class="card mb-4 box-shadow">
                        <img class="card-img-top" src=${image} data-holder-rendered="true">
                        <div class="card-body">
                            <p class="card-text cc-name">${name}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <div class="Qty_Box">
                                        <span class="Qty_Minus" onclick="decrement(${id})">-</span>
                                        <input class="qty_value" type="text" value="1" name="qty" id=${id}>
                                        <span class="Qty_Plus" onclick="increment(${id})">+</span>
                                    </div>
                                    <label for="cart_drawer_action" class="btn btn-sm btn-outline-secondary add_to_cart" onclick="addToCart(${id})">Add to cart</label>
                                </div>
                                <small class="text-muted">${formatPrice(
                                  price
                                )}</small>
                            </div>
                        </div>
                    </div>
                </div>
                 <!--   end of single product  -->
    
    `;
    })
    .join("");
  productsDOM.innerHTML = productItems;
  //   productsDOM.addEventListener("click", function (e) {
  //     const parent = e.target.parentElement;
  //     if (parent.classList.contains("btn-group")) {
  //       addToCart(parent.dataset.id);
  //     }
  //   });
};

const init = async () => {
  const data = await fetchProducts();
  displayProducts(data);
};

init();


