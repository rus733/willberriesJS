const search = () => {
  //
  const input = document.querySelector('.search-block > input');
  const searchBtn = document.querySelector('.search-block > button');

  const renderGoods = (goods) => {
    //получим контейнер наших карточек
    const goodsContainer = document.querySelector('.long-goods-list');
    goodsContainer.innerHTML = ''; //уберем все карточки из верстки
    //переберем все товары из  массива
    goods.forEach((good) => {
      // теперь создадим элемент , новый блок
      const goodBlock = document.createElement('div');

      goodBlock.classList.add('col-lg-3');
      goodBlock.classList.add('col-sm-6');
      //теперь в этот блок запишем верстку каждой карточки товара
      //мы  предварительно очистили верстку goodsContainer.innerHTML = ''
      goodBlock.innerHTML = ` 
            <div class="goods-card">
                <span class="label ${good.label ? null : 'd-none'} ">${good.label}</span>
                <img src="db/${good.img}" alt="image: ${good.name}" class="goods-image">
                <h3 class="goods-title">${good.name}</h3>
                <p class="goods-description">${good.description}</p>
                <button class="button goods-card-btn add-to-cart" data-id="${good.id}">
                  <span class="button-price">$${good.price}</span>
                </button>
            </div>          
      `;
      goodsContainer.append(goodBlock);
    });
  };

  const getData = (value) => {
    //подключимся и получим данные с сервера
    fetch('https://test-willber-default-rtdb.firebaseio.com/db.json')
      .then((response) => response.json()) //ответ в виде обьекта response
      .then((data) => {
        // мы присваиваем переменной array значение data
        const array = data.filter((good) => good.name.toLowerCase().includes(value.toLowerCase()));
        //console.log(value);
        localStorage.setItem('goods', JSON.stringify(array));
        // а   если мы на странице goods то нам нужно получать данные и отрисовывать их
        if (window.location.pathname !== '/goods.html') {
          window.location.href = '/goods.html'; //переведет нас на страницу goods.html
        } else {
          renderGoods(array);
        }
        // при переходе на гооодс нужно запускать рендер и отпрвлять в рендер тот массив который лежит в локал сторедж
      });
  };

  //так как при переходе на страницу goods.html на кнопке search отсутствует класс search-block чтобы не было ошибки б которая блокирует скрипт, применим конструкцию try catch
  try {
    searchBtn.addEventListener('click', () => {
      getData(input.value);
    });
  } catch (e) {
    // console.log('верните класс кнопки ', e);
    // console.dir(e);
    console.error(e.message);
    console.error('Уважаемый верстальщик , верните класс пожалуйста');
  }
};
search();
