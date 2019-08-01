(function () {
  const applicationServerPublicKey = 'BFtxnExZ9xHwI4yNwPgpLAlXwIkZpdV1mqHde-WHd2ML8aWKvHEzYexXbVUCsirMxIvbRvVEQM68l_o37wnKEB8';
  //Si serviceWorker lo admite, regístrelo
  if ("serviceWorker" in navigator  && 'PushManager' in window) {
    console.log('Service Worker y empuge(Push) es compatible');
    navigator.serviceWorker.register('./sw.js', { scope: "./" }) //setting scope of sw
    .then(registration => {
      console.info('¡El SW está registrado!');
      checkForPageUpdate(registration); // To check if new content is updated or not
    })
    .catch(function(error) {
      console.error('Service worker a fallado ', error);
    });
  }

  // Para actualizar el contenido de la modificacion del estado del SW
  function checkForPageUpdate(registration) {
    // onupdatefound se activará en la primera instalación y cuando cambie el archivo serviceWorker.js
    registration.addEventListener('statechange', function (e) {
      console.log("zsdsddsd  sd",e.target.state);
    });
    registration.addEventListener("updatefound", function() {
      // Para verificar si el SW ya está instalado y controlando la página o no
      if (navigator.serviceWorker.controller) {
        var installingSW = registration.installing;
        
        installingSW.onstatechange = function() {
          console.log("Estado del Service Worker :", installingSW.state);
          switch(installingSW.state) {
            case 'installed':
              // Ahora se agregarán nuevos contenidos a la memoria caché y se eliminarán los antiguos.
              // Este es el momento perfecto para mostrarle al usuario que el contenido de la página está actualizado.
              //toast('Site is updated. Refresh the page.', 5000);
              console.log('El sitio está actualizado. Recarga la página.', 5000);
              break;
            case 'redundant':
              throw new Error('El SW de instalación se volvió redundante.');
          }
        }
      }
    });
  }
})();
