let grid;
let startPos;
let allPainted = false;
let size;
let levelOrder;

function coordToString(x, y) {
    return (String(x) + String(y));
}

function swap(x, y, array) {
    let tmp = array[x];
    array[x] = array[y];
    array[y] = tmp;
}

function genRandomArray(size) {
    let array = [];
    for (let i = 0; i < size; i++) {
        array.push(i);
    }
    for (let j = 0; j < Math.floor(Math.random() * 5); j++) {
        swap(j, Math.floor(Math.random() * size), array);
    }
    return array;
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




async function paintRight(grid) {
    let actualPos = document.getElementById(coordToString(startPos.x, startPos.y));
    if (actualPos.classList.contains('actualPos')) {
        actualPos.classList.remove('actualPos');
    }

    while (grid[startPos.y][startPos.x + 1] !== 1 && (startPos.x + 1 < size)) {
        startPos.x += 1
        let toPaint = document.getElementById(coordToString(startPos.x, startPos.y));
        toPaint.classList.add("painted");
    }
    document.getElementById(coordToString(startPos.x, startPos.y)).classList.add("actualPos");


}

function paintLeft(grid) {
    let actualPos = document.getElementById(coordToString(startPos.x, startPos.y));
    if (actualPos.classList.contains('actualPos')) {
        actualPos.classList.remove('actualPos');
    }

    while ((grid[startPos.y][startPos.x - 1] !== 1) && (startPos.x - 1 >= 0)) {
        startPos.x -= 1
        let toPaint = document.getElementById(coordToString(startPos.x, startPos.y));
        toPaint.classList.add("painted");
    }

    document.getElementById(coordToString(startPos.x, startPos.y)).classList.add("actualPos");
}

function paintUp(grid) {
    let actualPos = document.getElementById(coordToString(startPos.x, startPos.y));
    if (actualPos.classList.contains('actualPos')) {
        actualPos.classList.remove('actualPos');
    }

    while ((startPos.y - 1 >= 0) && (grid[startPos.y - 1][startPos.x] !== 1)) {
        startPos.y -= 1
        let toPaint = document.getElementById(coordToString(startPos.x, startPos.y));
        toPaint.classList.add("painted");

    }

    document.getElementById(coordToString(startPos.x, startPos.y)).classList.add("actualPos");
}


function paintDown(grid) {
    let actualPos = document.getElementById(coordToString(startPos.x, startPos.y));
    if (actualPos.classList.contains('actualPos')) {
        actualPos.classList.remove('actualPos');
    }

    while ((startPos.y + 1 < size) && (grid[startPos.y + 1][startPos.x] !== 1)) {
        startPos.y += 1
        let toPaint = document.getElementById(coordToString(startPos.x, startPos.y));
        toPaint.classList.add("painted");
    }

    document.getElementById(coordToString(startPos.x, startPos.y)).classList.add("actualPos");
}

window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
    var beta = event.beta;
    var gamma = event.gamma;

    // camera left
    if (beta < 20 && beta > -20) {
        // -left-/-right-
        if (beta < -5) {
            paintLeft(grid);
            // console.log("left");

        } else if (beta > 5) {
            paintRight(grid);
            // console.log("right");
        }
    }
    if ((beta < 5 && beta > -5) || (beta > -180 && beta > -175)) {
        // -up-/-down-
        if (gamma > -75 && gamma < -50) {
            paintUp(grid);
            // console.log("up");

        } else if (gamma < 75 && gamma > 50) {
            paintDown(grid);
            // console.log("down");
        }
    }
    // cammera right TODO

    console.log("here")

    checkAllPainted(grid);
    if (allPainted) {
        let modal = document.getElementById("modal");
        modal.style.display = "block";
    }
    else{
        console.log("not painted");
    }


}

function handleArrowKey(event) {
    switch (event.key) {
        case "ArrowUp":
            paintUp(grid);
            break;
        case "ArrowDown":
            paintDown(grid);
            break;
        case "ArrowLeft":
            paintLeft(grid);
            break;
        case "ArrowRight":
            paintRight(grid);
            break;
    }

    checkAllPainted(grid);
    if (allPainted) {
        let modal = document.getElementById("modal");
        modal.style.display = "block";
    }

}

document.addEventListener("keydown", handleArrowKey);

function checkAllPainted() {
    let painted = 0;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            let item = document.getElementById(coordToString(i, j));
            if (item.classList.contains('painted') || item.classList.contains('barrier')) {
                painted++;
            }
        }
    }

    if (painted === 36) {
        allPainted = true;
    } else {
        allPainted = false;
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
            size = result.size;
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

} else {
    console.log(localStorage);
    levelOrder = genRandomArray(5);
    taskNum = levelOrder[0];
    getData(taskNum);
    removeTaskFromArray(taskNum, levelOrder);
}

let againButton = document.getElementById("again");
againButton.addEventListener("click", () => {
    let modalFinished = document.getElementById("modalFinished");

    levelOrder = genRandomArray(5);
    taskNum = levelOrder[0];
    removeTaskFromArray(taskNum, levelOrder);
    localStorage.setItem('task', taskNum);
    localStorage.setItem('levelOrder', levelOrder);
    getData(taskNum);
    modalFinished.style.display = "none";
})


// let quitButton = document.getElementById("quit");
quitButton.addEventListener("click", () => {
    window.location.href = "https://www.google.com";
})

} else {
    console.log(localStorage);
    levelOrder = genRandomArray(5);
    taskNum = levelOrder[0];
    getData(taskNum);
    removeTaskFromArray(taskNum, levelOrder);
}

let againButton = document.getElementById("again");
againButton.addEventListener("click", () => {
    let modalFinished = document.getElementById("modalFinished");

    levelOrder = genRandomArray(5);
    taskNum = levelOrder[0];
    removeTaskFromArray(taskNum, levelOrder);
    localStorage.setItem('task', taskNum);
    localStorage.setItem('levelOrder', levelOrder);
    getData(taskNum);
    modalFinished.style.display = "none";
})


let quitButton = document.getElementById("quit");
quitButton.addEventListener("click", () => {
    window.location.href = "https://www.google.com";
})

let nextButton = document.getElementById('next');
nextButton.addEventListener("click", () => {
    taskNum += 1
    modal.style.display = "none";
    let houseDiv = document.getElementById('house');
    houseDiv.innerHTML = '';
    if (levelOrder.length === 0) {
        let modalFinished = document.getElementById("modalFinished");
        modalFinished.style.display = 'block';
        console.log(localStorage);

        /*
        levelOrder = genRandomArray(5);
        taskNum = levelOrder[0];
        removeTaskFromArray(taskNum, levelOrder);
        localStorage.setItem('task', taskNum);
        localStorage.setItem('levelOrder', levelOrder);
        getData(taskNum);

         */
    } else {
        console.log(localStorage);
        taskNum = levelOrder[0];
        removeTaskFromArray(taskNum, levelOrder);
        localStorage.setItem('task', taskNum);
        localStorage.setItem('levelOrder', levelOrder);
        if(taskNum !== ''){
            getData(taskNum);
        } else if(taskNum === ''){
            let modalFinished = document.getElementById("modalFinished");
            modalFinished.style.display = 'block';
        }
        console.log(localStorage);
    }
});

let restartButton = document.getElementById('restart');
restartButton.addEventListener("click", () => {
    let houseDiv = document.getElementById('house');
    houseDiv.innerHTML = '';
    getData(taskNum);
});

let menuButton = document.getElementById("menu");
menuButton.addEventListener("click", () => {
    window.location.href = "index.html";
})