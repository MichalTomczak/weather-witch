const weatherForm = document.querySelector('form');
const searchLocation = document.querySelector('input');
const firstParagraph = document.querySelector('#firstParagraph');
const secondParagraph = document.querySelector('#secondParagraph');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location = searchLocation.value;

    firstParagraph.textContent='Loading...';
    secondParagraph.textContent='';

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error) {
                firstParagraph.textContent=data.error;
                secondParagraph.textContent='';
            }
            else{
                firstParagraph.textContent=data.address;
                secondParagraph.textContent = data.forecast;
            }
        })
    });
});