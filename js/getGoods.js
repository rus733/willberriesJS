const getGoods = () => {
  const links = document.querySelectorAll('.navigation-link');

  const renderGoods = (goods) => {
    console.log(goods);
  };

  const getData = (value, category) => {
    //подключимся и получим данные с сервера
    fetch('https://test-willber-default-rtdb.firebaseio.com/db.json')
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

        // свойство window.location.href для переххода на другую страницу
        window.location.href = '/goods.html';
        console.log(window.location.href);
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
getGoods();
