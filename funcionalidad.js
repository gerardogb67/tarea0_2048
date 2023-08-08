board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
]
var score = 0;
var rows = 5;
var columns = 4;

var casillaActual;
var filaActual = 0;
var columnaActual = 0;

let id_interval;
// 0 = moveLeft, 1 = movRight
flagMov = 0;

window.onload = function() {
    paint_board();
    newCasilla();
}

function paint_board(){
    for (let row = 0; row < rows; row++){
        for (let column = 0; column < columns; column++){
            let c = document.createElement("div");
            c.id = row.toString() + column.toString();
            let num = board[row][column];
            
            actualizar_casilla(c, num, row == 0);
            
            document.getElementById("board").append(c);
        }
    }
}

// Cambia el contenido de la casilla y pone el correspondiente al numero que tiene que ser
function actualizar_casilla(casilla, num, esPrimera){
    casilla.innerText = "";
    casilla.classList.value = "";
    casilla.classList.add("casilla");
    //esPrimera ? casilla.classList.add("casillaI") : casilla.classList.add("casilla");

    // if (num != 0){
    //     casilla.innerText = num;
    // }
    casilla.innerText = num;
    if (num < 2048 || num != 0)
        casilla.classList.add("num"+num.toString());
}

function get_random_column() {
    return Math.floor(Math.random() * 4); // Devuelve un número entero entre 0 y 3 (ambos incluidos).
}

function get_random_initial_value() {
    let index = Math.floor(Math.random() * 5);
    let values = [2, 4, 2, 8, 2];
    return values[index];
}

window.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft" && columnaActual > 0){
        if (board[filaActual][columnaActual - 1] == 0 || board[filaActual][columnaActual - 1] == board[filaActual][columnaActual]){
            let temp = board[filaActual][columnaActual];
            clean_previous_block();
            columnaActual--;
            moveCasilla(temp);
        }
    }
    if (e.code == "ArrowRight" && columnaActual < columns - 1){
        if (board[filaActual][columnaActual + 1] == 0 || board[filaActual][columnaActual + 1] == board[filaActual][columnaActual]){
            let temp = board[filaActual][columnaActual];
            clean_previous_block();
            columnaActual++;
            moveCasilla(temp);
        }
    }
});

function newCasilla(){
    let col = get_random_column();
    let cNum = get_random_initial_value();
    board[0][col] = cNum;

    
    columnaActual = col;
    let idCasilla = "0" + col.toString();
    casillaActual = document.getElementById(idCasilla); // Devuelve el div con la casilla que aparecion nueva
 
    actualizar_casilla(casillaActual, cNum, true);
    id_interval = setInterval(move_casilla_down,900);
    filaActual = 1;
}

function clean_previous_block(){
    board[filaActual][columnaActual] = 0;
    idCasilla = filaActual.toString() + columnaActual.toString();
    casillaActual = document.getElementById(idCasilla);
    actualizar_casilla(casillaActual, 0, filaActual == 0);
}

function moveCasilla(previous_value){
    let idCasilla = filaActual.toString() + columnaActual.toString(); 

    if(board[filaActual][columnaActual] == 0 || board[filaActual][columnaActual] == previous_value){
        board[filaActual][columnaActual] += previous_value;
        score += board[filaActual][columnaActual];
        casillaActual = document.getElementById(idCasilla);
        actualizar_casilla(casillaActual, board[filaActual][columnaActual], false);
    }
    
}

function move_casilla_down(){
    if (filaActual == 4 || (board[filaActual + 1][columnaActual] != 0 && board[filaActual + 1][columnaActual] != board[filaActual][columnaActual])){
        clearInterval(id_interval);
        newCasilla(); 
    }
    let temp = board[filaActual][columnaActual];
    clean_previous_block();
    filaActual++;
    moveCasilla(temp);
    
}