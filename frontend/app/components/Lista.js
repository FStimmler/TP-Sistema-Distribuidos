export function Lista(datos) {
    const $ul = document.createElement("ul");
    
    datos.forEach(element => {
        $ul.innerHTML += `<li> ${JSON.stringify(element)} </li>`;
        
    });

    return $ul;
}