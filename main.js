let house = document.getElementById("house");

function getData(task) {
    return fetch('data.json').then(response => {
        if (response.ok) {
            return response.json();
        }
        return null;
    }).then(result => {
        if (result != null) {
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
        } else {
            console.error("response is empty");
        }
    })
}
getData(0);