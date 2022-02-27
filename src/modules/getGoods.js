export const getGoods = () => {
  const links = document.querySelectorAll('.navigation-link');
  const more = document.querySelector('.more'); //buton All-view

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

  const getData = (value, category) => {
    //подключимся и получим данные с сервера
    fetch('https://test-willber-default-rtdb.firebaseio.com/db.json') //// /db/db.json
      .then((response) => response.json()) //ответ в виде обьекта response
      //чтобы извлечь данные применим метод json()
      //можно использовать метод text(), ответ придет в виде одной строки
      //но нам нужен обьект , поэтому используем метод json().массив с данными
      //data получено с сервера
      //data кладем в локалСторедж, преобразовав в строку с ключом goods
      //теперь извлекли из локалСторедж преобразовав в массив
      // const dataLocal = JSON.parse(localStorage.getItem('goods'));
      //   console.log('dataLocal: ', dataLocal);
      //совпадают полностью с data полученными из сервера Firebase

      .then((data) => {
        //применим метод фильтр, отфильтруем по категориям товары
        //если категория присутствует в верстке  мы фильтруем  data  , если категории нет (undefined) , мы присваиваем переменной array полный список data
        const array = category ? data.filter((item) => item[category] === value) : data;
        localStorage.setItem('goods', JSON.stringify(array));

        // свойство window.location.href для перехода на другую страницу
        // раскроем обьект window.location
        //console.log(window.location);
        // и найдем там свойство pathname: если оно не равно  "/goods.html"
        //то переходим на страницу goods  window.location.href = '/goods.html';
        // а   если мы на странице goods то нам нужно получать данные и отрисовывать их
        if (window.location.pathname !== '/goods.html') {
          window.location.href = '/goods.html'; //переведет нас на страницу goods.html
        } else {
          renderGoods(array);
        }
        // при переходе на гооодс нужно запускать рендер и отпрвлять в рендер тот массив который лежит в локал сторедж
      });
  };

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const linkValue = link.textContent;
      //извлечем из верстки значение атрибута data-field равное иди gender или category
      //  при помощи метода dataset
      const category = link.dataset.field;

      getData(linkValue, category);
    });
  });
  // если чтото есть в локолстор  под ключом гуудс  и страница goods.html' то запускаем рендер
  if (localStorage.getItem('goods') && window.location.pathname === '/goods.html') {
    renderGoods(JSON.parse(localStorage.getItem('goods')));
  }

  if (more) {
    more.addEventListener('click', () => {
      console.log(1212121);
    });
  }

  //обратимся к глобальному  обьекту localStorage
  //внесем информацию в локал сторедж в ввиде строки ,
  //преобразовать данные(обьект, массив ) в строку
  //  нам поможет метод глобального обьекта JSON stringify()

  // localStorage.setItem('goods', JSON.stringify([1, 2, 3, 4, 5]));

  // //мы можем получить ее из локалсторедж с помощью getItem()

  // console.log(`получено из localStorage.getItem('goods') === ${localStorage.getItem('goods')}`);

  // const goods = JSON.parse(localStorage.getItem('goods'));

  // console.log(`получено из localStorage и преобразовано к исходному виду JSON.parse(localStorage.getItem('goods')) === `, goods);

  // // рассмотрим метод удаления  данных из локал сторедж
  // console.log('до удаления localStorage: ', localStorage);
  // localStorage.removeItem('goods');
  // console.log('после удаления localStorage: ', localStorage);
};
