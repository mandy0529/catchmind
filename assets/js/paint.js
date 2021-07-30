import {getSocket} from './socket';

const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const colors = document.querySelectorAll('.color');
const range = document.getElementById('colorRange');
const fill = document.querySelector('.fill__btn');
const saveBtn = document.querySelector('.save__btn');
const colorsController = document.getElementById('colorsController');

const FIRST_COLOR = '#1C1C1D';
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

context.strokeStyle = FIRST_COLOR;
context.fillStyle = FIRST_COLOR;
context.lineWidth = 2.5;

let painting = false;
let filling = false;
//------------------------------------------------------------

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

const beginPath = (x, y) => {
  context.beginPath();
  context.moveTo(x, y);
};
const strokePath = (x, y, color) => {
  let currentColor = context.strokeStyle;
  if (color) {
    context.strokeStyle = color;
  }
  context.lineTo(x, y);
  context.stroke();
  context.strokeStyle = currentColor;
};
const filledPath = (color) => {
  let currentColor = context.fillStyle;
  if (color) {
    context.fillStyle = color;
  }
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.fillStyle = currentColor;
};
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    beginPath(x, y);
    getSocket().emit(window.events.beginPath, {x, y});
  } else {
    strokePath(x, y);
    getSocket().emit(window.events.strokePath, {
      x,
      y,
      color: context.strokeStyle,
    });
  }
}

function handleColor(event) {
  const color = event.target.style.backgroundColor;
  context.strokeStyle = color;
  context.fillStyle = color;
}

function handleRange(event) {
  const size = event.target.value;
  context.lineWidth = size;
}

function handleMode() {
  if (filling === true) {
    filling = false;
    fill.textContent = 'Fill';
  } else {
    filling = true;
    fill.textContent = 'Paint';
  }
}

function handleCanvasClick() {
  if (filling) {
    filledPath();
    getSocket().emit(window.events.fill, {color: context.fillStyle});
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSave() {
  const image = canvas.toDataURL('img/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'paint_MJ🤘🎨';
  link.click();
}

//------------------------------------------------

colors.forEach((color) => {
  color.addEventListener('click', handleColor);
});

if (range) {
  range.addEventListener('input', handleRange);
}

fill.addEventListener('click', handleMode);

saveBtn.addEventListener('click', handleSave);

export const handleBeginPath = ({x, y}) => {
  beginPath(x, y);
};

export const handleStrokePath = ({x, y, color}) => {
  strokePath(x, y, color);
};

export const handleFilled = ({color}) => {
  filledPath(color);
};
export const enableCanvas = () => {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('mousedown', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleCM);
};
export const disableCanvas = () => {
  canvas.removeEventListener('mousemove', onMouseMove);
  canvas.removeEventListener('mousedown', startPainting);
  canvas.removeEventListener('mouseup', stopPainting);
  canvas.removeEventListener('mouseleave', stopPainting);
  canvas.removeEventListener('mousedown', handleCanvasClick);
  canvas.removeEventListener('contextmenu', handleCM);
};
export const hideControllers = () => {
  colorsController.style.display = 'none';
};
export const showControllers = () => {
  colorsController.style.display = 'flex';
};
export const resetCanvas = () => {
  filledPath('white');
};
if (canvas) {
  hideControllers();
}
