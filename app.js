const url = 'https://api.sampleapis.com/wines/reds';
document.addEventListener('DOMContentLoaded', ()=>{
    fetchData(url) //carga primero el documento
})


const navWines = document.getElementById('navWines');
const conteinPrimary = document.getElementById('conteinPrimary');


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
const datos = (data) =>{
    const template = document.getElementById("template").content
    const fragment = document.createDocumentFragment();
    
    data.forEach(element => {
        const point = element.rating.average;

        const clone = template.cloneNode(true);
        clone.getElementById('cardImg').setAttribute("src", element.image);
        clone.getElementById('cardTitle').textContent = element.wine;
        clone.getElementById('cardVineria').textContent = element.winery;
        clone.getElementById('cardFrom').textContent = `Origen: ${element.location}`;
        clone.getElementById('cardRating').textContent = `Rating: ${point}`;

        fragment.appendChild(clone);
    });
    conteinPrimary.appendChild(fragment);
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



navWines.addEventListener('click', (e) => {
    e.preventDefault();
    conteinPrimary.innerHTML = ""//boora contenido
    wineType = e.target.id; // Obtener el id
    const newUrl = 'https://api.sampleapis.com/wines/' + wineType;
    fetchData(newUrl);
    datos(data);
});


