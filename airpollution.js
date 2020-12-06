const searchInput =  document.getElementById('input');
const searchButton = document.getElementById('submit');
const wrapper = document.getElementById('wrapper');


let latitude;
let longitude;

function addCard() {

    let searchValue = searchInput.value;



    fetch(`http://api.positionstack.com/v1/forward?access_key=30461e3d939eb3f770a5560ea8a3bd51&query=` + searchValue )

    .then((response) => {
        return response.json();
      })
      .then((data) => {
       

        let file = data;
        latitude = file.data[0].latitude;
        longitude = file.data[0].longitude; 
        


        fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=` + latitude + `&lon=` + longitude + `&appid=995e325e5959ba5c700518b15a9562d7`)

      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        let pollutionFile = data;
        console.log(pollutionFile)
        
      
      })


      })

    
     
}
     


      
      
        


searchButton.addEventListener('click', addCard) ;