export function Form1() {
    // Creamos una form
    const $form = document.createElement("form");
    $form.classList.add('form');
    $form.id = "form1";
    $form.setAttribute("method", "get");

        
        $form.innerHTML = `
            <div id="fecha-panel" class="inner-div">
                <label for="fecha">Fecha</label>
                <input type="date" id="fecha" name="fecha">     
            </div>
            
            
            <div id="branchId-panel" class="inner-div">
            <label for="branchId">BranchId</label>
            <select name="branchId" id ="branchId">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            </div>
            
            <button type="submit" id='buscar-horario'>Buscar Horarios</button>
        
        `

    return $form;   
    
}
