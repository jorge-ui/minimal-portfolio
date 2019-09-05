import React from 'react';
import './wheel-spinner.styles.scss';
import WheelItem from '../wheel-item/wheel-item.component';
import useWindowWidth from '../../utils/useWindowWidth';
import WheelTool from '../wheel-tool/wheel-tool.component';
import { useTransition } from 'react-spring';

const fullCircle = Math.PI * 2;

const WheelSpinner = ({ children, isTools }) => {
  const { length } = children;
  const windowWidth = useWindowWidth();
  const radius = windowWidth * 0.2;

  const positionedChild = children.map((child, index) => {
    let theta = fullCircle * (index / length);
    let x = Math.cos(theta) * radius;
    let y = Math.sin(theta) * radius;
    return { ...child, position: [x, y] };
  });

  const transitionTools = useTransition(
    positionedChild,
    positionedChild => positionedChild.id,
    {
      from: {
        opacity: -0.4,
        positioned: [0, 0]
      },
      enter: ({ position }) => ({
        opacity: 1,
        positioned: position
      }),
      trail: 75,
      config: {
        friction: 15,
        mass: 1.2
      }
    }
  );

  if (isTools) {
    return (
      <div className="wheel-spinner">
        {transitionTools.map(({ item, key, props }) => (
          <WheelTool
            key={key}
            {...item}
            position={props.positioned}
            props={props}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="wheel-spinner">
        {children.map((item, index, { length }) => {
          let theta = fullCircle * (index / length);
          let x = Math.cos(theta) * radius;
          let y = Math.sin(theta) * radius;
          return <WheelItem key={item.name + index} {...item} x={x} y={y} />;
        })}
      </div>
    );
  }
};

export default WheelSpinner;
