const bgElements = () => {

   const elements = document.querySelectorAll('.set-bg');


  
   elements.forEach((item) => {

      const src = item.dataset.setbg; 
      item.style.backgroundImage = `url(${src})`;
   });


  
}


bgElements();



// const array = [
//    {
//       id: 0,
//       value: 100
//    },
//    {
//       id: 1,
//       value: 300
//    },
//    {
//       id: 2,
//       value: 200
//    },
// ];

// const newArray = array.sort((a, b) => { // сортирует 
//    return a.value - b.value;
// });
