// llenarTable.js

// Función para procesar y contar los datos
 const processAndCountData = (data) => {
    let acumuladoCompras = 0;
    let acumuladoVentas = 0;
    let acumuladoEmitidas = 0;
    let acumuladoRecibidas = 0;

    if (Array.isArray(data)) {
        // Iterar sobre cada objeto en el array
        data.forEach(item => {
            if (item && typeof item === 'object') {
                // Verificar si hay compras en el objeto
                if (item.compras && item.compras.resumenes) {
                    item.compras.resumenes.forEach(resumen => {
                        if (resumen.tipoDte !== 39 && resumen.tipoDte !== 48) {
                            acumuladoCompras += resumen.totalDocumentos;
                        }
                    });
                }

                // Verificar si hay ventas en el objeto
                if (item.ventas && item.ventas.resumenes) {
                    item.ventas.resumenes.forEach(resumen => {
                        if (resumen.tipoDte !== 39 && resumen.tipoDte !== 48) {
                            acumuladoVentas += resumen.totalDocumentos;
                        }
                    });
                }

                // Verificar si hay emitidas en el objeto
                if (item.emitidas && item.emitidas.cantidadDocumentos !== undefined) {
                    acumuladoEmitidas += item.emitidas.cantidadDocumentos;
                }

                // Verificar si hay recibidas en el objeto
                if (item.recibidas && item.recibidas.cantidadDocumentos !== undefined) {
                    acumuladoRecibidas += item.recibidas.cantidadDocumentos;
                }
            } else {
                console.error('Error: uno o más elementos en el array no son objetos.');
            }
        });
    } else {
        console.error('Error: los datos no son un array.');
    }

    console.log(acumuladoCompras, acumuladoVentas, acumuladoEmitidas, acumuladoRecibidas);

    // Devolver los resultados en un objeto
    return {
        acumuladoCompras,
        acumuladoVentas,
        acumuladoEmitidas,
        acumuladoRecibidas,
    };
};


// Función para renderizar los datos en la tabla
 const renderTable = (resultados) => {
    // Obtener referencias a los elementos HTML
    const promedioCompras = document.querySelector('.promedioCompras');
    const promedioVentas = document.querySelector('.promedioVentas');
    const promedioEmitidas = document.querySelector('.promedioEmitidas');
    const promedioRecibidas = document.querySelector('.promedioRecibidas');
    const promedioMensual = document.querySelector('.promedioMensual');
    const planAsignado = document.querySelector('.planAsignado');

    // Llenar la tabla con los resultados
    promedioCompras.textContent = resultados.acumuladoCompras;
    promedioVentas.textContent = resultados.acumuladoVentas;
    promedioEmitidas.textContent = resultados.acumuladoEmitidas;
    promedioRecibidas.textContent = resultados.acumuladoRecibidas;
    promedioMensual.textContent = totalMensual;

    // Aquí deberías tener alguna lógica para asignar el plan
    planAsignado.textContent = 'Plan XYZ';  // Puedes cambiar esto según tus necesidades
};

// Función para renderizar los datos en la tabla
 const typeOfPlan = (resultados) => {
    let rutEmpresa = '';
    let promedioCompras = promedioVentas = promedioEmitidas = promedioRecibidas = 0;
    let planAsignado = '';
    
};

module.exports = {processAndCountData, renderTable}
