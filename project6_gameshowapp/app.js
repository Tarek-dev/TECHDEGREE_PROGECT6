const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startGameButton = document.getElementsByClassName('btn__reset')[0];
const ul = document.getElementById('phrase').querySelector('ul');
const ol = document.getElementById('scoreboard').querySelector('ol');
let liveHeart = document.querySelectorAll('IMG');
let triesImg = Array.from(document.querySelectorAll('.tries img'));
const overlay = document.getElementById('overlay');


let missed = 0;
const listItem = ul.children;

const phrases = [
  'buffalo bills',
  'miami dolphins',
  'new england patriots',
  'new york jets',
  'pittsburgh steelers',
  'baltimore ravens',
  'cleveland browns',
  'cincinnati bengals',
  'tennessee titans',
  'indianapolis colts',
  'houston texans',
  'jacksonville jaguars',
  'kansas city cheifs',
  'las vegas raidars',
  'denver broncos',
  'los angeles chargers',
  'dallas cowboys',
  'philadelphia eagles',
  'new york giants',
  'washington redskins',
  'chicago bears',
  'green bay packers',
  'detroit lions',
  'minnesota vikings',
  'tampa bay buccaneers',
  'new orlean saints',
  'carolina panthers',
  'atlanta falcons',
  'seattle seahawks',
  'arizona cardinals',
  'los angeles rams',
  'san francisco forty niners',
];

function startGame() {
  const div = document.getElementById('overlay');
  startGameButton.addEventListener('click', () => {
    div.style.display='none';

  })
};
startGame();



function getRandomPhraseAsArray(arr){
  return phrases[Math.floor(Math.random() * phrases.length)].split('');
};

function addPhraseToDisplay(arr) {

  for (let i = 0; i < arr.length; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = arr[i];
    ul.appendChild(listItem);
    if (listItem.textContent == ' ') {
      listItem.className = 'space';
    } else {
        listItem.className = 'letter';
    }
  }
}

let phraseArray = getRandomPhraseAsArray();
addPhraseToDisplay(phraseArray);

qwerty.addEventListener('click', (e) => {
  if (e.target.tagName == 'BUTTON' )  {
    function checkLetter(arr){
      e.target.classList.add('chosen');
        const checkLetter = document.getElementsByClassName('letter');
        let match = null;
      for (let i = 0; i < checkLetter.length; i++) {
        if(checkLetter[i].textContent == arr) {
          checkLetter[i].classList.add('show');
          match = arr;
        }
      }
      return match;
    }
  }


  const letterFound = checkLetter(e.target.textContent);

  if (e.target.className == 'chosen'){
    e.target.disabled = true;
  }

  if(letterFound == null){
    liveHeart[missed].setAttribute("src", "images/lostHeart.png");
    missed +=1;
  }
checkWin();
})

function gameResetting(button) {
  var btnResetGame = document.createElement('BUTTON');
  btnResetGame.textContent = 'Play Again';
  btnResetGame.className = 'reset';
  overlay.appendChild(btnResetGame);

  btnResetGame.addEventListener('click', (e) => {
    overlay.style.display = 'none';
    btnResetGame.style.display = 'none';
    ul.innerHTML = '';

    function removeChosen() {
      const removeChosen = document.querySelectorAll('.chosen');
      for (let i = 0; i < removeChosen.length; i++) {
        removeChosen[i].classList.remove('chosen');
        removeChosen[i].disabled = false;
      }
    }
    removeChosen();

    const tries = document.querySelectorAll('.tries');
    for (let j = 0; j < liveHeart.length; j++) {
      liveHeart[j].className = 'tries';
      triesImg[j].src = 'images/liveHeart.png';
    }
    missed = 0;

    phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);

    overlay.querySelector('SPAN').remove();
  })
}


function revealTheTeam() {
  let textWin = document.createElement('span');
  textWin.textContent = 'CORRECT!'
  textWin.className = 'finalText';
  overlay.appendChild(textWin);
}

function revealTheTeamLose() {
  let textLose = document.createElement('span');
  textLose.textContent = `Sorry! The correct answer was ${phraseArray.join('').toUpperCase()}`;
  textLose.className = 'finalText';
  overlay.appendChild(textLose);
}

function checkWin(arr) {
  let liLetter = document.getElementsByClassName('letter');
  let liShow = document.getElementsByClassName('show');

  if (liLetter.length == liShow.length) {
    overlay.style.display = 'flex';
    overlay.className = 'win';
    document.querySelector("h2").innerHTML = "Congratulations, YOU WON!";

    revealTheTeam();
    startGameButton.style.display = 'none';
    gameResetting();
  } else if (missed > 4){
    overlay.style.display='flex';
    overlay.className = 'lose';
    document.querySelector("h2").innerHTML = "Maybe Next Time!";

    revealTheTeamLose();
    startGameButton.style.display = 'none';
    gameResetting();
  }
}
