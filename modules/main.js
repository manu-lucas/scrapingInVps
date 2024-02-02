const { Builder } = require('selenium-webdriver');
const loginModule = require('./loginModule.js');
const dataExtractor = require('./dataExtractor.js');
const { getEconomicActivities, getFormularioF29, getNameAndRut, getAdress, getOwnerOfData, getRegimenesTributarios } = dataExtractor;
const chrome = require('selenium-webdriver/chrome');

const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless'); //se ejecuta en modo sin cabeza
chromeOptions.addArguments("start-maximized"); // open Browser in maximized mode
chromeOptions.addArguments("disable-infobars"); // disabling infobars
chromeOptions.addArguments("--disable-extensions"); // disabling extensions
chromeOptions.addArguments("--disable-gpu"); // applicable to windows os only
chromeOptions.addArguments("--disable-dev-shm-usage"); // overcome limited resource problems
chromeOptions.addArguments("--no-sandbox"); // Bypass OS security model

async function runAllUsers(rut,password) {
  const driver = new Builder().forBrowser('chrome').build();
  try {
    // Especifica la ruta al ejecutable de ChromeDriver
    //const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).setChromeService(new chrome.ServiceBuilder('/home/miasesor/htdocs/miasesor.tech/scraping/drivers/chromedriverlinux/chromedriver')).build();
    
    //const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    await loginModule(driver, rut, password);
    //Regimenes tributarios
    const regTribArray = await getRegimenesTributarios(driver)
    //Representantes legales
    const infoArray =  await getNameAndRut(driver);
    //Domicilio
    const info2 = await getAdress(driver)
    infoArray.push(info2)
    //Nombre del dueño de los datos
    const infoAdicional = await getOwnerOfData(driver)
    infoArray.push(infoAdicional)
    //Actividades economicas
    const info3 = await getEconomicActivities(driver);
    infoArray.push(info3)
    //Formulario F29
    const objScreenshot = await getFormularioF29(driver);
    infoArray.push(objScreenshot)
    infoArray.push(regTribArray)
    driver.quit();
    return infoArray
    } catch (error) {
      await driver.quit();
      throw Error(`catched in MAIN.JS: ${error}`)
    }
}
module.exports= runAllUsers



//Esta funcion se utiliza para sacar nueva info y hacer el test
// async function test(rut,password) {
//   try {
//     const driver = new Builder().forBrowser('chrome').build();
//     await loginModule(driver, "rut", "password");
//     //REGIMENES TRIBUTARIOS
//     await getRegimenesTributarios(driver)
//     } catch (error) {
//       throw new Error(`ERROR IN test ${error}`)
//     }
// }
// test()