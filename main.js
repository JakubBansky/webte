console.log("loaded");

let house = document.getElementById("house");

function createItem(row){
    let floor = document.createElement("div");
    floor.classList.add("floor");
    row.forEach(tile=>{
        let item = document.createElement("div");
        item.classList.add("tile");
        if(tile == 1){
            item.classList.add("obstacle");
        }
        else if(tile == 0){
            item.classList.add("empty");
        }
        
        floor.appendChild(item);
    })
    house.appendChild(floor);
}

function getData() {
    return fetch('first.json').then(response => {
        if (response.ok) {
            return response.json();
        }
        return null;
    }).then(result => {
        if (result != null) {
            let container = document.getElementById("cont");
            var image = document.createElement("img");
            image.src = result.backround;
            // container.appendChild(image); remake
            result.template.forEach(row => {
                    console.log(row)
                    createItem(row);
            })
        } else {
            console.error("response is empty");
        }
    })
}
getData();