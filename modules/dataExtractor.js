const { By, until } = require('selenium-webdriver');


 const getNameAndRut = async (driver) => {
    try {
        //Click en Datos personales y tributarios
        await driver.findElement(By.id('menu_datos_contribuyente')).click();
        //Cerrar div de "Actividad economica principal"
        const divActEco = await driver.findElement(By.id("myMainActeco"));
        await driver.executeScript("arguments[0].style.display = 'none';", divActEco);
        //Click en Representantes legales
        await driver.findElement(By.id('headingConsultas')).click();
        await driver.sleep(3000);
        //Obteniendo la informacion del dropdown y sumando a un array
        const dropdownElements = await driver.findElements(By.xpath('//*[@id="no-more-tables"]/table/tbody/tr'));
        const elementTexts = [];
        let currentGroup = [];
        for (const element of dropdownElements) {
            const text = await element.getText();
            if (text.trim() !== '') {
                const parts = text.split(/\s+/);  
                const nombre = parts.slice(0, -2).join(' ');  
                const rut = parts.slice(-2, -1).join(' ');  
                const fecha = parts.slice(-1).join(' ');  
                //elementTexts.push({ nombre, rut, fecha });
                const data = { nombre, rut, fecha };
                currentGroup.push(data);
            }
        }
        //Verificar si la info recopilada tiene mas de 1 dato lo agrega como array,
        //de lo contrario lo agrega como objeto
        if (currentGroup.length >= 2) {
            elementTexts.push(currentGroup);
        } else if (currentGroup.length === 1) {
            elementTexts.push(currentGroup[0]);
        }
        console.log('Datos del desplegable:');
        console.log(elementTexts);
        return elementTexts;
    } catch (error) {
        console.log(`error in getNameAndRut: ${error}`);
    }
};
//Funcion que obtiene la direccion
 const getAdress = async (driver) => {
    try {
        //Localizar el elemento 
        const info =  await driver.findElement(By.id('domiCntr'));
        //Obtener el texto del elemento
        const adress = await info.getText();
        const adressObj = {
            adress
        }
        return adressObj
    } catch (error) {
        console.log(`error in getAdress: ${error}`);
    }
};
//Funcion que obtiene el nombre del Titular de los datos
 const getOwnerOfData = async (driver) => {
    try {
        //Localizar el elemento 
        const infoOwner =  await driver.findElement(By.id('nameCntr'));
        //Obtener el texto del elemento
        const owner = await infoOwner.getText();
        const ownerObj = {
            owner
        }
        return ownerObj
    } catch (error) {
        console.log(`error in getOwnerOfData: ${error}`);
    }
};
//Funcion que obtiene los datos de la seccion actividades economicas
//Especificamente el contenido de "Glosa descriptiva de actividades economicas"
 const getEconomicActivities = async (driver) => {
    try {
        //Click en Datos personales y tributarios
        await driver.findElement(By.id('menu_datos_contribuyente')).click();
        //Cerrar div de "Actividad economica principal"
        const divActEco = await driver.findElement(By.id("myMainActeco"));
        await driver.executeScript("arguments[0].style.display = 'none';", divActEco);
        //Click en Actividades economicas
        await driver.findElement(By.id('headingP10')).click();
        await driver.sleep(3000);
        //Obteniendo la informacion del dropdown y sumando a un array
        const dropdownElements = await driver.findElements(By.xpath('//*[@id="divActEcos"]/table/thead/tr'));
        let elementObj = {};
        for (const element of dropdownElements) {
            const text = await element.getText();
            // Encuentra el índice de la palabra "económicas"
            const index = text.indexOf('económicas');
            // Si encontró la palabra, divide el texto en dos partes
            if (index !== -1) {
                const key = text.substring(0, index + 'económicas'.length).trim();
                const value = text.substring(index + 'económicas'.length).trim();
                const obj = { [key]: value };
                elementObj = obj
            } else {
                console.log('No se encontró la palabra "económicas" en el texto');
            }
        }
        console.log(elementObj);
        return elementObj;
    } catch (error) {
        console.log(`error in getEconomicActivities: ${error}`);
    }
};
//Funcion que navega hacia el formulario F29 Y toma screenshot del table
 const getFormularioF29 = async (driver) => {
    try {
        //Click en seccion Servicios Online
        await driver.findElement(By.xpath('//*[@id="main-menu"]/li[2]/a')).click();
        await driver.sleep(1000)
        //Click en seccion Impuestos mensuales
        await driver.findElement(By.id('linkpadre_1042')).click();
        //Click en consulta y seguimiento
        await driver.findElement(By.xpath('//*[@id="my-wrapper"]/div[2]/div/div/div[2]/p[7]/a')).click();
        //Click en consulta integral F29
        await driver.findElement(By.xpath('//*[@id="my-wrapper"]/div[2]/div/div/div[2]/p[2]/a[2]')).click();
        //Esta seccion demora en cargar asique hacemos dormir al navegador
        await driver.sleep(5000);
        //Click en table item +F29 cuando el elemento este presente
        const ispresent = await driver.wait(until.elementLocated(By.css("a[href='#29']")));
        if(ispresent){
            await driver.findElement(By.css("a[href='#29']")).click();
        } else {
            console.log("elemento no encontrado o selector incorrecto");
        }
        //Esperar ya que es una pestaña que tarda en cargarse
        await driver.sleep(1500)
        //Scroll a la pagina y take screenshot
        const table = await driver.findElement(By.xpath('//*[@id="frame-window"]/table/tbody/tr[2]/td/table/tbody/tr/td/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr[1]/td/table/tbody/tr[3]/td/table/tbody'));
        await driver.executeScript('arguments[0].scrollIntoView({ behavior: "auto", block: "center", inline: "center" });', table);
        const screenshot = await table.takeScreenshot();
        return {screenshot}
    } catch (error) {
        console.log(`error in getFormularioF29: ${error}`);
    }
};
//Funcion para obtener el recuadro azul de regimenes tributarios
const getRegimenesTributarios = async (driver) => {
    try {
        //Localizar el elemento 
        const boxContent =  await driver.findElement(By.xpath('//*[@id="box_user_info"]'));
        //Que contiene el elemento
        const text = await boxContent.getText()
         // Separar las palabras usando '\n' 
        const palabras = text.split('\n');
         //Conjunto set para almacenar palabras únicas que no se repitan
        const conjuntoPalabras = new Set(palabras.map((palabra) => palabra.trim()));
         // Convertir el conjunto a un array
        const arrayPalabras = [...conjuntoPalabras];
         // Imprimir el array
        return arrayPalabras
    } catch (error) {
        throw new Error(`error in getRegimenesTributarios: ${error}`)
    }
};
module.exports = {getNameAndRut,getAdress,getEconomicActivities,getFormularioF29,getRegimenesTributarios, getOwnerOfData};
