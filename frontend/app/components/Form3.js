export function Form3() {
    // Creamos una form
    const $form = document.createElement("form");
    $form.classList.add('form');
    $form.id = "form1";
    $form.setAttribute("method", "get");

        
        $form.innerHTML = `

        <fieldset>
        <legend>Que tipo de busqueda desea realizar</legend>
    
        <div id="show-turnos">
            <div class="turnos-opt">
                <input type="radio" id="todos" name="filtro" value="todos" checked>
                <label for="todos">Ver todos los turnos (libres y ocupados)</label>
            </div>
        
            <div class="turnos-opt">
                <input type="radio" id="libres" name="filtro" value="libres">
                <label for="libres">Ver solo los turnos libres</label>
            </div>
    
        </div>
            <button type="submit" id='buscar-all-turnos'>Mostrar Turnos</button>
        
        `

    return $form;   
    
}
