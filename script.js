const initGame = (function(player1, player2) {
    const board = (function () {
        let cells = [];
        let occupiedCells = 0;
    
        const createCell = () => {
            let value = " ";
            let element;
    
            const getValue = () => {
                return value;
            };
    
            const setValue = (newValue) => {
                value = newValue;
            };
    
            const getElement = () => {
                return element;
            }
    
            const setElement = (elementReference) => {
                element = elementReference;
            }
    
            return { getValue, setValue, getElement, setElement };
        }
    
        const initBoard = () => {
            for (let i = 0; i < 9; i++) {
                cells.push(createCell());
                cells[i].setElement(document.querySelector(`#cell-${i + 1}`));
                cells[i].getElement().classList.toggle("free");
            }
        }
    
        const getValueAt = (position) => {
            return cells[position - 1].getValue();
        };
    
        const setValueAt = (position, value) => {
            cells[position - 1].setValue(value);
        };
    
        const getOccupiedCells = () => {
            return occupiedCells;
        };
    
        const increaseOccupiedCells = () => {
            occupiedCells++;
        };
    
        const getCellAt = (position) => {
            return cells[position - 1];
        };
    
        initBoard();
    
        return { getValueAt, setValueAt, getOccupiedCells, increaseOccupiedCells, getCellAt };
    })();
    
    const gameController = (function () {
        const p1 = createPlayer(player1, "x");
        const p2 = createPlayer(player2, "o");
        let gameOver = false;
    
        let currentPlayer = p1;
    
        const play = (position) => {
            if(gameOver) {
                console.log("The game has finished");
                return;
            }

            if (board.getValueAt(position) !== " ") {
                console.log("That position is already occupied");
                return;
            }
    
            board.setValueAt(position, currentPlayer.getSelection());
            board.increaseOccupiedCells();
            displayController.render(currentPlayer, position);
    
            if (logicController.checkWin(currentPlayer)) {
                console.log(`${currentPlayer.getName()} has won!`);
                gameOver = true;
            } else if (board.getOccupiedCells() === 9) {
                console.log("Tie")
            } else {
                currentPlayer = currentPlayer === p1 ? p2 : p1;
            }
        };
    
        return { play };
    })();
    
    const logicController = (function () {
        const checkWin = (player) => {
            return checkWinningRow(player, 1) ||
                checkWinningRow(player, 2) ||
                checkWinningRow(player, 3) ||
                checkWinningColumn(player, 1) ||
                checkWinningColumn(player, 2) ||
                checkWinningColumn(player, 3) ||
                checkWinningDiagonal(player);
        }
    
        const checkWinningRow = (player, row) => {
            for (let i = 3 * row - 2; i <= 3 * row; i++) {
                if (board.getValueAt(i) !== player.getSelection()) {
                    return false;
                }
            }

            for (let i = 3 * row - 2; i <= 3 * row; i++) {
                board.getCellAt(i).getElement().classList.toggle("occupied");
                board.getCellAt(i).getElement().classList.toggle("won");
            }
    
            return true;
        };
    
        const checkWinningColumn = (player, column) => {
            for (let i = column; i <= 9; i += 3) {
                if (board.getValueAt(i) !== player.getSelection()) {
                    return false;
                }
            }

            for (let i = column; i <= 9; i += 3) {
                board.getCellAt(i).getElement().classList.toggle("occupied");
                board.getCellAt(i).getElement().classList.toggle("won")
            }
    
            return true;
        };
    
        const checkWinningDiagonal = (player) => {
            if(board.getValueAt(1) === player.getSelection() &&
            board.getValueAt(5) === player.getSelection() &&
            board.getValueAt(9) === player.getSelection()) {
                board.getCellAt(1).getElement().classList.toggle("occupied");
                board.getCellAt(5).getElement().classList.toggle("occupied");
                board.getCellAt(9).getElement().classList.toggle("occupied");
                board.getCellAt(1).getElement().classList.toggle("won");
                board.getCellAt(5).getElement().classList.toggle("won");
                board.getCellAt(9).getElement().classList.toggle("won");
                return true;
            }

            if(board.getValueAt(3) === player.getSelection() &&
            board.getValueAt(5) === player.getSelection() &&
            board.getValueAt(7) === player.getSelection()) {
                board.getCellAt(3).getElement().classList.toggle("occupied");
                board.getCellAt(5).getElement().classList.toggle("occupied");
                board.getCellAt(7).getElement().classList.toggle("occupied");
                board.getCellAt(3).getElement().classList.toggle("won");
                board.getCellAt(5).getElement().classList.toggle("won");
                board.getCellAt(7).getElement().classList.toggle("won");
                return true;
            }

            return false;
        };
    
        return { checkWin };
    })();
    
    const displayController = (function () {
        (function() {
            const container = document.querySelector("#board-container");
            container.addEventListener("click", (e) => {
                switch (e.target.id) {
                    case "cell-1":
                        gameController.play(1);
                        /* document.querySelector("#name-container").style.visibility = "visible";
                        document.querySelector("#name-container").style.maxHeight = "100%"; */
                        break;
                    case "cell-2":
                        gameController.play(2);
                        break;
                    case "cell-3":
                        gameController.play(3);
                        break;
                    case "cell-4":
                        gameController.play(4);
                        break;
                    case "cell-5":
                        gameController.play(5);
                        break;
                    case "cell-6":
                        gameController.play(6);
                        break;
                    case "cell-7":
                        gameController.play(7);
                        break;
                    case "cell-8":
                        gameController.play(8);
                        break;
                    case "cell-9":
                        gameController.play(9);
                        break;
                }
            });
        })();
    
        const render = (player, position) => {
            let rand = Math.floor(Math.random() * 5 + 1);
            board.getCellAt(position).getElement().src = `images/${player.getSelection()}${rand}.png`;
            board.getCellAt(position).getElement().classList.toggle("free");
            board.getCellAt(position).getElement().classList.toggle("occupied");
        };
    
        return { render }
    })();
    
    function createPlayer(playerName, playerSelection) {
        const name = playerName;
        const selection = playerSelection;
    
        const getName = () => {
            return name;
        };
    
        const getSelection = () => {
            return selection;
        };
    
        return { getName, getSelection };
    }
});

const playerNamesHandler = (function() {
    let inputPlayer1 = document.querySelector("#player-1-input");
    let inputPlayer2 = document.querySelector("#player-2-input");
    let submitButton = document.querySelector("#button");

    let inputContainer = document.querySelector("#name-input-container");
    let nameContainer = document.querySelector("#name-container");

    let displayPlayer1 = document.querySelector("#player-1");
    let displayPlayer2 = document.querySelector("#player-2");

    let board = document.querySelector("#board-container");

    submitButton.addEventListener("click", () => {
        let player1 = inputPlayer1.value;
        let player2 = inputPlayer2.value;

        if(player1 == "" || player2 == "") {
            return;
        }

        inputContainer.style.display = "none";

        displayPlayer1.innerText = player1;
        displayPlayer2.innerText = player2;

        nameContainer.style.visibility = "visible";
        nameContainer.style.maxHeight = "100%";

        board.style.visibility = "visible";
        board.style.maxHeight = "100%";

        initGame(player1,player2);
    });
});

playerNamesHandler();