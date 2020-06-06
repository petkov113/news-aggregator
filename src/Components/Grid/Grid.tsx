import React, { FC } from 'react';
import Card from '../Card/Card';
import { Article } from '../../redux/reducers/ReducersTypes';

type GridTypes = {
  items: Article[];
  showButtons: boolean
};

const Grid: FC<GridTypes> = ({ items, showButtons }) => {
  return (
    <div className='row'>
      {items.map((item, index) => (
        <div key={index} className='col-12 col-md-6 col-lg-4 col-xl-3'>
          <Card {...item} showButtons={showButtons} />
        </div>
      ))}
    </div>
  );
};

export default Grid;
