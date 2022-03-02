export const getGoods = () => {
  const links = document.querySelectorAll('.navigation-link');
  const more = document.querySelector('.more'); //buton All-view

  const renderGoods = (goods) => {
    //получим контейнер наших карточек
    const goodsContainer = document.querySelector('.long-goods-list');
    //уберем все карточки из верстки чтобы новые не добавлялись к имеющимся
    goodsContainer.innerHTML = '';
    //переберем все товары из  массива goods и создадим карточки товаров для каждого элемента  good
    goods.forEach((good) => {
      //  создадим элемент , новый блок
      const goodBlock = document.createElement('div');
      // добавим ему классы из нашей верстки
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
      //в контейнер добавим новую карточку - элемент - блок
      goodsContainer.append(goodBlock);
      // и так для каждого элемента полученного в аргумент массива
    });
  };

  const getData = (value, category) => {
    //подключимся и получим данные с сервера
    fetch('https://test-willber-default-rtdb.firebaseio.com/db.json') //// /db/db.json
      .then((response) => response.json()) //ответ в виде обьекта response
      //чтобы извлечь данные применим метод json()
      .then((data) => {
        //применим метод фильтр, отфильтруем по категориям товары
        //если категория присутствует в верстке  мы фильтруем  data  , если категории нет (undefined) , мы присваиваем переменной array полный список data
        const array = category ? data.filter((item) => item[category] === value) : data;
        localStorage.setItem('goods', JSON.stringify(array));
        // свойство window.location.href для перехода на другую страницу
        if (window.location.pathname !== '/goods.html') {
          window.location.href = '/goods.html'; //переведет нас на страницу goods.html
        } else {
          renderGoods(array);
        }
        // при переходе на goods нужно запускать рендер и отпрвлять в рендер тот массив который лежит в localStorage
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
  // wievAll added homework connect button  in site imdex.html
  if (more) {
    more.addEventListener('click', (e) => {
      e.preventDefault();
      getData();
    });
  }
};
