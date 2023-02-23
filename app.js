const addToCart = document.querySelectorAll('.buy-product');
const addCart = document.querySelector('.addMenuBtn');
const removeCart = document.querySelector('.removeMenuBtn');
const rightManuCart = document.querySelector('.cart-section');
const cartProduct = document.querySelectorAll('.cart-product-list');

addToCart.forEach((cart) => {
    cart.addEventListener('click', () =>{
        cart.classList.toggle('active');
    })
})

// slider manu open and remove 
addCart.onclick = () =>{
    rightManuCart.classList.add('active');
}
removeCart.onclick = () =>{
    rightManuCart.classList.remove('active');
}

// remove product from cart
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', removeFunction)
}else{
    removeFunction();
}

function removeFunction(){  
    let removeCartBtn = document.getElementsByClassName('cart-product-remove');
    for(let i = 0; i < removeCartBtn.length; i++){
        removeCartBtn[i].addEventListener('click', (event)=>{
                cartProduct[i].remove();
                updateAmout();
        })
    }

    let qytInput = document.getElementsByClassName('cart-qty');
    for (let i = 0; i < qytInput.length; i++) {
        var inputQyt = qytInput[i];
        inputQyt.addEventListener('change', (e) =>{
            inputQyt = e.target 
            if(isNaN(inputQyt.value) || inputQyt.value <= 0){
                inputQyt.value = 1
            }
            updateAmout();
        })
    }
}

// buy buitton 
document.querySelector('.buy-Product-btn').addEventListener('click', ()=>{
    alert('Your Order is placed');
    let cartContanet = document.querySelectorAll('.cart-product-list')[0];
    while(cartContanet.hasChildNodes()){
       cartContanet.removeChild(cartContanet.firstChild);
    }
    updateAmout();
})


let addCardProduct = document.querySelectorAll('.buy-product');
for(let i = 0; i < addCardProduct.length; i++){
    let button = addCardProduct[i];

    // add to cart
    button.addEventListener('click', (event) => {
		const product = event.currentTarget.parentElement.querySelector('.product-title');
		let productTitle = product.querySelectorAll('.product-lable')[0].innerText;
        let productPrice = product.querySelectorAll('.product-price')[0].innerText;
        addProductToCart(productTitle, productPrice);
        updateAmout();
    })
}


function addProductToCart(productTitle, productPrice){
    let cartBoxContain = `<div class="cart-product-price">
                        <h1 class="cart-product-name">${productTitle}</h1>
                        <p class="cart-price">${productPrice}</p>
                        <input type="number" value="1" class="cart-qty">
                        </div>
                        <div class="cart-product-remove"><ion-icon name="trash-outline"></ion-icon></div> `;

   let shopingCart = document.createElement('div');
   shopingCart.classList.add('cart-wrapper'); 
   shopingCart.innerHTML = cartBoxContain;
   let cartItem = document.querySelector('#cart-product-list');
   if (cartItem.children.length > 0) {
  		let cartNameProduct = cartItem.querySelectorAll('.cart-product-name');
		for (let item of cartNameProduct) {
			if (item.innerText === productTitle) {
				alert('you have Already Add this to cart');
      			return;
			}
		}
   }
  cartItem.append(shopingCart);
  shopingCart.querySelectorAll('.cart-product-remove')[0].addEventListener('click', removeFunction);
  shopingCart.querySelectorAll('.cart-qty')[0].addEventListener('change', removeFunction);
}


function updateAmout(){
    let cartContanet = document.querySelector('#cart-product-list');
	if (cartContanet.children.length > 0) {
		let cartBoxs = cartContanet.querySelectorAll('.cart-product-price');
		var total = 0;

		for(let i = 0; i < cartBoxs.length; i++){
			let cartBox = cartBoxs[i];
			let priceElement = cartBox.querySelectorAll('.cart-price')[0];
			var price = parseFloat(priceElement.innerText.replace('₹', ''));
			let qytElement = cartBox.querySelectorAll('.cart-qty')[0];
			var quantity = qytElement.value;
			var total = Math.round(total + price * quantity) * 100 / 100;
			document.getElementById('totalAmount').innerText = '₹' + total;
		}	
	} else {
		document.getElementById('totalAmount').innerText = '₹0';
	}
    
}
