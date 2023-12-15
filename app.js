const url = 'https://api.sampleapis.com/wines/reds';
document.addEventListener('DOMContentLoaded', ()=>{
    fetchData(url) //carga primero el documento
})


const navWines = document.getElementById('navWines');
const conteinPrimary = document.getElementById('conteinPrimary');
const carrucel = document.getElementById('carrucel');



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




// DATA -->api
const datos = (data) => {
    const template = document.getElementById("template").content;
    const fragment = document.createDocumentFragment();
    const fragmentDos = document.createDocumentFragment();
    // Verifica si el ancho de la imagen
    function getImageWidth(imageUrl) {
        const img = new Image();
        img.src = imageUrl;
        return img.width;
    }

    //Numero aleatorio
    function numAleatorio() {
        min = Math.ceil(800000);
        max = Math.floor(5000000);
        return Math.floor(Math.random() * (max - min) + min);
      }

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
            cloneDos.getElementById('carrucelPrecio').textContent =`Precio: $${numAleatorio()}`;
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
    const loading = document.getElementById('loading')
    if (estado) {
        conteinPrimary.classList.add('display-none');
        loading.classList.remove('display-none');

    } else {
        conteinPrimary.classList.remove('display-none');
        loading.classList.add('display-none');
    }
}


//NAV SHOP
navWines.addEventListener('click', (e) => {
    e.preventDefault();
    conteinPrimary.innerHTML = ""//boora contenido
    wineType = e.target.id; // Obtener el id
    const newUrl = 'https://api.sampleapis.com/wines/' + wineType;
    fetchData(newUrl);
    datos(data);
});



//index - CARRUSEL
function autoScroll() {
    let limiteScroll = carrucel.scrollWidth - carrucel.clientWidth;
    let avanceScroll = 1;
    setInterval(() => {        
        carrucel.scrollLeft = carrucel.scrollLeft + avanceScroll
        // if ( limiteScroll === carrucel.scrollLeft){
        //     avanceScroll = -1
        // } else if (carrucel.scrollLeft === 0){
        //     avanceScroll =  1 
        // }
    }, 50);
} 
autoScroll()


/* let maxScrollLeft = carrucel.scrollWidth - carrucel.clientWidth;
let intervalo = null;
let step = 1;
const start = () => {
  intervalo = setInterval(function () {
    carrucel.scrollLeft = carrucel.scrollLeft + step;
    if (carrucel.scrollLeft === maxScrollLeft) {
      step = step * -1;
    } else if (carrucel.scrollLeft === 0) {
      step = step * -1;
    }
  }, 10);
};

start(); */