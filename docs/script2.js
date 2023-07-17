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


  



const wordTexts = [
  { word: '宇宙', changedWord: '全て' },
  { word: '未知', changedWord: '無限' },
  { word: '空間', changedWord: '虚空' },
  { word: '重力', changedWord: '天地' },
  { word: '世界', changedWord: '地球' },
  { word: '夜', changedWord: '影' },
  { word: '星', changedWord: '輝き' },
  { word: '星 ', changedWord: '願い' },
  { word: '大空', changedWord: '蒼穹' },
  { word: '風', changedWord: '流' },
  { word: '光', changedWord: '色' },
  { word: '太陽', changedWord: '源' },
  { word: '雲', changedWord: '境界' },
  { word: '雲 ', changedWord: '毛布' },
  { word: '雲  ', changedWord: 'ふわふわ' },
  { word: '雲   ', changedWord: '連想' },
  { word: '雲    ', changedWord: '便り' },
  { word: '雨', changedWord: '涙' },
  { word: '雨 ', changedWord: '恵' },
  { word: '雨  ', changedWord: '音' },
  { word: '雨   ', changedWord: '匂' },
  { word: '晴天', changedWord: '澄清' },
  { word: '鳥', changedWord: '自由' },
  { word: '飛行機', changedWord: '旅' },
  { word: '風船', changedWord: '夢' },
  { word: '風景', changedWord: '心情' },
];


function checkCharacterOverlap() {
  const characterRect = character.getBoundingClientRect();

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const wordRect = word.getBoundingClientRect();

    // 文字とキャラクターの重なりチェック
    if (characterRect.left < wordRect.right &&
        characterRect.right > wordRect.left &&
        characterRect.top < wordRect.bottom &&
        characterRect.bottom > wordRect.top ) 
    {
      word.textContent = wordTexts[i].changedWord;
    }
  }
}
setInterval(checkCharacterOverlap, 100);




const retryButton = document.getElementById('retry');
retryButton.addEventListener('click', function() {
  window.location.href = 'index.html';
});




window.addEventListener('load', function() {
  const container = document.documentElement;
  const endScrollTop = container.scrollHeight - container.clientHeight;
  const scrollSpeed = 120;

  const startTime = performance.now();
  const startScrollTop = container.scrollTop;

  function scroll() {
    const elapsed = performance.now() - startTime;
    const scrollDistance = (elapsed / 1000) * scrollSpeed;
    const scrollTo = Math.min(startScrollTop + scrollDistance, endScrollTop);

    container.scrollTop = scrollTo;

    if (scrollTo < endScrollTop) {
      requestAnimationFrame(scroll);
    }
  }

  requestAnimationFrame(scroll);
});