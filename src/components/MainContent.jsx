import styled from "styled-components";
import Card from './Card';
import Footer from './Footer.jsx';
import MarginTop from './MarginTop.jsx'
import { categories, categoriesItems, data, footer_cols } from './../require.js';


const Cards = styled.section`
  display: flex;
  gap: .75rem;
  padding: 0 .5rem;
  border-radius: 0.35rem;
  margin: 1rem 0.25rem;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;




function permuteImages(images) {
  let permutations = [];

  for (let i = 0; i < images.length; i++) {
    let permutedImages = [...images.slice(i), ...images.slice(0, i)];
    permutations.push(permutedImages);
  }

  return permutations;
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }



const Main = styled.main`
    width: 100%;
`

const MainContent = ()=>{
    const allPermutations = data.flatMap(card =>
        permuteImages(card.images).map((permutedImages, idx) => ({
          ...card,
          images: permutedImages,
          key: `${card.title}-${idx}`
        }))
      );
    
      const shuffledPermutations = shuffleArray(allPermutations); // Shuffle the permutations
      shuffledPermutations.length -= shuffledPermutations.length%4 

    return(
    <>
    <MarginTop/>
        <Main>
          

            <Cards>
            {shuffledPermutations.map((card, index) => (
              <Card key={card.key} images={card.images} title={card.title} subTitle={card.subTitle} hostedBy={card.hostedBy} />
            ))}
          </Cards>
          <Footer footer_cols={footer_cols} categories={categories} categoriesItems={categoriesItems} />

        </Main>
    </>
    )
}
export default MainContent;