window.addEventListener('DOMContentLoaded', () => {
    const tiles = $(".tile");
    const playerDisplay = $('.display-player');
    const resetButton = $('#reset');
    const announcer = $('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;
    let hovered = []

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.html('Player <span class="playerO">O</span> Won')
                break;
            case PLAYERX_WON:
                announcer.html('Player <span class="playerX">X</span> Won')
                break;
            case TIE:
                announcer.text('Tie');
        }
        announcer.removeClass('hide');
    };

    const isValidAction = (tile) => {
        if ($(tile).text() === 'X' || $(tile).text() === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.removeClass(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.text(currentPlayer);
        playerDisplay.addClass(`player${currentPlayer}`);
        if (currentPlayer != 'X') {
            document.documentElement.style.setProperty("--player-color", "rgb(40, 30, 80)")
        } else {
            document.documentElement.style.setProperty("--player-color", "rgb(80, 30, 40)");
        }
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            $(tile).text(currentPlayer);
            $(tile).addClass(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.addClass('hide')

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.text("")
        tiles.removeClass('playerX')
        tiles.removeClass('playerO')
    }

    Array.from(document.querySelectorAll('.tile')).forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.on('click', resetBoard);
});