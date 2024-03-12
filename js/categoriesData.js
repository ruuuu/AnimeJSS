// отрисовка кртчоек аниме по категориям
const categoriesData = () => {

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



   // отрисовка карточек:
   const renderAnimeList = (array, ganres) => {   // ganres = {'Приключения', 'Фэнтези', 'Истия', 'Сенен', 'Детектив'}

      const wrapper = document.querySelector('.product-page .col-lg-8');
      //wrapper.innerHTML = '';


      ganres.forEach((ganre) => { 
         const productBlock = document.createElement('div');
         const listBlock = document.createElement('div');
         listBlock.classList.add('row');
         productBlock.classList.add('mb-5')  // mb-5 (margin-bottom: 5px) класс бутстрапа

         productBlock.insertAdjacentHTML('beforeend', `
            <div class="row">
               <div class="col-lg-8 col-md-8 col-sm-8">
                  <div class="section-title">
                     <h4> ${ganre} </h4>
                  </div>
               </div>
               <div class="col-lg-4 col-md-4 col-sm-4">
                  <div class="btn__all">
                     <a href="/categories.html?ganre=${ganre}" class="primary-btn">View All <span class="arrow_right"></span></a>
                  </div>
               </div>
            </div>        
         `);

       

         const filterArray = array.filter((item) => {  // вернет новый массив карточек, элментыам масива будут те корые подходят под условие, с определенной категорией
            return item.tags.includes(ganre);
         });

         //console.log('filterArray ', filterArray)


         filterArray.forEach((item) => {
            // console.log(item)
            const tagsBlock = document.createElement('ul');
            item.tags.forEach((tag) => {
               tagsBlock.insertAdjacentHTML('beforeend', `
                  <li> ${tag} </li>
               `);
            });

            

            listBlock.insertAdjacentHTML('beforeend', `
               <div class="col-lg-4 col-md-6 col-sm-6">
                  <div class="product__item">
                     <div class="product__item__pic set-bg" data-setbg="${item.image}">
                        <div class="ep"> ${item.rating} / 10 </div>
                        <div class="view"><i class="fa fa-eye"></i> ${item.views} </div>
                     </div>
                     <div class="product__item__text">
                        ${tagsBlock.outerHTML} <!-- включает не только <li>, но и <ul></ul> -->
                        <h5><a href="/anime-details.html?itemId=${item.id}"> ${item.title} </a></h5>  <!-- itemId добавили чтобы считывать данные из урла при открытии станицы -->
                     </div>
                  </div>
               </div>
            `);
         })
       
         productBlock.append(listBlock);
         wrapper.append(productBlock);

         wrapper.querySelectorAll('.set-bg').forEach((elem) => {
   
            elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
         });
      })

   }



   // отрисовка карточек в sidebar(правая часть):
   const renderTopAnime = (array) => {

      const wrapper = document.querySelector('.filter__gallery');
      wrapper.innerHTML = '';    // очищаем контейнер

      array.forEach((item) => {
       
         wrapper.insertAdjacentHTML('beforeend', `
               <div class="product__sidebar__view__item set-bg mix" data-setbg="${item.image}">
                  <div class="ep"> ${item.rating} / 10 </div>
                  <div class="view"><i class="fa fa-eye"></i> ${item.views} </div>
                  <h5><a href="/anime-details.html"> ${item.title} </a></h5>
               </div>
            `  
         );
      });


      wrapper.querySelectorAll('.set-bg').forEach((elem) => {
   
         elem.style.backgroundImage = `url(${elem.dataset.setbg})`;  // значение дата-атрибута data-setbg
      });

   }

 

   //  ./db.json
   //      https://animejs-5b7c7-default-rtdb.firebaseio.com/db.json
   fetch('./db.json')    
      .then((response) => { // когда данные с сервера вернуться, запуститься then()-асинхронный метод
         return response.json();
      })
      .then((data) => {   // data - response.json()
         
         const ganres = new Set();  // коллекция {}, хранит уникальные значения
         
         //console.log(window.location.search)  // ?ganre = %lkjglkjghglkjghglkjghghg%
         const genreParams = new URLSearchParams(window.location.search).get('ganre');    // извлекаем search параметр ganre из урла

         
         //data.db
         data.anime.forEach((item) => {    // ganres = {'Приключения', 'Фэнтези', 'Истия', 'Сенен', 'Детектив', ''}
            ganres.add(item.ganre);   // добавляем данные в коллекцию ganres
         });
        

         //                data.db
         const sortArray = data.anime.sort((a, b) => { // сортировка по убыванию
            return b.views - a.views;
         });
        
         renderTopAnime(sortArray.slice(0, 5));  // slice(startIndex, endIndex) вырезает часть массива, начиная с элемента  у котрого индекс startIndex по endIndex(не вклчая) 
         if(genreParams){
            renderAnimeList(data.anime, [genreParams]);
         }
         else{
            //              data
            renderAnimeList(data.anime, ganres);
         }
         renderGanreList(ganres);            // отрисовка меню категроий(вверху)
         
      });



}


categoriesData();