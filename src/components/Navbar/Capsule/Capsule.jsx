import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import './Capsule.css';

const CapsuleContainer = styled(motion.section)`
  display: flex;
  align-items: center;
  border-radius: 30px;
  background-color: #fff;
  border: 1px solid #dfdfdfee;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin: 0 1rem;
  position: absolute;
  left: 50%;
  gap: .15rem;
`;

const VerticalLine = styled.div`
  width: 1px;
  min-height: 1.5rem;
  background-color: #e1e1e1;
`;

const SearchButton = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-.5rem, -50%);
  border-radius: 50%;
  background-color: #F23869;
  color: #fff;
`;

const ClosedCapsuleContainer = ({ className }) =>{

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const WDTH = ['30%','30%','40%'];


    return(
    <CapsuleContainer 
      className={className}
      style={{
        width:'360px',
        minWidth:'280px',
        maxWidth:'320px'
      }}
      initial={{ y: 20, opacity: 0, translateX: `-${windowWidth < 900 ? 0 : 50}%` }}
      animate={{ y: 0, opacity: 1, width: '360px', translateX: `-${windowWidth < 900 ? 0 : 50}%` }}
      exit={{ y: 20, opacity: 0, translateX: `-${windowWidth < 900 ? 0 : 50}%` }}
      transition={{ duration: 0.5 }}
    >
      {['Anywhere', 'Any week', 'Add guests'].map((item, index) => (
        <React.Fragment key={index}>
          <div className={`capsule__button`}
          style={
            {
              width:WDTH[index]
            }
          }>
            <p className={`${index < 2 ? 'poppins-medium' : 'poppins-light'}`}>{item}</p>
          </div>
          {index < 2 && <VerticalLine />}
        </React.Fragment>
      ))}
      <SearchButton className="grid center">
        <i className="ico search_ico"></i>
      </SearchButton>
    </CapsuleContainer>
  )
};

const OpenedCapsuleContainer = ({ className }) => {

  return(
    <CapsuleContainer
      className={`${className}`}
      style={{
        width:`calc(100% - 4rem)`,
        minWidth:'600px',
        maxWidth:'750px'
      }}
      initial={{ y: -20, opacity: 0, translateX: '-50%', translateY: '-50%' }}
      animate={{ y: 0, opacity: 1, width: 'calc(100% - 4rem)', translateX: '-50%', translateY: '-50%' }}
      exit={{ y: -20, opacity: 0, translateX: '-50%', translateY: '-50%' }}
      transition={{ duration: 0.5 }}
    >
      {[
        { title: 'Where', subtitle: 'Search destinations' },
        { title: 'Check in', subtitle: 'Add dates' },
        { title: 'Check out', subtitle: 'Add dates' },
        { title: 'Who', subtitle: 'Add guests' }
      ].map((item, index) => (
        <React.Fragment key={index}>
          <div className={`capsule__button capsule__button__opened 
          ${index === 0 || index===3 ? `padleft2rem` : ''}`}
            style={index === 0 || index===3 ?{
              width:'35%',
              minWidth:'180px'
            }:{
              width:'15%',
              minWidth:'100px'
            }}
          >
            <p className="poppins-medium">{item.title}</p>
            <p className="poppins-light gray">{item.subtitle}</p>
          </div>
          {index < 3 && <VerticalLine className="min-h-2rem" />}
        </React.Fragment>
      ))}
      <SearchButton className="grid center square45">
        <i className="ico search_ico"></i>
      </SearchButton>
    </CapsuleContainer>
  )
};

const Capsule = ({ className }) => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      setScrollTop(currentScrollTop);
    };

    // Add the event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {scrollTop !== 0 ? (
        <ClosedCapsuleContainer className={className} key="closed" />
      ) : (
        <OpenedCapsuleContainer className={className} key="opened" />
      )}
    </AnimatePresence>
  );
};

export default Capsule;
