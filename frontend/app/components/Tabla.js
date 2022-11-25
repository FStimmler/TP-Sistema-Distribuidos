export function Tabla(reservas, sucursales) {

    let diccionario = {};

    sucursales.forEach(data => {
        diccionario[data["id"]] = data["nombre"];
    })

    console.log(diccionario)
    const $wrapper = document.createElement("div");
    $wrapper.id="all-turnos-wrapper";

    const $h2 = document.createElement('h2');
    $h2.innerHTML="Lista de total de Turnos";

    const $table_wrapper = document.createElement('div');
    $table_wrapper.style = "overflow-x:auto";

    const $table = document.createElement('table');

    let my_inner = `
        <tr>
            <th>Sucursal</th>
            <th>Fecha y Hora </th>
            <th>Libre? </th>
        </tr>

    `;

    let branchId="";
    let fecha ="";
    let libre ="";
    let sucursal = "";
    reservas.forEach(element => {
        branchId = element["branchId"];
        
        
        let fecha1 = new Date(element["fecha"])
        fecha1.setHours(fecha1.getHours()+3)
        fecha = fecha1.toLocaleString();
        //fecha =new Date(element["fecha"]).toLocaleString();
        libre=element["userId"]==-1?"si":"no";
        my_inner += `<tr><td>${diccionario[branchId]}</td><td>${fecha}</td><td>${libre}</td></tr>`
        
    });

    $table.innerHTML = my_inner;
    $table_wrapper.appendChild($h2);
    $table_wrapper.appendChild($table);

    return $table_wrapper;
}