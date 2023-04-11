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

    array.sort((a , b)=> Number(a.price - b.price))



    array.forEach( (element)=>{

        let div = document.createElement('div')
        div.classList.add('col-12' ,  'col-md-3' , 'my-5')
        div.innerHTML= `

                <div class="announcement-card text-center">

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
function filterByCategory(categoria){
    
    if(categoria != 'All'){

    let filtered = data.filter( (annuncio)=> annuncio.category == categoria);
    showCards(filtered);

    }else{

    showCards(data);

    }
    
}

// catturo radio buttons
let checkInputs = document.querySelectorAll('.form-check-input');

checkInputs.forEach((checkInput)=>{

    checkInput.addEventListener('click', ()=>{
        filterByCategory(checkInput.id);
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
function filterbyPrice(prezzo){

    let filtered = data.filter( (annuncio)=> Number(annuncio.price <= prezzo) );        

    showCards(filtered);

}

//  evento al cambio dell'input range

inputPrice.addEventListener('input', ()=>{

    filterbyPrice(inputPrice.value);

    incrementNumber.innerHTML = inputPrice.value;


} )

// catturo word input filtro parola
let wordInput = document.querySelector('#wordInput')

function filteredbyWord (nome){

    let filtered = data.filter((annuncio)=> annuncio.name.toLowerCase().includes(nome.toLowerCase()));
    
    showCards(filtered)
}

// evento digito parola
    wordInput.addEventListener('input', ()=>{
        filteredbyWord(wordInput.value);
    })
} )

