let grid;
let startPos;
let allPainted = false;
let size;
let levelOrder;
let helpDiv = document.getElementById('helpDiv');

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
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

// Log window size to the console
console.log(`Window Size: ${windowWidth} x ${windowHeight}`);

function handleOrientation(event) {
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;
    var betaSensitivity = 12;

    // camera left
    console.log(alpha);
    if (alpha < 300 && alpha > 260) {
        if (beta < 15 && beta > -15) {
            if (beta < -betaSensitivity) {
                paintLeft(grid);
                console.log("Lleft");

            } else if (beta > betaSensitivity) {
                paintRight(grid);
                console.log("Lright");
            }
        }
        // camera left
        if ((beta < 5 && beta > -5) || (beta > -180 && beta > -175)) {
            // -up-/-down-
            if (gamma > -60 && gamma < -50) {
                paintUp(grid);
                console.log("up");

            } else if (gamma < -80 && gamma > -90) {
                paintDown(grid);
                console.log("down");
            }
        }
    }
    // camera right
    if (alpha < 110 && alpha > 70) {
        if (beta < 15 && beta > -15) {
            if (beta < -betaSensitivity) {
                paintRight(grid);
                console.log("Rleft");

            } else if (beta > betaSensitivity) {
                paintLeft(grid);
                console.log("Rright");
            }
        }
        // camera left
        if ((beta < 5 && beta > -5) || (beta > -180 && beta > -175)) {
            // -up-/-down-
            if (gamma > 50 && gamma < 60) {
                paintUp(grid);
                console.log("Rup");

            } else if (gamma < 90 && gamma > 80) {
                paintDown(grid);
                console.log("Rdown");
            }
        }
    }

    checkAllPainted(grid);
    if (allPainted) {
        let modal = document.getElementById("modal");
        modal.style.display = "block";
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

function removeTaskFromArray(task, array) {
    let num = array.indexOf(task);
    array.splice(num, 1);
}

if (localStorage.getItem('task')) {
    console.log(localStorage);
    taskNum = parseInt(localStorage.getItem('task'));
    let n = localStorage.getItem('levelOrder').split(',');
    levelOrder = Array.from(n);
    getData(taskNum);

} else {
    console.log(localStorage);
    levelOrder = genRandomArray(5);
    taskNum = levelOrder[0];
    getData(taskNum);
    removeTaskFromArray(taskNum, levelOrder);
}

showHelp();
function showHelp(){
    let helpButton = document.getElementById('help');
    helpDiv.innerHTML = '';
    if(taskNum == 0){
        helpButton.disabled = true;
    } else if(taskNum == 1){
        helpButton.disabled = true;
    } else if(taskNum == 2){
        helpDiv.innerHTML = "Z pozície štart treba ísť najprv nahor a doprava a vyfarbiť hornú plochu.";
        helpButton.disabled = false;
    } else if(taskNum == 3){
        helpButton.disabled = true;
    } else if(taskNum == 4){
        helpDiv.innerHTML = "Z pozície štart treba ísť vľavo a vyfarbiť celý stĺpec.";
        helpButton.disabled = false;
    }
}

console.log(taskNum);
let againButton = document.getElementById("again");
againButton.addEventListener("click", () => {
    let modalFinished = document.getElementById("modalFinished");

    levelOrder = genRandomArray(5);
    taskNum = levelOrder[0];
    removeTaskFromArray(taskNum, levelOrder);
    localStorage.setItem('task', taskNum);
    localStorage.setItem('levelOrder', levelOrder);
    getData(taskNum);

    showHelp();

    modalFinished.style.display = "none";
})


let quitButton = document.getElementById("quit");
quitButton.addEventListener("click", () => {
    window.location.href = "https://www.google.com";
})

let nextButton = document.getElementById('next');
nextButton.addEventListener("click", () => {
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
        if (taskNum !== '') {
            getData(taskNum);
        } else if (taskNum === '') {
            let modalFinished = document.getElementById("modalFinished");
            modalFinished.style.display = 'block';
        }

        showHelp();

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
});

let menuGButton = document.getElementById("menuG");
menuGButton.addEventListener("click", () => {
    window.location.href = "index.html";
})

let helpButton = document.getElementById("help");
helpButton.addEventListener("click", () => {
    let modalHelp = document.getElementById('modalHelp');
    modalHelp.style.display  = 'block';
});

let closeButton = document.getElementById("close");
closeButton.addEventListener("click", () => {
    let modalHelp = document.getElementById('modalHelp');
    modalHelp.style.display  = 'none';
});