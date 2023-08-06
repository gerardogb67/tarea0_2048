
var board;
var score = 0;
var rows = 5;
var columns = 4;

window.onload = function() {
    playGame();
}

function playGame(){
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]
    
    for (let row = 0; row < rows; row++){
        for (let colum = 0; colum < columns; colum++){
            if (row == 0){
                let c = document.createElement("div");
                c.id = row.toString() + colum.toString();

                let num = board[row][colum];
                filaInicial(c, num);
                document.getElementById("board").append(c);
            }else{
                // Crea un div nuevo, para crear una pieza para jugar
                let c = document.createElement("div");
                c.id = row.toString() + colum.toString();

                let num = board[row][colum];
                actualizarc(c, num);
                document.getElementById("board").append(c);
            }
            
        }
    }
}

function filaInicial(c, num){
    c.innerText = "";
    c.classList.value = "";
    c.classList.add("casillaI");

    if (num > 0){
        c.innerText = num;
        if (num == 2){
            c.classList.add("num2");
        }else if(num == 4){
            c.classList.add("num4");
        }else if(num == 16){
            c.classList.add("num16");
        }else if(num == 32){
            c.classList.add("num32");
        }else if(num == 64){
            c.classList.add("num64");
        }else if(num == 128){
            c.classList.add("num128");
        }else if(num == 256){
            c.classList.add("num256");
        }else if(num == 512){
            c.classList.add("num512");
        }else if(num == 1024){
            c.classList.add("num1024");
        }else if(num == 2048){
            c.classList.add("num2048");
        }
    }
}

function actualizarc(c, num){
    c.innerText = "";
    c.classList.value = "";
    c.classList.add("casilla");

    if (num > 0){
        c.innerText = num;
        if (num == 2){
            c.classList.add("num2");
        }else if(num == 4){
            c.classList.add("num4");
        }else if(num == 16){
            c.classList.add("num16");
        }else if(num == 32){
            c.classList.add("num32");
        }else if(num == 64){
            c.classList.add("num64");
        }else if(num == 128){
            c.classList.add("num128");
        }else if(num == 256){
            c.classList.add("num256");
        }else if(num == 512){
            c.classList.add("num512");
        }else if(num == 1024){
            c.classList.add("num1024");
        }else if(num == 2048){
            c.classList.add("num2048");
        }
    }
}

function cambio_color(id) {
    console.log(id)
    casilla = document.getElementById(id)
    casilla.style.backgroundColor = 'red'
    casilla.innerHTML = '<p class="letraTablero">A</p>'
    }