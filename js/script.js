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
console.log(playerMargin);
playerMarginIncrement = parseInt(document.getElementById('player-falling-blocks').clientWidth) / 2;
document.addEventListener('keyup', (event) => {
   
    let character = document.getElementById('player-falling-blocks');
    let border = document.getElementById('game-frame');

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
        console.log (document.getElementById('game-frame').clientWidth);
        console.log (playerMargin);
    }

    if (event.code == 'ArrowRight')
    {
        let characterRight = parseInt(character.style.marginLeft) + character.clientWidth;

        if (characterRight + playerMarginIncrement <= document.getElementById('game-frame').clientWidth)
        {

            playerMargin += playerMarginIncrement;
            console.log (playerMargin);
        }
        else
        {
            playerMargin = playerMarginIncrement;
        }
    }

    document.getElementById('player-falling-blocks').style.marginLeft = playerMargin;
});