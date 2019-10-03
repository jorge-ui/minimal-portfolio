import React, { useEffect } from 'react';
import './skills-page.styles.scss';
// Modules
import { animated, useTransition } from 'react-spring';
import { wait } from '../../utils/utilityFunctions';
// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSkillsItems } from '../../redux/skills/skills.selectors';
const fullCircle = Math.PI * 2;
let positionsArray = {};
const enterTrail = 60;
const enterDelay = 350;

// Canvas Stuff
let canvas, ctx, canvasItems;

const SkillsPage = ({ skillsItems }) => {
  useEffect(() => {
    startCanvas();
    return () => (positionsArray = {});
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
          {item.skillName}
        </animated.div>
      ))}
      <canvas
        className="skills-canvas"
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  skillsItems: selectSkillsItems
});

export default connect(mapStateToProps)(SkillsPage);

function initPositions(skillsItems) {
  const { length } = skillsItems;
  const radius = window.innerWidth * 0.2;

  skillsItems.forEach((skill, index) => {
    let theta = fullCircle * (index / length);
    let x = Math.cos(theta) * radius;
    let y = Math.sin(theta) * radius;
    let multiplier = Boolean(index % 2 === 0)
      ? 0.6 + Math.random() * 0.4
      : 0.9 + Math.random() * 0.4;
    positionsArray[index] = { x, y, multiplier };
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

function startCanvas(skillsItems) {
  canvas = document.querySelector('.skills-canvas');
  ctx = canvas.getContext('2d');
  canvasItems = document.querySelectorAll('.skill-item');
  requestAnimationFrame(canvasFrame);
}

function canvasFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvasItems.forEach(({ style: { left, top } }) => {
    let x = window.innerWidth / 2 + Number(left.slice(0, left.length - 2));
    let y = window.innerHeight / 2 + Number(top.slice(0, top.length - 2));
    drawLine(x, y);
  });

  requestAnimationFrame(canvasFrame);
}

function drawLine(xTo, yTo) {
  ctx.beginPath();
  ctx.lineWidth = '1.5';
  ctx.strokeStyle = 'black';
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  ctx.lineTo(xTo, yTo);
  ctx.stroke();
}
