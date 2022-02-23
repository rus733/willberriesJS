const cart = () => {
  const cartBtn = document.querySelector('.button-cart');
  const cart = document.querySelector('#modal-cart'); //modal-close
  const closeBtn = cart.querySelector('.modal-close');
  const overlay = document.querySelector('.overlay');

  cartBtn.addEventListener('click', () => {
    cart.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    cart.style.display = '';
  });

  cart.addEventListener('click', (e) => {
    if (!e.target.closest('.modal')) {
      cart.style.display = '';
    }
  });
};
cart();
