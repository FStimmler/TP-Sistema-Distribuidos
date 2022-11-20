export function IFrame() {
    const $div = document.createElement("div");
    $div.id = "iframe-wrapper";

    const $iframe = document.createElement("iframe");
    $iframe.id = "myframe";
    const src_iframe = "https://app.cartes.io/maps/784bf9d1-aa8b-4156-b8b4-d056ffc57904/embed?lat=-37.963215068890825&lng=-57.55505561828614&zoom=13";
    $iframe.setAttribute("src", src_iframe);
   

    $div.appendChild($iframe);

    return $div;
}