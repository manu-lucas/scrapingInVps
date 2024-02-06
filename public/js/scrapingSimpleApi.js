const {processAndCountData, renderTable} = require('./completeTable')
const configFetch = require('../../services/configFetch')

document.querySelector('.form').addEventListener('submit', async (event) => {
    // Prevenir que el formulario se envíe normalmente
    event.preventDefault();
    try {
        const rut = document.getElementById('rutEmpresa_simple_api').value;
        const rutRL = document.getElementById('rutRL_simple_api').value;
        const claveRL = document.getElementById('passwordRL_simple_api').value;
        const fetchOptions = await configFetch(rut, rutRL, claveRL);
        const response = await fetch('http://localhost:3000/', fetchOptions);
        const data = await response.json();
        processAndRenderData(data);
    } catch (error) {
        console.error('Error in main.js', error);
    }
});

const processAndRenderData = async (data) => {
    try {
        const processedData = processAndCountData(data);
        renderTable(processedData);
    } catch (error) {
        console.error('Error procesando y renderizando datos:', error);
    }
};
