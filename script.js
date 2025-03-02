const score= document.querySelector(" #score");
const timeLeft=document.querySelector("#timeLeft");
const startNewGameBtn = document.querySelector("#startNewGame");
const pauseGameBtn= document.querySelector("#pauseGame");
const  squares= document.querySelectorAll(".square");

let scoree =0;
let timeLeftt=0;
let hitPosition=null;
let timerId = null;
let randomMoleId =null;
let isGameActive=false;

//randomly place mole
function randomMole(){
    squares.forEach(square =>{
square.classList.remove('mole');
    });
     let randomSquare = squares[Math.floor(Math.random()*squares.length)];//0 to 8
    randomSquare.classList.add('mole');
    hitPosition= randomSquare.id;
}


function pauseResumeGame(){
    if (!isGameActive) return;
    if(pauseGameBtn.textContent=== 'Pause')
    {
        clearInterval(timerId);
        clearInterval(randomMoleId);
    
    timerId= null;
    randomMoleId=null;
    pauseGameBtn.textContent='Resume';
    }
    else{
        timerId= setInterval(randomMole,1000);  //after every 1 s this func will call
        randomMoleId=setInterval(countDown,1000);
        pauseGameBtn.textContent='Pause';
    }
    }


function countDown(){
    timeLeftt--;
    timeLeft.innerHTML=`Time Left: ${timeLeftt}`;

    if(timeLeftt <= 0){
     clearInterval(timerId);
     clearInterval(randomMoleId);
     isGameActive = false;
        alert(`Game Over! Your final score is ${scoree}`);
    }

}

squares.forEach(square =>{
    square.addEventListener('mousedown', () =>{
        if(timerId !==null){
            if( isGameActive && square.id===hitPosition){
                scoree++;
                score.innerHTML= `Your Score ${scoree}`;
                hitPosition=null;
            
            
            }
        }

    });
});

function StartGame(){
    clearInterval(timerId);
    clearInterval(randomMoleId); 
scoree=0;
timeLeftt=30;
isGameActive = true;
score.innerHTML = `Your Score: ${scoree}`;
    timeLeft.innerHTML = `Time Left: ${timeLeftt}`;
    randomMole();

//call Back function- a func call by another function 
timerId= setInterval(randomMole,1000);  //after every 1 s this func will call
 randomMoleId=setInterval(countDown,1000);
 pauseGameBtn.textContent = 'Pause';
}

document.addEventListener("DOMContentLoaded", () => {
    startNewGameBtn.addEventListener("click", StartGame);
    pauseGameBtn.addEventListener("click", pauseResumeGame);
});

 
 
