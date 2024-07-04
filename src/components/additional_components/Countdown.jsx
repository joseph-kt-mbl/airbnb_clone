import React, { useState, useEffect, useRef } from 'react';
import './Countdown.css';

function Countdown({ initialTime, ParentWidth }) {
  const [time, setTime] = useState(initialTime);
  const prevTimeRef = useRef(initialTime);

  const flip = (flipCard, newNumber) => {
    const top = flipCard.querySelector('.top');
    const bottom = flipCard.querySelector('.bottom');
    const startNumber = flipCard.querySelector('.top').textContent;

    if (newNumber === startNumber) return;

    top.textContent = startNumber;
    bottom.textContent = startNumber;
    flipCard.dataset.currentNumber = newNumber;
    flipCard.dataset.nextNumber = newNumber;

    flipCard.addEventListener('animationstart', () => {
      top.textContent = newNumber;
    });

    flipCard.addEventListener('animationend', () => {
      bottom.textContent = newNumber;
      flipCard.classList.remove('flip');
    });

    flipCard.classList.add('flip');
  };

  const flipNecessaryCards = (currentTime) => {
    const prevTime = prevTimeRef.current;
    
    const prevSeconds = Math.floor(prevTime % 60);
    const prevMinutes = Math.floor(prevTime / 60) % 60;
    const prevHours = Math.floor(prevTime / 3600);

    const currentSeconds = Math.floor(currentTime % 60);
    const currentMinutes = Math.floor(currentTime / 60) % 60;
    const currentHours = Math.floor(currentTime / 3600);

    if (Math.floor(prevHours / 10) !== Math.floor(currentHours / 10)) {
      flip(document.querySelector("[data-hours-tens]"), Math.floor(currentHours / 10));
    }
    if (prevHours % 10 !== currentHours % 10) {
      flip(document.querySelector("[data-hours-ones]"), currentHours % 10);
    }
    if (Math.floor(prevMinutes / 10) !== Math.floor(currentMinutes / 10)) {
      flip(document.querySelector("[data-minutes-tens]"), Math.floor(currentMinutes / 10));
    }
    if (prevMinutes % 10 !== currentMinutes % 10) {
      flip(document.querySelector("[data-minutes-ones]"), currentMinutes % 10);
    }
    if (Math.floor(prevSeconds / 10) !== Math.floor(currentSeconds / 10)) {
      flip(document.querySelector("[data-seconds-tens]"), Math.floor(currentSeconds / 10));
    }
    if (prevSeconds % 10 !== currentSeconds % 10) {
      flip(document.querySelector("[data-seconds-ones]"), currentSeconds % 10);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    flipNecessaryCards(time);
    prevTimeRef.current = time;
  }, [time]);

  return (
    <div>
      <div className="countdown-container" style={{ top: `${ParentWidth / 2}px`, left: `${ParentWidth / 2}px` }}>
        <div className="countdown-cards">
          <div className='card-title'>Hours</div>
          <div className='card-container'>
            <div className="flip-card" data-hours-tens>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
            <div className="flip-card" data-hours-ones>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
          </div>
        </div>
        <div className="countdown-cards">
          <div className='card-title'>Minutes</div>
          <div className='card-container'>
            <div className="flip-card" data-minutes-tens>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
            <div className="flip-card" data-minutes-ones>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
          </div>
        </div>
        <div className="countdown-cards">
          <div className='card-title'>Seconds</div>
          <div className='card-container'>
            <div className="flip-card" data-seconds-tens>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
            <div className="flip-card" data-seconds-ones>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Countdown;
