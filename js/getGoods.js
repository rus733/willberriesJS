const getGoods = () => {
  const links = document.querySelectorAll('.navigation-link');
  //console.log('links: ', links);

  const getData = () => {
    //подключимся и получим данные с сервера
    fetch('https://test-willber-default-rtdb.firebaseio.com/db.json')
      .then((response) => response.json()) //ответ в виде обьекта response
      //чтобы извлечь данные применим метод json()
      //можно использовать метод text(), ответ придет в виде одной строки
      //но нам нужен обьект , поэтому используем метод json().массив с данными

      .then((data) => {
        console.log('data: ', data); //дата получено с сервера
        //дата кладем в локалСторедж, преобразовав в строку
        localStorage.setItem('data', JSON.stringify(data));
        //теперь извлекли из локалСторедж
        const dataLocal = JSON.parse(localStorage.getItem('data'));
        console.log(dataLocal); //совпадают полностью с полученными из сервера
      });
  };

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      getData(e.target.textContent);
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
