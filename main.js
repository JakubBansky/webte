// console.log("loaded");

let house = document.getElementById("house");
let grid;
let startPos;
let allPainted = false;
let size;
let levelOrder;

function coordToString(x, y) {
    return (String(x) + String(y));
}

//chat gtp

// if (window.DeviceOrientationEvent) {
//   // Add event listener for device orientation  
//     console.log("success");
//     window.addEventListener('deviceorientation', handleOrientation, false);
// } else {
//     console.log("Device orientation not supported");
// }






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
    // console.log(array);
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


function paintRight(grid) {
    let actualPos = document.getElementById(coordToString(startPos.x, startPos.y));
    if (actualPos.classList.contains('actualPos')) {
        actualPos.classList.remove('actualPos');
    }

    // var size = grid.length;
    while (grid[startPos.y][startPos.x + 1] !== 1 && (startPos.x + 1 < size)) {
        startPos.x += 1
        let toPaint = document.getElementById(coordToString(startPos.x, startPos.y));
        toPaint.classList.add("painted");
        // console.log(startPos);
    }

    document.getElementById(coordToString(startPos.x, startPos.y)).classList.add("actualPos");
}

function paintLeft(grid) {
    let actualPos = document.getElementById(coordToString(startPos.x, startPos.y));
    if (actualPos.classList.contains('actualPos')) {
        actualPos.classList.remove('actualPos');
    }

    // var size = grid.length;
    // console.log(startPos);
    while ((grid[startPos.y][startPos.x - 1] !== 1) && (startPos.x - 1 >= 0)) {
        startPos.x -= 1
        let toPaint = document.getElementById(coordToString(startPos.x, startPos.y));
        toPaint.classList.add("painted");
        // console.log(startPos);
    }

    document.getElementById(coordToString(startPos.x, startPos.y)).classList.add("actualPos");
}

function paintUp(grid) {
    let actualPos = document.getElementById(coordToString(startPos.x, startPos.y));
    if (actualPos.classList.contains('actualPos')) {
        actualPos.classList.remove('actualPos');
    }

    // var size = grid.length;

    while ((startPos.y - 1 >= 0) && (grid[startPos.y - 1][startPos.x] !== 1)) {
        startPos.y -= 1
        let toPaint = document.getElementById(coordToString(startPos.x, startPos.y));
        toPaint.classList.add("painted");
        // console.log(startPos);

    }

    document.getElementById(coordToString(startPos.x, startPos.y)).classList.add("actualPos");
}


function paintDown(grid) {
    let actualPos = document.getElementById(coordToString(startPos.x, startPos.y));
    if (actualPos.classList.contains('actualPos')) {
        actualPos.classList.remove('actualPos');
    }

    // var size = grid.length;

    while ((startPos.y + 1 < size) && (grid[startPos.y + 1][startPos.x] !== 1)) {
        startPos.y += 1
        let toPaint = document.getElementById(coordToString(startPos.x, startPos.y));
        toPaint.classList.add("painted");
        // console.log(startPos);

    }

    document.getElementById(coordToString(startPos.x, startPos.y)).classList.add("actualPos");
}

window.addEventListener("deviceorientation", handleOrientation, true);

//chat gtp
function handleOrientation(event) {
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;
    console.log("abs: " + absolute + " a: " + alpha + "b: " + beta + "g: " + gamma);


    // camera left
    if (beta < 20 && beta > -20) {
        // console.log("-5<b>5");
        if (beta < -5) {
            paintLeft(grid);
            console.log("left");

        } else if (beta > 5) {
            paintRight(grid);
            console.log("right");
        }
    }
    if (gamma < -50 && gamma > -70 || gamma > 0 && gamma < 200) {
        // console.log("-5<b>5");
        if (gamma > -70 && gamma < 0) {
            paintUp(grid);
            console.log("up");

        } else if (gamma > 70) {
            paintDown(grid);
            console.log("down");
        }
    }


    // camera right

}

function handleArrowKey(event) {

    switch (event.key) {
        case "ArrowUp":
            // console.log("Arrow Up pressed");
            paintUp(grid);
            break;
        case "ArrowDown":
            // console.log("Arrow Down pressed");
            paintDown(grid);
            break;
        case "ArrowLeft":
            // console.log("Arrow Left pressed");
            paintLeft(grid);
            break;
        case "ArrowRight":
            // console.log("Arrow Right pressed");
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
        // console.log("All tiles painted");
        allPainted = true;
    } else {
        // console.log("Some tiles are not painted");
        allPainted = false;
    }

    // console.log(allPainted);
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
levelOrder = genRandomArray(5);
let taskNum = 0
getData(levelOrder[taskNum]);

let againButton = document.getElementById("again");
againButton.addEventListener("click", () => {
    let modalFinished = document.getElementById("modalFinished");
    levelOrder = genRandomArray(5);
    taskNum = 0
    getData(levelOrder[taskNum]);
    // modal.style.display = "none";
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
    // console.log(taskNum, size-1);
    if (taskNum == size - 1) {
        let modalFinished = document.getElementById("modalFinished");
        modalFinished.style.display = 'block';
    } else {

        getData(taskNum);
    }

});

let restartButton = document.getElementById('restart');
restartButton.addEventListener("click", () => {
    let houseDiv = document.getElementById('house');
    houseDiv.innerHTML = '';
    getData(taskNum);
});