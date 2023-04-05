// NAVBAR SCROLL
let mainNavbar = document.querySelector('#mainNavbar')

document.addEventListener('scroll', ()=>{

    if(window.scrollY > 0){

      mainNavbar.classList.remove('bg-transparent')
    mainNavbar.classList.add('background-primaryC')

    }else{

        mainNavbar.classList.remove('background-primaryC')
        mainNavbar.classList.add('bg-transparent')
        
    }
    
    

})
// FINE NAVBAR SCROLL

// INCREMENT NUMERI CON CHIAMATA ASINCRONA (istruzioni da seguire , intervallo)

let primoSpan = document.querySelector('#primoSpan')
let secondoSpan = document.querySelector('#secondoSpan')
let terzoSpan = document.querySelector('#terzoSpan')

function createInterval (numeroFinale , element){

    let counter = 0;

    let interval = setInterval( ()=>{
        
        if(counter < numeroFinale){
        
            counter++
            element.innerHTML = counter;
        
        }else{
        
            clearInterval(interval);
        
        }
                
    }, 1)
     
       
}
createInterval();



// FINE INCREMENT NUMERI CON CHIAMATA ASINCRONA

// INTERSECTION OBSERVER()
let h2Test = document.querySelector('#h2Test');

let observed = new IntersectionObserver(
    
    (entries)=>{

        entries.forEach((entry)=>{

            if(entry.isIntersecting && intersectionCheck == true){

                createInterval(1000, primoSpan);
                createInterval(1500, secondoSpan);
                createInterval(500, terzoSpan);
                intersectionCheck = false
            }

        })

    }

)
observed.observe(h2Test)

// variabile d'appoggio per cessare l'incremento
let intersectionCheck = true;
// FINE INTERSECTION OBSERVER()