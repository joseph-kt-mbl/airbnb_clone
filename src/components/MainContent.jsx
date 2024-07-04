import React from 'react';
import styled from 'styled-components';
import Footer from './Footer.jsx';
import MarginTop from './MarginTop.jsx';
import CategoryList from './CategoryList.jsx';
import CardsManager from './CardsManager.jsx';
import { categories, categoriesItems, data, footer_cols } from './../require.js';

const CardsSection = styled.section`
  display: flex;
  gap: .75rem;
  padding: 0 .5rem;
  border-radius: 0.35rem;
  margin: 1rem 0.25rem;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const Main = styled.main`
  width: 100%;
`;

const MainContent = () => {
  return (
    <>
      <MarginTop />
      <CategoryList />
      <Main>
        <CardsSection>
          <CardsManager data={data} />
        </CardsSection>
        <Footer footer_cols={footer_cols} categories={categories} categoriesItems={categoriesItems} />
      </Main>
    </>
  );
};

export default MainContent;
