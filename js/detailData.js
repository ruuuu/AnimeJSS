// страница самог аниме
const detailData = () => {

   //отрисовка категрий в верхнем меню:
   const renderGanreList = (ganres) => {
      const dropdown = document.querySelector('.header__menu .dropdown');  // ul
      dropdown.textContent = '';

      ganres.forEach((ganre) => {
         const li = document.createElement('li');
         const a = document.createElement('a');
         li.append(a);
         a.textContent = ganre;
         dropdown.append(li);
         a.href = `./categories.html?ganre=${ganre}`;
      });

   }



   // отрисовка инфы об аниме:
   const renderAnimeDetails = (array, itemId) => {   

      const animeObj = array.find((item) => {  // вернет элемент удовлеворяющий условию
         return item.id == itemId;  // используем двойное равенвство, тк itemId - строка, id- число
      });

      console.log('animeObj ', animeObj)
      const imageBlock = document.querySelector('.anime__details__pic');
      const viewsBlock = imageBlock.querySelector('.view');
      // anime__details__title
      const titleBlock = document.querySelector('.anime__details__title');
      const subTitleBlock = document.querySelector('.anime__details__title');

      viewsBlock.innerHTML = '';
      viewsBlock.insertAdjacentHTML('beforeend', `<i class="fa fa-eye"></i> ${animeObj.views}`);

     
      if(animeObj){
         imageBlock.dataset.setbg = animeObj.image;  // задаем значение дата-атрибуту data-setbg

         document.querySelectorAll('.set-bg').forEach((elem) => {
   
            elem.style.backgroundImage = `url(${imageBlock.dataset.setbg})`;
         });
      }
      else{
         console.log('Аниме отсутствует')
      }
     
   }



  

 

   //  ./db.json
   //      https://animejs-5b7c7-default-rtdb.firebaseio.com/db.json
   fetch('./db.json')    
      .then((response) => { // когда данные с сервера вернуться, запуститься then()-асинхронный метод
         return response.json();
      })
      .then((data) => {   // data - response.json()
         
         const ganres = new Set();  // коллекция {}, хранит уникальные значения
         
         //console.log(window.location.search)  // ?itemId = %lkjglkjghglkjghglkjghghg%
         const genreParams = new URLSearchParams(window.location.search).get('itemId');    // извлекаем search параметр itemId из урла

         
         //data.db
         // data.anime.forEach((item) => {    // ganres = {'Приключения', 'Фэнтези', 'Истия', 'Сенен', 'Детектив', ''}
         //    ganres.add(item.ganre);   
         // });
        

         // //                data.db
         // const sortArray = data.anime.sort((a, b) => { // сортировка по убыванию
         //    return b.views - a.views;
         // });
        
         if(genreParams){
            renderAnimeDetails(data.anime, genreParams);
         }else{
            console.log('test')
         }
         
         renderGanreList(ganres);            // отрисовка меню категроий(вверху)
         
      });



}


detailData();