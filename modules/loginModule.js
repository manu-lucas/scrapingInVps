const { By, until } = require('selenium-webdriver');


 const loginModule = async (driver, rut, clave) => {
    try {
        await driver.get('https://zeusr.sii.cl//AUT2000/InicioAutenticacion/IngresoRutClave.html?https://misiir.sii.cl/cgi_misii/siihome.cgi');
        const user = await driver.findElement(By.id('rutcntr')).sendKeys(rut);
        const password = await driver.findElement(By.id('clave')).sendKeys(clave);
        await driver.findElement(By.id("bt_ingresar")).click();
        //Verificar la presencia de "La Clave ingresada no es correcta"
        let isWrongPasswordPresent = false;
        try {
            const isPresentWrongPassword = await driver.wait(until.elementLocated(By.xpath('//*[@id="titulo"]')), 1500);
            
            if (isPresentWrongPassword) {
                try {
                    const tituloElement = await driver.findElement(By.xpath('//*[@id="titulo"]'));
                    const tituloText = await tituloElement.getText();
                    // Si el texto del elemento contiene la oración específica, lanza un error y detiene la ejecución
                    if (tituloText.includes("Información sobre este código, ingrese en \"códigos de mensaje de error\", opción 'Clave Tributaria' del menú 'Clave Tributaria y Representantes Electrónicos', en Servicios Online.")) {
                        console.log('Advertencia: La clave ingresada no es correcta para el cliente.');
                        // Puedes agregar aquí las acciones que deseas realizar cuando el elemento está presente
                        isWrongPasswordPresent = true;
                        throw new Error('generate in Login, Password incorrecta del cliente');
                    }
                } catch (error) {
                    // Manejar el error al obtener el texto del elemento
                    console.log("el elemento no password incorrecta no esta presente, continuando la ejecucion");
                }
            }
        } catch (error) {
            // Manejar la excepción si el elemento no está presente
            console.log("el elemento no password incorrecta no esta presente, continuando la ejecucion");
        }
        if (isWrongPasswordPresent) {
            // Si el elemento estaba presente, lanzar una excepción para detener la ejecución
            throw('generate in Login, Password incorrecta del cliente');
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
        try {
            const ispresentDiv = await driver.wait(until.elementLocated(By.id('myMainCorreoVigente')));
            if (ispresentDiv) {
                // Aquí puedes agregar un console log o cualquier otra lógica que necesites
                
                // Oculta el div cambiando su estilo con JavaScript
                await driver.executeScript("arguments[0].style.display = 'none';", ispresentDiv);
                console.log('El div está presente. Ocultándo..');
            } else {
                console.log('El div no está presente.');
            }
        } catch (error) {
            console.log("El div de dialogo no esta presente, continuando..");
        }
        
        //MANEJANDO EL DIV DE DIALOGO
        try {
            const ispresent = await driver.wait(until.elementLocated(By.className('close')));
            if (ispresent) {
            await driver.findElement(By.className('close')).click();
            } else {
            console.log("No se encontró ningún elemento");
            }
        } catch (error) {
            console.log("el div de dialogo no esta presente, continuando...");
        }
        
        
    } catch (error) {
        console.log("error en login module..", error);
        throw (error)
    }
};

module.exports = loginModule;
