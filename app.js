window.addEventListener('load', () => {
    const url = 'https://api.sampleapis.com/wines/reds';
    fetchData(url);
});



const url = 'https://api.sampleapis.com/wines/reds';


document.addEventListener('DOMContentLoaded', ()=>{
    fetchData(url) //carga primero el documento
})


const cardPrimary = document.getElementById('cardPrimary');// Card primary template
const carrucel = document.getElementById('carrucel'); //contein CARRUCEL
const btnCarrucelLeft = document.getElementById('btnCarrucelLeft');//btn carrucel izq
const btnCarrucelRight = document. getElementById('btnCarrucelRight');// btn carrucel der
const navWines = document.getElementById('navWines');//Shop 
const conteinPrimary = document.getElementById('conteinPrimary');// SHOP api
const template = document.getElementById("template").content;//TEMPLATE
const sectionCarroHead = document.getElementById('sectionCarroHead'); //conten
    const templateShopMuenu = document.getElementById('templateShopMuenu').content //templateMenu


const carroShop = [];


const fetchData = async(apiUrl) =>{
    try {
        loading(true) // Cargando...
        const res = await fetch(apiUrl);
        const data = await res.json();
        datos(data) //datos
    } catch (error) {
        console.log(error)
    } finally{
        loading(false) // no display Cargando...
    }  
}

// Verifica el ancho de la imagen
function getImageWidth(imageUrl) {
    const img = new Image();
    img.src = imageUrl;
    return img.width;
}

//Numero aleatorio
function numAleatorio() {
    min = Math.ceil(600000);
    max = Math.floor(2000000);
    return (Math.floor(Math.random() * (max - min) + min));
}

// DATA -->api
const datos = (data) => {
    const fragment = document.createDocumentFragment();
    const fragmentDos = document.createDocumentFragment();


    data.forEach(element => {
        const point = element.rating.average;
        const clone = template.cloneNode(true);
        const cloneDos = template.cloneNode(true);
        const imgWidth = getImageWidth(element.image);
        if (imgWidth >= 60 && imgWidth <= 100) {
            // Clon Shop
            clone.getElementById('cardImg').setAttribute("src", element.image);
            clone.getElementById('cardTitle').textContent = element.wine;
            clone.getElementById('cardVineria').textContent = element.winery;
            clone.getElementById('cardFrom').textContent = `Origen: ${element.location}`;
            clone.getElementById('cardRating').textContent = `Rating: ${point}`;
            // CLON CARRUSEL
            cloneDos.getElementById('cardImg').setAttribute("src", element.image);
            cloneDos.getElementById('cardTitle').textContent = element.wine;
            cloneDos.getElementById('cardVineria').textContent = element.winery;
            cloneDos.getElementById('cardFrom').textContent = `Origen: ${element.location}`;
            cloneDos.getElementById('cardRating').textContent = `Rating: ${point}`;
            cloneDos.getElementById('carrucelPrecio').textContent =`Precio: $${Intl.NumberFormat().format(numAleatorio())}`;
            // Fragment
            fragment.appendChild(clone);
            fragmentDos.appendChild(cloneDos);
        }
        
    });
    conteinPrimary.appendChild(fragment);
    carrucel.appendChild(fragmentDos);
}

//Cargando....  
const loading = (estado) =>{
    const btnCarrucelLR = document.getElementById('btnCarrucelLR')
    const loading = document.getElementById('loading')
    if (estado) {
        conteinPrimary.classList.add('display-none');
        btnCarrucelLR.classList.add('display-none')
        loading.classList.remove('display-none');

    } else {
        conteinPrimary.classList.remove('display-none');
        loading.classList.add('display-none');
        btnCarrucelLR.classList.remove('display-none');
    }
}

//index - CARRUSEL
function autoScroll() {
    const interval = setInterval(() => {
        carrucel.scrollLeft = carrucel.scrollLeft + 2;
    }, 50);
    return interval;
} 

let interval = autoScroll();

//STOP carrcuel
carrucel.addEventListener('mouseover', () => {
    clearInterval(interval);
});
//play carrucel
carrucel.addEventListener('mouseout', () => {
    interval = autoScroll();
});

//botones izq y der carrucel
btnCarrucelLeft.addEventListener('click', ()=>{
    carrucel.scrollLeft = carrucel.scrollLeft - 100;
})
btnCarrucelRight.addEventListener('click', ()=>{
    carrucel.scrollLeft = carrucel.scrollLeft + 100;
})


//---------------------------------------------------------------------
//NAV SHOP
navWines.addEventListener('click', (e) => {
    e.preventDefault();
    conteinPrimary.innerHTML = ""//boora contenido
    wineType = e.target.id; // Obtener el id
    const newUrl = 'https://api.sampleapis.com/wines/' + wineType;
    fetchData(newUrl);
    datos(data);
});


// CARRO index Añadir

carrucel.addEventListener('click', (e) => {
    const targetElement = e.target.closest('.carrucel-carro-contein');

    if (targetElement) {
        const card = targetElement.closest('.card-contein');// COntein        
        const imgSrc = card.querySelector('.img-card').src;
        const title = card.querySelector('.title-card').textContent;
        const vineria = card.querySelector('.title-vineria').textContent;
        const origen = card.querySelector('.card-from').textContent;
        const rating = card.querySelector('.card-point').textContent;
        const precio = card.querySelector('.precio-carrucel').textContent;
        //añadir a elementos
        const elemtSelected = {
            img: imgSrc,
            title: title,
            vineria: vineria,
            origen: origen,
            rating: rating,
            precio: precio,
        }
        carroShop.push(elemtSelected)
    }
    pushCarroHead()
});


//carro header show
const carroHeadShow = document.getElementById('carroHeadShow');
carroHeadShow.addEventListener('click', ()=>{
    carroHeadShow.classList.remove('display-none')

})

function pushCarroHead(){
    sectionCarroHead.innerHTML = ""; // en blanco
    //fragment
    fragmentCarroHead = document.createDocumentFragment();    
    //desglozado
    carroShop.forEach(card =>{
        const cloneHead = templateShopMuenu.cloneNode(true);
        cloneHead.getElementById('cardImgShopMuenu').setAttribute("src", card.img);
        cloneHead.getElementById('cardImgShopMuenu').setAttribute("height", "150px")
        cloneHead.getElementById('cardTitleShopMuenu').textContent = card.title;
        cloneHead.getElementById('cardVineriaShopMuenu').textContent = card.vineria;
        cloneHead.getElementById('cardFromShopMuenu').textContent = card.origen;
        cloneHead.getElementById('cardRatingShopMuenu').textContent =  card.rating;
        cloneHead.getElementById('carrucelPrecioShopMuenu').textContent = card.precio;
        fragmentCarroHead.appendChild(cloneHead)
    });    
    sectionCarroHead.appendChild(fragmentCarroHead);
}
