import { useState, useEffect } from 'preact/hooks';

/**
 * props:
 *    target   : (required) Target Value to render 
 *    initial  : (required) Initial Value
 *    duration : (optional) 300 (ms)
 *    interval : (optional) 20 (ms)
 *    style : (optional) style settings
 */
const AnimationCounter = props => {
  const initial = props.initial;
  const target  = props.target;
  const duration = props.duration || 500; // ms
  const interval = props.interval || 20; // ms
  const isUp   = initial <= target;
  const [value, setValue] = useState(initial);

  const diff   = target - initial;
  const steps  = Math.ceil(duration / interval);
  const delta  = Math.max(1, Math.ceil(diff / steps));

  useEffect(() => {
    const timer = setInterval(() => {
      const next = value + delta;
      if (isUp && next < target || !isUp && next > target) {
        setValue(next)
      } else {
        setValue(target)
        clearInterval(timer);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span style={{...props.style}}>
      {value}
    </span>
  );
};

export default AnimationCounter;
