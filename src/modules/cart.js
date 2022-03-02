export const cart = () => {
  const cartBtn = document.querySelector('.button-cart');
  const cart = document.querySelector('#modal-cart');
  const closeBtn = cart.querySelector('.modal-close');
  //контейнер в котором сформированы карточки
  const goodsContainer = document.querySelector('.long-goods-list');
  const cartTable = document.querySelector('.cart-table__goods');
  const modalForm = document.querySelector('.modal-form');
  const cardTableTotal = document.querySelector('.cart-table__total');
  let totalSum = 0; //обозначим сумму товаров в корзине

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
        if (good.count > 0) {
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
    //для поиска кликнутого товарар воспользумся методом find
    const clickedGood = goods.find((good) => good.id === id);
    // проверим , есть ли корзина в локал сторедж , если есть считаем ее , если нет образуем ее в виде пустого массива
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    if (cart.some((good) => good.id === clickedGood.id)) {
      // перебираем все товары и возвращаем их
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
    //запишем изменения в локал сторедж
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  // рендер
  const renderCartGoods = (goods) => {
    cartTable.innerHTML = '';
    totalSum = 0;
    //let totalSum = 0; //обозначим сумму товаров в корзине
    //переберем массив goods из корзины(локал сторедж) и сформируем верстку
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
      //подсчет суммы товаров в корзине
      return (totalSum = totalSum + +good.price * +good.count);
    });

    if (cardTableTotal) {
      cardTableTotal.textContent = `${totalSum}$`;
    }
    return totalSum;
  };

  // ф отправки форм
  //отправит на тестовое апи весь обьект карт
  const sendForm = () => {
    const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    const inputName = modalForm.querySelector('[name = "nameCustomer"]');
    const inputPhone = modalForm.querySelector('[name = "phoneCustomer"]');

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        cart: cartArray,
        name: inputName.value,
        phone: inputPhone.value,
        total: totalSum,
      }),
    }).then(() => {
      setTimeout(() => {
        cart.style.display = '';
        localStorage.removeItem('cart');
      }, 3000);
      inputName.value = '';
      inputPhone.value = '';
      totalSum = 0;
    });
  };

  // кнопка отправки формы
  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendForm();
  });

  //при открытии мобильного окна , необходимо вносить с таблицу данные из cart в localStoredg
  cartBtn.addEventListener('click', () => {
    //получим данные из localStorage
    const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    renderCartGoods(cartArray); //рендер товара в корзинеиз локал сторедж

    cart.style.display = 'flex';
  });
  //close popup
  closeBtn.addEventListener('click', () => {
    cart.style.display = '';
  });
  //close popup by click to overlay
  cart.addEventListener('click', (e) => {
    //добавили , чтоб не закрывалась корзина && e.target.classList.contains('overlay')
    if (!e.target.closest('.modal') && e.target.classList.contains('overlay')) {
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
