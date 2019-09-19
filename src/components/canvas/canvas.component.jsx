import React, { useEffect, useRef } from 'react';
import useWindowWidthAndHeight from '../../utils/useWindowWidthAndHeight';

let wheelItems, canvas, ctx;
let isOn = false;
let bubbles = {};
let bubblesCount = 0;
const bubblesFpsInterval = 60;
const bubblesDurationMs = 4400;
const bubblesTransition = 1 / (bubblesDurationMs * 0.06);
const bubblesRgbColor = '129, 194, 212';
let leaveTimeout = null;

const Canvas = ({ active }) => {
  const size = useWindowWidthAndHeight();
  const canvasRef = useRef(null);

  useEffect(resetBubbles, [size]);

  useEffect(() => {
    if (active) {
      clearTimeout(leaveTimeout);
      isOn = false;
      resetBubbles();
      canvas = canvasRef.current;
      ctx = canvas.getContext('2d');
      wheelItems = document.querySelectorAll('.wheel-item');
      setTimeout(() => {
        !isOn && requestAnimationFrame(() => renderCanvas(0));
        isOn = true;
      }, 650);
    } else {
      leaveTimeout = setTimeout(() => (isOn = false), 650);
    }
  }, [active]);

  return <canvas ref={canvasRef} className="canvas" {...size}></canvas>;
};

export default Canvas;

// Canvas Script

class Bubble {
  constructor(x, y, r) {
    this.id = bubblesCount++;
    this.x = x;
    this.y = y;
    this.r = r;
    this.scale = 1;
    this.opacity = 1;
    bubbles[this.id] = this;
  }
  draw() {
    const { scale, opacity } = this;

    if (scale <= 0) return delete bubbles[this.id];
    else drawBubble(this.x, this.y, this.r * scale, opacity);

    this.opacity = opacity - bubblesTransition;
    this.scale = scale - bubblesTransition;
  }
  X = this.X;
}

// Render function
const renderCanvas = frame => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  if (frame % bubblesFpsInterval === 0) newBubleToWheelItems();

  // eslint-disable-next-line no-unused-vars
  for (let i in bubbles) bubbles[i].draw();

  isOn && requestAnimationFrame(() => renderCanvas(++frame));
};

function newBubleToWheelItems() {
  wheelItems.forEach(({ firstChild: item }) => {
    const { top, left, width, height } = item.getBoundingClientRect();
    new Bubble(left + width / 2, top + height / 2, width / 2);
  });
}

function drawBubble(x, y, r, opacity) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${bubblesRgbColor}, ${0.2 * opacity})`;
  ctx.fill();
  // ctx.stroke();
}

function resetBubbles() {
  bubbles = {};
  bubblesCount = 0;
}
