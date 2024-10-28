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

const playerController = (function () {
    const p1 = createPlayer("John", "x");
    const p2 = createPlayer("Mary", "o");

    let currentPlayer = p1;

    const play = (position) => {
        if (board.getValueAt(position) !== " ") {
            console.log("That position is already occupied");
            return;
        }

        board.setValueAt(position, currentPlayer.getSelection());
        board.increaseOccupiedCells();
        displayController.render(currentPlayer, position);

        if (gameHandler.checkWin(currentPlayer)) {
            console.log(`${currentPlayer.getName()} has won!`);
        } else if (board.getOccupiedCells() === 9) {
            console.log("Tie")
        } else {
            currentPlayer = currentPlayer === p1 ? p2 : p1;
        }
    };

    return { play };
})();

const gameHandler = (function () {
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

        return true;
    };

    const checkWinningColumn = (player, column) => {
        for (let i = column; i <= 9; i += 3) {
            if (board.getValueAt(i) !== player.getSelection()) {
                return false;
            }
        }

        return true;
    };

    const checkWinningDiagonal = (player) => {
        return (board.getValueAt(1) === player.getSelection() &&
            board.getValueAt(5) === player.getSelection() &&
            board.getValueAt(9) === player.getSelection())
            || (board.getValueAt(3) === player.getSelection() &&
                board.getValueAt(5) === player.getSelection() &&
                board.getValueAt(7) === player.getSelection());
    };

    return { checkWin };
})();

const displayController = (function () {
    (function() {
        const container = document.querySelector("#board-container");
        container.addEventListener("click", (e) => {
            switch (e.target.id) {
                case "cell-1":
                    playerController.play(1);
                    break;
                case "cell-2":
                    playerController.play(2);
                    break;
                case "cell-3":
                    playerController.play(3);
                    break;
                case "cell-4":
                    playerController.play(4);
                    break;
                case "cell-5":
                    playerController.play(5);
                    break;
                case "cell-6":
                    playerController.play(6);
                    break;
                case "cell-7":
                    playerController.play(7);
                    break;
                case "cell-8":
                    playerController.play(8);
                    break;
                case "cell-9":
                    playerController.play(9);
                    break;
            }
        });
    })();

    const render = (player, position) => {
        let rand = Math.floor(Math.random() * 5 + 1);
        board.getCellAt(position).getElement().src = `images/${player.getSelection()}${rand}.png`;
        board.getCellAt(position).getElement().classList.add("occupied");
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