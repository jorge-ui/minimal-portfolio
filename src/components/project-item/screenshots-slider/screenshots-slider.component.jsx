import React, { useState } from 'react';
import './screenshots-slider.styles.scss';
// Modules
import usePrevious from '../../../utils/usePrevious';
import { useTransition, animated } from 'react-spring';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const ScreenshotsSlider = ({
  screenshots: { desktop, mobile },
  setFullScreenShot,
  isFullScreenShot
}) => {
  const [viewMobile, setViewMobile] = useState(false);
  const images = viewMobile ? mobile : desktop;
  const [index, setIndex] = useState(images.length * 10000);

  const prevIndex = usePrevious(index);
  const isNextSlide = prevIndex < index;

  const transitionImages = useTransition(images[index % images.length], null, {
    initial: {
      opacity: 1,
      transform: 'translateX(0px)'
    },
    from: isNextSlide ? rightPosHidden : leftPosHidden,
    enter: centerPosShown,
    leave: isNextSlide ? leftPosHidden : rightPosHidden,
    config: {
      mass: 1.3,
      clamp: true
    }
  });

  const transitionDeviceView = useTransition(viewMobile, null, {
    initial: {
      transform: 'rotateY(0deg)'
    },
    from: {
      transform: 'rotateY(-180deg)'
    },
    enter: {
      transform: 'rotateY(0deg)'
    },
    leave: {
      transform: 'rotateY(180deg)'
    }
  });

  const nextSlide = () => setIndex(index + 1);
  const previousSlide = () => setIndex(index - 1);

  return (
    <div className="screenshots-slider">
      <div className="screenshots-container" is-mobile={String(viewMobile)}>
        <div className="screenshot-item-wraper">
          {transitionImages.map(({ item, key, props }) => (
            <animated.img
              className="screenshot-item"
              style={props}
              src={item}
              key={key}
              alt="screenshot"
            />
          ))}
          <div className="arrows">
            <div className="left-arrow" onClick={previousSlide}>
              <Icon icon="chevron-left" />
            </div>
            <div
              className="zoom-in"
              onClick={() => setFullScreenShot(!isFullScreenShot)}
              is-zoomed={String(isFullScreenShot)}
              title={isFullScreenShot ? 'zoom out' : 'zoom in'}
            />
            <div className="right-arrow" onClick={nextSlide}>
              <Icon icon="chevron-right" />
            </div>
          </div>
        </div>
      </div>
      <div className="device-toggler">
        <div className="device-icons">
          <div
            className="device-icon"
            toggled={String(!viewMobile)}
            onClick={() => setViewMobile(false)}
          >
            <Icon icon="desktop" />
          </div>
          <div
            className="device-icon"
            toggled={String(viewMobile)}
            onClick={() => setViewMobile(true)}
          >
            <Icon icon="mobile-alt" />
          </div>
          <div className="device-selected" mobile={String(viewMobile)} />
        </div>
      </div>
    </div>
  );
};

export default ScreenshotsSlider;

const rightPosHidden = {
  opacity: 0,
  transform: 'translateX(200px)'
};

const centerPosShown = {
  opacity: 1,
  transform: 'translateX(0px)'
};

const leftPosHidden = {
  opacity: 0,
  transform: 'translateX(-200px)'
};
