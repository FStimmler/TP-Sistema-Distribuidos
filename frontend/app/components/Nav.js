export function Nav() {

    const $nav = document.createElement('nav');
    $nav.innerHTML = `
        <a href="http://127.0.0.1:5500#/" class="nav__link">Reserva de Turnos</a>       
        <a href="http://127.0.0.1:5500#/consulta" class="nav__link">Consulta de Turnos</a> 
        <a href="http://127.0.0.1:5500#/about" class="nav__link" >About</a>
        <a href="http://127.0.0.1:5500#/contact" class="nav__link" >Contactanos</a>
        
    `;


    

    return $nav;


}