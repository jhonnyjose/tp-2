<php

></php>
    

<!doctype html>
<html lang="es">

<head>

    <!-- Required meta tags -->
    <meta charset="utf-8">
    <title>Jhonny Díaz, Cátedra PWA</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="manifest" href="../manifest.json" />

    <!-- Material  -->
    <link rel="stylesheet" href="../css/materialize.css">
    <link rel="stylesheet" href="../css/materialize.min.css">
    <link rel="stylesheet" href="../css/estilos.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">


    <!-- Include Dexie -->
    <script src="https://unpkg.com/dexie@latest/dist/dexie.js"></script>
    <!-- funcionamiento de carrusel y togle -->


</head>

<body class="center-block">






    <nav>
        <div class="nav-wrapper">
            <a href="../index.html" class="brand-logo center">
                <h1>Tu Cantante</h1>
            </a>


            <a href="../index.html" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
              

                <li><a href="../contacto.html">Contacto</a></li>

            </ul>
        </div>
    </nav>

    <ul class="sidenav" id="mobile-demo">
        <li><a href="../index.html">Home</a></li>
      

        <li><a href="../contacto.html">Contacto</a></li>

    </ul>




    <div class="container">
        <section class="row ">
            <div class=" valign-wrapper  ">
                <div class="col s12 m12 l12   center blanco">
                    <p>Muchas gracias, hemos recibido su comentario.</p>
                    <p>Pronto nos comunicaremos con Vos. </p>

                    <p>Podes seguir buscando más artistas</p>

                    <a href="../index.html" class="btn azul">Vamos</a>
                </div>
            </div>




        </section>


    </div>

    <footer class="page-footer azul textofooter">
        <div class="center">
            <div class="container">

                <p>Jhonny Diaz | PWA | II Trabajo Práctico</p>
            </div>
        </div>

    </footer>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

    <script src="../js/register-sw.js"></script>  
    <script src="../js/materialize/materialize.js"></script>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.sidenav');
            var instances = M.Sidenav.init(elems);
        });
    </script>



</body>

</html>