// страница самого аниме
const detailData = () => {

   const preloder = document.querySelector('.preloder');  //вклюаем прелоадер
   

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
      const titleBlock = document.querySelector('.anime__details__title h3');
      const subTitleBlock = document.querySelector('.anime__details__title span');
      const descriptionBlock = document.querySelector('.anime__details__text p');
      const widgetList = document.querySelectorAll('.anime__details__widget ul li');
      const breadcrumb = document.querySelector('.breadcrumb__links span');


      if(animeObj){
         imageBlock.dataset.setbg = animeObj.image;  // задаем значение дата-атрибуту data-setbg

         viewsBlock.innerHTML = '';
         viewsBlock.insertAdjacentHTML('beforeend', `<i class="fa fa-eye"></i> ${animeObj.views}`);

         titleBlock.textContent = animeObj.title;
         subTitleBlock.textContent = animeObj['original-title'];  // тк составное свойсвто поэтому берем  в квадратные скобки
         descriptionBlock.textContent = animeObj.description;

         widgetList[0].insertAdjacentHTML('beforeend', `
            <span>Date aired:</span> ${animeObj.date}
         `);
         widgetList[1].insertAdjacentHTML('beforeend', `
            <span>Rating:</span> ${animeObj.rating}
         `);
         widgetList[2].insertAdjacentHTML('beforeend', `
            <span>Genre:</span> ${animeObj.tags.join(", ")}  <!-- получаем строку из массива элементво разделенные запятой и пробелом ->
         `);

         breadcrumb.textContent = animeObj.ganre;

         document.querySelectorAll('.set-bg').forEach((elem) => {
   
            elem.style.backgroundImage = `url(${imageBlock.dataset.setbg})`;
         });

         setTimeout(() => { // отклюаем прелоадер
            preloder.classList.remove('active');
         }, 500)  // через 500 мс запустится коллбэк-фукнция
      

      }
      else{
         console.log('Аниме отсутствует')
      }
     
   }


   
   //      https://animejs-5b7c7-default-rtdb.firebaseio.com/db.json
   fetch('./db.json')    
      .then((response) => { // когда данные с сервера вернуться, запуститься then()-асинхронный метод
         return response.json();
      })
      .then((data) => {   // data - response.json()
         
         const ganres = new Set();  // коллекция {}, хранит уникальные значения
         
         //console.log(window.location.search)  // ?itemId = %lkjglkjghglkjghglkjghghg%
         const genreParams = new URLSearchParams(window.location.search).get('itemId');    // извлекаем search параметр itemId из урла

         
        
        
         if(genreParams){
            renderAnimeDetails(data.anime, genreParams);
         }else{
            console.log('test')
         }
         
         renderGanreList(ganres);            // отрисовка меню категроий(вверху)
         
      });

}


detailData();