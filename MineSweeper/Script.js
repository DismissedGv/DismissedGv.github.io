// MARK: Variables
var board = [];
var rows = 8;
var columns = 8;

var minesCount = 5;
var minesLocation = []; //goal to click all tiles except the ones containing mines

var tilesClicked = 0;
var flagEnabled = false;
var flagLeft = 0;

var gameOver = false;

//Timer
var timer = 0;
var timerInterval = null;
var timerStarted = false;

// MARK: Startup Logic
window.onload = function() 
{
    StartGame();

    DifficultyStartup();

    document.addEventListener("mousedown", function(e) {
        if (e.button === 1) {
            e.preventDefault();
        }
    });    
}

function SetMines()
{
    let minesLeft = minesCount;

    while (minesLeft > 0)
    {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!minesLocation.includes(id))
        {
            minesLocation.push(id);
            minesLeft -= 1;
        }
    }
}

function StartGame()
{
    document.getElementById("flag-button").addEventListener("mousedown", function(e){
        if (e.button === 1) //middle click
        {
            e.preventDefault();
            middleClickTile(r, c);
        }
        else
        {
            SetFlag();
        }
    });
    document.getElementById("flag-count").innerText = flagLeft = minesCount;
    SetMines();

    const boardElement = document.getElementById("board");

    // Set dynamic board
    boardElement.style.width = `${columns * 50}px`;
    boardElement.style.height = `${rows * 50}px`;

    //populate our board
    for(let r = 0; r < rows; r++)
    {
        let row = [];
        for(let c = 0; c < columns; c++)
        {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", ClickTile);
            tile.addEventListener("contextmenu", FlagTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        
        board.push(row);
    }

    console.log(board);
}

// MARK: Flag Logic
function SetFlag()
{
    if (flagEnabled)
    {
        flagEnabled = false;
        document.getElementById("flag-button").style.backgroundColor = "lightgrey";
    }
    else
    {
        flagEnabled = true;
        document.getElementById("flag-button").style.backgroundColor = "darkgrey";
    }
}
function UpdateFlagDisplay()
{
    document.getElementById("flag-count").innerText = flagLeft;
}

function FlagTile(e)
{
    e.preventDefault(); //prevents right-click menu
    if (gameOver ) return;

    let tile = this;
    if (tile.classList.contains("tile-clicked")) return;
    
    if (tile.innerText == "" && flagLeft > 0)
    { 
        tile.innerText = "🚩";
        flagLeft --;
        UpdateFlagDisplay();
    }
    else if (tile.innerText == "🚩")
    {
        tile.innerText = "";
        flagLeft ++;
        UpdateFlagDisplay();
    }
}

// MARK: Click Logic
function ClickTile()
{
    Timer();

    if (gameOver || this.classList.contains("tile-clicked"))
    {
        return;
    }

    let tile = this;

    if (flagEnabled || tile.innerText == "🚩")
    {
        if (tile.innerText == "" && flagLeft > 0)
        { 
            tile.innerText = "🚩"; 
            flagLeft --;
            UpdateFlagDisplay();
        }
        else if (tile.innerText == "🚩")
        {
            tile.innerText = "";
            flagLeft ++;
            UpdateFlagDisplay();
        }
        return;
    }

    if (minesLocation.includes(tile.id))
    {
        // alert("GAME OVER!");
        gameOver = true;
        tile.style.backgroundColor = "red";
        RevealMines();
        clearInterval(timerInterval); //stop timer
        return;
    }

    let coords = tile.id.split("-");
    let r = parseInt(coords[0])
    let c = parseInt(coords[1])
    CheckMine(r, c)
}

function MiddleClickTile(r, c) {
    if (gameOver) return;

    let tile = board[r][c];
    if (!tile.classList.contains("tile-clicked")) return;

    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    let flagCount = 0;
    for (let [dr, dc] of directions) {
        let nr = r + dr;
        let nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < columns) {
            let neighbor = board[nr][nc];
            if (neighbor.innerText === "🚩") {
                flagCount++;
            }
        }
    }

    let currentTileNumber = parseInt(tile.innerText);
    if (flagCount === currentTileNumber) {
        for (let [dr, dc] of directions) {
            let nr = r + dr;
            let nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < columns) {
                let neighbor = board[nr][nc];
                if (!neighbor.classList.contains("tile-clicked") && neighbor.innerText !== "🚩") {
                    neighbor.click(); // simulate normal left click
                }
            }
        }
    }
}

// MARK: Mines Logic
function RevealMines()
{
    for (let r = 0; r < rows; r++)
    {
        for (let c = 0; c < columns; c++)
        {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id))
            {
                tile.innerText = "💣";
                tile.classList.add("explode"); // 💥 Add explosion animation
            }
        }
    }
}

