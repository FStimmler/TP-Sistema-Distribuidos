export function Tabla(datos) {

    const $wrapper = document.createElement("div");
    $wrapper.id="all-turnos-wrapper";

    const $h2 = document.createElement('h2');
    $h2.innerHTML="Lista de total de Turnos";

    const $table_wrapper = document.createElement('div');
    $table_wrapper.style = "overflow-x:auto";

    const $table = document.createElement('table');

    let my_inner = `
        <tr>
            <th>Sucursal(branchId)</th>
            <th>Fecha y Hora </th>
            <th>Libre? </th>
        </tr>

    `;

    let branchId="";
    let fecha ="";
    let libre ="";
    datos.forEach(element => {
        branchId = element["branchId"];
        fecha =new Date(element["fecha"]).toLocaleString();
        libre=element["userId"]==null?"si":"no";
        my_inner += `<tr><td>${branchId}</td><td>${fecha}</td><td>${libre}</td></tr>`
        
    });

    $table.innerHTML = my_inner;
    $table_wrapper.appendChild($h2);
    $table_wrapper.appendChild($table);

    return $table_wrapper;
}