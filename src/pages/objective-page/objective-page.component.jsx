import React from 'react';
import './objective-page.styles.scss';
// Modules
import { useTransition, animated } from 'react-spring';
import { easeOutQuart } from '../../utils/easingFuctions';

const ObjectivePage = () => {
  const jsx = (
    <div>
      <h2 key={1}>Objective</h2>
      <p key={2}>
        Hi, my name is Jorge Rivera and I enjoy building and designing user
        interfaces, I’ve built many projects in the past by now and I find
        myself always caring more and more about UI/UX, which is what I do best.
      </p>
      <p key={3}>
        <b>
          My mission is to utilize today’s latest web tools to provide the user
          with a pleasant and meaningful experience
        </b>
        , one that they will remember because it was special. Business and
        marketing are all about the visuals, for the most part. So a
        well-crafted and personalized web experience is precisely what I came to
        do.
      </p>
      <blockquote key={4}>
        I look forward to building great things together.
      </blockquote>
    </div>
  );
  const transition = useTransition(jsx.props.children, item => item.key, {
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
  });

  return (
    <div className="objective-page">
      {transition.map(({ item, key, props }) => {
        const Element = animated[item.type];
        return (
          <Element key={key} style={props}>
            {item.props.children}
          </Element>
        );
      })}
    </div>
  );
};

export default ObjectivePage;
