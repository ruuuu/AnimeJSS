const mainData = () => {

   const renderAnimeList = (array, ganres) => {  // 6 жанров


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

 

  //     ./db.json
   fetch('https://animejs-5b7c7-default-rtdb.firebaseio.com/db.json')    // всатвить урл из firebase
      .then((response) => { // когда данные с сервера вернуться, запуститься then()-асинхронный
         return response.json();
      })
      .then((data) => {   // data - response.json()

         const ganres = new Set();  // коллекция, хранит уникальные значения




         const sortArray = data.sort((a, b) => { // сортировка по убыванию
            return b.views - a.views;
         });

         renderTopAnime(sortArray.slice(0, 5));  // slice(startIndex, endIndex) вырезает часть массива

         
      })


}



mainData();