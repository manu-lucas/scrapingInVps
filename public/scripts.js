
document.addEventListener('DOMContentLoaded', function () {

let respaldo; 
document.getElementById('miFormulario').addEventListener('submit', function (event) {
  event.preventDefault();
  const loaderFather = document.querySelector('.loaderFather');
  // Muestra el loader al enviar el formulario
  loaderFather.style.display = 'flex';

  const datos = {
    rut: document.getElementById('rut').value,
    password: document.getElementById('password').value
    // Agrega otras propiedades según sea necesario
  };

  fetch('/user', {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(response => response.text())
    .then(data => {

      const jsonData = JSON.parse(data);
      respaldo = jsonData
      const loaderFather = document.querySelector('.loaderFather');
      // Si hay datos, oculta el loader y procesa la información
      if (jsonData) {
        console.log(jsonData)
        loaderFather.style.display = 'none';
        const contenedor = document.getElementById('contenedor');
        const contenedor2 = document.getElementById('contenedor2');
        const contenedor3 = document.getElementById('contenedor3');
        const contenedor4 = document.getElementById('contenedor4');
        const containerRegTribu = document.getElementById('contenedor5')
        const renderContainer = document.getElementById('rendContainer')
        //si es un objeto o si es un array
        if (Array.isArray(jsonData[0])) {
          jsonData[0].forEach(ele => {
            // Crea un div por cada objeto
            const nuevoDiv = document.createElement('div');
            // Agrega la información del objeto al div
            nuevoDiv.innerHTML = `<p>Representante legal: </p><p>Nombre: ${ele.nombre}</p><p>RUT: ${ele.rut}</p><p>A partir de: ${ele.fecha}</p>`;
            contenedor.appendChild(nuevoDiv);
          });
        } else {
          renderContainer.style.display = 'flex';
          const nuevo = jsonData[0]
          const nuevoDiv = document.createElement('div');
          nuevoDiv.innerHTML = `<p class="titleRepreLegal">Representante legal</p><p>Nombre: ${nuevo.nombre}</p><p>RUT: ${nuevo.rut}</p><p>A partir de: ${nuevo.fecha}</p>`;
          contenedor.appendChild(nuevoDiv);
        }
        const titular = jsonData[2].owner
        const domicilio = jsonData[1].adress;
        const nuevoDiv1 = document.createElement('div');
        nuevoDiv1.innerHTML = `<p class="titleTitular">Titular y Domicilio</p><p>${titular}</p><p>${domicilio}</p>`;
        contenedor2.appendChild(nuevoDiv1);

        const actividad = jsonData[3]["Glosa descriptiva de actividades económicas"];
        const nuevoDiv2 = document.createElement('div');
        nuevoDiv2.innerHTML = `<p class="titleActEco">Actividades económicas</p><p>${actividad}</p>`;
        contenedor3.appendChild(nuevoDiv2);
        const periodos = document.createElement('div');
        periodos.innerHTML = '<p class="titleF29">Periodos Tributarios Mensuales</p>';
        contenedor4.appendChild(periodos)
        const imagen = document.createElement("img");

        const imagenBase64 = jsonData[4].screenshot
        imagen.src = "data:image/png;base64," + imagenBase64;;
        imagen.classList.add("imgf29");
        contenedor4.appendChild(imagen);
        const buttonSaveAndDelete = document.getElementById('buttonSaveAndDelete')
        // Creacion del div de guardar cliente
        const buttonSaveClient = document.createElement('div')
        buttonSaveClient.innerHTML = `<button id="saveClient" class="buttonStyle" type="submit">Guardar cliente</button>`
        buttonSaveAndDelete.appendChild(buttonSaveClient)
        //RENDER DE REGIMENES TRIBUTARIOS
        const regTribArrayInfo = jsonData[5]
        if (regTribArrayInfo && regTribArrayInfo.length > 0) {
          containerRegTribu.innerHTML = 'Regimenes Tributarios'
          // Iterar sobre el array
          regTribArrayInfo.forEach((element) => {
          // Crear una etiqueta p
          const item = document.createElement('p');
          // Asignar el contenido y una clase
          item.textContent = `${element}`;
          item.classList.add('regTribContenido')
          // Agregar el nuevo elemento al contenedor
          containerRegTribu.appendChild(item);
          });
        }
        //Div que limpia los datos recargando la pagina
        const buttonClean = document.createElement('div')
        buttonClean.innerHTML = `<button class="cleanData" type="submit">Limpiar datos y realizar una nueva busqueda</button>`
        buttonSaveAndDelete.appendChild(buttonClean)
        //Escucha del boton clean
        const cleanButton = document.querySelector('.cleanData');
            cleanButton.addEventListener('click', function (event) {
                // Evita que el formulario se envíe normalmente
                event.preventDefault();
                // Recarga la página
                location.reload();
            });
      } else {
        // Si no hay datos, muestra el loader
        loaderFather.style.display = 'block';
      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud', error);
      Swal.fire("Error", "Ha ocurrido un error en el proceso, vuelve a realizar la consulta", "error");
    })
    .finally(() => {
      // Oculta el loader después de procesar la respuesta
      loaderFather.style.display = 'none';
    });
});


//                    

/* -------------------------*/
// const responseContainer = document.getElementById('responseContainer');

/*document.getElementById('fileUploadForm').addEventListener('submit',
  function (event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    console.log(file.name)
    if (file.name) {
      const formData = new FormData();
      formData.append('file', file);
      fetch('/upload', {
        method: 'POST',
        body: formData
      })
        .then(response => response)
        .then(data => {
          console.log(data)
          // Crea un div con el contenido del Excel
          // const excelDiv = document.createElement('div');
          // excelDiv.textContent = JSON.stringify(data);

          // // Añade el div al contenedor
          // responseContainer.innerHTML = '';
          // responseContainer.appendChild(excelDiv);
        })
        .catch(error => {
          console.error('Error en la solicitud:', error);
        });
    }
  })*/

  document.getElementById('saveClient').addEventListener('click', function (event) {
       event.preventDefault();
      respaldo[2].rut= (document.getElementById('rut').value) 
      // console.log(respaldo)
      fetch('/saveinfo', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'

        },
        body: JSON.stringify(respaldo)
      }).then(res => {  console.log(res)})
      
    
  })
})