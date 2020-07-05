import React, { FC } from 'react';
import PostPlaceholder from '../UI/PostPlaceholder/PostPlaceholder';
import { Article } from '../../redux/reducers/ReducersTypes';
import Card from '../Card/Card';

export type GridProps = {
  items: Article[] | typeof PostPlaceholder[];
  showButtons?: boolean;
};

const isArticlesArray = (article: any): article is Article[] => {
  return typeof article?.[0]?.title === 'string';
};

const Grid: FC<GridProps> = ({ items, showButtons }) => {
  return (
    <div className='row'>
      {isArticlesArray(items)
        ? items.map((item) => (
            <div key={item.publishedAt} className='col-12 col-md-6 col-lg-4 col-xl-3'>
              <Card {...item} showButtons={showButtons} />
            </div>
          ))
        : items.map(() => (
            <div key={Math.random()} className='col-12 col-md-6 col-lg-4 col-xl-3'>
              <PostPlaceholder />
            </div>
          ))}
    </div>
  );
};

export default Grid;
