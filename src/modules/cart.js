export const cart = () => {
  const cartBtn = document.querySelector('.button-cart');
  const cart = document.querySelector('#modal-cart');
  const closeBtn = cart.querySelector('.modal-close');
  const goodsContainer = document.querySelector('.long-goods-list');
  const cartTable = document.querySelector('.cart-table__goods');
  const modalForm = document.querySelector('.modal-form');
  const cardTableTotal = document.querySelector('.cart-table__total');
  let sum = 0;

  const getFromStorage = (name) => {
    return localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : [];
  };

  const updateSum = () => {
    const cart = getFromStorage('cart');
    sum = 0;
    cart.forEach((item) => {
      return (sum += Number(item.price) * Number(item.count));
    });
    cardTableTotal.textContent = `${sum}$`;
  };

  const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart.filter((good) => {
      return good.id !== id;
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  };

  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart.map((good) => {
      if (good.id === id) {
        good.count++;
      }
      return good;
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  };

  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart.map((good) => {
      if (good.id === id) {
        if (good.count > 1) {
          good.count--;
        }
      }
      return good;
    });

    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  };

  const addToCart = (id) => {
    const goods = JSON.parse(localStorage.getItem('goods'));
    const clickedGood = goods.find((good) => good.id === id);
    const cart = getFromStorage('cart');
    if (cart.some((good) => good.id === clickedGood.id)) {
      cart.map((good) => {
        if (good.id === clickedGood.id) {
          good.count++;
        }
        return good;
      });
    } else {
      clickedGood.count = 1;
      cart.push(clickedGood);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const renderCartGoods = (goods) => {
    cartTable.innerHTML = '';
    goods.forEach((good) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
      <td>${good.name}</td>
						<td>${good.price}$</td>
						<td><button class="cart-btn-minus"">-</button></td>
						<td>${good.count}</td>
						<td><button class="cart-btn-plus"">+</button></td>
						<td>${+good.price * +good.count}$</td>
						<td><button class="cart-btn-delete"">x</button></td>
      `;
      cartTable.append(tr);

      tr.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-btn-minus')) {
          minusCartItem(good.id);
        } else if (e.target.classList.contains('cart-btn-plus')) {
          plusCartItem(good.id);
        } else if (e.target.classList.contains('cart-btn-delete')) {
          deleteCartItem(good.id);
        }
      });
    });
    updateSum();
  };

  const sendForm = () => {
    const cartArray = getFromStorage('cart');
    const inputName = modalForm.querySelector('[name = "nameCustomer"]');
    const inputPhone = modalForm.querySelector('[name = "phoneCustomer"]');

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        cart: cartArray,
        name: inputName.value,
        phone: inputPhone.value,
        total: sum,
      }),
    }).then(() => {
      setTimeout(() => {
        cart.style.display = '';
        localStorage.removeItem('cart');
      }, 3000);
      inputName.value = '';
      inputPhone.value = '';
      sum = 0;
    });
  };
  // button send Form
  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendForm();
  });
  cartBtn.addEventListener('click', () => {
    const cartArray = getFromStorage('cart');
    renderCartGoods(cartArray);
    cart.style.display = 'flex';
  });
  //close popup
  closeBtn.addEventListener('click', () => {
    cart.style.display = '';
  });
  //close popup by click to overlay
  cart.addEventListener('click', (e) => {
    if (!e.target.closest('.modal') && e.target.classList.contains('overlay')) {
      cart.style.display = '';
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      cart.style.display = '';
    }
  });

  if (goodsContainer) {
    goodsContainer.addEventListener('click', (e) => {
      if (e.target.closest('.add-to-cart')) {
        const buttonToCart = e.target.closest('.add-to-cart');
        const goodId = buttonToCart.dataset.id;
        addToCart(goodId);
      }
    });
  }
};
