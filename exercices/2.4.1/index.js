const button = document.querySelector("button");
const message = document.querySelector('#message');

const maxClick = 10;
const delayInSeconds = 5;
const delayInMiliSeconds = delayInSeconds*1000;
let startTime;
let currentClick=0;
let timeReference;



button.addEventListener("mouseenter",startTimer);
button.addEventListener("click",click);


function startTimer(){
    startTime = new Date();
    timeReference=setTimeout(()=>{
        
        alert('Game over, you did not click 10 times within 5s !');
    },delayInMiliSeconds);
    
}


function click(){
    ++currentClick;
    if(currentClick === maxClick){
        clearAlert();
        const time = new Date().getTime() - startTime.getTime();
        message.innerHTML= `You win ! You clicked 10 times within ${time} ms`
        button.style.display = 'none';
    }
}



function clearAlert(){
    clearTimeout(timeReference);
}


