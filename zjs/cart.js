const cart = () => {
  const cartBtn = document.querySelector('.button-cart');
  const cart = document.querySelector('#modal-cart');
  const closeBtn = cart.querySelector('.modal-close');

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
    //add close popup by key "Escape"
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        cart.style.display = '';
      }
    });
  });
};
