import React ,{useEffect,useState,useRef} from "react";
import styled from "styled-components";

const LV = styled.div`
    position: absolute;
    padding: .35rem .75rem;
    border-radius:21px;
    background-color: #cacaca;
    color: black;
    top:.5rem;
    left:.5rem;
    z-index: 77;
`

const Live = () => (<LV>Live</LV>)


const CountdownDiv = styled.div`
    position: absolute;
    top:50%;
    left:50%;
    background-color: #fff;
    border-radius: 12px;
    padding: .5rem 1rem;
    transform: translate(-50%,-50%);
`
const Countdown = ({ initialTime }) => {
    const [time, setTime] = useState(initialTime);
    const timerRef = useRef(null);
  
    useEffect(() => {
      timerRef.current = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            clearInterval(timerRef.current);
            return 0;
          }
          return newTime;
        });
      }, 1000);
  
      return () => clearInterval(timerRef.current);
    }, []);
  
    const formatTime = (time) => {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };
  
    return (
      <CountdownDiv>
        {formatTime(time)}
      </CountdownDiv>
    );
  };

const Additional_Components = [
    Live,
    Countdown
]

export default Additional_Components;
