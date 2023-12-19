window.addEventListener('load', () => {
    const url = 'https://api.sampleapis.com/wines/reds';
    fetchData(url);
});



const url = 'https://api.sampleapis.com/wines/reds';


document.addEventListener('DOMContentLoaded', ()=>{
    fetchData(url) //carga primero el documento
})


const cardPrimary = document.getElementById('cardPrimary');// template
const carrucel = document.getElementById('carrucel'); //contein CARRUCEL
const btnCarrucelLeft = document.getElementById('btnCarrucelLeft');//btn carrucel izq
const btnCarrucelRight = document. getElementById('btnCarrucelRight')// btn carrucel der
const carroCarrucel = document.getElementById('carroCarrucel')// carrito carrucel
const navWines = document.getElementById('navWines');//Shop 
const conteinPrimary = document.getElementById('conteinPrimary');// SHOP api



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
    //console.log(new Intl.NumberFormat().format(number));
    //return new Intl.NumberFormat().format(Math.floor(Math.random() * (max - min) + min));
}

// DATA -->api
const datos = (data) => {
    const template = document.getElementById("template").content;
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



//NAV SHOP
navWines.addEventListener('click', (e) => {
    e.preventDefault();
    conteinPrimary.innerHTML = ""//boora contenido
    wineType = e.target.id; // Obtener el id
    const newUrl = 'https://api.sampleapis.com/wines/' + wineType;
    fetchData(newUrl);
    datos(data);
});

