const mainData = () => {

  // всатвить урл из firebase
  //     ./db.json
   fetch('https://animejs-5b7c7-default-rtdb.firebaseio.com/db.json')
      .then((response) => { // когда данные с сервера вернуться, запуститься then()-асинхронный
         //console.log(response)

         return response.json();
      })
      .then((data) => {   // data - response.json()
         console.log(data)
      })


}



mainData();