console.log("loaded");

let house = document.getElementById("house");
let grid;
let startPos;
let allPainted = false;
let taskNum;

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
            if (tile === 1) {
                item.classList.add("barrier");
            } else if (tile === -1) {
                item.classList.add("start");
            }
            floor.appendChild(item);
        })
        x = 0;
        y += 1;
        house.appendChild(floor);
    })

    document.getElementById(coordToString(startPos.x, startPos.y)).classList.add("painted");
}


function paintRight(grid) {
    let actualPos = document.getElementById(coordToString(startPos.x, startPos.y));
    if(actualPos.classList.contains('actualPos')){
        actualPos.classList.remove('actualPos');
    }

    var size = grid.length;
    while (grid[startPos.y][startPos.x + 1] !== 1 && (startPos.x + 1 < size)) {
        startPos.x += 1
        let toPaint = document.getElementById(coordToString(startPos.x, startPos.y));
        toPaint.classList.add("painted");
        console.log(startPos);
    }

    document.getElementById(coordToString(startPos.x, startPos.y)).classList.add("actualPos");
}

function paintLeft(grid) {
    let actualPos = document.getElementById(coordToString(startPos.x, startPos.y));
    if(actualPos.classList.contains('actualPos')){
        actualPos.classList.remove('actualPos');
    }

    var size = grid.length;
    console.log(startPos);
    while ((grid[startPos.y][startPos.x - 1] !== 1) && (startPos.x - 1 >= 0)) {
        startPos.x -= 1
        let toPaint = document.getElementById(coordToString(startPos.x, startPos.y));
        toPaint.classList.add("painted");
        console.log(startPos);
    }

    document.getElementById(coordToString(startPos.x, startPos.y)).classList.add("actualPos");
}

function paintUp(grid) {
    let actualPos = document.getElementById(coordToString(startPos.x, startPos.y));
    if(actualPos.classList.contains('actualPos')){
        actualPos.classList.remove('actualPos');
    }

    var size = grid.length;

    while ((startPos.y - 1 >= 0) && (grid[startPos.y - 1][startPos.x] !== 1)) {
        startPos.y -= 1
        let toPaint = document.getElementById(coordToString(startPos.x, startPos.y));
        toPaint.classList.add("painted");
        console.log(startPos);

    }

    document.getElementById(coordToString(startPos.x, startPos.y)).classList.add("actualPos");
}


function paintDown(grid) {
    let actualPos = document.getElementById(coordToString(startPos.x, startPos.y));
    if(actualPos.classList.contains('actualPos')){
        actualPos.classList.remove('actualPos');
    }

    var size = grid.length;

    while ((startPos.y + 1 < size) && (grid[startPos.y + 1][startPos.x] !== 1) ) {
        startPos.y += 1
        let toPaint = document.getElementById(coordToString(startPos.x, startPos.y));
        toPaint.classList.add("painted");
        console.log(startPos);

    }

    document.getElementById(coordToString(startPos.x, startPos.y)).classList.add("actualPos");
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

    checkAllPainted(grid);
    if(allPainted){
        let modal = document.getElementById("modal");
        modal.style.display = "block";
    }

}

document.addEventListener("keydown", handleArrowKey);

function checkAllPainted(){
    let painted = 0;
    for(let i = 0; i < 6; i++){
        for(let j = 0; j < 6; j++){
            let item = document.getElementById(coordToString(i,j));
            if(item.classList.contains('painted') || item.classList.contains('barrier')) {
                painted++;
            }
        }
    }

    if(painted === 36){
        console.log("All tiles painted");
        allPainted = true;
    } else {
        console.log("Some tiles are not painted");
        allPainted = false;
    }

    console.log(allPainted);
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

            createGrid(grid);

        } else {
            console.error("response is empty");
        }
    })
}

taskNum = Math.floor(Math.random() * 5)
getData(taskNum);

let nextButton = document.getElementById('next');
nextButton.addEventListener("click", () => {
    modal.style.display = "none";
    let houseDiv = document.getElementById('house');
    houseDiv.innerHTML = '';
    taskNum = Math.floor(Math.random() * 5)
    getData(taskNum);
});

let restartButton = document.getElementById('restart');
restartButton.addEventListener("click", () => {
    let houseDiv = document.getElementById('house');
    houseDiv.innerHTML = '';
    getData(taskNum);
});
