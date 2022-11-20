export function Contact() {
    const $div = document.createElement("div");
    $div.classList.add("page-container");
    $div.classList.add("align-center");
    $div.classList.add("parent");

    const $div_child = document.createElement("div");
    $div_child.classList.add("child");
    $div_child.innerHTML = `
    <h1>Contactanos!</h1>
        <div class="mail-container container">
        <ul>
            <li><a href="mailto: noelia.echeverria08@gmail.com">Email de Noelia</a></li>
            <li><a href="mailto: poner_mail_de_cami@gmail.com">Email de Camila</a></li>
            <li><a href="mailto: poner_mail_de_Fran@gmail.com">Email de Francisco</a></li>
            <li><a href="mailto: poner_mail_de_Ima@gmail.com">Email de Imanol</a></li>
        </ul>
        </div>
    `

    $div.appendChild($div_child);

    return $div;
    
}
