import React, { FC, useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';
import { PropsTypes, MapStateTypes, MapDispatchTypes } from './FeedTypes';
import { requestArticles } from '../../redux/actions/feedActions';
import { Category } from '../../redux/reducers/ReducersTypes';
import Search from '../UI/Search/Search';
import Loader from '../UI/Loader/Loader';
import Grid from '../Grid/Grid';
import './Feed.scss';

const categoriesList: Category[] = [
  'all',
  'business',
  'entertainment',
  'health',
  'science',
  'sports',
];

const Feed: FC<PropsTypes> = ({ articles, loading, requestArticles, error }) => {
  useEffect(() => {
    requestArticles();
  }, [requestArticles]);

  const [category, setCategory] = useState<Category>('all');
  const [keyword, setKeyord] = useState<string>('');

  const changeCategory = (category: Category): void => {
    requestArticles(category);
    setCategory(category);
    setKeyord('');
  };

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyord(event.target.value);
  };

  const onSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (keyword.trim()) {
      const encodedKeyword = encodeURIComponent(keyword.toString());
      requestArticles('all', encodedKeyword);
      setCategory('all');
    }
  };

  return (
    <main className='Feed'>
      <div className='Feed__header'>
        <h1>Top News</h1>
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
          <Search onChange={onSearchChange} onSubmit={onSearchSubmit} value={keyword} />
        </div>
      </div>
      <div className='Feed__wrapper container-fluid'>
        <div className='Feed__content'>
          {loading ? (
            <Loader />
          ) : articles ? (
            <Grid items={articles} />
          ) : (
            error && <span className='Feed__error'>{error}</span>
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
});

const mapDispatch: MapDispatchTypes = {
  requestArticles,
};

export default connect<MapStateTypes, MapDispatchTypes, {}, RootState>(mapState, mapDispatch)(Feed);
