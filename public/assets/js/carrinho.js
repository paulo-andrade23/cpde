const cartBtn = document.querySelector(".carrinho");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".slider-inner");
const productsDOM2 = document.querySelector(".carrossel2");
const productsDOM3 = document.querySelector(".carrossel3");
const productsDOM4 = document.querySelector(".carrossel4");
const productsDOM5 = document.querySelector(".carrossel5");
const productsDOM6 = document.querySelector(".carrossel6");
//cart
let cart = [];
let cart2 = [];

//buttons
let buttonsDOM = [];
let buttonsDOM2 = [];

//getting the products

class Products {
    async getProducts(){
        try{
        let result = await fetch("products.json");
        let result2 = await fetch("carrossel2.json");
        let data = await result && result2.json() 
        let products = data.items;
       
        products = products.map(item =>{
            const {title, price} = item.fields;
            const {id} = item.sys;
            const image = item.fields.image.fields.file.url;
            return {title, price, id, image};
        });
        return products;
        }catch(error) {
            console.log(error);
        }
    }
}


//display products
class UI {
    displayProducts(products){
      let result2 = '';
        products.forEach(products => {
            result2 += `
            <div class="movie-card">
            <figure class="poster-box card-banner">
              <img src=${products.image} class="img-cover">
            </figure>
          <h4 class="title">
                <font style="vertical-align: inherit;">${products.title}</font>
            </h4><br>
            <div class="meta-list">
              <div class="meta-item">
                <span class="span">
                    <font style="vertical-align: inherit;">R$${products.price}</font>
                </span>
              </div><br>
              <div class="card-badge">
                <button class="bag-btn" data-id=${products.id}>
                  <i class="fa fa-cart-arrow-down"></i>
                  <font style="vertical-align: inherit;">+</font>
                </button>
              </div>
              </div>
              </div>`; 
        });
        productsDOM.innerHTML = result2;
    }
    getBagButtons(){
      const buttons = [...document.querySelectorAll(".bag-btn")];
      buttonsDOM = buttons;
      buttons.forEach(button => {
        let id = button.dataset.id;
        let inCart = cart.find(item => item.id === id); 
        if(inCart)
        {
          button.innerText = "Adicionado";
          button.disabled = true;
        } 

          button.addEventListener("click", event =>
          {
            event.target.innerText = "Adicionado";
            event.target.disabled = true;
            // get products from products
            let cartItem = {...Storage.getProducts(id), amount:1};
            // add products to the cart
            cart = [...cart, cartItem];
            // save cart in local storage
            Storage.saveCart(cart);
            // set cart values
            this.setCartValues(cart);
            // display cart items
            this.addCartItem(cartItem);
            // show the cart

          });        
      });
      
    }
    
    showCart(){
      cartOverlay.classList.add('transparentBcg');
      cartDOM.classList.add('showCart');
    }
    setCartValues(cart){
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map(item => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
    }
    addCartItem(item){
      const div = document.createElement('div');
      div.classList.add('cart-item');
      div.innerHTML = `<img src=${item.image}>
      <div>
        <h4>${item.title}</h4>
        <h5>R$${item.price}</h5>
        <span class="remove-item" data-id=${item.id}>Remover</span>
      </div>
      <div>
        <i class="fa fa-chevron-up" data-id=${item.id}></i>
        <p class="item-amount">${item.amount}</p>
        <i class="fa fa-chevron-down" data-id=${item.id}></i>
      </div>`
      cartContent.appendChild(div);
      console.log(cartContent);

    }
    setupApp()
    {
      cart = Storage.getCart();
      this.setCartValues(cart);
      this.populateCart(cart);
      cartBtn.addEventListener('click', this.showCart);
      closeCartBtn.addEventListener('click', this.hideCart);
    }
    populateCart(cart)
    {
      cart.forEach(item => this.addCartItem(item));

    }
    hideCart()
    {
      cartOverlay.classList.remove('transparentBcg');
      cartDOM.classList.remove('showCart'); 
    }
    
  showCart(){
    cartOverlay.classList.add('transparentBcg');
    cartDOM.classList.add('showCart');
  }
}

//local storage
class Storage {
  static saveProducts(products){
    localStorage.setItem("products", JSON.stringify(products));
  }
  static saveProducts2(products2){
    localStorage.setItem("products2", JSON.stringify(products2));
  }
  static saveProducts3(products3){
    localStorage.setItem("products3", JSON.stringify(products3));
  }
  static saveProducts4(products4){
    localStorage.setItem("products4", JSON.stringify(products4));
  }
  static saveProducts5(products5){
    localStorage.setItem("products5", JSON.stringify(products5));
  }
  static saveProducts6(products6){
    localStorage.setItem("products6", JSON.stringify(products6));
  }
  static getProducts(id){
    let products = JSON.parse(localStorage.getItem('products'));
    return products.find(products => products.id === id);
  }
  static saveCart(cart){
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  static getCart(){
    return localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[];
  }
  /*static getProducts2(id2){
    let products2 = JSON.parse(localStorage.getItem('products2'));
    return products2.find(products2 => products2.id2 === id2);
  }
  static saveCart2(cart2){
    localStorage.setItem('cart2', JSON.stringify(cart2));
  }*/
  
  
}

document.addEventListener("DOMContentLoaded", ()=>{
    const ui = new UI();
    const products = new Products();
  //setup app
  ui.setupApp();
//get all products
products.getProducts().then(products => {ui.displayProducts(products)
  Storage.saveProducts(products)
  }).then(()=>{
  ui.getBagButtons();
  });
});


