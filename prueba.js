const url = 'https://api.sampleapis.com/wines/';
const navWines = document.getElementById('navWines');

// Agregar un event listener al contenedor del menú
navWines.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        // Verificar si el elemento clickeado es un enlace
        const wineType = event.target.id || 'tinto'; // Obtener el id del enlace o usar 'tinto' por defecto
        const newUrl = url + wineType;

        fetchData(newUrl); // Llamar a la función fetchData con la nueva URL
    }
});

const fetchData = async (newUrl) => {
    try {
        loading(true); // Mostrar mensaje de carga

        const res = await fetch(newUrl);
        const data = await res.json();

        // Aquí puedes hacer lo que necesites con los datos obtenidos
        console.log(data);
    } catch (error) {
        console.log(error);
    } finally {
        loading(false); // Ocultar mensaje de carga
    }
};

// Función para mostrar/ocultar mensaje de carga (puedes implementarla según tus necesidades)
const loading = (isLoading) => {
    // Implementa la lógica para mostrar/ocultar el mensaje de carga
};



/*ORIGINAL 
const fetchData = async() =>{
    try {
        loading(true) // Cargando...
        const res = await fetch('https://api.sampleapis.com/wines/reds');
        const data = await res.json();
        datos(data) //datos
    } catch (error) {
        console.log(error)
    } finally{
        loading(false) // no display Cargando...
    }  
} */






const navWines = document.getElementById('navWines');
const url = 'https://api.sampleapis.com/wines/';
let wineType = 'reds'; // Declarar wineType como variable global
const newUrl = url + wineType;

// Función para inicializar la página
const init = () => {
    fetchData(newUrl);
};

// Función para cargar datos
const fetchData = async () => {
    try {
        loading(true); // Cargando...
        const res = await fetch(newUrl);
        const data = await res.json();
        datos(data); // Datos
    } catch (error) {
        console.log(error);
    } finally {
        loading(false); // No display Cargando...
    }
};

// Agregar evento click a navWines
navWines.addEventListener('click', (e) => {
    wineType = e.target.id; // Actualizar wineType con el nuevo valor
    const updatedUrl = url + wineType; // Crear la nueva URL con el nuevo wineType
    fetchData(updatedUrl); // Llamar a fetchData con la nueva URL
});

// Llamar a la función init al cargar la página
init();