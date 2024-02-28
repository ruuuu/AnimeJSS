const bgElements = () => {

   const elements = document.querySelectorAll('.set-bg');


   for(let i = 0; i < elements.length; i++){
      //console.dir(elements[i]);
   
      const src = elements[i].dataset.setbg;  // получаем значение дата атрибута data-setbg
      
      //elements[i].style.backgroundImage = 'url(' + src + ')';
      elements[i].style.backgroundImage = `url(${src})`;
      //console.dir(elements[i])
   }
   
}


bgElements();