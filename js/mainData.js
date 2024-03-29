const mainData = () => {

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



// отрисовка карточек:
const renderAnimeList = (array, ganres) => {  // 6 жанров

   const wrapper = document.querySelector('.product .col-lg-8');
   //wrapper.innerHTML = '';


   ganres.forEach((ganre) => {      // ganres = {'Приключения', 'Фэнтези', 'Истия', 'Сенен', 'Детектив'}
     const productBlock = document.createElement('div');
     const listBlock = document.createElement('div');
     listBlock.classList.add('row');


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

      productBlock.classList.add('mb-5')  // mb-5 (margin-bottom: 5px) класс бутстрапа

      const filterArray = array.filter((item) => {  // вернет новый массив карточек []
         return item.ganre === ganre;
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

         console.log(tagsBlock)

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

   setTimeout(() => {
      preloder.classList.remove('active');
   }, 500)  // через 500 мс запустится коллбэк-фукнция

}



// отрисовка карточек в sidebar:
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

      elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
   });

}



   
   //      https://animejs-5b7c7-default-rtdb.firebaseio.com/db.json
   fetch('./db.json')    
      .then((response) => { // когда данные с сервера вернуться, запуститься then()-асинхронный
         return response.json();
      })
      .then((data) => {   // data - response.json()
         console.log('data.anime ', data.anime)
         const ganres = new Set();  // коллекция {}, хранит уникальные значения
      
         //data.db
         data.anime.forEach((item) => {
            ganres.add(item.ganre);   
         });
         // ganres = {'Приключения', 'Фэнтези', 'Истия', 'Сенен', 'Детектив', ''}

         //                data.db
         const sortArray = data.anime.sort((a, b) => { // сортировка по убыванию
            return b.views - a.views;
         });
         //              data
         renderAnimeList(data.anime, ganres);
         renderTopAnime(sortArray.slice(0, 5));  // slice(startIndex, endIndex) вырезает часть массива
         renderGanreList(ganres); // отрисовка меню категроий
         
      });


}



mainData();