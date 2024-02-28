const mainData = () => {

   const renderAnimeList = (array, ganres) => {  // 6 жанров

      const wrapper = document.querySelector('.product .col-lg-8');
      wrapper.innerHTML = '';


      ganres.forEach((ganre) => {      // ganres = {'Приключения', 'Фэнтези', 'Истия', 'Сенен', 'Детектив', ''}
        const productBlock = document.createElement('div');
        const listBlock = document.createElement('div');
        listBlock.classList.add('row');


         productBlock.insertAdjacentHTML('afterbegin', `
            <div class="row">
               <div class="col-lg-8 col-md-8 col-sm-8">
                  <div class="section-title">
                     <h4> ${ganre} </h4>
                  </div>
               </div>
               <div class="col-lg-4 col-md-4 col-sm-4">
                  <div class="btn__all">
                     <a href="/categories.html" class="primary-btn">View All <span class="arrow_right"></span></a>
                  </div>
               </div>
            </div>        
         `);

         productBlock.classList.add('mb-5')

         const filterArray = array.filter((item) => {
            return item.ganre === ganre;
         })

         filterArray.forEach((item)=>{
            console.log(item)
            listBlock.insertAdjacentHTML('afterbegin', `
               <div class="col-lg-4 col-md-6 col-sm-6">
                  <div class="product__item">
                     <div class="product__item__pic set-bg" data-setbg="${item.image}">
                        <div class="ep"> ${item.rating} / 10 </div>
                        <div class="view"><i class="fa fa-eye"></i> ${item.views} </div>
                     </div>
                     <div class="product__item__text">
                        <ul>
                           ${item.tags}.forEach((tag)=>{
                              const li = document.createElement('li');
                              li.textContent = tag;
                           })
                        </ul>
                        <h5><a href="/anime-details.html"> ${item.title} </a></h5>
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




   const renderTopAnime = (array) => {

      const wrapper = document.querySelector('.filter__gallery');
      wrapper.innerHTML = '';    // очищаем контейнер

      array.forEach((item) => {
       
         wrapper.insertAdjacentHTML('afterbegin', `
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

         const ganres = new Set();  // коллекция {}, хранит уникальные значения
         data.db.forEach((item) => {
            ganres.add(item.ganre);   
         });
         // ganres = {'Приключения', 'Фэнтези', 'Истия', 'Сенен', 'Детектив', ''}

         renderAnimeList(data.db, ganres);


         
         const sortArray = data.db.sort((a, b) => { // сортировка по убыванию
            return b.views - a.views;
         });

         renderTopAnime(sortArray.slice(0, 5));  // slice(startIndex, endIndex) вырезает часть массива

         
      })


}



mainData();