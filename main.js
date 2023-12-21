console.log("loaded");

let house = document.getElementById("house");

function createGrid(grid) {
    let house = document.getElementById("house");

    grid.forEach(row => {
        let floor = document.createElement("div");
        floor.classList.add("floor");
        row.forEach(tile => {
            let item = document.createElement("div");
            item.classList.add("tile");
            if (tile == 1) {
                item.classList.add("barrier");
            } else if (tile == -1) {
                item.classList.add("start");
            }
            floor.appendChild(item);
        })
        house.appendChild(floor);
    })

}

function getData(task) {
    return fetch('data.json').then(response => {
        if (response.ok) {
            return response.json();
        }
        return null;
    }).then(result => {
        if (result != null) {
            let grid = result.tasks[task].grid;
            createGrid(grid);
        } else {
            console.error("response is empty");
        }
    })
}
getData(0);