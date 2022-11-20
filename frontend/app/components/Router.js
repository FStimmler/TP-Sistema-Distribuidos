

import { ajax } from "../helpers/ajax.js";
import { Form1 } from "./Form1.js";
import { Lista } from "./Lista.js";
import { Select } from "./Select.js";
import { About } from "./About.js";
import { Contact } from "./Contact.js";
import { Form2 } from "./Form2.js";
import { Form3 } from "./Form3.js";
import { Tabla } from "./Tabla.js";
import { IFrame } from "./IFrame.js";





export function Router() {
    const d = document;
    const w = window;
    let ext_branchId = "";

    let { hash, search } = location;
    console.log(hash);

    if (!hash) {
        //d.getElementById("main").innerHTML = "<h2>Bienvenido</h2>"
        //d.getElementById("main").innerHTML = "<h2>Bienvenido</h2>"
    }

    else if (hash === "#/") {

        console.log("entre 1")
        d.getElementById("main").innerHTML = null;
        d.getElementById("main").appendChild(Form1());
        d.getElementById("main").appendChild(IFrame());

        if (search != "") {
            console.log('search.incudes("fecha") --> ', search.includes("fecha"))
            console.log('search.includes("branchId") --> ', search.includes("branchId"))
            if (search.includes("fecha") && search.includes("branchId") && !search.includes('select-horarios')) {

                const qp = return_query_params(search);


                let fecha = qp["fecha"];
                let branchId = qp["branchId"]


                if (fecha != "" && branchId != "") {
                    d.getElementById("form1").style.display = "none";
                    d.getElementById("main").innerHTML = `<h2>Datos desde la Api</h2>`;

                    //busca_horarios_en_api(fecha, branchId);
                    cargaTurnos(qp);
                }
            } else if (search.includes('select-horarios')) {
                d.getElementById("form1").style.display = "none";

                const qp = return_query_params(search);

                console.log("QueryParams --> ", qp);
                queryParams["select-horarios"] = decodeURIComponent(qp["select-horarios"]);
                console.log("QueryParams --> ", qp);
                let userId = 1; // esto lo pongo en uno, pero no se que va
                let email = 1; // idem anterior
                reserva_turnos_en_api(queryParams["select-horarios"], userId, email, queryParams["branchId"]);
                /**
                 * 
                 * “fecha”:date
                    “userId”:num
                    “email”:string
                    “branchId”:num

                 */

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
        d.getElementById("main").innerHTML = "<h2>Elemento raiz</h2>"
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


const busca_horarios_en_api = (fecha, branchId) => {

    const queryP = {
        "fecha": fecha,
        "branchId": branchId
    }

    const fullUrl = addQueryParams("http://localhost:5000/api/reservas", queryP);

    ajax({
        // url: "http://localhost:5000/api/turnos",
        url: fullUrl,
        cbSuccess: (data) => {
            console.log(JSON.stringify(data));
            //document.getElementById("main").appendChild(Lista(data));
            document.getElementById("main").appendChild(Form2(data, queryP))
            //data.forEach(item => {console.log(item)})


        },
        meth: 'GET'
    })
}


// @ Reserva un turno
// /api/turnos?fecha=  &branchId=  &horario
const reserva_turnos_en_api = (fecha, userId, email, branchId) => {

    const queryP = {
        "fecha": fecha,
        "userId": userId,
        "email": email,
        "branchId": branchId
    }

    const fullUrl = addQueryParams("http://localhost:5000/api/reservas", queryP);

    console.log("fullUrl --> ", fullUrl)
    ajax({
        // url: "http://localhost:5000/api/turnos",
        url: fullUrl,
        cbSuccess: (data) => {
            console.log(JSON.stringify(data));
            //document.getElementById("main").appendChild(Lista(data));
            document.getElementById("main").appendChild(Form2(data))
            //data.forEach(item => {console.log(item)})


        },
        meth: 'POST'
    })
}



// @   list_params is a list of objects containing all the query params
// 
function addQueryParams(url, params) {

    let full_url = url + "?"


    const objLen = Object.keys(params).length;
    Object.keys(params).forEach((key, index) => {
        full_url += `${key}=${params[key]}`
        if (index <= objLen - 2) {
            full_url += "&"
        }
        // console.log("params.length --> ", params.length)
        //console.log(`Key: ${key} --> Value: ${params[key]}`);
    })
    // console.log("full url --> ", full_url);

    return full_url;

}



const getAllTurnos = () => {
    const fullUrl = "http://localhost:5000/api/reservas";

    console.log("fullUrl --> ", fullUrl)
    ajax({
        // url: "http://localhost:5000/api/turnos",
        url: fullUrl,
        cbSuccess: (data) => {

            document.getElementById("main").appendChild(Tabla(data))

        },
        meth: 'GET'
    })
}

const cargaTurnos = (qp) => {
    const fullUrl = "http://localhost:5000/api/reservas";
    ajax({
        // url: "http://localhost:5000/api/turnos",
        url: fullUrl,
        cbSuccess: (data) => {

            document.getElementById("main").appendChild(Form2(data, qp))

        },
        meth: "GET"
    })
}



    const getLibresTurnos = () => {
        const fullUrl = "http://localhost:5000/api/reservas/";

        console.log("fullUrl --> ", fullUrl)
        ajax({
            // url: "http://localhost:5000/api/turnos",
            url: fullUrl,
            cbSuccess: (data) => {
                //console.log(JSON.stringify(data));

                const filteredData = data.filter(item => {
                    return item.userId == null;
                })
                console.log("filtered data --> ", filteredData)
                document.getElementById("main").appendChild(Tabla(filteredData))



            },
            meth: 'GET'
        })
    }

    function enviar(id, value) {
        var branch = document.getElementById("branchId");
        var response
        fetch('http://localhost:5000/api/reservas/solicitar/' + id, {
            method: 'POST',
            body: value,
        })
            .then(async res => {
                if (res.status != 201) window.alert(await res.text())
                else {
                    arrayfecha = document.getElementById('fecha').value.split("-");
                    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
                    //console.log(form2.hora.options[0].text);    
                    id = document.getElementById('hora').value;
                    texto = "Esta apunto de reservar un turno el dia " + arrayfecha[2] + " de " + meses[arrayfecha[1] - 1] + " de " + arrayfecha[0] + " a las " + form2.hora.options[id].text;
                    if (confirm(texto) == true) {
                        fetch('http://localhost:5000/api/reservas/confirmar/' + id, {
                            method: 'POST',
                            body: value,
                        })
                            .then(async res => {
                                if (res.status != 201) window.alert(await res.text())
                            })
                    }
                }
            })
    }

