let closeButton = document.getElementById("menuClose");
let showButton = document.getElementById("menuOpen");
let modal = document.getElementById("modalDiv");

closeButton.addEventListener("click", ()=>{
    modal.style.display = "none";
        console.log("dwadwa");
})

showButton.addEventListener("click", ()=>{
    modal.style.display = "block";
    console.log("dwadwa");
})