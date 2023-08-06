
var board;
var score = 0;
var rows = 5;
var columns = 4;

var casillaAct;
var casRow = 0;
var casCol = 0;

// 0 = moveLeft, 1 = movRight
flagMov = 0;

window.onload = function() {
    playGame();
    newCasilla();
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
        }else if(num == 8){
            c.classList.add("num8");
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
        }else if(num == 8){
            c.classList.add("num8");
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

function newCasilla(){
    let col = getRandomNumber();
    let cNum = updateNumCasilla();
    board[0][col] = cNum;

    casCol = col;
    let idCasilla = "0" + col.toString();
    casillaAct = document.getElementById(idCasilla);
    filaInicial(casillaAct, cNum);
}

function getRandomNumber() {
    return Math.floor(Math.random() * 4); // Devuelve un número entero entre 0 y 3 (ambos incluidos).
}

function updateNumCasilla() {
    let index = Math.floor(Math.random() * 5);
    let values = [2, 4, 2, 8, 2];
    return values[index];
}

window.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft" && casCol > 0){
        casCol--;
        flagMov = 0;
        moveCasilla();
    }

    if (e.code == "ArrowRight" && casCol < columns - 1){
        casCol++;
        flagMov = 1;
        moveCasilla();
    }
});

function moveCasilla() {
    let colBefore;
    if (flagMov == 0){
        colBefore = casCol + 1;
    }else if(flagMov == 1){
        colBefore = casCol - 1;
    }

    let  valueAfter = board[casRow][casCol];
    let  valueBefore = board[casRow][colBefore];
    let cValue = 0;
    let idCasilla;
    

    if (valueAfter == 0 || valueBefore == valueAfter){
        if(valueBefore == valueAfter){
            cValue = valueBefore + valueAfter;
            score += cValue;
        }else{
            cValue = valueBefore;
        }
    
        board[casRow][casCol] = cValue;
        idCasilla = casRow.toString() + casCol.toString();
        casillaAct = document.getElementById(idCasilla);
        filaInicial(casillaAct, cValue);
        
        board[casRow][colBefore] = 0;
        idCasilla = casRow.toString() + colBefore.toString();
        casillaAct = document.getElementById(idCasilla);
        filaInicial(casillaAct, 0);
    }
    
}