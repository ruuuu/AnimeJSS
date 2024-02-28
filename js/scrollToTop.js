// плавный скролл: для этого испрользуем библиотеку https://www.npmjs.com/package/seamless-scroll-polyfill
const scrollToTop = () => {

   const scrollToTopButton = document.querySelector('#scrollToTopButton');

   scrollToTopButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      //console.log(' evt ',  evt)

      // 1-ый способ: не везде работает:
      // window.scrollTo({
      //    top: 0,
      //    behavior: 'smooth'  // плавный скролл
      // });

      // 2-ой способ: с испольованием билиотеки:
      seamless.scrollIntoView(document.querySelector(".header"), {  // скроллим к элементу с классом .header
         behavior: "smooth",
         block: "center",
         inline: "center",
      });

   });


}


scrollToTop();