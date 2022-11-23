export function ajax(props) {
    // let {url, method, headers}
    let { url, cbSuccess, meth, b } = props;

    fetch(url, { method: meth, body: b })
        .then(res => res.ok ? res.json() : Promise.reject(res))        
        .then(json => cbSuccess(json))
        .catch(err => {

            let message = err.statusText || "Ha ocurrido un error al intentar acceder a la API";
            
            document.getElementById("root").innerHTML = `
                    <div class="error">
                        <p> Error ${err.status}:${message}
                        </p>
                    </div>
                `
            console.log(err)


        });

}