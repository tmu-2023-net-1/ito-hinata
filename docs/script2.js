window.addEventListener('DOMContentLoaded', (event) => {
    const words = document.getElementsByClassName('word');
    //const fonts = ['font1', 'font2', 'font3']; // 使用するフォントのリスト
  
    Array.from(words).forEach((word) => {
      const fontIndex = Math.floor(Math.random() * fonts.length);
      const selectedFont = fonts[fontIndex];
      word.classList.add(selectedFont);
    });
  });

  const character = document.getElementById('character');
  const words = document.getElementsByClassName('word');
  const moveLeftBtn = document.getElementById('move-left');
  const moveRightBtn = document.getElementById('move-right');
  
  let characterX = 0;
  const characterWidth = character.offsetWidth;
  let isMovingLeft = false;
  let isMovingRight = false;
  let requestId;
  
  moveLeftBtn.addEventListener('mousedown', startMovingLeft);
  moveRightBtn.addEventListener('mousedown', startMovingRight);
  moveLeftBtn.addEventListener('mouseup', stopMoving);
  moveRightBtn.addEventListener('mouseup', stopMoving);
  moveLeftBtn.addEventListener('mouseout', stopMoving);
  moveRightBtn.addEventListener('mouseout', stopMoving);
  
  
  function startMovingLeft() {
    isMovingLeft = true;
    moveCharacter();
  }
  
  function startMovingRight() {
    isMovingRight = true;
    moveCharacter();
  }
  
  function stopMoving() {
    isMovingLeft = false;
    isMovingRight = false;
    cancelAnimationFrame(requestId);
  }
  
  function moveCharacter() {
    if (isMovingLeft) {
      characterX -= 1;
    } else if (isMovingRight) {
      characterX += 1;
    }
    checkBoundary();
    checkCharacterOverlap();
    updateCharacterPosition();
    requestId = requestAnimationFrame(moveCharacter);
  }
  
  function checkBoundary() {
    const maxCharacterX = window.innerWidth - characterWidth;
    if (characterX < 0) {
      characterX = 0;
    } else if (characterX > maxCharacterX) {
      characterX = maxCharacterX;
    }
  }
  
  function updateCharacterPosition() {
    character.style.left = characterX + 'px';
  }

  function adjustStartPosition() {
    const containerWidth = window.innerWidth;
    const characterXCentered = containerWidth / 2 - characterWidth / 2;
    characterX = characterXCentered;
    updateCharacterPosition();
  }
  adjustStartPosition();


  



  // 各文字要素に対して変更後のテキストを設定する
const wordTexts = [
  { word: '単語1', changedWord: '変更後のテキスト1' },
  { word: '単語2', changedWord: '変更後のテキスト2' },
  { word: '単語3', changedWord: '変更後のテキスト3' },
  // 他の単語と変更後のテキストの組み合わせを追加
];

// 初期状態の文字を設定
for (let i = 0; i < words.length; i++) {
  const word = words[i];
  word.textContent = wordTexts[i].word;
  word.dataset.word = wordTexts[i].word;
}

function checkCharacterOverlap() {
  const characterRect = character.getBoundingClientRect();

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const wordRect = word.getBoundingClientRect();

    // 文字とキャラクターの重なりをチェック
    if (
      characterRect.left < wordRect.right &&
      characterRect.right > wordRect.left &&
      characterRect.top < wordRect.bottom &&
      characterRect.bottom > wordRect.top
    ) {
      // 文字とキャラクターが重なっている場合、変更後のテキストに置き換える
      word.textContent = wordTexts[i].changedWord;
    } else {
      // 文字とキャラクターが重なっていない場合、元のテキストに戻す
      word.textContent = wordTexts[i].word;
    }
  }
}