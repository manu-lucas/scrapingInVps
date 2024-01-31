const { By, until } = require('selenium-webdriver');


 const loginModule = async (driver, rut, clave) => {
    try {
        await driver.get('https://zeusr.sii.cl//AUT2000/InicioAutenticacion/IngresoRutClave.html?https://misiir.sii.cl/cgi_misii/siihome.cgi');
        const user = await driver.findElement(By.id('rutcntr')).sendKeys(rut);
        const password = await driver.findElement(By.id('clave')).sendKeys(clave);
        await driver.findElement(By.id("bt_ingresar")).click();
        // Verificar la presencia de "La Clave ingresada no es correcta"
        try {
        await driver.wait(until.elementLocated(By.xpath('//*[@id="titulo"]')), 1500);
        const tituloElement = await driver.findElement(By.xpath('//*[@id="titulo"]'));
        const tituloText = await tituloElement.getText();
        // Si el texto del elemento contiene la oración específica, lanza un error y detiene la ejecución
        if (tituloText.includes("Información sobre este código, ingrese en \"códigos de mensaje de error\", opción 'Clave Tributaria' del menú 'Clave Tributaria y Representantes Electrónicos', en Servicios Online.")) {
            throw new Error('generate in Login, Password incorrecta del cliente');
        }
        } catch (error) {
            throw (error)
        }
        //ESTE CODIGO MANEJA MAS DE 1 ALERTA
        try {
            await driver.wait(until.alertIsPresent(), 5000);
            // Bucle para manejar todas las alertas presentes
            while (true) {
                try {
                    const alert = await driver.switchTo().alert();
                    console.log('Manejando alerta emergente:', alert.getText());
                    await alert.accept();
                } catch (noAlertError) {
                    // Si no hay más alertas, salir del bucle
                    break;
                }
            }
        } catch (error) {
            console.log(`Error al manejar alertas: ${error}`);
        }
        //MANEJANDO DIV DIALOGO "antes de realizar tu tramite"
        const ispresentDiv = await driver.wait(until.elementLocated(By.id('myMainCorreoVigente')));
        if (ispresentDiv) {
            // Aquí puedes agregar un console log o cualquier otra lógica que necesites
            console.log('El div está presente. Ocultándo..');
            // Oculta el div cambiando su estilo con JavaScript
            await driver.executeScript("arguments[0].style.display = 'none';", ispresentDiv);
        } else {
            console.log('El div no está presente.');
        }
        //MANEJANDO EL DIV DE DIALOGO
        const ispresent = await driver.wait(until.elementLocated(By.className('close')));
        if (ispresent) {
        await driver.findElement(By.className('close')).click();
        } else {
        console.log("No se encontró ningún elemento");
        }
        
    } catch (error) {
        throw (error)
    }
};

module.exports = loginModule;
