const btnStart = document.getElementById('start')
const btnNewGame = document.getElementById('new-game')
const cards = document.querySelectorAll('.card')
let hasFlippedCard = false
let firstCard, secondCard
let lockBoard = false


function flipCard() {
    if (lockBoard) return
    if (this === firstCard) return

    this.classList.add('flip')

    if(!hasFlippedCard){
        hasFlippedCard = true
        firstCard = this
        return
    }

    secondCard = this
    hasFlippedCard = false
    checkForMatch()
    checkForEndGame()
}

function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards()
        return
    }
    
    unflipCards()
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
}

function unflipCards() {
    lockBoard = true

    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        resetBoard()
    }, 1500)
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

function checkForEndGame() {
    if($('.card').not('.flip').length > 0){
        return
    }

    btnNewGame.style.visibility = 'visible'
}

function shuffleCards() {
    cards.forEach((card) => {
        let randomPos = ~~(Math.random() * 12)
        card.style.order = randomPos
    })
}

function revealCards(){
    cards.forEach((card) => {
        card.classList.add('flip')
    })  

    setTimeout(() => {
        cards.forEach((card) => {
            card.classList.remove('flip')
        })  
    }, 2000)
}

function gameEnd() {
    cards.forEach((card) => {
        card.classList.remove('flip')
    })

    btnNewGame.style.visibility = 'hidden'
    btnStart.style.visibility = 'visible'
}

function gameStart() {
    btnStart.style.visibility = 'hidden'
    
    shuffleCards()
    revealCards()

    setTimeout(() => {
        cards.forEach((card) => {
            card.addEventListener('click', flipCard)
        })
    }, 2000)

    btnNewGame.addEventListener('click', gameEnd)
}

btnStart.addEventListener('click', gameStart)