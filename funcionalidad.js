//Variable con la matriz inicial para el juego
board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
]

//Variables con informacion general del Juego 
var score = 0;
var rows = 5;
var columns = 4;

//Variables con la información de la ficha a jugar
var casillaActual;
var filaActual = 0;
var columnaActual = 0;

//Variables que llevan el control de caída de las fichas 
let id_interval;
var intervalos = [];

//Variables para utilizadas para el dr el resumen del juego 
let tiempo = 0;
let id_intervalo_tiempo;
let cantidad_movimientos = 0;
let total_piezas = 0;


//Bandera que indica si una ficha se movió a la izquierda o derecha 
//0 = moveLeft, 1 = moveRight
let flagMov = 0;

//Boton encargado de reiniciar el juego una vez perdido o ganado
var boton = document.getElementById("tryAgain");

//Procedimiento encargado de reestablecer todo las varibles y actualizar el
//tablero una vez presionado el boton de "tryAgain"
boton.addEventListener("click", function() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]

    document.getElementById("board").textContent = "";
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("tryAgain").style.display = "none";
    
    id_intervalo_tiempo = setInterval(aumentar_tiempo,1000);
    paint_board();
    score = 0;
    tiempo = 0;
    cantidad_movimientos = 0;
    total_piezas = 0;
    newCasilla();
});

//Procedimiento encargado de inicializar el juego, en temas de interfaz 
//y jugabilidad
window.onload = function() {
    id_intervalo_tiempo = setInterval(aumentar_tiempo,1000);
    paint_board();
    actualizarScore();
    newCasilla();
}

//Procedimiento encargado de colocar las casillas del tablero, donde
//saldrán o jugarán las fichas del mismo 
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

//Procedimiento encargado de actualizar a nivel grafico una ficha
//donde dependiendo del valor se le asigna una clase y id para que 
//así se llame a la interfaz especifica 
function actualizar_casilla(casilla, num, esPrimera){
    total_piezas_tablero();
    document.getElementById("sumaPiezasV").innerText = total_piezas.toString();

    casilla.innerText = "";
    casilla.classList.value = "";
    casilla.classList.add("casilla");
    esPrimera ? casilla.classList.add("casillaI") : casilla.classList.add("casilla");

    if (num != 0){
        casilla.innerText = num;
    }
    
    if (num < 2048 || num != 0)
        casilla.classList.add("num"+num.toString());
}

//Funcion encargada de buscar el valor 0 en la fila más cercana de 
//una determinada columna 
function get_casilla_disponible_abajo(){
    let temp = filaActual;
    while (temp + 1 < rows && board[temp + 1][columnaActual] === 0) {
        temp++;
    }
    return temp;
}

//Funcion que devuelve un número entero entre 0 y 3 (incluidos).
function get_random_column() {
    return Math.floor(Math.random() * 4); 
}

//Funcion que retorna el numero que va a tener la nueva ficha
//a aparecer en el tablero 
function get_random_initial_value() {
    let index = Math.floor(Math.random() * 5);
    let values = [2, 4, 2, 8, 2];
    return values[index];
}

//Procedimiento encargado de llamar y realizar ciertas funciones/procedimientos
//de acuerdo a la tecla que se presione (movilidad de la ficha)
window.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft" && columnaActual > 0){
        if (filaActual == -1){
            filaActual = 0;
        }
        if (board[filaActual][columnaActual - 1] == 0 || board[filaActual][columnaActual - 1] == board[filaActual][columnaActual]){
            let temp = board[filaActual][columnaActual];
            clean_previous_block();
            columnaActual--;
            flagMov = 0;
            moveCasilla(temp);

            cantidad_movimientos++;
            document.getElementById("movimientosV").innerText = cantidad_movimientos.toString();
        }
    }
    if (e.code == "ArrowRight" && columnaActual < columns - 1){
        if (filaActual == -1){
            filaActual = 0;
        }
        if (board[filaActual][columnaActual + 1] == 0 || board[filaActual][columnaActual + 1] == board[filaActual][columnaActual]){
            let temp = board[filaActual][columnaActual];
            clean_previous_block();
            columnaActual++;
            flagMov = 1;
            moveCasilla(temp);

            cantidad_movimientos++;
            document.getElementById("movimientosV").innerText = cantidad_movimientos.toString();
        }
    }
    if (e.code == "ArrowDown" && filaActual < 4){
        if (filaActual == -1){
            filaActual = 0;
        }
        let temp = board[filaActual][columnaActual];
        clean_previous_block();
        filaActual = get_casilla_disponible_abajo();
        moveCasilla(temp);

        cantidad_movimientos++;
        document.getElementById("movimientosV").innerText = cantidad_movimientos.toString();
    }
});

//Funcion que valida que la posicion de una ficha sea valida cuando 
//aparezca una nueva ficha en el encabezado
function validNewCasilla(col){
    let num1 = board[0][col];
    let num2 = board[1][col];

    if (num1 != num2 && board[1][col] != 0){
        document.getElementById("gameOver").style.display="flex"; 
        document.getElementById("tryAgain").style.display="flex";
        clearInterval(id_intervalo_tiempo);
        
        if (flagMov == 0){
            columnaActual = -1;
        }else{
            columnaActual = 10;
        }
        
        //Así es para hacer la ventanita del ganador, pero todavía no sé donde va jeje
        //document.getElementById("congrats").style.display="flex"; 
        return true;
    }
}

