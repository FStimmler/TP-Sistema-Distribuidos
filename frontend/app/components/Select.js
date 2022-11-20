export function Select(datos) {
    const $select = document.createElement("select");
    $select.id = "select1";
    
    datos.forEach(element => {
        let $option = document.createElement("option");
        let fecha = new Date(element.fecha);
        $option.value = fecha.getHours();
        $option.text = fecha.toLocaleTimeString();
        $select.appendChild($option)
        
    });

    return $select;
}