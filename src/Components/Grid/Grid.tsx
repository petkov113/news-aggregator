import React, { FC } from 'react';
import Card from '../Card/Card';
import { Article } from '../../redux/reducers/ReducersTypes';
import PostPlaceholder from '../UI/PostPlaceholder/PostPlaceholder';

type GridTypes = {
  items: Article[] | typeof PostPlaceholder[];
  showButtons?: boolean
};

const isArticlesArray = (article: any): article is Article[] => {
  return typeof article?.[0]?.title === 'string';
};

const Grid: FC<GridTypes> = ({ items, showButtons }) => {
  return (
    <div className='row'>
      {isArticlesArray(items)
        ? items.map((item, index) => (
            <div key={index} className='col-12 col-md-6 col-lg-4 col-xl-3'>
              <Card {...item} showButtons={showButtons} />
            </div>
          ))
        : items.map((item, index) => (
            <div key={index} className='col-12 col-md-6 col-lg-4 col-xl-3'>
              <PostPlaceholder />
            </div>
          ))}
    </div>
  );
};

export default Grid;
