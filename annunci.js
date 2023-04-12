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


// Articoli Json

fetch('./annunci.json').then( (response)=> response.json() ).then( (data)=>{


// wrapper radio buttons

let categoryWrapper = document.querySelector('#categoryWrapper');

let cardsWrapper = document.querySelector('#cardsWrapper')





function setCategoryFilters(){

let categories = data.map( (annuncio)=> annuncio.category);

let uniqueCategories = [];

categories.forEach((category)=> {

    if( !uniqueCategories.includes(category)){

        uniqueCategories.push(category)

    }

} ) 

uniqueCategories.forEach( (category)=>{


    let div = document.createElement('div');

    div.classList.add('form-check');

    div.innerHTML = `
    
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}">
                <label class="form-check-label" for="${category}">
                ${category}
                </label>        
    
    `;


    categoryWrapper.appendChild(div);



    } )



}

setCategoryFilters();

// funzione mostra cards
function showCards(array){

    cardsWrapper.innerHTML= '';

    array.sort((a , b)=> Number(b.price - a.price))



    array.forEach( (element , i)=>{

        let div = document.createElement('div')
        div.classList.add('col-12' ,  'col-md-3' , 'my-5')
        div.innerHTML= `

                <div class="announcement-card text-center">
                <img class="img-card-custom" src="https://picsum.photos/${200 + i}" alt="">
                <p class="h3">${element.name}</p>
                <p>${element.category}</p>
                <p>${element.price} €</p>

                </div>
        `;
        cardsWrapper.appendChild(div);

    })


}
showCards(data);


// funzione che mostra le cards filtrate per categoria
function filterByCategory(array){

    // node list trasformata in un array con il metodo from e poi il metodo .find per trovare un elemento che rispetta una condizione data
    // let categoria = Array.from(checkInputs).find( (button)=> button.checked).id;

    let arrayFromNodeList = Array.from(checkInputs);
    let button = arrayFromNodeList.find((bottone)=> bottone.checked);
    let categoria = button.id


    if(categoria != 'All'){

    let filtered = array.filter( (annuncio)=> annuncio.category == categoria);
    return filtered;

    }else{

    return data;

    }
    
}

// catturo radio buttons
let checkInputs = document.querySelectorAll('.form-check-input');

checkInputs.forEach((checkInput)=>{

    checkInput.addEventListener('click', ()=>{
        globalFilter();
    })




})


// cattura range input e numero

let inputPrice = document.querySelector('#inputPrice');
let incrementNumber = document.querySelector('#incrementNumber');

function setInputPrice(){

    let prices = data.map((annuncio)=> Number(annuncio.price));
    

    let maxPrice = Math.max(...prices);

    inputPrice.max = Math.ceil(maxPrice);

    inputPrice.value = Math.ceil(maxPrice);

    incrementNumber.innerHTML = Math.ceil(maxPrice);
}
 setInputPrice();


// filtro per prezzo
function filterbyPrice(array){

    let filtered = array.filter((annuncio)=> annuncio.price <= +(inputPrice.value) );        

    

    return filtered;

}

//  evento al cambio dell'input range

inputPrice.addEventListener('input', ()=>{

    
    incrementNumber.innerHTML = inputPrice.value;
    
    globalFilter();

} )

// catturo word input filtro parola
let wordInput = document.querySelector('#wordInput')

function filterbyWord (array){

    let nome = wordInput.value;

    if(nome.replaceAll(' ','').lenght != 0 ){
     let filtered = array.filter((annuncio)=> annuncio.name.toLowerCase().includes(nome.toLowerCase()));
    
    return filtered;    
    };

   
}

// evento digito parola
    wordInput.addEventListener('input', ()=>{
        globalFilter();
    })


// funzione globale che collega più filtri
function globalFilter(){

    let filteredByCategory = filterByCategory(data);
    let filteredByPrice = filterbyPrice(filteredByCategory);
    let filteredByWord = filterbyWord(filteredByPrice);
    showCards(filteredByWord);

}






} )