function CheckMine(r, c)
{
    if (r < 0 || r >= rows || c < 0 || c >= columns)
    {
        return;
    }

    if (board[r][c].classList.contains("tile-clicked") || board[r][c].innerText == "🚩")
    {
        return;
    }

    board[r][c].classList.add("tile-clicked");
    tilesClicked += 1;

    let minesFound = 0;

    //top 3
    minesFound += CheckTile(r-1, c-1)   //top left
    minesFound += CheckTile(r-1, c)     //top 
    minesFound += CheckTile(r-1, c+1)   //top right

    
    //left and right
    minesFound += CheckTile(r, c-1)     //left
    minesFound += CheckTile(r, c+1)     //right

    //bottom 3
    minesFound += CheckTile(r+1, c-1)   //bottom left
    minesFound += CheckTile(r+1, c)     //bottom 
    minesFound += CheckTile(r+1, c+1)   //bottom right

    if (minesFound > 0)
    {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    }
    else
    {
        //top 3
        CheckMine(r-1, c-1)   //top left
        CheckMine(r-1, c)     //top 
        CheckMine(r-1, c+1)   //top right

        
        //left and right
        CheckMine(r, c-1)     //left
        CheckMine(r, c+1)     //right

        //bottom 3
        CheckMine(r+1, c-1)   //bottom left
        CheckMine(r+1, c)     //bottom 
        CheckMine(r+1, c+1)   //bottom right
    }

    if (tilesClicked == rows * columns - minesCount)
    {
        document.getElementById("flag-count").innerText = "Cleared";
        gameOver = true;
        clearInterval(timerInterval); //stop timer

        Confetti();   
    }
}

function CheckTile(r, c)
{
    if (r < 0 || r >= rows || c < 0 || c >= columns)
    {
        return;
    }

    if (minesLocation.includes(r.toString() + "-" + c.toString()))
    {
        return 1;
    }

    return 0;
}

// MARK: Restart Function
function RestartGame() 
{
    // clear previous game
    board = [];
    minesLocation = [];
    tilesClicked = 0;
    gameOver = false;
    flagEnabled = false;

    document.getElementById("board").innerHTML = "";
    document.getElementById("flag-button").style.backgroundColor = "lightgrey";

    //timer
    clearInterval(timerInterval);
    timer = 0;
    timerStarted = false;
    document.getElementById("timer").innerText = "0";

    //get selected settings
    let settings = GetSettings();
    rows = settings.rows;
    columns = settings.columns;
    minesCount = settings.mines;

    StartGame();
}

// MARK: Timer Function
function Timer()
{
    if (!timerStarted) {
        timerStarted = true;
        timerInterval = setInterval(() => {
            timer++;
            document.getElementById("timer").innerText = timer;
        }, 1000);
    }
}

// MARK: Confetti Function
function Confetti()
{
    let duration = 5 * 1000;
    let animationEnd = Date.now() + duration;
    let defaults = { startVelocity: 10, spread: 360, ticks: 300, zIndex: 1000 };
    
    let interval = setInterval(function() {
        let timeLeft = animationEnd - Date.now();
    
        if (timeLeft <= 0) {
            clearInterval(interval);
            return;
        }
    
        let particleCount = 5;
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: Math.random(), y: 0 } // top of screen
        }));
    }, 250);
}

// MARK: Difficulty Function
function UpdateDisplay(rows, columns, mines) 
{
    RestartGame();
    document.getElementById("display-rows").innerText = rows;
    document.getElementById("display-columns").innerText = columns;
    document.getElementById("display-mines").innerText = mines;
}

function DifficultyStartup() {
    document.getElementById("difficulty-select").addEventListener("change", function () {
        const customBox = document.getElementById("custom-settings");
        const difficulty = this.value;

        if (difficulty === "custom") {
            customBox.style.display = "inline";
        } else {
            customBox.style.display = "none";
        }

        const settings = GetSettings();
        UpdateDisplay(settings.rows, settings.columns, settings.mines);
    });

    // Also add listeners to custom inputs to update display live
    document.getElementById("custom-rows").addEventListener("input", () => {
        const settings = GetSettings();
        UpdateDisplay(settings.rows, settings.columns, settings.mines);
    });

    document.getElementById("custom-columns").addEventListener("input", () => {
        const settings = GetSettings();
        UpdateDisplay(settings.rows, settings.columns, settings.mines);
    });

    document.getElementById("custom-mines").addEventListener("input", () => {
        const settings = GetSettings();
        UpdateDisplay(settings.rows, settings.columns, settings.mines);
    });
}

function GetSettings() {
    const difficulty = document.getElementById("difficulty-select").value;

    let selectedRows = 8;
    let selectedColumns = 8;
    let selectedMines = 10;

    if (difficulty === "easy") {
        selectedRows = 9;
        selectedColumns = 9;
        selectedMines = 10;
    } else if (difficulty === "medium") {
        selectedRows = 16;
        selectedColumns = 16;
        selectedMines = 40;
    } else if (difficulty === "hard") {
        selectedRows = 16;
        selectedColumns = 30;
        selectedMines = 99;
    } else if (difficulty === "custom") {
        selectedRows = parseInt(document.getElementById("custom-rows").value);
        selectedColumns = parseInt(document.getElementById("custom-columns").value);
        selectedMines = parseInt(document.getElementById("custom-mines").value);
    }

    return {
        rows: selectedRows,
        columns: selectedColumns,
        mines: selectedMines
    };
}