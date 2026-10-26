// Assignment 5, Part 2 — Individual work (Tasks 6–10)
// Plain JavaScript, addEventListener only (no inline onclick, no libraries).

/* =====================================================
   TASK 6. Counter with click events
   Elements: #counterValue, #increaseBtn, #decreaseBtn, #resetBtn
   Event: click
   DOM change: textContent of #counterValue
   ===================================================== */
const counterValue = document.getElementById('counterValue');
const increaseBtn = document.getElementById('increaseBtn');
const decreaseBtn = document.getElementById('decreaseBtn');
const resetBtn = document.getElementById('resetBtn');

let count = 0;

// One function updates everything that is displayed
function updateCounter() {
  counterValue.textContent = count;
  decreaseBtn.disabled = count === 0; // can't go below 0
}

increaseBtn.addEventListener('click', function () {
  count++;
  updateCounter();
});

decreaseBtn.addEventListener('click', function () {
  if (count > 0) {          // never negative
    count--;
  }
  updateCounter();
});

resetBtn.addEventListener('click', function () {
  count = 0;
  updateCounter();
});

updateCounter(); // show correct state on load

/* =====================================================
   TASK 7. Live text preview
   Elements: #previewInput, #previewText, #charCount, #clearPreviewBtn
   Events: input (typing / pasting), click (Clear)
   DOM change: textContent of preview + counter, class "empty"
   ===================================================== */
const previewInput = document.getElementById('previewInput');
const previewText = document.getElementById('previewText');
const charCount = document.getElementById('charCount');
const clearPreviewBtn = document.getElementById('clearPreviewBtn');

const PLACEHOLDER = 'Your text will appear here';

function updatePreview() {
  const value = previewInput.value;
  charCount.textContent = value.length;

  if (value === '') {
    previewText.textContent = PLACEHOLDER;
    previewText.classList.add('empty');
  } else {
    previewText.textContent = value; // textContent: safe, no HTML injection
    previewText.classList.remove('empty');
  }
}

previewInput.addEventListener('input', updatePreview);

clearPreviewBtn.addEventListener('click', function () {
  previewInput.value = '';
  updatePreview();
  previewInput.focus(); // return keyboard focus to the input
});

updatePreview();

/* =====================================================
   TASK 8. Change an image with a select control
   Elements: #sportSelect, #sportImage, #sportCaption
   Event: change
   DOM change: img.src, img.alt, caption textContent
   ===================================================== */
const sportSelect = document.getElementById('sportSelect');
const sportImage = document.getElementById('sportImage');
const sportCaption = document.getElementById('sportCaption');

// Data for each option (key = value of <option>)
const sports = {
  yoga: {
    src: 'images/yoga-floor.jpg',
    alt: 'Empty yoga studio with a wooden floor and warm lighting',
    caption: 'Yoga — stretch, breathe and relax.'
  },
  swimming: {
    src: 'images/pool.jpg',
    alt: 'Indoor swimming pool with lanes',
    caption: 'Swimming — full-body workout in the pool.'
  },
  boxing: {
    src: 'images/boxing.jpg',
    alt: 'Boxing ring in a dark gym with neon green accents',
    caption: 'Boxing — power, speed and endurance.'
  },
  gym: {
    src: 'images/jym.jpg',
    alt: 'Gym with weights and training machines',
    caption: 'Gym — build strength with modern equipment.'
  }
};

function showSport() {
  const sport = sports[sportSelect.value];
  sportImage.src = sport.src;
  sportImage.alt = sport.alt;
  sportCaption.textContent = sport.caption;
}

sportSelect.addEventListener('change', showSport);

showSport(); // valid initial selection on load

/* =====================================================
   TASK 9. Keyboard events
   Elements: #keyInput, #keyStatus, #keyResult, #keyForm
   Event: keydown on the input (so it only works while the input has focus)
   DOM change: textContent of status + result, input.value
   ===================================================== */
const keyForm = document.getElementById('keyForm');
const keyInput = document.getElementById('keyInput');
const keyStatus = document.getElementById('keyStatus');
const keyResult = document.getElementById('keyResult');

keyInput.addEventListener('keydown', function (event) {
  // Show which key was pressed (a space is shown as the word "Space")
  keyStatus.textContent = event.key === ' ' ? 'Space' : event.key;

  if (event.key === 'Enter') {
    event.preventDefault();                 // no form submission
    keyResult.textContent = keyInput.value; // show current input text
  }

  if (event.key === 'Escape') {
    keyInput.value = '';
    keyResult.textContent = '';
  }
});

// Extra safety: block any submit of the form
keyForm.addEventListener('submit', function (event) {
  event.preventDefault();
});

/* =====================================================
   TASK 10. Mouse and focus events
   Elements: #focusCard, #cardInstruction
   Events:
     mouseenter / focus -> add class "highlight", change instruction text
     mouseleave / blur  -> remove class, restore instruction text
   ===================================================== */
const focusCard = document.getElementById('focusCard');
const cardInstruction = document.getElementById('cardInstruction');

const DEFAULT_TEXT = 'Hover over the card or press Tab to focus it.';
const ACTIVE_TEXT = 'Card is active! Move the mouse away or press Tab to leave.';

function highlightCard() {
  focusCard.classList.add('highlight');
  cardInstruction.textContent = ACTIVE_TEXT;
}

function unhighlightCard() {
  focusCard.classList.remove('highlight');
  cardInstruction.textContent = DEFAULT_TEXT;
}

focusCard.addEventListener('mouseenter', highlightCard);   // mouse comes in
focusCard.addEventListener('mouseleave', unhighlightCard); // mouse leaves
focusCard.addEventListener('focus', highlightCard);        // keyboard (Tab) focus
focusCard.addEventListener('blur', unhighlightCard);       // focus lost
