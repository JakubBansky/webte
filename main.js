console.log("loaded");

let house = document.getElementById("house");
let grid;
let startPos;

function coordToString(x, y) {
    return (String(x) + String(y));
}

function createGrid(grid) {
    let house = document.getElementById("house");
    var x = 0;
    var y = 0;
    grid.forEach(row => {
        let floor = document.createElement("div");
        floor.classList.add("floor");
        row.forEach(tile => {
            let item = document.createElement("div");
            item.classList.add("tile");
            item.id = coordToString(x, y);
            x += 1;
            if (tile == 1) {
                item.classList.add("barrier");
            } else if (tile == -1) {
                item.classList.add("start");
            }
            floor.appendChild(item);
        })
        x = 0;
        y += 1;
        house.appendChild(floor);
    })

}


function paintRight(grid) {
    var size = grid.length;
    while (grid[startPos.y][startPos.x + 1] != 1 && (startPos.x + 1 < size)) {
        startPos.x += 1
        let toPaint = document.getElementById(coordToString(startPos.x, startPos.y));
        toPaint.classList.add("painted");
        console.log(startPos);
    }
}

function paintLeft(grid) {
    var size = grid.length;
    // console.log(startPos);
    while ((grid[startPos.y][startPos.x - 1] != 1) && (startPos.x - 1 >= 0)) {
        startPos.x -= 1
        let toPaint = document.getElementById(coordToString(startPos.x, startPos.y));
        toPaint.classList.add("painted");
        console.log(startPos);
    }
}

function paintUp(grid) {
    var size = grid.length;

    while ((startPos.y - 1 >= 0) && (grid[startPos.y - 1][startPos.x] != 1)) {
        startPos.y -= 1
        let toPaint = document.getElementById(coordToString(startPos.x, startPos.y));
        toPaint.classList.add("painted");
        console.log(startPos);
        
    }
}


function paintDown(grid) {
    var size = grid.length;

    while ((startPos.y + 1 < size) && (grid[startPos.y + 1][startPos.x] != 1) ) {
        startPos.y += 1
        let toPaint = document.getElementById(coordToString(startPos.x, startPos.y));
        toPaint.classList.add("painted");
        console.log(startPos);
        
    }
}






function handleArrowKey(event) {
    switch (event.key) {
        case "ArrowUp":
            console.log("Arrow Up pressed");
            paintUp(grid);
            break;
        case "ArrowDown":
            console.log("Arrow Down pressed");
            paintDown(grid);
            break;
        case "ArrowLeft":
            console.log("Arrow Left pressed");
            paintLeft(grid);
            break;
        case "ArrowRight":
            console.log("Arrow Right pressed");
            paintRight(grid);
            break;
    }
}

document.addEventListener("keydown", handleArrowKey);



function getData(task) {
    return fetch('data.json').then(response => {
        if (response.ok) {
            return response.json();
        }
        return null;
    }).then(result => {
        if (result != null) {
            grid = result.tasks[task].grid;
            startPos = result.tasks[task].startPos;
            // console.log(grid);
            createGrid(grid);

        } else {
            console.error("response is empty");
        }
    })
}
getData(4);