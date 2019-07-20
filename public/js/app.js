const weatherForm = document.querySelector('form');
const searchLocation = document.querySelector('input');
const firstParagraph = document.querySelector('#firstParagraph');
const secondParagraph = document.querySelector('#secondParagraph');


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location = searchLocation.value;

    firstParagraph.textContent='Loading...';
    secondParagraph.textContent='';

    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            console.log(data);
            if(data.error) {
                firstParagraph.textContent=data.error;
                secondParagraph.textContent='';
            }
            else{
                forecastData = data.body.currently.summary + '. It is currently '
                    + Math.round(data.body.currently.temperature) + ' degress out. There is a '
                    + Math.round(data.body.currently.precipProbability*100) + '% chance of rain.';

                firstParagraph.textContent=data.location;
                secondParagraph.textContent = forecastData;

                //prepare daily data array for table
                const dailyData=[];
                for(let i=0;i<7;i++){
                    dailyData.push(data.body.daily.data[i]);
                }

                console.log(dailyData);

                dailyData.map((day,index)=>{

                    const displayDate = ()=> {
                        const dateClass = "date day" + index;
                        const dateToSet = new Date(day.time * 1000);
                        const dateField = dateToSet.toLocaleString('pl-PL', {month: "2-digit", day: "2-digit"});
                        document.getElementsByClassName(dateClass)[0].innerHTML = dateField;
                    };
                    const displaySkycons = ()=> {
                        const iconID = "icon day" + index;
                        const skycons = new Skycons({monochrome: false});
                        skycons.add(iconID, day.icon);
                        skycons.play();
                    };
                    const displayTemperature = ()=> {
                        const temperatureClass = "temperature day" + index;
                        const temperatureField = Math.round(day.temperatureHigh) + ' °C \n <span class="nightTemp">'
                            + Math.round(day.temperatureLow) + '°C</span>';
                        document.getElementsByClassName(temperatureClass)[0].innerHTML = temperatureField;
                    };
                    const displayWind = (units='km') => {
                        windSpeed = day.windSpeed;
                        speedType = 'km/h';

                        switch(units){
                            case 'ms':
                                windSpeed = Math.round((windSpeed/3.6)*100)/100;
                                speedType = 'm/s';
                                break;
                            case 'mp':
                                windSpeed = Math.round((0.6215*windSpeed)*100)/100;
                                speedType = 'mph';
                                break;
                            case 'kn':
                                windSpeed = Math.round(windSpeed*0.539956803);
                                speedType = 'kn';
                                break;
                            case 'bf':
                                beaufort = [0.1,6,11,19,19,39,50,62,75,87,102,117];
                                windSpeed = 12 -(beaufort.filter(el=>el>windSpeed).length);
                                speedType = 'B';
                                break;
                            default:
                                break;
                        }


                        const windClass = "wind day" + index;
                        const windField = "<span class='north'>N</span>"
                            + "<img class='compass' src='/img/Compass-North.svg' " +
                            "style ='transform: rotate(" + day.windBearing + "deg)'>"
                            + windSpeed +' '+ speedType;
                        document.getElementsByClassName(windClass)[0].innerHTML = windField;
                    };
                    const displayForecastDay = (units)=> {
                        displayDate();
                        displaySkycons();
                        displayTemperature();
                        displayWind(units);
                    };

                    displayForecastDay()
                });
                document.getElementById("forecast-table").style.display = 'inline-block';
            }
        })
    });
});

