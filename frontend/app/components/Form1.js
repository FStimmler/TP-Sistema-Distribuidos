import {IFrame} from "./IFrame.js"

export function Form1(datos) {
    // Creamos una form
    const $form = document.createElement("form");
    $form.classList.add('form');
    $form.id = "form1";
    $form.setAttribute("method", "get");

    // ---------------------------------------------------------------------------
    const  $panel1 = document.createElement('div');
    $panel1.classList.add('inner-div');
    $panel1.id = "fecha-panel";

    const $label1 = document.createElement("label");
    $label1.setAttribute("for", "fecha");
    $label1.innerHTML = "Fecha";

    const $input1 = document.createElement('input');
    $input1.setAttribute("type", "date");
    $input1.setAttribute("name", "fecha");
    $input1.id = "fecha";

    $panel1.appendChild($label1);
    $panel1.appendChild($input1);
    // ---------------------------------------------------------------------------
    const $panel2 = document.createElement('div');
    $panel2.classList.add("inner-div");
    $panel2.id = "branchId-panel";

    const $label2 = document.createElement("label");
    $label2.setAttribute("for", "branchId");
    $label2.innerHTML = "Sucursal";

    const $div = IFrame();


    const $select = document.createElement("select");
    $select.setAttribute("name", "branchId");
    $select.id = "branchId";

    if (datos.length > 0) {
        datos.forEach(element => {
            let $option = document.createElement("option");
            let sucursal = element.nombre;
            let id_sucursal = element.id;

            $option.value = id_sucursal;
            $option.text = sucursal;
            $select.appendChild($option)

            //console.log("sucursal --> ",sucursal);
            //console.log("id_sucursal --> ", id_sucursal);
        })
    }

    $panel2.appendChild($label2);
    $panel2.appendChild($div);
    $panel2.appendChild($select);

    // ---------------------------------------------------------------------------

    const $button = document.createElement("button");
    $button.id = "buscar-horario";
    $button.setAttribute("type", "submit");
    $button.innerHTML = "Buscar Horarios";

    // ---------------------------------------------------------------------------

    $form.appendChild($panel1);
    $form.appendChild($panel2);
    $form.appendChild($button);



    return $form;       
}