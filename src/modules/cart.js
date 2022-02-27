export const cart = () => {
  const cartBtn = document.querySelector('.button-cart');
  const cart = document.querySelector('#modal-cart');
  const closeBtn = cart.querySelector('.modal-close');
  const goodsContainer = document.querySelector('.long-goods-list'); //контейнер в котором сформированы карточки

  if (goodsContainer) {
    console.log('ecti');
  } else {
    console.log('HeT');
  }
  cartBtn.addEventListener('click', () => {
    cart.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    cart.style.display = '';
  });
  //close popup by click to overlay
  cart.addEventListener('click', (e) => {
    if (!e.target.closest('.modal')) {
      cart.style.display = '';
    }
  });
};
