const board = (function () {
    let cells = [];

    const createCell = () => {
        let value = " ";

        const getValue = () => {
            return value;
        };

        const setValue = (newValue) => {
            value = newValue;
        }

        return { getValue, setValue };
    }

    const initBoard = () => {
        for (let i = 0; i < 9; i++) {
            cells.push(createCell());
        }
    }

    const getValueAt = (index) => {
        return cells[index - 1].getValue();
    };

    const setValueAt = (index, value) => {
        cells[index - 1].setValue(value);
    };

    const render = () => {
        console.log(
            `
            [${getValueAt(1)}][${getValueAt(2)}][${getValueAt(3)}]
            [${getValueAt(4)}][${getValueAt(5)}][${getValueAt(6)}]
            [${getValueAt(7)}][${getValueAt(8)}][${getValueAt(9)}]
            `);
    };

    initBoard();
    render();

    return { getValueAt, setValueAt, render };
})();

const playerController = (function () {
    const p1 = createPlayer("John", "X");
    const p2 = createPlayer("Mary", "O");

    let currentPlayer = p1;

    const play = (index) => {
        if (board.getValueAt(index) !== " ") {
            console.log("That position is already occupied");
            return;
        }

        board.setValueAt(index, currentPlayer.getSelection());
        board.render();
        if (gameHandler.checkWin(currentPlayer)) {
            console.log(`${currentPlayer.getName()} has won!`);
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