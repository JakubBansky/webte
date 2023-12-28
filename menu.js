let closeButton = document.getElementById("menuClose");
let showButton = document.getElementById("menuOpen");
let modal = document.getElementById("modalDivI");

closeButton.addEventListener("click", ()=>{
    modal.style.display = "none";
})

showButton.addEventListener("click", ()=>{
    modal.style.display = "block";
})