//Procedimiento que se encarga de crear una nueva ficha, le asigna el numero de la 
//ficha y le actualiza la interfaz de la ficha. Además que inicializa la movilidad
//de la misma
function newCasilla(){
    let col = get_random_column();
    let cNum = get_random_initial_value();
    board[0][col] = cNum;
    
    filaActual = 0;
    columnaActual = col;
    let idCasilla = "0" + col.toString();
    casillaActual = document.getElementById(idCasilla); // Devuelve el div con la casilla que aparecion nueva
 
    actualizar_casilla(casillaActual, cNum, true);

    let result = validNewCasilla(col);
    if(result == true){
        detenerIntervalos();
        return;
    }

    id_interval = setInterval(move_casilla_down, 1500);
    intervalos.push(id_interval);
}

//Procedimiento encargado de detener todos los intervalos que se están ejecutando 
//cuando se están mobilizando para abajo
function detenerIntervalos() {
    for (var i = 0; i < intervalos.length; i++) {
        clearInterval(intervalos[i]);
    }
}

//Procedimiento que se encarga de limpiar la posición anterior de la ficha jugando 
//a nivel de interfaz y logico
function clean_previous_block(){
    board[filaActual][columnaActual] = 0;
    idCasilla = filaActual.toString() + columnaActual.toString();
    casillaActual = document.getElementById(idCasilla);
    actualizar_casilla(casillaActual, 0, filaActual == 0);
}

//Procedimiento que se encarga de actualizar a nivel gráfico el puntaje del juego
function actualizarScore(){
    let textScore = document.getElementById("score");
    textScore.innerText = "";
    textScore.innerText = score.toString();
}

//Procedimiento que se encarga de verificar que todas las fichas se encuentren abajo 
//es decir, que no queden huecos en la matriz y simule la caída del tetris. Actualiza
//también a nivel gráfico 
function actualizarMatriz(){
    for (let row = 4; row > 0; row--){
        for (let column = 0; column < columns; column++){
            let rowBefore = row - 1;

            if (board[row][column] == 0 && board[rowBefore][column] != 0){
                let valueBefore = board[rowBefore][column];

                board[row][column] = valueBefore;
                board[rowBefore][column] = 0;

                let idCasilla = row.toString() + column.toString(); 
                let casillaAct = document.getElementById(idCasilla);
                actualizar_casilla(casillaAct, valueBefore, false);

                let idCasilla2 = rowBefore.toString() + column.toString(); 
                let casillaAct2 = document.getElementById(idCasilla2);
                actualizar_casilla(casillaAct2, 0, false);

            }else if(board[row][column] == board[rowBefore][column]){
                let valueBefore = board[rowBefore][column];

                board[row][column] += valueBefore;
                board[rowBefore][column] = 0;

                let idCasilla = row.toString() + column.toString(); 
                let casillaAct = document.getElementById(idCasilla);
                actualizar_casilla(casillaAct, valueBefore + valueBefore, false);
            }
        }
    }
}

//Procedimiento encargado de mover una casilla de acuerdo a la tecla presionada, y si
//se realiza la suma de fichas, aumenta el "Puntaje", actualiza a nivel gráfico y 
//actualiza la matriz para eliminar los posibles espacios vacíos 
function moveCasilla(previous_value){
    let idCasilla = filaActual.toString() + columnaActual.toString(); 
    actualizarMatriz();

    console.log(cantidad_movimientos);
    if(board[filaActual][columnaActual] == 0 || board[filaActual][columnaActual] == previous_value){
        if (board[filaActual][columnaActual] == previous_value){
            score += board[filaActual][columnaActual] + previous_value;
        }

        board[filaActual][columnaActual] += previous_value;
        actualizarScore();
        casillaActual = document.getElementById(idCasilla);
        actualizar_casilla(casillaActual, board[filaActual][columnaActual], false);
    }
}

//Procedimiento encargado de simular la caida de la ficha en el tablero de manera 
//automatica, esto a nivel grafico y logico
function move_casilla_down(){
    if (filaActual == -1){
        filaActual = 0;
    }
    if (filaActual == 4 || (board[filaActual + 1][columnaActual] != 0 && board[filaActual + 1][columnaActual] != board[filaActual][columnaActual])){
        newCasilla();
        clearInterval(id_interval);
        filaActual = -1;

    }else{
        let temp = board[filaActual][columnaActual];
        clean_previous_block();
        filaActual++;
        moveCasilla(temp);
    }
}

//Procedimiento encargado de llevar el tiempo de la partida jugando, hasta 
//que se gane o pierda
function aumentar_tiempo(){
    tiempo++;
    document.getElementById("tiempoV").innerText = tiempo.toString();
}

//Procedimiento encargado de verificar la cantidad de fichas actual en el tablero 
//y además verifica si ya alguna ficha llegó a 2048 para mostrar la pantalla de ganador 
function total_piezas_tablero(){
    total_piezas = 0;
    for (let row = 0; row < rows; row++){
        for (let column = 0; column < columns; column++){
            if (board[row][column] == 2048){
                ventanaGanador();
                return;
            }else if (board[row][column] != 0){
                total_piezas++;
            }
        }
    }
}


function ventanaGanador(){
    document.getElementById("congrats").style.display="flex";
    document.getElementById("tryAgain").style.display="flex";
    clearInterval(id_intervalo_tiempo);
    
    if (flagMov == 0){
        columnaActual = -1;
    }else{
        columnaActual = 10;
    }
}
