const searchInput =  document.getElementById('input');
const searchButton = document.getElementById('submit');
const wrapper = document.getElementById('wrapper');




let latitude;
let longitude;

function addCard() {

    let searchValue = searchInput.value;



    fetch(`https://api.opencagedata.com/geocode/v1/json?q=` + searchValue + `&key=95d35071ec34486aa741096bda8b8463`  )

    .then((response) => {
        return response.json();
      })
      .then((data) => {
       
        console.log(data);
        let file = data;
        latitude = file.results[0].geometry.lat;
        console.log(latitude)
        longitude = file.results[0].geometry.lng;
        


        fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=` + latitude + `&lon=` + longitude + `&appid=995e325e5959ba5c700518b15a9562d7`)

      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        let pollutionFile = data;

        console.log(pollutionFile)

        let airCard = document.createElement('div');
        airCard.classList.add('air-card');
        wrapper.appendChild(airCard);

        let cardHeader = document.createElement('div')
        cardHeader.classList.add('card-header');
        airCard.appendChild(cardHeader);

        let location = document.createElement('p');
        location.classList.add('location');
        cardHeader.appendChild(location);
        location.innerHTML = searchValue;
        
        let bin = document.createElement('div');
        bin.setAttribute = ('bin');
        cardHeader.appendChild(bin);
        bin.innerHTML = '<i class="far fa-trash-alt"></i>';
        bin.addEventListener('click', removeCard);

        
        

        let aqiDescription = document.createElement('p');
        aqiDescription.classList.add('aqi-description');
        airCard.appendChild(aqiDescription);
        aqiDescription.innerHTML = 'something'

        let pollutionWrap = document.createElement('div');
        pollutionWrap.classList.add('pollution-wrap');
        airCard.appendChild(pollutionWrap);

        airQuailtyMeter(pollutionFile.list[0].main.aqi ,aqiDescription, airCard);

        makingAPollutionBox( pollutionFile.list[0].components.co , 'Co', pollutionWrap);
        makingAPollutionBox( pollutionFile.list[0].components.nh3 , 'Nh3',pollutionWrap);
        makingAPollutionBox( pollutionFile.list[0].components.no , 'No',pollutionWrap);
        makingAPollutionBox( pollutionFile.list[0].components.no2 , 'No2',pollutionWrap);
        makingAPollutionBox( pollutionFile.list[0].components.o3, 'o3',pollutionWrap);
        makingAPollutionBox( pollutionFile.list[0].components.pm2_5, 'Pm2_5',pollutionWrap);
        makingAPollutionBox( pollutionFile.list[0].components.pm10, 'Pm10',pollutionWrap);
        makingAPollutionBox( pollutionFile.list[0].components.so2, 'So2',pollutionWrap);



        





      
      
      })


      })

    
    
}
     


      
      
        
function makingAPollutionBox(value,detail,wrap) {

    let pollutionBox = document.createElement('div');
    wrap.appendChild(pollutionBox);
    pollutionBox.classList.add('pollution-box');
   



    let pollutionDetail = document.createElement('p');
    let pollutionValue = document.createElement('p');
    pollutionBox.appendChild(pollutionDetail);
    pollutionBox.appendChild(pollutionValue);
    pollutionDetail.innerHTML = detail;
    pollutionValue.innerHTML = value;


    pollutionDetail.classList.add('pollution-detail');
    pollutionValue.classList.add('pollution-value');



}


    

    function airQuailtyMeter(rating,source,card) {

        if(rating === 1){
            source.innerHTML = 'Good';
            card.style.background = 'linear-gradient(0deg, rgba(0,162,151,1) 0%, rgba(0,214,142,1) 100%)'
        }

        else if(rating === 2){
            source.innerHTML = 'Fair';
            card.style.background = 'linear-gradient(0deg, rgba(0,162,151,1) 0%, rgba(0,214,142,1) 100%)'
        }

        else if(rating === 3){
            source.innerHTML = 'Moderate';
            card.style.background = 'linear-gradient(0deg, rgba(240,118,41,1) 0%, rgba(255,196,70,1) 100%)'
        }

        else if(rating === 4){
            source.innerHTML = 'Unhealthy';
            card.style.background = 'linear-gradient(0deg, rgba(219,65,37,1) 0%, rgba(255,122,79,1) 100%)'
        }

        else if(rating === 5){
            source.innerHTML = 'Very Unhealthy';
            card.style.background = 'linear-gradient(0deg, rgba(122,19,38,1) 0%, rgba(218,94,84,1) 100%)'
        }

    }

function removeCard(e){
    console.log(e.target)

    
    e.target.parentElement.parentElement.parentElement.remove();
    

    console.log(e.target.parentElement.parentElement)
    console.log('bi[')
    
}




document.getElementById("bin").addEventListener('click', removeCard)
searchButton.addEventListener('click', addCard) ;



searchInput.addEventListener("keyup", function(event) {
    
    if (event.keyCode === 13) {
     
      event.preventDefault();
      
      searchButton.click();
    }
})