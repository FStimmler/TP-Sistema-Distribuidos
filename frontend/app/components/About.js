export function About() {
    const $div  = document.createElement("div");
    $div.classList.add("page-container");
    $div.classList.add("align-center");
    $div.classList.add("parent");
    $div.id = "about-page-id";

    $div.innerHTML = `
    
        <div class="about-page child">
            
            <h1>Quienes somos</h1>   
            <div class="name-container container">   
                <ul class="who">
                    <li>Noelia Echeverría</li>
                    <li>Camila Ezama</li>
                    <li>Francisco Stimmler</li>
                    <li>Imanol Vazquez</li>
                </ul>
            </div>
        </div>

        
        <div class="child" id="gh-card">
            <h1>Nuestros GitHubs</h1>


            <div class="githubs-container container">
                <ul class="gh">
                <li>
                    <a href="https://github.com/Silverado42" class="GH-card" target="_blank">
                        <i class="fa fa-github"></i>
                        <span>GH de Francisco</span>
                    </a><br>
                </li>
                <li>
                    <a href="https://github.com/PhDNoe" class="GH-card" target="_blank">
                        <i class="fa fa-github"></i>
                        <span>GH de Noe</span>
                    </a><br>
                </li>
                <li>
                    <a href="https://github.com/imavazq" class="GH-card" target="_blank">
                        <i class="fa fa-github"></i>
                        <span>GH de Imanol</span>
                    </a><br>
                </li>
                <li>
                <a href="https://github.com/camilaezama" class="GH-card" target="_blank">
                    <i class="fa fa-github"></i>
                    <span>GH de Camila</span>
                </a>
                </li>
                </ul>
            </div>
        </div>
    </div>
    `

    return $div;


}

