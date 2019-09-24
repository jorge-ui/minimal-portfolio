import React, { useState } from 'react';
import './screenshots-slider.styles.scss';
// Modules
import usePrevious from '../../../utils/usePrevious';
import { useTransition, animated } from 'react-spring';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { easeOutCubic } from '../../../utils/easingFuctions';

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
    ...transitionConfig,
    from: isNextSlide ? rightPosHidden : leftPosHidden,
    leave: isNextSlide ? leftPosHidden : rightPosHidden
  });

  const nextSlide = () => setIndex(index + 1);
  const previousSlide = () => setIndex(index - 1);

  return (
    <div className="screenshots-slider">
      <div className="screenshots-container-wraper">
        <div
          className="screenshots-container"
          is-mobile={String(viewMobile)}
          is-fullscreen={String(isFullScreenShot)}
        >
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
              title="desktop"
            >
              <Icon icon="desktop" />
            </div>
            <div
              className="device-icon"
              toggled={String(viewMobile)}
              onClick={() => setViewMobile(true)}
              title="mobile"
            >
              <Icon icon="mobile-alt" />
            </div>
            <div className="device-selected" mobile={String(viewMobile)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenshotsSlider;

const rightPosHidden = {
  opacity: 0,
  transform: 'scaleX(1.5)',
  transformOrigin: 'center left'
};

const leftPosHidden = {
  opacity: 0,
  transform: 'scaleX(1.5)',
  transformOrigin: 'center right'
};

const transitionConfig = {
  initial: {
    opacity: 1,
    transform: 'translateX(0px)'
  },
  enter: {
    opacity: 1,
    transform: 'scaleX(1)'
  },
  config: {
    duration: 450,
    easing: easeOutCubic
  }
};
