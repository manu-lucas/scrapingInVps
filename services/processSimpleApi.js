const processAndCountData = (data) => {
    let acumuladoCompras = 0;
    let acumuladoVentas = 0;
    let acumuladoEmitidas = 0;
    let acumuladoRecibidas = 0;

    if (data.compras && data.compras.resumenes) {
            // Process purchase summaries
            let sumaTotalDocumentosCompras = 0;
            data.compras.resumenes.forEach(resumen => {
                if (resumen.tipoDte !== 39 && resumen.tipoDte !== 48) {
                    sumaTotalDocumentosCompras += resumen.totalDocumentos;
                }
            });
            acumuladoCompras += sumaTotalDocumentosCompras;
        } else if (data.ventas && data.ventas.resumenes) {
            // Process sales summaries
            let sumaTotalDocumentosVentas = 0;
            data.ventas.resumenes.forEach(resumen => {
                if (resumen.tipoDte !== 39 && resumen.tipoDte !== 48) {
                    sumaTotalDocumentosVentas += resumen.totalDocumentos;
                }
            });
            acumuladoVentas += sumaTotalDocumentosVentas;
        } else if (data.cantidadDocumentos !== undefined) {
            // For emitted and received documents
            if (url.includes('emitidas')) {
                acumuladoEmitidas += data.cantidadDocumentos;
            } else if (url.includes('recibidas')) {
                acumuladoRecibidas += data.cantidadDocumentos;
            }
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
module.exports = processAndCountData


// if (responseData.compras && responseData.compras.resumenes) {
//     // Process purchase summaries
//     let sumaTotalDocumentosCompras = 0;
//     responseData.compras.resumenes.forEach(resumen => {
//         if (resumen.tipoDte !== 39 && resumen.tipoDte !== 48) {
//             sumaTotalDocumentosCompras += resumen.totalDocumentos;
//         }
//     });
//     acumuladoCompras += sumaTotalDocumentosCompras;
// } else if (responseData.ventas && responseData.ventas.resumenes) {
//     // Process sales summaries
//     let sumaTotalDocumentosVentas = 0;
//     responseData.ventas.resumenes.forEach(resumen => {
//         if (resumen.tipoDte !== 39 && resumen.tipoDte !== 48) {
//             sumaTotalDocumentosVentas += resumen.totalDocumentos;
//         }
//     });
//     acumuladoVentas += sumaTotalDocumentosVentas;
// } else if (responseData.cantidadDocumentos !== undefined) {
//     // For emitted and received documents
//     if (url.includes('emitidas')) {
//         acumuladoEmitidas += responseData.cantidadDocumentos;
//     } else if (url.includes('recibidas')) {
//         acumuladoRecibidas += responseData.cantidadDocumentos;
//     }
// }
// })