const urlMonths = async()=>{
    let fechaActual = new Date();
    const urls = [];
    for (let i = 0; i < 3; i++) {
        let mes = fechaActual.getMonth() + 1; // Ajusta el mes para que sea de 1 a 12
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
        fechaActual.setMonth(fechaActual.getMonth() - 1); // Resta un mes para la próxima iteración
    }
    return urls
}

module.exports = urlMonths