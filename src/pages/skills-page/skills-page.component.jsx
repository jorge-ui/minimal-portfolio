import React, { useEffect, useState } from 'react';
import './skills-page.styles.scss';
//Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSkillsItems } from '../../redux/skills/skills.selectors';
const fullCircle = Math.PI * 2;
let positionIsCalculated = false;
let positionsArray = [];

const SkillsPage = ({ skillsItems }) => {
  const { length } = skillsItems;
  const radius = window.innerWidth * 0.2;

  if (positionsArray.length === 0) {
    skillsItems.forEach((skill, index) => {
      let theta = fullCircle * (index / length);
      let x = Math.cos(theta) * radius;
      let y = Math.sin(theta) * radius;
      let multiplier = Boolean(index % 2 === 0)
        ? 0.6 + Math.random() * 0.4
        : 0.9 + Math.random() * 0.4;
      positionsArray.push([x, y, multiplier]);
    });
    positionIsCalculated = true;
  }

  useEffect(
    () => () => {
      positionsArray = [];
      positionIsCalculated = false;
    },
    []
  );

  const positionedSkills = skillsItems.map((skill, index) => {
    let theta = fullCircle * (index / length);
    let x = Math.cos(theta) * radius;
    let y = Math.sin(theta) * radius;
    let multiplier = positionIsCalculated ? positionsArray[index][2] : 0;
    return {
      skillName: skill,
      positioned: [x * multiplier, y * multiplier],
      index
    };
  });

  return (
    <div className="skills-page">
      {positionedSkills.map(({ skillName, positioned }, i) => {
        let style = { left: positioned[0], top: positioned[1] };
        return (
          <div className="skill-item" key={i} style={style}>
            {skillName}
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  skillsItems: selectSkillsItems
});

export default connect(mapStateToProps)(SkillsPage);
