import React, { useState, useEffect } from 'react';
import Card from './Card';
import Live from './additional_components/Live';
import Countdown from './additional_components/Countdown';
import { permuteImages, shuffleArray } from '../require';

const CardsManager = ({ data }) => {
  // Permute images for each card and shuffle the permutations
  const shuffledPermutations = shuffleArray(
    data.flatMap(card =>
      permuteImages(card.images).map((permutedImages, idx) => ({
        ...card,
        images: permutedImages,
        key: `${card.title}-${idx}`
      }))
    )
  );

  const [CardWidth, setCardWidth] = useState(270);

  useEffect(() => {
    const updateWidth = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth <= 665) {
        setCardWidth(250);
      } else if (currentWidth <= 785) {
        setCardWidth(300);
      } else if (currentWidth <= 955) {
        setCardWidth(350);
      } else {
        setCardWidth(270);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <>
      {shuffledPermutations.map((card, index) => (
        <Card key={card.key} images={card.images} title={card.title} subTitle={card.subTitle} hostedBy={card.hostedBy}>
          {index === 1 && <Live />}
          {index === 2 && <Countdown initialTime={120} ParentWidth={CardWidth} />}
          {/* Add more conditions for other components */}
        </Card>
      ))}
    </>
  );
};

export default CardsManager;
