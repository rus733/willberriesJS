const search = () => {
  //
  const input = document.querySelector('.search-block > input');
  const searchBtn = document.querySelector('.search-block > button');
  //так как при переходе на страницу goods.html на кнопке search отсутствует класс search-block чтобы не было ошибки б которая блокирует скрипт, применим конструкцию try catch
  try {
    searchBtn.addEventListener('click', () => {
      console.log(input.value);
    });
  } catch (e) {
    console.log('верните класс кнопки ', e);
    console.log(e.message);
    console.error(e.message);
    console.error('Уважаемый верстальщик , верните класс пожалуйста');
  }
};
search();
