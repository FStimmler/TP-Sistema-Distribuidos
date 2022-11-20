export function ajax(props) {
    // let {url, method, headers}
    let {url, cbSuccess, meth} = props;

    fetch(url, {method:meth})
    .then(res => res.ok ? res.json(): Promise.reject(res))
    .then(json => cbSuccess(json))
    .catch(err => {
        let message = err.statusText  || "Ha ocurrido un error al intentar acceder a la API";
        //let message = "Ha ocurrido un error al intentar acceder a la API";

        document.getElementById("root").innerHTML = `
            <div class="error">
                <p> Error ${err.status}:${message}
                </p>
            </div>
        `
        console.log(err)
    });

}