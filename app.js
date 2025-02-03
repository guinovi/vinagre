const cardPrimary = document.getElementById('cardPrimary');// Card primary template
const carrucel = document.getElementById('carrucel'); //contein CARRUCEL
const btnCarrucelLeft = document.getElementById('btnCarrucelLeft');//btn carrucel izq
const btnCarrucelRight = document. getElementById('btnCarrucelRight');// btn carrucel der
const template = document.getElementById("template").content;//TEMPLATE
const sectionCarroHead = document.getElementById('sectionCarroHead'); //carro head
const templateShopMuenu = document.getElementById('templateShopMuenu').content //template Shop Head
const carroHeadShow = document.getElementById('carroHeadShow'); // SHOW Carro Head
const carritoHead = document.getElementById('carritoHead'); // CArro Head Element
const montoTotalHead = document.getElementById('montoTotalHead'); //Total HEad
const navWines = document.getElementById('navWines');//Shop 
const conteinPrimary = document.getElementById('conteinPrimary');// SHOP api


const carroShop = [];
const seleccionVinos = [];

const datosArray = [];

//Cargando....  
const loading = (estado) =>{
    //const btnCarrucelLR = document.getElementById('btnCarrucelLR')
    const loading = document.getElementById('loading')
    if (estado) {
        // conteinPrimary.classList.add('display-none');
        // btnCarrucelLeft.classList.add('display-none');
        // btnCarrucelRight.classList.add('display-none');
        // loading.classList.remove('display-none');

    } else {
        // conteinPrimary.classList.remove('display-none');
        loading.classList.add('display-none');
        // btnCarrucelLeft.classList.remove('display-none');
        // btnCarrucelRight.classList.remove('display-none');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loading(true); // Mostrar loadinf

    const url = './app/api/wines.json';
    fetchData(url);
    
   
});



