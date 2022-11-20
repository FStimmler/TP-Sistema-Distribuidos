
import { Title } from "./components/title.js";
import { Form1 } from "./components/Form1.js";
import { Router } from "./components/Router.js";
import { Nav } from "./components/Nav.js";
import { Header } from "./components/Header.js";



export function App() {
    const d = document;
    const $root = d.getElementById("root");

    $root.innerHTML = null;
    
    // $root.appendChild(Nav());
    // $root.appendChild(Title());
    $root.appendChild(Header());
    
    //$root.appendChild(Form1());
    Router();
    // document.getElementById("root").innerHTML = `<h1>Sistema de Reserva de turnos</h1>`
}

// console.log(api);

// const auxiliar = "https://malvestida.com/wp-json/wp/v2/posts?_embed";
// const aux2 = api.MAIN_RUTA
// console.log("main ruta --> ", aux2)

// // ajax({
// //     url:aux2,
// //     cbSuccess: (data) => {
// //         console.log(data)
// //     }
// // })

// // // Para forzar un 404
// // ajax({
// //     url:"Pepe",
// //     cbSuccess: () => {}
// // })


// // Para buscar datos desde nuestra api de turnos
// ajax({
//     url:auxiliar,
//     cbSuccess:(posts) => {
//         console.log(posts)
//     }
// })