import { Router } from "./components/Router.js";
import { Header } from "./components/Header.js";


export function App() {
    const d = document;
    const $root = d.getElementById("root");

    $root.innerHTML = null;   
    
    $root.appendChild(Header());
        
    Router();
    
}