const fetchData = async (url) => {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Error al cargar los datos: ${res.status}`);
        }
        const data = await res.json();
        datos(data.reds); // DATOS
        datosArray.push(data);
    } catch (error) {
        console.error(error);
    } finally {
        loading(false); // Ocultar Loading
    }
};


// Verifica el ancho de la imagen
function getImageWidth(imageUrl) {
    const img = new Image();
    img.src = imageUrl;
    return img.width;
}

//Numero aleatorio
function numAleatorio() {
    min = Math.ceil(400000);
    max = Math.floor(1000000);
    return (Math.floor(Math.random() * (max - min) + min));
}

// DATA -->api
const datos = (data) => {
    const fragment = document.createDocumentFragment();
    const fragmentDos = document.createDocumentFragment();
    
    // Seleccionar vinos en el off 20-24
    // const vinosEnoff = data.slice(16, 20);
    // Mostrar las características de los vinos en el off en un div aparte
    // mostrarVinosEnoff(vinosEnoff);

   /*  const isImageValid = (url) => {
        // Verifica si la extensión es .png
        return /\.png$/i.test(url);
    }; */
    data.forEach(element => {
        const point = element.rating.average;
        const clone = template.cloneNode(true);
        const cloneDos = template.cloneNode(true);
        if(element.image){
            clone.getElementById('cardImg').setAttribute("src", element.image);
            clone.getElementById('cardTitle').textContent = element.wine;
            clone.getElementById('cardVineria').textContent = element.winery;
            clone.getElementById('cardFrom').textContent = `Origen: ${element.location}`;
            clone.getElementById('cardRating').textContent = `Rating: ${point}`;
            clone.getElementById('carrucelPrecio').textContent = `${Intl.NumberFormat().format(numAleatorio())}`;

            // Configurar clon del carrusel
            cloneDos.getElementById('cardImg').setAttribute("src", element.image);
            cloneDos.getElementById('cardTitle').textContent = element.wine;
            cloneDos.getElementById('cardVineria').textContent = element.winery;
            cloneDos.getElementById('cardFrom').textContent = `Origen: ${element.location}`;
            cloneDos.getElementById('cardRating').textContent = `Rating: ${point}`;
            cloneDos.getElementById('carrucelPrecio').textContent = `${Intl.NumberFormat().format(numAleatorio())}`;

            // Agregar clones a los fragmentos
            fragment.appendChild(clone);
            fragmentDos.appendChild(cloneDos);
        }
            
    });

    conteinPrimary.appendChild(fragment);
    carrucel.appendChild(fragmentDos);
};




//CARRUSEL - play
function autoScroll() {
    const interval = setInterval(() => {
        carrucel.scrollLeft = carrucel.scrollLeft + 2;
    }, 50);
    return interval;
} 


//CARRUSEL - STOP
carrucel.addEventListener('mouseover', () => {
    clearInterval(interval);
});
//CARRUSEL - play Out
carrucel.addEventListener('mouseout', () => {
    interval = autoScroll();
});

//CARRUSEL - btn izq y der
btnCarrucelLeft.addEventListener('click', ()=>{
    carrucel.scrollLeft = carrucel.scrollLeft - 100;
})
btnCarrucelRight.addEventListener('click', ()=>{
    carrucel.scrollLeft = carrucel.scrollLeft + 100;
})

let interval = autoScroll();

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
            cant: 1,
        }
        carroShop.push(elemtSelected)
    }
    pushCarroHead()
});

//Push to head vinito
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


// CARRITO HEAD SHOW
carritoHead.addEventListener('click', (e) => {
    const btnEliminarHead = e.target.closest('.btn-carro-eliminar');
    const montoTotalHead = document.getElementById('montoTotalHead');
    const cantidadTotalHead = document.getElementById('cantidadTotalHead');
    
    if ((e.target === carritoHead) || (e.target === carritoHeadImg) || (e.target === carritoHeadH)) {
        carroHeadShow.classList.toggle('display-none')
        //acualizacion datos
        cantidadTotalHead.textContent = `${carroShop.length}`
        montoTotalHead.textContent = `${calcularTotalCarrito()}`
    }
    if (btnEliminarHead) {
        const elementDelete = e.target.closest('.card-contein')
        const titleDelete = elementDelete.querySelector('.title-card').textContent;
        // indice eliminado
        const indexToDelete = carroShop.findIndex(vino => vino.title === titleDelete);
        // Eliminar del array
        if (indexToDelete !== -1) {
            carroShop.splice(indexToDelete, 1);
        }
        // Eliminar del DOM
        e.target.closest('.card-contein').remove();
        //acualizacion datos
        cantidadTotalHead.textContent = `${carroShop.length}`
        montoTotalHead.textContent = `${calcularTotalCarrito()}`
    }
});

// //ocultar el carrito
carroHeadShow.addEventListener('mouseleave', () => {
    carroHeadShow.classList.add('display-none');
});


function calcularTotalCarrito() {
    let total = 0;
    for (const vino of carroShop) {
        // Eliminar puntos y convertir a num
        const precioNumerico = parseFloat(vino.precio.replace(/\./g, '').replace(',', '.'));
        // Verificar
        if (!isNaN(precioNumerico)) {
            total += precioNumerico;
        }
    }
    // Devuelve total
    return Intl.NumberFormat().format(total);
}


/* 
//---------------------------------------------------------------------
//NAV SHOP
//---------------------------------------------------------------------
 */
navWines.addEventListener('click', async (e) => {
    e.preventDefault();
    conteinPrimary.innerHTML = ""; // Borra contenido
    // Busca  id
    const wineTypeElement = e.target.closest('[id]');
    if (!wineTypeElement) return;
    const wineType = wineTypeElement.id; // Obtener el id
    const newUrl = './app/api/wines.json';
    try {
        loading(true); // Muestra loading...
        const res = await fetch(newUrl);
        const data = await res.json();
        if (data[wineType]) {
            datos(data[wineType]);
        } else {
            console.error(`No se encontró la propiedad ${wineType} en la data.`);
        }
    } catch (error) {
        console.log(error);
    } finally {
        loading(false); // Oculta loading...
    }
});




conteinPrimary.addEventListener('click', (e) => {
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
            cant: 1,
        }
        carroShop.push(elemtSelected)
    }
    pushCarroHead()
});



// caractersticas de los vinos en el off
/* function mostrarVinosEnoff(vinos) {
    const divVinosEnoff = document.getElementById('vinosEnoff');

    // Limpiar contenido anterior
    divVinosEnoff.innerHTML = "";

    // Crear elementos para cada vino en el off
    vinos.forEach((vino, index) => {
        const divVino = document.createElement('div');
        divVino.classList.add('vinoEnoff');

        // Agregar características del vino al div
        const punto = vino.rating.average;
        divVino.innerHTML = `
            <img src="${vino.image}" alt="${vino.wine}" class="img-vino-off">
            <p class="nombre-vino-off">${vino.wine} </p>
            <p class="vineria-vino-off">${vino.winery}</p>
            <p class="origen-vino-off">Origen: ${vino.location}</p>
            <p class="rating-vino-off">Rating: ${punto}</p>
            <p class="precio-vino-off">$ ${Intl.NumberFormat().format(numAleatorio())} </p>
        `;

        // Agregar el div del vino en el off al contenedor principal
        divVinosEnoff.appendChild(divVino);
    });
} */