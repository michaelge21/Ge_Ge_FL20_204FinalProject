function switchColor() {
    var body = document.body;
    var bodyText = [];
    bodyText = document.getElementsByClassName("change-color");
    // var bodyText = document.
    console.log(bodyText);

    Array.from(bodyText).forEach(function (element) {
        element.classList.toggle("light-mode-text");
    })

    var header = document.getElementById("header");
    header.classList.toggle("light-mode-header");

    body.classList.toggle("light-mode");
}