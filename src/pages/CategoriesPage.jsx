import React from 'react'
import Static from '../component/Static'
import { useParams } from 'react-router-dom';

const CategoriesPage = () => {
  const { category } = useParams();
  return (
    <div>
     <Static title={category.toUpperCase()} title2={category} />
    </div>
  );
};

export default CategoriesPage
