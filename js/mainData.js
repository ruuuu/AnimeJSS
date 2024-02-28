const mainData = () => {

  // всатвить урл из firebase
  //     ./db.json
   fetch('https://anime-d6a5d-default-rtdb.firebaseio.com/')
      .then((response) => { // когда данные с сервера вернуться, запуститься then()-асинхронный
         //console.log(response)

         return response.json();
      })
      .then((data) => {   // data - response.json()
         console.log(data.anime)
      })


}



mainData();