import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/reducers/rootReducer';
import { PropsTypes, MapStateTypes, MapDispatchTypes } from './FeedTypes';
import { requestArticles } from '../../../redux/actions/feedActions';
import { Category } from '../../../redux/reducers/ReducersTypes';
import PostPlaceholder from '../../UI/PostPlaceholder/PostPlaceholder';
import Search from '../../Search/Search';
import Grid from '../../Grid/Grid';
import './Feed.scss';

export const categoriesList: Category[] = [
  'all',
  'business',
  'entertainment',
  'health',
  'science',
  'sports',
];

const Feed: FC<PropsTypes> = ({ articles, loading, requestArticles, error, isAuthenticated }) => {
  useEffect(() => {
    requestArticles();
  }, [requestArticles]);

  const [category, setCategory] = useState<Category>('all');

  const changeCategory = (category: Category): void => {
    requestArticles(category);
    setCategory(category);
  };

  const onSearchSubmit = (keyword: string) => {
    const encodedKeyword = encodeURIComponent(keyword.toString());
    requestArticles('all', encodedKeyword);
    setCategory('all');
  };
  
  const placeholders = Array(8).fill(<PostPlaceholder />);

  return (
    <main className='Feed'>
      <div className='Feed__header'>
        <h1 className='Feed__main-title'>Top News</h1>
        <div className='Feed__nav'>
          <ul className='Feed__categories_wrapper'>
            {categoriesList.map((categoryItem: Category, index: number) => (
              <li
                className={categoryItem === category ? 'Feed__category active' : 'Feed__category'}
                key={index}>
                <button onClick={() => changeCategory(categoryItem)}>
                  {categoryItem.replace(/^\w/, (letter) => letter.toUpperCase())}
                </button>
              </li>
            ))}
          </ul>
          <Search handleSubmit={onSearchSubmit} />
        </div>
      </div>
      <div className='Feed__wrapper container-fluid'>
        <div className='Feed__content'>
          {loading ? (
            <Grid items={placeholders} />
          ) : articles ? (
            <Grid showButtons={isAuthenticated} items={articles} />
          ) : (
            error && (
              <span data-testid='error' className='Feed__error'>
                {error}
              </span>
            )
          )}
        </div>
        <div className='Feed__footer'>
          <span>
            Powered by{' '}
            <a href='http://newsapi.org' target='_blank' rel='noopener noreferrer'>
              newsapi.com
            </a>
          </span>
        </div>
      </div>
    </main>
  );
};

const mapState = (state: RootState): MapStateTypes => ({
  loading: state.feed.loading,
  articles: state.feed.articles,
  error: state.feed.error,
  isAuthenticated: state.profile.isAuth,
});

const mapDispatch: MapDispatchTypes = {
  requestArticles,
};

export default connect<MapStateTypes, MapDispatchTypes, {}, RootState>(mapState, mapDispatch)(Feed);
