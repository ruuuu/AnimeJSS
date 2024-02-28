const mainData = () => {

  // всатвить урл из firebase
   fetch('./db.json')
      .then((response) => { // когда данные с сервера вернуться, запуститься then()-асинхронный
         //console.log(response)

         return response.json();
      })
      .then((data) => {   // data - response.json()
         console.log(data.anime)
      })


}



mainData();