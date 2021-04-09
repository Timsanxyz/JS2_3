const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров
        this.allProducts = [];//массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }

    _getProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}

class BasketList {
    constructor(container = '.basketList'){
        this.container = container;
        this.items = [];
        this._getProducts()
            .then(data => { //data - объект js
                this.items = [...data.contents];
                this.render()
                //console.log(this.data);
            });
    }
    _getProducts(){
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.items){
            const productObj = new BasketItem(product);
            //this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }


}

class BasketItem {
    constructor(product, img = 'https://placehold.it/200x150'){
        this.id = product.id_product;
        this.name = product.product_name;
        this.price = product.price;
        this.quantity = product.quantity;
    }
    render(){
        return `<div class="basket-product-item" data-id="${this.id}">
                <div class="desc">
                    <p>${this.name}: ${this.price} $ x ${this.quantity}</p>
                </div>
            </div>`
    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();
let baskList = new BasketList();

let basketDiv = document.querySelector('.basketList');
let btn = document.querySelector('.btn-cart');

btn.addEventListener('click', function (){
    if (basketDiv.style.display == "none") {
        basketDiv.style.display = 'block';
    }else{
        basketDiv.style.display = 'none';
    }
    console.log('click');
});

