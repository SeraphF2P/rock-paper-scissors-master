const ruleBtn = document.querySelector('.ruleBtn')
const overlayer = document.querySelector('.overlayer')
const opt = document.querySelectorAll('main div')
const main = document.querySelector('main')
const pText = document.querySelector('.text .player')
const cText = document.querySelector('.text .theHouse')
const theHouseChose = document.querySelector('.theHouseChose')
const veil = document.querySelector('.veil')
const countDown = document.querySelector('.timer')
const result = document.querySelector('.result')
const playAgain = document.querySelector('.playAgain')
let t = 3
const scoreboard = document.querySelector('.score')
let score = 0;
let hHaswon = false;
let pHaswon = false;
let draw = false;
const reset = document.querySelector('.reset')
function randomOption() {
    let ids = Array.from(opt).map(a => {
        return a.getAttribute('id')
    })
    return ids[Math.floor(Math.random() * 5)];
}

function checkForWin(a, b) {
    hHaswon = false;
    pHaswon = false;
    draw = false;
    if (a != b) {
        if ((a == 'rock') && (b == 'lizard' || b == 'scissors')) {
            score++
            pHaswon = true
        } else if ((a == 'paper') && (b == 'rock' || b == 'spock')) {
            score++
            pHaswon = true
        } else if ((a == 'scissors') && (b == 'lizard' || b == 'paper')) {
            score++
            pHaswon = true
        } else if ((a == 'lizard') && (b == 'spock' || b == 'paper')) {
            score++
            pHaswon = true
        } else if ((a == 'spock') && (b == 'scissors' || b == 'rock')) {
            score++
            pHaswon = true
        } else {
            hHaswon = true
        }
    } else if (a == b) {
        draw = true;
    }
}
function showWinner() {
    if (hHaswon == true) {
        result.innerHTML = 'You Lose';
    } else if (pHaswon == true) {
        result.innerHTML = 'You Win !!!';
        veil.style.box_shadow = '0 0 0 10px white';
    } else if (draw == true) {
        result.innerHTML = 'Try again';
    }
    reset.classList.remove('timer')
    reset.classList.add('playAgain')
    reset.innerHTML = 'Play Again';
    scoreboard.innerHTML = score;

}


opt.forEach((e) => {
    e.addEventListener('click', function chose() {
        let timerId = setInterval(() => {
            countDown.innerHTML = t
            t--;
        }, 1000)
        let picked = e.getAttribute('id')
        e.classList.add('selected')
        const other = document.querySelectorAll('main div:not(.selected)')
        other.forEach(a => a.style.visibility = 'hidden')
        pText.innerHTML = 'You picked'
        cText.innerHTML = 'The House picked'
        veil.style.visibility = 'visible';
        theHouseChose.style.visibility = 'visible';
        theHouseChose.style.backgroundColor = 'white'
        let hStyle = randomOption();
        theHouseChose.classList.add(hStyle)
        checkForWin(picked, hStyle)

        setTimeout(() => {
            theHouseChose.style.animation = 'paused';
            clearInterval(timerId);
            showWinner()
        }, 5000);

    })



})


reset.addEventListener('click', () => {
    veil.style.visibility = 'hidden';
    theHouseChose.style = 'animation: chosing infinite 1s ;'
    theHouseChose.setAttribute('class', 'theHouseChose')
    reset.classList.add('timer')
    reset.classList.remove('playAgain')
    countDown.innerHTML = '';
    result.innerHTML = '';

    t = 3;
    hHaswon = false;
    pHaswon = false;
    draw = false;
    theHouseChose.style.visibility = 'hidden';
    opt.forEach((e) => {
        e.classList.remove('selected');
        e.style.visibility = 'visible';
    })

})

ruleBtn.addEventListener('click', () => {
    overlayer.classList.toggle('show')
})

