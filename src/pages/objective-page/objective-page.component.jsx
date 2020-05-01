import React from 'react';
import './objective-page.styles.scss';
// Modules
import { useTransition, animated } from 'react-spring';
import { easeOutQuart } from '../../utils/easingFuctions';

const ObjectivePage = () => {
  const jsx = (
    <div>
      <h2>Objective</h2>
      <p>
        Ever since I printed "hello world", I knew what I wanted to do :) Building and designing user
        interfaces is fun, and a challenge, I care about UI/UX, <b>my goal is to create beautiful experiences</b>,
        or to improve on any existing projects out there.
      </p>
      <blockquote>
        I look forward to building great experiences together.
      </blockquote>
    </div>
  );
  const transition = useTransition(jsx.props.children, (item, i) => i, transitionConfig);

  return (
    <div className="objective-page">
      {transition.map(({ item: { type, props }, key, props: spring }) => {
        const Element = animated[type];
        return (
          <Element key={key} style={spring}>
            {props.children}
          </Element>
        );
      })}
    </div>
  );
};

const transitionConfig = {
  from: {
    opacity: 0,
    transform: 'translateX(350px)'
  },
  enter: {
    opacity: 1,
    transform: 'translateX(0px)'
  },
  trail: 400,
  config: {
    duration: 600,
    easing: easeOutQuart
  }
};

export default ObjectivePage;
