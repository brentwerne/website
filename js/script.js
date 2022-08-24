document.getElementById('player-falling-blocks').style.marginLeft = (document.getElementById('game-frame').clientWidth * .5);
document.getElementById('player-falling-blocks').style.marginRight = (document.getElementById('game-frame').clientWidth * .5);

console.log(document.getElementById('game-frame').clientWidth);
console.log(document.getElementById('player-falling-blocks').style.marginLeft);

document.getElementById('player-falling-blocks').style.marginTop = (document.getElementById('game-frame').clientHeight * .90);

window.addEventListener ('resize', function ()
{
    document.getElementById('player-falling-blocks').style.height = document.getElementById('player-falling-blocks').clientWidth;
    document.getElementById('player-falling-blocks').style.marginTop = (document.getElementById('game-frame').clientHeight * .90);
});


let playerMargin = parseInt(document.getElementById('player-falling-blocks').style.marginLeft);
console.log(playerMargin);
playerMarginIncrement = parseInt(document.getElementById('player-falling-blocks').clientWidth);
document.addEventListener('keyup', (event) => {
    if (event.code == 'ArrowLeft')
    {
        playerMargin -= playerMarginIncrement;
    }

    if (event.code == 'ArrowRight')
    {
        playerMargin += playerMarginIncrement;
    }

    document.getElementById('player-falling-blocks').style.marginLeft = playerMargin;
    console.log(playerMargin);
});