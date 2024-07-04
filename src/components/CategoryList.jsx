// import React, { useRef, useState, useEffect } from 'react';
// import styled, { css, keyframes } from 'styled-components';
// import './../../public/icons.css';

// import {CategoryListIconsClasses} from './../require.js'


// const Container = styled.div`
//   display: flex;
//   align-items: center;
//   position: relative;
//   margin: 1rem;
// `;

// const ScrollContainer = styled.div`
//   display: flex;
//   overflow-x: auto;
//   scroll-behavior: smooth;
//   padding: 1rem 0;

//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;

// const CategoryItem = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin: 0 10px;
//   cursor: pointer;
//   white-space: nowrap;
//   padding-bottom: 0.5rem;
//   border-bottom: ${(props) => (props.active ? '2px solid black' : '2px solid transparent')};
//   &:hover {
//     border-bottom: ${(props) => (props.active ? '2px solid black' : '2px solid lightgray')};
//   }
// `;

// const Icon = styled.div`
//   font-size: 1.5rem;
//   width: 2.5rem;
//   height:2.5rem;
//   font-size: 2.4em;
// `;

// const scaleAnimation = keyframes`
//   0% {
//     transform: scale(1);
//   }
//   50% {
//     transform: scale(0.89);
//   }
//   100%{
//     transform: scale(1);
//   }
// `;

// const Label = styled.div`
//   font-size: 0.9rem;
//   color: #444;
//   ${({ animate }) =>
//     animate &&
//     css`
//       animation: ${scaleAnimation} 0.6s forwards;
//     `}
// `;

// const ScrollButton = styled.button`
//   position: absolute;
//   top: 50%;
//   width: 35px;
//   height: 35px;
//   transform: translateY(-50%);
//   background: rgba(250, 250, 250, 0.9);
//   border: none;
//   cursor: pointer;
//   font-size: 1.5rem;
//   padding: 0.25rem;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: all 0.3s;
//   color: #1e1e1e;
//   font-size: 24px;
//   z-index: 1;

//   &:hover {
//     background: rgba(255, 255, 255, 1);
//     color: #000;
//   }

//   ${(props) => props.left && `left: -20px;`}
//   ${(props) => props.right && `right: -20px;`}
// `;

// const Gradient = styled.div`
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   width: 50px;
//   pointer-events: none;

//   ${(props) => props.left && css`
//     left: 0;
//     background: linear-gradient(to right, white, transparent);
//   `}

//   ${(props) => props.right && css`
//     right: 0;
//     background: linear-gradient(to left, white, transparent);
//   `}
// `;

// const CategoryList = () => {
//   const scrollRef = useRef(null);
//   const [activeCategory, setActiveCategory] = useState(0);
//   const [atStart, setAtStart] = useState(true);
//   const [atEnd, setAtEnd] = useState(false);

//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       const scrollAmount = direction === 'left' ? -150 : 150;
//       scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   const checkScrollPosition = () => {
//     if (scrollRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
//       setAtStart(scrollLeft === 0);
//       setAtEnd(scrollLeft + clientWidth >= scrollWidth);
//     }
//   };

//   useEffect(() => {
//     checkScrollPosition();
//     const handleScroll = () => checkScrollPosition();
//     const container = scrollRef.current;
//     if (container) {
//       container.addEventListener('scroll', handleScroll);
//     }
//     return () => {
//       if (container) {
//         container.removeEventListener('scroll', handleScroll);
//       }
//     };
//   }, []);

//   return (
//     <Container>
//       {!atStart && (
//         <Gradient left />
//       )}
//       {!atStart && (
//         <ScrollButton className="center" left onClick={() => scroll('left')}>
//           <i className="ico arrow_left_ico"></i>
//         </ScrollButton>
//       )}
//       <ScrollContainer ref={scrollRef}>
//         {CategoryListIconsClasses.map((category, index) => (
//           <CategoryItem
//             key={index}
//             active={activeCategory === index}
//             onClick={() => setActiveCategory(index)}
//           >
//             <Icon className='center'><i className={`ico ${category.icon} square2em`}/></Icon>
//             <Label animate={activeCategory === index}>
//               {category.label}
//             </Label>
//           </CategoryItem>
//         ))}
//       </ScrollContainer>
//       {!atEnd && (
//         <Gradient right />
//       )}
//       {!atEnd && (
//         <ScrollButton className="center" right onClick={() => scroll('right')}>
//           <i className="ico arrow_right_ico"></i>
//         </ScrollButton>
//       )}
//     </Container>
//   );
// };

// export default CategoryList;












import React, { useRef, useState, useEffect } from 'react';
import styles from './CategoryList.module.css';
import './../../public/icons.css';

import { CategoryListIconsClasses } from './../require.js';

const CategoryList = () => {
  const scrollRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      setScrollTop(currentScrollTop);
    };

    

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setAtStart(scrollLeft === 0);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const handleScroll = () => checkScrollPosition();
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className={`${styles.container} sticky zi999 ${scrollTop === 0 ?'top25vh':'top13vh'}`}>
      {!atStart && <div className={`${styles.gradient} ${styles.gradientLeft}`} />}
      {!atStart && (
        <button className={`${styles.scrollButton} ${styles.scrollButtonLeft}`} onClick={() => scroll('left')}>
          <i className="ico arrow_left_ico"></i>
        </button>
      )}
      <div className={styles.scrollContainer} ref={scrollRef}>
        {CategoryListIconsClasses.map((category, index) => (
          <div
            key={index}
            className={`${styles.categoryItem} ${activeCategory === index ? styles.categoryItemActive : ''}`}
            onClick={() => setActiveCategory(index)}
          >
            <div className={`${styles.icon} ${activeCategory === index ? styles.iconActive : styles.iconInactive}`}>
              <i className={`ico ${category.icon} `} />
            </div>
            <div
              className={`${styles.label} ${activeCategory === index ? styles.labelActive : ''} ${
                activeCategory === index ? styles.labelAnimate : ''
              }`}
            >
              {category.label}
            </div>
          </div>
        ))}
      </div>
      {!atEnd && <div className={`${styles.gradient} ${styles.gradientRight}`} />}
      {!atEnd && (
        <button className={`${styles.scrollButton} ${styles.scrollButtonRight}`} onClick={() => scroll('right')}>
          <i className="ico arrow_right_ico"></i>
        </button>
      )}
    </div>
  );
};

export default CategoryList;
