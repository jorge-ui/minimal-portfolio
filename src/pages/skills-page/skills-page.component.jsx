import React, { useEffect } from 'react';
import './skills-page.styles.scss';
// Modules
import { animated, useTransition } from 'react-spring';
import { wait } from '../../utils';
import useWindowWidthAndHeight from '../../utils/useWindowWidthAndHeight';
// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSkillsItems } from '../../redux/skills/skills.selectors';
const fullCircle = Math.PI * 2;
let positionsArray = {};
let centerItem;
const enterTrail = 60;
const enterDelay = 350;

// Canvas Stuff
let canvas, ctx;
let skillNameElements = [];
let skillNameNodes = [];
let isActive = false;

const SkillsPage = ({ skillsItems }) => {
  const canvasSize = useWindowWidthAndHeight();

  useEffect(() => {
    isActive = true;
    centerItem = document.querySelector('.center-item');
    startCanvas();
    return () => {
      isActive = false;
      positionsArray = {};
    };
  }, []);

  if (!Object.keys(positionsArray).length) initPositions(skillsItems);

  const positionedSkills = skillsItems.map((skill, index) => {
    let { x, y, multiplier } = positionsArray[index];
    return {
      skillName: skill,
      positioned: [x * multiplier, y * multiplier],
      index
    };
  });

  const transitionSkills = useTransition(
    positionedSkills,
    item => item.index,
    transitionConfig
  );

  return (
    <div className="skills-page">
      {transitionSkills.map(({ item, key, props }) => (
        <animated.div
          className="skill-item"
          key={key}
          style={{
            ...props,
            left: props.xy.interpolate(x => x),
            top: props.xy.interpolate((x, y) => y)
          }}
        >
          <div className="skill-name">{item.skillName}</div>
        </animated.div>
      ))}
      <canvas className="skills-canvas" {...canvasSize} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  skillsItems: selectSkillsItems
});

export default connect(mapStateToProps)(SkillsPage);

function initPositions(skillsItems) {
  const isMobile = window.isMobile();
  const { length } = skillsItems;
  const radius = isMobile ? window.innerWidth * 0.3 : window.innerWidth * 0.2;

  skillsItems.forEach((skill, index) => {
    const isEven = index % 2 === 0;
    const theta = fullCircle * (index / length);
    const x = Math.cos(theta) * radius;
    const y = Math.sin(theta) * radius;
    const multiplier = isEven
      ? 0.6 + Math.random() * 0.4
      : 0.9 + Math.random() * 0.4;
    positionsArray[index] = {
      x,
      y,
      multiplier: multiplier * isMobile ? 1.2 : 1.0
    };
  });
}

const transitionConfig = {
  from: {
    xy: [0, 0],
    opacity: 0
  },
  enter: ({ positioned: [x, y], index }) => async next => {
    await wait(enterDelay);
    await wait(enterTrail * index);
    next({ xy: [x, y], opacity: 1 });
  },
  config: {
    friction: 14
  }
};

function startCanvas() {
  canvas = document.querySelector('.skills-canvas');
  ctx = canvas.getContext('2d');

  skillNameElements = document.querySelectorAll('.skill-name');
  skillNameNodes = [];
  skillNameElements.forEach((skillNode, i) => {
    skillNameNodes[i] = new SkillNameNode(skillNode);
  });

  requestAnimationFrame(canvasFrame);
}

function canvasFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fall animation calculation
  skillNameNodes.forEach(skillNode => skillNode.fall());

  return isActive && requestAnimationFrame(canvasFrame);
}

function drawCanvasLine(item, xTo, yTo) {
  const {
    left: centerLeft,
    top: centerTop
  } = centerItem.getBoundingClientRect();
  const centerX = centerLeft + centerItem.clientWidth / 2;
  const centerY = centerTop + centerItem.clientHeight / 2;

  const { left, top } = item.getBoundingClientRect();
  let x = left + item.clientWidth / 2 + xTo;
  let y = top + item.clientHeight / 2 + yTo;
  drawLine(centerX, centerY, x, y);
}

function drawLine(xFrom, yFrom, xTo, yTo) {
  ctx.beginPath();
  ctx.lineWidth = '1.5';
  ctx.strokeStyle = 'black';
  ctx.moveTo(xFrom, yFrom);
  ctx.lineTo(xTo, yTo);
  ctx.stroke();
}

const float_Gmin = 0.1;
const float_Gmax = 0.15;
const float_ampRange = 0.25;

class SkillNameNode {
  constructor(node) {
    this.node = node;
  }
  gInvert = false;
  speed = 1.3;
  xOff = 0;
  yOff = 0;

  // float on X
  float_x = 0;
  float_xSpeed = 0.35 * (Math.random() < 0.5 ? 1 : -1);
  float_xG = Math.random() * float_Gmin + float_Gmax;
  float_xGInvert = this.float_xSpeed < 0 ? 1 : -1;
  // float on Y
  float_y = 0;
  float_ySpeed = 0.35 * (Math.random() < 0.5 ? 1 : -1);
  float_yG = Math.random() * float_Gmin + float_Gmax;
  float_yGInvert = this.float_ySpeed < 0 ? 1 : -1;

  fall() {
    let {
      float_x,
      float_xSpeed,
      float_xG,
      float_xGInvert,
      float_y,
      float_ySpeed,
      float_yG,
      float_yGInvert
    } = this;
    // X
    this.float_x += float_xSpeed;
    this.float_xSpeed += (float_xG / 4) * float_xGInvert; // add a third of xG to Speed
    if (
      (float_xGInvert > 0 && float_x > 0) ||
      (float_xGInvert < 0 && float_x < 0)
    ) {
      // inver yG when X surpasses its staring position (0)
      this.float_xSpeed = float_ampRange * float_xGInvert;
      this.float_xGInvert *= -1; // invert G
      this.float_xG = Math.random() * float_Gmin + float_Gmax; // assign new xG
    }
    // Y
    this.float_y += float_ySpeed;
    this.float_ySpeed += (float_yG / 4) * float_yGInvert; // add a third of yG to Speed
    if (
      (float_yGInvert > 0 && float_y > 0) ||
      (float_yGInvert < 0 && float_y < 0)
    ) {
      // inver yG when Y surpasses its staring position (0)
      this.float_ySpeed = float_ampRange * float_yGInvert;
      this.float_yGInvert *= -1; // invert G
      this.float_yG = Math.random() * float_Gmin + float_Gmax; // assign new yG
    }
    this.draw();
  }

  draw() {
    const { float_x: x, float_y: y } = this;
    this.node.style.transform = `translate(${x}px, ${y}px)`;
    // Draw each line
    drawCanvasLine(this.node, x, y);
  }
}
