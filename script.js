document.addEventListener('DOMContentLoaded', () => {

  let preloadedState = document.createElement('script')
  preloadedState.src = 'script.js'
  document.body.appendChild(preloadedState)

  const memoryGameWindow = document.querySelector('.memoryGameWindow')
  const gameVolumeSelect = document.getElementById('game')
  const btnStartGame = document.querySelector('.btnStartGame')
  const btnResetGame = document.querySelector('.btnResetGame')
  const counterRounds = document.querySelector('.counter')
  const timer = document.querySelector('.timer')
  let cardsArray = []
  let selectedVolume = 0
  let picsArr = []
  let count = 0
  let firstCard = ''
  let secondCard = ''
  let divFirstCard = ''
  let divSecondCard = ''
  let counter = 0
  let timerCounter = 0

  const picsArray = [
    {id: 1, img: './images/pics/01.jpg'},
    {id: 2, img: './images/pics/02.jpg'},
    {id: 3, img: './images/pics/03.jpg'},
    {id: 4, img: './images/pics/04.jpg'},
    {id: 5, img: './images/pics/05.jpg'},
    {id: 6, img: './images/pics/06.jpg'},
    {id: 7, img: './images/pics/07.jpg'},
    {id: 8, img: './images/pics/08.jpg'},
    {id: 9, img: './images/pics/09.jpg'},
    {id: 10, img: './images/pics/10.jpg'},
    {id: 11, img: './images/pics/11.jpg'},
    {id: 12, img: './images/pics/12.jpg'},
    {id: 13, img: './images/pics/13.jpg'},
    {id: 14, img: './images/pics/14.jpg'},
    {id: 15, img: './images/pics/15.jpg'},
    {id: 16, img: './images/pics/16.jpg'},
    {id: 17, img: './images/pics/17.jpg'},
    {id: 18, img: './images/pics/18.jpg'},
  ]

////////////////////////////// RANDOM PICS ///////////////////////////////////////
  let gamePics = picsArray.sort(() => {
    return 0.5 - Math.random()
  })

///////////////////////////// GAME SELECT CONTROL ////////////////////////////////
  let selectVolumeHandler = () => {
    gameVolumeSelect.addEventListener('change', () => {
      selectedVolume = gameVolumeSelect.value
      if (selectedVolume !== 0) {
        btnStartGame.disabled = false
      } else {
        btnStartGame.disabled = true
      }
    })
  }
  selectVolumeHandler()

////////////////////////// START BUTTON //////////////////////////////////////
  btnStartGame.addEventListener('click', () => {
    startGame()
  })

////////////////////////// RESET BUTTON //////////////////////////////////////
  btnResetGame.addEventListener('click', () => {
    fullResetGame()
    cardsArray = []
  })

////////////////////////// GAME FULL RESET ///////////////////////////////////
  let fullResetGame = () => {
    stopTimer()
    btnStartGame.disabled = false
    gameVolumeSelect.disabled = false
    gameVolumeSelect.value = 0
    cardsArray.forEach((cardItem) => {
      cardItem.parentNode.removeChild(cardItem)
    })
    cardsArray = []
    selectedVolume = 0
    picsArr = []
    resetGuesses()
    counter = 0
    counterRounds.innerHTML = `Your rounds: ${counter}`
    timerCounter = 0
    timer.textContent = `Your time is: ${timerCounter}`

  }

  let resetGuesses = () => {
    firstCard = ''
    secondCard = ''
    count = 0
  }

/////////////////////////// GAME START ///////////////////////////////////////
  let startGame = () => {
    startTimer()
    btnStartGame.disabled = true
    gameVolumeSelect.disabled = true
    for (let i = 0; i < selectedVolume; i++) {
      const card = document.createElement('div')
      card.className = 'card'
      const frontImage = document.createElement('img')
      frontImage.classList = 'front-face'
      const backImage = document.createElement('img')
      backImage.className = 'back-face'
      if (selectedVolume == 16) {
        picsArr = gamePics.slice(0, 8)
        card.style.width = 'calc(22% + 10px)'
        card.style.height = 'calc(24%)'
        card.style.marginBottom = '5px'
      } else if (selectedVolume == 24) {
        picsArr = gamePics.slice(0, 12)
        card.style.width = 'calc(16.1%)'
        card.style.height = 'calc(22%)'
      } else if (selectedVolume == 36) {
        picsArr = gamePics.slice(0, 18)
        card.style.width = 'calc(15% + 10px)'
        card.style.height = 'calc(16%)'
      }
      backImage.src = './images/back.jpg'
      cardsArray.push(card)
      card.appendChild(backImage)
      card.appendChild(frontImage)

    }
    picsArr = picsArr.concat(picsArr)

    cardsArray.forEach((item, index) => {
      item.children[1].src = picsArr[index].img
      item.children[1].dataset.id = picsArr[index].id
      item.addEventListener('mousedown', (e) => {
        if (count < 2) {
          count++
          if (count === 1) {
            divFirstCard = item
            divFirstCard.style.pointerEvents = 'none'
            firstCard = e.target.nextSibling.dataset.id
          } else if(count === 2) {
            divSecondCard = item
            divSecondCard.style.pointerEvents = 'none'
            secondCard = e.target.nextSibling.dataset.id
          }

          if (firstCard && secondCard) {
            if (firstCard === secondCard) {
              divFirstCard.classList.add('found')
              divSecondCard.classList.add('found')
              foundClassControl()
              setTimeout(() => {
                divSecondCard.style.pointerEvents = 'none'
                divFirstCard.style.pointerEvents = 'none'
              }, 100)
            }
            resetGuesses()
            divFirstCard.style.pointerEvents = 'auto'
            divSecondCard.style.pointerEvents = 'auto'
            counter++
            counterRounds.innerHTML = `Your rounds: ${counter}`
            setTimeout(() => {
              divFirstCard.classList.remove('flip')
              divSecondCard.classList.remove('flip')
            }, 500)
          }
        }
      })
    })

/////////////////////////// PICTURES SORT ////////////////////////////////////////
    cardsArray.sort(() => {
      return 0.5 - Math.random()
    })

////////////////////////// CARDS ADDING FROM MASSIVE TO GAME WINDOW //////////////      
    cardsArray.forEach((cardItem) => {
      memoryGameWindow.appendChild(cardItem)
    })

////////////////////////////// FLIP CARDS ////////////////////////////////////////
    cardsArray.forEach(card => card.addEventListener('mousedown', flipCard))

//////////////////////// FUNCTION FOUNDS CARDS CONTROL ///////////////////////////////////
    function foundClassControl() {
      const allFoundsDivs = document.querySelectorAll('.found')
      if (allFoundsDivs.length === +selectedVolume) {
        popupWindow()
      }
    }
  }

/////////////////////////////// POPUP WINDOW FUNCTION ///////////////////////////////////////
  function popupWindow() {
    stopTimer()
    const popupWindow = document.querySelector('.popupWindow')
    popupWindow.style.visibility = 'visible'
    setTimeout(() => {
      popupWindow.style.visibility = 'hidden'
      popupWindow.style.opacity = '0'
      popupWindow.style.transition = 'all 5s'
    }, 2500)
    popupWindow.style.opacity = '1'
    popupWindow.style.transition = 'none'
    setTimeout(() => {
      let lastGameCounter = document.querySelector('.lastGameCounter')
      let lastGameTimer = document.querySelector('.lastGameTimer')
      lastGameCounter.innerHTML = `Last game rounds: ${counter}`
      lastGameTimer.textContent = `Last game time: ${timerCounter}`
      fullResetGame()
    }, 500)
  }

///////////////////////////// FLIP CARDS FUNCTION //////////////////////////////
  function flipCard() {
    this.classList.add('flip')
  }

/////////////////////////////// GAME TIMER /////////////////////////////////////
  let startTimer = () => {
    window.timerId = setInterval(() => {
      timerCounter++
      if (timerCounter < 10) {
        timer.textContent = `Your time is: 0${timerCounter}`
      } else {
        timer.textContent = `Your time is: ${timerCounter}`
      }
    }, 1000)
  }

  let stopTimer = () => {
    clearInterval(window.timerId)
  }


})
