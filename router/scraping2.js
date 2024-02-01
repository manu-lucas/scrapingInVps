// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Define variables to avoid undefined variable warnings
    let rutEmpresa = '';
    let promedioCompras = promedioVentas = promedioEmitidas = promedioRecibidas = 0;
    let planAsignado = '';

    // Username and password for Basic Auth
    const username = "api";
    // const password = "777777904-R070-6386-3462-2079";
    const password = "7904-R070-6386-3462-2079";

    const rutUsuario = document.getElementById('rutUsuario').value;
    const contrasena = document.getElementById('contrasena').value;
    rutEmpresa = document.getElementById('rutEmpresa').value;

    var raw = {
        "RutUsuario": rutUsuario,
        "PasswordSII": contrasena,
        "RutEmpresa": rutEmpresa,
        "Ambiente": 1,
        "Detallado": false
    };


    const base64Credentials = btoa(`${username}:${password}`);
    console.log(base64Credentials); 

    let fechaActual = new Date();
    const urls = [];

    for (let i = 0; i < 3; i++) {
        let mes = fechaActual.getMonth();
        let anio = fechaActual.getFullYear();

        mes -= 1;
        if (mes === 0) {
            mes = 12;
            anio -= 1;
        }
        mes = String(mes).padStart(2, '0');
        anio = String(anio);

       

        const urlCompras = `https://servicios.simpleapi.cl/api/RCV/compras/${mes}/${anio}`;
        const urlVentas = `https://servicios.simpleapi.cl/api/RCV/ventas/${mes}/${anio}`;
        const urlEmitidas = `https://servicios.simpleapi.cl/api/bhe/listado/emitidas/${mes}/${anio}`;
        const urlRecibidas = `https://servicios.simpleapi.cl/api/bhe/listado/recibidas/${mes}/${anio}`;

        urls.push(urlCompras, urlVentas, urlEmitidas, urlRecibidas);

        fechaActual.setMonth(fechaActual.getMonth());
    }

    let acumuladoCompras = 0;
    let acumuladoVentas = 0;
    let acumuladoEmitidas = 0;
    let acumuladoRecibidas = 0;

var requestOptions = {
    method: 'POST',
    Authorization: {
        'Username': `api`,
        'Password': '7904-R070-6386-3462-2079'
    },
  body: raw,
    headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'

  } ,
  redirect: 'follow'
  
};

    urls.forEach(url => {
        

        // Configure the fetch request
        fetch(url, requestOptions)
          
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseData => {
            if (responseData.compras && responseData.compras.resumenes) {
                // Process purchase summaries
                let sumaTotalDocumentosCompras = 0;
                responseData.compras.resumenes.forEach(resumen => {
                    if (resumen.tipoDte !== 39 && resumen.tipoDte !== 48) {
                        sumaTotalDocumentosCompras += resumen.totalDocumentos;
                    }
                });
                acumuladoCompras += sumaTotalDocumentosCompras;
            } else if (responseData.ventas && responseData.ventas.resumenes) {
                // Process sales summaries
                let sumaTotalDocumentosVentas = 0;
                responseData.ventas.resumenes.forEach(resumen => {
                    if (resumen.tipoDte !== 39 && resumen.tipoDte !== 48) {
                        sumaTotalDocumentosVentas += resumen.totalDocumentos;
                    }
                });
                acumuladoVentas += sumaTotalDocumentosVentas;
            } else if (responseData.cantidadDocumentos !== undefined) {
                // For emitted and received documents
                if (url.includes('emitidas')) {
                    acumuladoEmitidas += responseData.cantidadDocumentos;
                } else if (url.includes('recibidas')) {
                    acumuladoRecibidas += responseData.cantidadDocumentos;
                }
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    });

    // Define the rest of the variables used in the HTML block
    promedioCompras = Math.round(acumuladoCompras / 3);
    promedioVentas = Math.round(acumuladoVentas / 3);
    promedioEmitidas = Math.round(acumuladoEmitidas / 3);
    promedioRecibidas = Math.round(acumuladoRecibidas / 3);
    const promedioMensual = promedioCompras + promedioVentas + promedioEmitidas + promedioRecibidas;

    const criterioPlanA = 60;
    const criterioPlanB = 130;
    const criterioPlanC = 280;
    const planA = "Plan Básico (Hasta 60 documentos)";
    const planB = "Plan Medio (Hasta 130 documentos)";
    const planC = "Plan Avanzado (Hasta 280 documentos)";
    const planD = "Supera el límite del Plan Avanzado (Hasta 280 documentos), ofrecer Plan A MEDIDA";

    if (promedioMensual <= criterioPlanA) {
        planAsignado = planA;
    } else if (promedioMensual > criterioPlanA && promedioMensual <= criterioPlanB) {
        planAsignado = planB;
    } else if (promedioMensual > criterioPlanB && promedioMensual <= criterioPlanC) {
        planAsignado = planC;
    } else {
        planAsignado = planD;
    }

    // Perform any further actions with the data
    // For example, update HTML elements to display the results
}

// Add event listener to the form
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("miFormulario2").addEventListener("submit", handleSubmit);
});

function mostrarLoader() {
      document.getElementById("loader").style.display = "block";
    }