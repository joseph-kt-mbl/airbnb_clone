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
