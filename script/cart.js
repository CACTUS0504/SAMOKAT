const productsBtn = document.querySelectorAll('.product__btn');
const cartProductsList = document.querySelector('.cart-content__list');
const cart = document.querySelector('.cart');
const cartQuantity = cart.querySelector('.cart__quantity');
const fullPrice = document.querySelector('.fullprice');
let price = 0;
const randomId = () => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const clearPrice = (str) => {
	return str.replace(/\s/g, '');
};

const finalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const add = (currPrice) => {
	return price += currPrice;
};

const minus = (currPrice) => {
	return price -= currPrice;
};

const printKolvo = () => {
	let productsListLength = cartProductsList.querySelector('.simplebar-content').children.length;
	cartQuantity.textContent = productsListLength;
	productsListLength > 0 ? cart.classList.add('active') : cart.classList.remove('active');
};

const printPrice = () => {
	fullPrice.textContent = `${finalPrice(price)} ₽`;
};

const generateCartProduct = (img, title, price, id) => {
	return `
		<li class="cart-content__item">
			<article class="cart-content__product cart-product" data-id="${id}">
				<img src="${img}" alt="" class="cart-product__img">
				<div class="cart-product__text">
					<h3 class="cart-product__title">${title}</h3>
					<span class="cart-product__price">${finalPrice(price)}</span>
				</div>
				<button class="cart-product__delete" aria-label="Удалить"></button>
			</article>
		</li>
	`;
};

const deleteProducts = (productParent) => {
	let id = productParent.querySelector('.cart-product').dataset.id;
	document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn').disabled = false;
	
	let currPrice = parseInt(clearPrice(productParent.querySelector('.cart-product__price').textContent));
	minus(currPrice);
	printPrice();
	productParent.remove();

	printKolvo();
};

productsBtn.forEach(el => {
	el.closest('.product').setAttribute('data-id', randomId());

	el.addEventListener('click', (e) => {
		let self = e.currentTarget;
		let parent = self.closest('.product');
		let id = parent.dataset.id;
		let img = parent.querySelector('.product-image img').getAttribute('src');
		let title = parent.querySelector('.product__title').textContent;
		let priceString = clearPrice(parent.querySelector('.product-price__current').textContent);
		let priceNumber = parseInt(clearPrice(parent.querySelector('.product-price__current').textContent));

		add(priceNumber);

		printPrice();

		cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id));
		printKolvo();

		
		self.disabled = true;
	});
});

cartProductsList.addEventListener('click', (e) => {
	if (e.target.classList.contains('cart-product__delete')) {
		deleteProducts(e.target.closest('.cart-content__item'));
	}
});