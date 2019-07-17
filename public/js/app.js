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
                firstParagraph.textContent=data.address;
                secondParagraph.textContent = data.forecast;

                //prepare daily data array for table
                const dailyData=[];
                for(let i=0;i<7;i++){
                    dailyData.push(data.body.daily.data[i]);
                }
                console.log(dailyData);

                const dateConvert = (epoch)=>{
                    return new Date(0).setUTCSeconds(epoch);
                };

                dailyData.map((element,index)=>{
                    dateClass = "date-day"+index;
                    temperatureClass = "temperature-day"+index;
                    dateToSet = new Date(element.time*1000);
                    dateField = dateToSet.toLocaleString('pl-PL',{month:"2-digit",day:"2-digit"}) +"\n"+dateToSet.getFullYear();
                    temperatureField = element.temperatureHigh;

                    document.getElementsByClassName(dateClass)[0].innerHTML=dateField;
                    document.getElementsByClassName(temperatureClass)[0].textContent=temperatureField;
                    document.getElementById("forecast-table").style.display = 'inline-block';

                })

            }
        })
    });
});

