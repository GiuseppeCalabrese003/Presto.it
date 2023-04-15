// logica circle
let opener = document.querySelector(".opener");

let moveDivs = document.querySelectorAll(".moved");
// variabile d'appoggio per far tornare indietro i moved
let confirm = false;
opener.addEventListener('click', ()=>{

    if(confirm == false){

        moveDivs.forEach((moved , i)=>{

            confirm = true

            let angle = (360 * i ) / moveDivs.length;

            moved.style.transform = `rotate(${angle}deg) translate(200px) rotate(-${angle}deg)`

            opener.innerHTML = `<i class="fa-solid fa-minus fa-5x"></i>`

        })

    }else{
        confirm = false

        moveDivs.forEach((moved , i)=>{


            let angle = (360 * i ) / moveDivs.length;

            moved.style.transform = `rotate(0deg) translate(0px)`

            opener.innerHTML = `<i class= "fa-solid fa-plus fa-5x"></i>`

        })

    }
})
