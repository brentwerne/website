document.getElementById('player-falling-blocks').style.marginLeft = (document.getElementById('game-frame').clientWidth * .5) - document.getElementById('player-falling-blocks').clientWidth / 2;
document.getElementById('player-falling-blocks').style.marginRight = (document.getElementById('game-frame').clientWidth * .5) + document.getElementById('player-falling-blocks').clientWidth / 2;

document.getElementById('player-falling-blocks').style.marginTop = (document.getElementById('game-frame').clientHeight * .90);


let fallingblocks = [];

window.addEventListener ('resize', function ()
{
    this.window.location.reload();
});


let playerMargin = parseInt(document.getElementById('player-falling-blocks').style.marginLeft);
playerMarginIncrement = parseInt(document.getElementById('player-falling-blocks').clientWidth) / 2;
document.addEventListener('keydown', (event) => {
   
    let character = document.getElementById('player-falling-blocks');
    if (gamePlaying)
    {
        if (event.code == 'ArrowLeft')
        {
            let characterLeft = parseInt(character.style.marginLeft);
            
            if (characterLeft - playerMarginIncrement >= 0)
            {
                playerMargin -= playerMarginIncrement;
            }
            else
            {
                playerMargin = document.getElementById('game-frame').clientWidth - character.clientWidth - playerMarginIncrement;
            }
        }

        if (event.code == 'ArrowRight')
        {
            let characterRight = parseInt(character.style.marginLeft) + character.clientWidth;

            if (characterRight + playerMarginIncrement <= document.getElementById('game-frame').clientWidth)
            {
                playerMargin += playerMarginIncrement;
            }
            else
            {
                playerMargin = playerMarginIncrement;
            }
        }
    }
    document.getElementById('player-falling-blocks').style.marginLeft = playerMargin;
});

let scoreCount = 0;

let gamePlaying = false;

let playButtonBool = true;
let playButton = document.getElementById("image-button");
playButton.addEventListener("click", (event) => {

    if (playButtonBool)
    {
        gamePlaying = true;

        createFallingBlock();
        blockFalls();
        checkForCollision();
        gameIsOver();

        playButton.setAttribute ("src", "assets/img/pause_button.png");

        playButtonBool = false;
    }
    else
    {

        playButton.setAttribute ("src", "assets/img/play_button.png");

        playButtonBool = true;

        gamePlaying = false;
    }


});


let gameOver = false;
let lives = 1;
let generatorInterval = 4;
let blockSpeed = 10;
let blockCounter = 0;

async function createFallingBlock () {

    if (gamePlaying && !gameOver)
    {
        let node = document.createElement("div");
        node.setAttribute("class", "falling-block");
        node.setAttribute("id", "falling-block"+blockCounter);
        blockCounter++;
        node.style.width  = document.getElementById('player-falling-blocks').clientWidth;
        node.style.height = document.getElementById('player-falling-blocks').clientWidth;
        
        node.style.marginLeft = Math.floor(Math.random() * (parseInt(document.getElementById("game-frame").clientWidth) - parseInt(node.style.width)));
        node.style.marginTop = parseInt(document.getElementById("game-frame").clientHeight) * (-.95);
        document.getElementById("game-frame").appendChild (node);

        fallingblocks.push(node);

        setTimeout(createFallingBlock, generatorInterval*50);
    }
}

async function checkForCollision()
{
    if (gamePlaying && !gameOver)
    {
        if (parseInt(fallingblocks[0].style.marginTop) + document.getElementById('player-falling-blocks').clientHeight > (-1 * parseInt(document.getElementById('player-falling-blocks').clientHeight)))
        {
            let playerLeft  = parseInt(document.getElementById('player-falling-blocks').style.marginLeft);
            let playerRight = parseInt(document.getElementById('player-falling-blocks').style.marginLeft) + parseInt(document.getElementById('player-falling-blocks').clientWidth);

            let blockLeft = parseInt(fallingblocks[0].style.marginLeft);
            let blockRight = parseInt(fallingblocks[0].style.marginLeft) + parseInt(fallingblocks[0].style.width);
            
            if ( blockLeft > playerLeft && blockLeft < playerRight ||
                blockRight > playerLeft && blockRight < playerRight)
            {
                gameOver = true;
                gamePlaying = false;
            }
        }
    }

    setTimeout (checkForCollision, 1);
}

async function increaseDifficulty()
{
    // smaller the number the faster blocks are generated and faster they fall.
    generatorInterval *= .9;
    blockSpeed *= .9; 
    setTimeout(increaseDifficulty, 10000);
}

async function removeBlock(node)
{
    if (parseInt(node.style.marginTop) + document.getElementById('player-falling-blocks').clientWidth >= 0 )
    {
        document.getElementById("game-frame").removeChild(node);
        fallingblocks.shift();
        scoreCount++;
        document.getElementById("score-count").innerHTML = "Score Count: " + scoreCount;
    }
}

async function blockFalls()
{
    if (gamePlaying && !gameOver)
    {
        for (let i = 0; i < fallingblocks.length; i++)
        {
            fallingblocks[i].style.marginTop = parseInt(fallingblocks[i].style.marginTop) + parseInt(fallingblocks[i].clientWidth) / 10;
                
            removeBlock(fallingblocks[i]);
        }

        setTimeout(blockFalls, 10);
    }
}


async function gameIsOver ()
{
    if (gameOver)
    {
        gameOver = false;
        alert("Game over :(\nYou scored " + scoreCount + " points")
        for (let i = 0; i < fallingblocks.length; i++)
        {
            document.getElementById("game-frame").removeChild(fallingblocks[i]);
        }
        fallingblocks = [];

        playButton.setAttribute ("src", "assets/img/play_button.png");
        
        document.getElementById('player-falling-blocks').style.marginLeft = (document.getElementById('game-frame').clientWidth * .5) - document.getElementById('player-falling-blocks').clientWidth / 2;

        playerMargin = (document.getElementById('game-frame').clientWidth * .5) - document.getElementById('player-falling-blocks').clientWidth / 2;
        document.getElementById('player-falling-blocks').style.marginLeft = playerMargin;
        gamePlaying = false;
        playButtonBool = true;

        scoreCount = 0;
        document.getElementById("score-count").innerHTML = "Score Count: " + scoreCount;
    
    }
    else
    {
        setTimeout(gameIsOver, 500);
    }
}

