export function Turnos(turnos) {

    const $div = document.createElement('div');
    $div.classList.add("div-turnos");
    const $p = document.createElement('p');
    $p.innerHTML(turnos)

    $div.appendChild($p);

    return $div;
}