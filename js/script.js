document.getElementById('player-falling-blocks').style.marginLeft = (document.getElementById('game-frame').clientWidth * .5) - document.getElementById('player-falling-blocks').clientWidth / 2;
document.getElementById('player-falling-blocks').style.marginRight = (document.getElementById('game-frame').clientWidth * .5) + document.getElementById('player-falling-blocks').clientWidth / 2;

//console.log(document.getElementById('game-frame').clientWidth);
//console.log(document.getElementById('player-falling-blocks').style.marginLeft);

document.getElementById('player-falling-blocks').style.marginTop = (document.getElementById('game-frame').clientHeight * .90);

window.addEventListener ('resize', function ()
{
    document.getElementById('player-falling-blocks').style.height = document.getElementById('player-falling-blocks').clientWidth;
    document.getElementById('player-falling-blocks').style.marginTop = (document.getElementById('game-frame').clientHeight * .90);
});


let playerMargin = parseInt(document.getElementById('player-falling-blocks').style.marginLeft);
playerMarginIncrement = parseInt(document.getElementById('player-falling-blocks').clientWidth) / 2;
document.addEventListener('keyup', (event) => {
   
    let character = document.getElementById('player-falling-blocks');

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

    document.getElementById('player-falling-blocks').style.marginLeft = playerMargin;
});

let gameover = false;
let lives = 1;
let generatorInterval = 4;

async function createFallingBlock () {

    let node = document.createElement("div");
    node.setAttribute("id", "falling-block");

    node.style.width  = document.getElementById('player-falling-blocks').clientWidth;
    node.style.height = document.getElementById('player-falling-blocks').clientWidth;
    
    node.style.marginLeft = Math.floor(Math.random() * (parseInt(document.getElementById("game-frame").clientWidth) - parseInt(node.style.width)));
    node.style.marginTop = parseInt(document.getElementById("game-frame").clientHeight) * (-.95);
    document.getElementById("game-frame").appendChild (node);

    setTimeout(createFallingBlock, generatorInterval*250);
}

async function blocksFall()
{
    if (document.getElementById("falling-block").marginTop == null)
    {
        document.getElementById("falling-block").marginTop = parseInt(document.getElementById("falling-block").style.marginTop);
    }
    document.getElementById("falling-block").marginTop += parseInt(document.getElementById('player-falling-blocks').clientWidth);
    
    document.getElementById("falling-block").style.marginTop = document.getElementById("falling-block").marginTop;
    
    if (parseInt(document.getElementById("falling-block").style.marginTop) >= 0 )
    {
        let node = document.getElementById("falling-block");
        document.getElementById("game-frame").removeChild(node);
    }

    setTimeout(blocksFall, 500)
}

createFallingBlock();
blocksFall();