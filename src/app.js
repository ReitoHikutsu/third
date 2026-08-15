import { ingredients } from './ingredients.js';
import { calculateScore } from './scoring.js';
import { characterImages, loadingCharacterImage, reactionBands } from './config.js';

const selectedIds = new Set();
const groups = [...new Set(ingredients.map(item => item.category))];
const $ = selector => document.querySelector(selector);
const selectionScreen = $('#selection-screen'); const cookingScreen = $('#cooking-screen'); const resultScreen = $('#result-screen');
const GAME_SCREEN = Object.freeze({ SELECTION: 'selection', COOKING: 'cooking', RESULT: 'result' });
const screens = { [GAME_SCREEN.SELECTION]: selectionScreen, [GAME_SCREEN.COOKING]: cookingScreen, [GAME_SCREEN.RESULT]: resultScreen };
let currentScreen = GAME_SCREEN.SELECTION;
let isCooking = false;

function showScreen(screenName) {
  Object.entries(screens).forEach(([name, screen]) => { screen.hidden = name !== screenName; });
  currentScreen = screenName;
}

function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function renderIngredients() {
  $('#ingredient-groups').innerHTML = groups.map(category => `<section class="ingredient-group"><h3>${category}</h3><div class="ingredient-grid">${ingredients.filter(item => item.category === category).map(item => `<button class="ingredient-button${selectedIds.has(item.id) ? ' is-selected' : ''}" type="button" data-id="${item.id}" aria-pressed="${selectedIds.has(item.id)}">${item.name}</button>`).join('')}</div></section>`).join('');
  $('#selected-count').textContent = selectedIds.size;
  $('#selection-hint').textContent = selectedIds.size ? `選択中：${selectedIds.size}種類。${selectedIds.size >= 4 && selectedIds.size <= 6 ? 'ちょうどよい具材数です。' : '4〜6種類がまとまりやすいです。'}` : '具材を選んでください。';
}

function displayCharacter(finalScore) {
  const band = reactionBands.find(item => finalScore >= item.min);
  const image = $('#character-image'); const placeholder = $('#character-placeholder');
  $('#reaction-text').textContent = band.text;
  image.hidden = true; placeholder.hidden = false; image.src = characterImages[band.key];
  image.onload = () => { image.hidden = false; placeholder.hidden = true; };
  image.onerror = () => { image.hidden = true; placeholder.hidden = false; };
}

function showResult(selected) {
  const result = calculateScore(selected);
  $('#recipe-name').textContent = `${selected.length}種類のオリジナル芋煮`;
  $('#selected-ingredients').innerHTML = selected.map(item => `<span>${item.name}</span>`).join('');
  $('#score-breakdown').innerHTML = Object.values(result.scores).map(({label,value,max}) => `<dt>${label}</dt><dd>${value} / ${max}</dd>`).join('');
  $('#base-score').textContent = `${result.baseScore} / 100`;
  $('#combo-list').innerHTML = result.appliedBonuses.length
    ? result.appliedBonuses.map(({name,points}) => `<li><span>${name}</span><strong>+${points}</strong></li>`).join('')
    : '<li class="no-combo">今回はコンボなし</li>';
  $('#combo-total').textContent = `コンボボーナス：+${result.comboBonus}`;
  $('#combo-reactions').innerHTML = result.appliedBonuses.map(({reaction}) => `<p>「${reaction}」</p>`).join('');
  $('#subtotal-score').textContent = `小計 ${result.subtotal}点`;
  $('#count-multiplier').textContent = `具材数補正 ×${Math.round(result.multiplier * 100)}%`;
  $('#total-score').textContent = `${result.finalScore} 点`;
  displayCharacter(result.finalScore); showScreen(GAME_SCREEN.RESULT); window.scrollTo({top:0,behavior:'smooth'});
}

function setupCookingImage() {
  const image = $('#cooking-character-image'); const placeholder = $('#cooking-character-placeholder');
  image.hidden = true; placeholder.hidden = false; image.src = loadingCharacterImage;
  image.onload = () => { image.hidden = false; placeholder.hidden = true; };
  image.onerror = () => { image.hidden = true; placeholder.hidden = false; };
}

async function startCooking() {
  if (isCooking || currentScreen !== GAME_SCREEN.SELECTION) return;
  const selected = ingredients.filter(item => selectedIds.has(item.id));
  if (!selected.length) { $('#selection-hint').textContent = 'まずは具材を1種類以上選んでください。'; return; }
  isCooking = true;
  const featuredIngredient = selected[Math.floor(Math.random() * selected.length)];
  $('#cook-button').disabled = true;
  setupCookingImage();
  showScreen(GAME_SCREEN.COOKING);

  try {
    $('#cooking-message').textContent = '下準備中……';
    await wait(1000);

    $('#cooking-message').textContent = `${featuredIngredient.name}を投入中……`;
    await wait(1000);

    $('#cooking-message').textContent = '煮込み中……';
    await wait(1000);

    $('#cooking-message').textContent = '味見中……';
    await wait(1000);

    // 4秒の調理演出が終了してから、初めて採点と結果表示を行う。
    showResult(selected);
  } finally {
    isCooking = false;
    $('#cook-button').disabled = false;
  }
}

function resetGame() {
  selectedIds.clear();
  isCooking = false;
  $('#cook-button').disabled = false;
  $('#cooking-message').textContent = '下準備中……';
  $('#recipe-name').textContent = '';
  $('#selected-ingredients').innerHTML = '';
  $('#score-breakdown').innerHTML = '';
  $('#base-score').textContent = '';
  $('#combo-list').innerHTML = '';
  $('#combo-total').textContent = '';
  $('#combo-reactions').innerHTML = '';
  $('#count-multiplier').textContent = '';
  $('#subtotal-score').textContent = '';
  $('#total-score').textContent = '';
  $('#reaction-text').textContent = '';
  renderIngredients();
  showScreen(GAME_SCREEN.SELECTION);
}

$('#ingredient-groups').addEventListener('click', event => { const button = event.target.closest('[data-id]'); if (!button) return; const {id} = button.dataset; selectedIds.has(id) ? selectedIds.delete(id) : selectedIds.add(id); renderIngredients(); });
$('#cook-button').addEventListener('click', startCooking);
$('#retry-button').addEventListener('click', () => { resetGame(); window.scrollTo({top:0,behavior:'smooth'}); });
showScreen(GAME_SCREEN.SELECTION);
renderIngredients();
