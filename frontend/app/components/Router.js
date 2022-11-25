

import { ajax } from "../helpers/ajax.js";
import { Form1 } from "./Form1.js";
import { About } from "./About.js";
import { Contact } from "./Contact.js";
import { Form2 } from "./Form2.js";
import { Form3 } from "./Form3.js";
import { Tabla } from "./Tabla.js";
import { Confirmacion } from "./Confirmacion.js";




export function Router() {
    const d = document;
    const w = window;

    let { hash, search } = location;
    console.log(hash);

    // cuando recien arranca, no muestra nada extra
    if (!hash) {

    }

    // cuando vamos al HOME
    else if (hash === "#/") {

        console.log("entre 1")
        d.getElementById("main").innerHTML = null;
        getSucursales();


        // CUANDO intento obtener los horarios para una sucursal
        if (search != "") {
            //console.log('search.incudes("fecha") --> ', search.includes("fecha"))
            //console.log('search.includes("branchId") --> ', search.includes("branchId"))
            if (search.includes("fecha") && search.includes("branchId") && !search.includes('select-horarios')) {

                const qp = return_query_params(search);
                //console.log("Query params --> ", qp);

                let fecha = qp["fecha"];
                let branchId = qp["branchId"]

                // carga los horarios para la sucursal seleccionada
                if (fecha != "" && branchId != "") {
                    cargaTurnos(qp);
                }

                // una vez que ya tenemos la sucursal, fecha y horario, debemos reservar el horario.
            } else if (search.includes('select-horarios')) {


                const qp = return_query_params(search);
                qp["select-horarios"] = decodeURIComponent(qp["select-horarios"]);


                qp["email"] = decodeURIComponent(qp["email"]);
                const email = qp["email"];
                const todo = JSON.parse(qp["select-horarios"]);

                const id = todo.id;
                const fecha = todo.fecha;

                // con todo, ahora intentamos reservar un turno
                enviar(id, fecha, email)

            }


        }
    } else if (hash === "#/about") {
        d.getElementById("main").innerHTML = null;
        console.log("Entre 2")
        d.getElementById("main").appendChild(About());
    } else if (hash === "#/contact") {
        console.log("Entre 3")
        d.getElementById("main").innerHTML = null;
        d.getElementById("main").appendChild(Contact());
    } else if (hash === "#/consulta") {
        d.getElementById("main").innerHTML = null;
        d.getElementById("main").appendChild(Form3());

        if (search.includes('filtro')) {
            let qp = return_query_params(search);

            if (qp["filtro"] == "todos") {
                d.getElementById("main").innerHTML = null;
                getAllTurnos();
            } else {
                d.getElementById("main").innerHTML = null;
                getLibresTurnos();
            }
        }
        console.log("entre 4")
    } else {
        d.getElementById("main").innerHTML = null;
        //d.getElementById("main").innerHTML = "<h2>Elemento raiz</h2>"
        console.log("entre 5")

    }


}


const return_query_params = (search) => search.split('?')[1]
    .split('&')
    .reduce((accumulator, singleQueryParam) => {
        const [key, value] = singleQueryParam.split('=');
        accumulator[key] = value;
        return accumulator;
    }, {});



const getAllTurnos = () => {
    const fullUrl = "http://localhost:5000/api/reservas";
    const fullUrl2 = "http://localhost:5000/api/sucursales";


    ajax({
        // url: "http://localhost:5000/api/turnos",
        url: fullUrl,
        cbSuccess: (data) => {

            ajax({
                url: fullUrl2,
                cbSuccess: (data2) => {
                    document.getElementById("main").appendChild(Tabla(data, data2))
                },
                meth: "GET"
            })


        },
        meth: 'GET'
    })
}



const getLibresTurnos = () => {
    const fullUrl = "http://localhost:5000/api/reservas/";
    const fullUrl2 = "http://localhost:5000/api/sucursales";


    ajax({

        url: fullUrl,
        cbSuccess: (data) => {
            //console.log("filtered data --> ", filteredData)

            ajax({
                url: fullUrl2,
                cbSuccess: (data2) => {
                    const filteredData = data.filter(item => {
                        return item.userId == -1;
                    })
                    document.getElementById("main").appendChild(Tabla(filteredData, data2));
                },
                meth: "GET"
            })




        },
        meth: 'GET'
    })
}


const cargaTurnos = (qp) => {
    const fullUrl = "http://localhost:5000/api/reservas";
    const fullUrl2 = "http://localhost:5000/api/sucursales";
    ajax({
        // url: "http://localhost:5000/api/turnos",
        url: fullUrl,
        cbSuccess: (data) => {
            ajax({
                url: fullUrl2,
                cbSuccess: (data2) => {
                    document.getElementById("form1").style.display = "none";
                    document.getElementById("main").appendChild(Form2(data, qp, data2));
                }
            })


        },
        meth: "GET"
    })
}


// Para reservar correctamente, en el server debemos tener 

// {
//     "id": 3, // este puede ser cualquier cosa
//     "fecha": "2022-11-17T20:00:00.000Z",
//     "userId": null,  // este debe estar en null
//     "email": null, // este debe estar en null
//     "branchId": 54,
//     "status":0 }

function enviar(id, fecha, email) {

    const url1 = 'http://localhost:5000/api/reservas/solicitar/' + id;
    const url2 = 'http://localhost:5000/api/reservas/confirmar/' + id;
    const body1 = JSON.stringify({ "userId": 0 });
    const body2 = JSON.stringify({ "email": email });

    const dias_semana = {
        0: "Domingo",
        1: "Lunes",
        2: "Martes",
        3: "Miercoles",
        4: "Jueves",
        5: "Viernes",
        6: "Sabado"
    }

    fetch(url1, {
        method: 'POST',
        body: body1,
    })
        .then(async res => {
            document.getElementById("main").innerHTML = null;
            if (res.status != 201) window.alert(await res.text())
            else {

                let fc = new Date(fecha);
                let dia = fc.getDay();
                fc.setHours(fc.getHours()+3)
                let fechita = fc.toLocaleDateString();
                let hora = fc.toLocaleTimeString();
                let texto = `Esta a punto de reservar un turno el dia ${dias_semana[dia]} ${fechita} a las ${hora}`;
                if (confirm(texto) == true) {
                    fetch(url2, {
                        method: 'POST',
                        body: body2,
                    })
                        .then(async res => {

                            if (res.status != 201) window.alert(await res.text())
                            else {
                                document.getElementById("main").appendChild(Confirmacion());
                            }
                        })
                }
            }
        })
}





const getSucursales = () => {
    const fullUrl = "http://localhost:5000/api/sucursales";
    ajax({

        url: fullUrl,
        cbSuccess: (data) => {

            document.getElementById("main").appendChild(Form1(data));            

        },
        meth: "GET"
    })
}
