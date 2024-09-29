// Esta es la forma antigua de como se hacían los llamados al servidor en JavaScript

// Se instala para poder trabajar con las peticiones al servidor (solicitudes http) fuera del navegador
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// Llamado a la Api (el llamado en mayúsculas es una referencia de que este valor no va a cambiar en nuestros archivos)
const API = 'https://api.escuelajs.co/api/v1';

// función para recibir la url de la API que tenemos y el callBack que va a ser una función anónima para recibir el llamado a esta API
// funcion principal que obtendrá la informacion del producto como un objeto
function fetchData(urlApi, callback) {

// Vamos a poner controlar todo el flujo del llamado
// inicializar un objeto de tipo XMLHttpRequest
    let xhttp = new XMLHttpRequest();

// open: abre conexion a una Api(Get: Tipo de conexión, urlApi: url que va a utilizar, true: el valor de true para habilitar)
// El metodo .open realiza la petición de apertura de comunicación, el metodo puede ser 'GET' o 'POST', luego se envia la URL, si es asincrono (true o false), usuario y contraseña. En esta caso solo se utiliza el metodo, la url y async
    xhttp.open('GET', urlApi, true);

// este es parte de los recursos que me entrega xhttp, para escuchar diferentes estados que tiene la solicitud y con esto saber cuando está disponible la información. Le pasamos una función, la cual recibe un evento. 
// en este metodo Almacena el nombre de la función que se ejecutará cuando el objeto XMLHttpRequest cambie de estado
    xhttp.onreadystatechange = function(event){

        // dentro de la función lo que hacemos es validar si la llamada está en estado de completada
        // el atributo readyState define el estado del objeto XMLHttpRequest
        //0 No inicializado
        //1 Loading
        //2 ejecutado
        //3 interactuando
        //4 completado
        if(xhttp.readyState === 4){

            // Validamos el status sobre valor y tipo, si nuestro servidor respondió de manera correcta (en este caso sobre valor 200 porque esto quiere decir que la solicitud ha sido correcta y con ello poder obtener la infomación)
            // si la respuesta de la API es exitosa (200 Ok)
            if(xhttp.status === 200){

                // ahora utilizamos un callback para pasar la información, el primer elemento se lo pasamos como un valor nulo y el segundo elemento va a ser una transformación de la información, el JSON es para convertir en un objeto el texto que nos envía el servidor
                //se ejecuta el callback recibiendo como argumentos un objeto, como la respuesta de la API es un texto plano, el metodo JSON.parse tranformará este texto en un objeto.
                //El atributo devuelve un DOMString que contiene la  respuesta a la consulta como un texto o null si la consulta no tuvo exito o aun no ha sido completada.
                callback(null, JSON.parse(xhttp.responseText))
            } 
            // la segunda validación if la dejamos sin un else
             // si la respuesta de la API no es exitosa se captura el error
        } else {

            // Este else es para el manejo de la información cuando tengamos un error. Al error le pasamos un nombre y en este caso la api porque es desde donde vendría el error en dado caso
            // Se inicializa un objeto de tipo Error donde se le envian como argumentos un mensaje de error y la URL de la API para conocer en dónde se produjo el error
            const error = new Error('Error ' + urlApi);
            
            // Y lo que retornamos es el callback con el error y el valor nulo porque no estoy retornando ningún dato si ocurre el error.
            // Se ejecuta el callback recibiendo como argumentos el error y null debido a que no se pudo obtener el objeto
            return callback(error, null);
        }
    }
    // Este llamado es para que se ejecute toda esta lógica que se ha creado.
    // El método .send() envia la petición al servidor.
    xhttp.send();
}

// Se invoca el metodo fetchData() pasandole como argumentos la varible API concatenada con la cadena 'products' para acceder a la URL de la API deseada, y una función anónima que recibe 2 parámetros (un objeto de error y un arreglo que almacena todos los objetos traidos por la API).
fetchData(`${API}/products`, function(error1, data1){

    // Se valida si existe un error, en caso de que exista se detiene el proceso y se imprime el error.
    if(error1) return console.error(error1);

    // Se invoca nuevamente la función fetchData con el fin de acceder a un objeto puntual del arreglo data1, se envia como parámetros la url de la API apuntando al atributo del primer objeto de arreglo data1 y nuevamente una función anónima.
    fetchData(`${API}/products/${data1[0].id}`, function(error2, data2){

        // Si en este punto se identifica un error se imprime en consola y se detiene el proceso.
        if(error2) return console.error(error2);

        // Se invoca nuevamente la funcion fetchData con el fin de acceder a la categoria, se envían como parametros la url de la API con la concatenación de 'Categories' y el atributo Id de categoria del objeto data2 de la función anterior.
        // En este caso puntual se hace uso de Optional Chaining el cual hace una evalucación de las propiedades de un objeto y en vez de arrojar un error devuelve undefined en caso que la propiedad no exista o sea null.
        // Igual que las anteriores y envia una función anónima con dos argumentos, un objeto Error y un objeto de datos.
        fetchData(`${API}/categories/${data2?.category?.id}`, function(error3, data3){

            // Se valida si existe error, en caso de que exista se detiene el proceso y se imprime el error.
            if(error3) return console.error(error3);

            // Se imprime el objeto en la posición 1 del arreglo de los objetos obtenidos en el método invocado inicialmente.
            console.log(data1[0]);

            // Se imprime el titulo del objeto que se consultó en la seguna invocación de la función.
            console.log(data2.title);

            // Se imprime el nombre de la categoria a la que pertenece el objeto que se consultó en la seguna invocación del método.
            console.log(data3.name);                        
        })
    })
})