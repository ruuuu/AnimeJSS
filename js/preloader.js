const preloader = () => {

   const preloder = document.querySelector('.preloder');

   preloder.classList.add('active');


   setTimeout(() => {
      preloder.classList.remove('active');
   }, 500)  // через 500 мс запустится коллбэк-фукнция

}


preloader();