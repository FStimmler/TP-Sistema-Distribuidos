import { Nav } from "./Nav.js";
import { Title } from "./title.js";

export function Header() {
    const $header = document.createElement("header");
    $header.classList.add("header");
    $header.appendChild(Nav());
    $header.appendChild(Title());
    return $header;
    
}

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}