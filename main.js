let house = document.getElementById("house");


function initBoard(result, task){
    var numId = 1;
            for(let i = 0; i < result.size; i++){
                let floor = document.createElement("div");
                floor.classList.add("floor");
                for(let j = 0; j < result.size; j++){
                    let tile = document.createElement("div");
                    tile.classList.add("tile");
                    tile.setAttribute('id', numId);
                    numId++;
                    floor.appendChild(tile);
                }
                house.appendChild(floor);
            }

            let start = document.getElementById(result.tasks[task].startPos);
            start.classList.add("start");

            for(let i = 0; i < result.tasks[task].barriers.length; i++){
                let barrier = document.getElementById(result.tasks[task].barriers[i]);
                barrier.classList.add("barrier");
            }
}

function moveRight(currentIndex, size){
    while (currentIndex < size && currentIndex) {
        
    }
}

function handleArrowKey(event) {
    switch(event.key) {
      case "ArrowUp":
        console.log("Up arrow pressed");
        // Add your up arrow handling code here
        break;
      case "ArrowDown":
        console.log("Down arrow pressed");
        // Add your down arrow handling code here
        break;
      case "ArrowLeft":
        console.log("Left arrow pressed");
        // Add your left arrow handling code here
        break;
      case "ArrowRight":
        console.log("Right arrow pressed");
        // Add your right arrow handling code here
        break;
    }
  }

  document.addEventListener('keydown', handleArrowKey);


function getData(task) {
    return fetch('data.json').then(response => {
        if (response.ok) {
            return response.json();
        }
        return null;
    }).then(result => {
        if (result != null) {
            initBoard(result, task);
        } else {
            console.error("response is empty");
        }
    })
}
getData(0);

