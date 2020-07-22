import React, { FC, useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/reducers/rootReducer'
import { PropsTypes, MapStateTypes, MapDispatchTypes } from './FeedTypes'
import { requestArticles, toggleArticle } from '../../../redux/actions/articlesActions'
import { routerVariants } from '../../../utilities/variants'
import { Category } from '../../../redux/reducers/ReducersTypes'
import { motion } from 'framer-motion'
import PostPlaceholder from '../../UI/PostPlaceholder/PostPlaceholder'
import Search from '../../Search/Search'
import Grid from '../../Grid/Grid'
import './Feed.scss'

export const categoriesList: Category[] = [
  'all',
  'business',
  'entertainment',
  'health',
  'science',
  'sports',
]

const Feed: FC<PropsTypes> = ({
  articles,
  loading,
  requestArticles,
  error,
  isAuthenticated,
  toggleArticle,
}) => {
  useEffect(() => {
    requestArticles()
  }, [requestArticles])

  const [category, setCategory] = useState<Category>('all')
  const [navigation, setNavigation] = useState<boolean>(false)

  const toggleNavigation = () => {
    setNavigation((navigation) => !navigation)
  }

  const changeCategory = (category: Category): void => {
    requestArticles(category)
    setCategory(category)
  }

  const onSearchSubmit = (keyword: string) => {
    const encodedKeyword = encodeURIComponent(keyword.toString())
    requestArticles('all', encodedKeyword)
    setCategory('all')
  }

  const handleFollow = useCallback(() => {
    console.log('hello')
  }, [])

  const toCapital = (el: string) => {
    return el.replace(/^\w/, (l) => l.toUpperCase())
  }

  const placeholders = Array(8).fill(<PostPlaceholder />)

  return (
    <motion.main
      variants={routerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='Feed'>
      <div className='Feed__header'>
        <h1 className='Feed__main-title'>Top News</h1>
        <div className={navigation ? 'Feed__btn active' : 'Feed__btn'} onClick={toggleNavigation}>
          <span className='burger'> </span>
        </div>
        <div className={navigation ? 'Feed__nav active' : 'Feed__nav'}>
          <ul className='Feed__categories_wrapper'>
            {categoriesList.map((categoryItem: Category, index: number) => (
              <li
                className={categoryItem === category ? 'Feed__category active' : 'Feed__category'}
                key={index}>
                <button onClick={() => changeCategory(categoryItem)}>
                  {toCapital(categoryItem)}
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
            <Grid
              showButtons={isAuthenticated}
              items={articles}
              onSave={toggleArticle}
              onFollow={handleFollow}
            />
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
    </motion.main>
  )
}

const mapState = (state: RootState): MapStateTypes => ({
  loading: state.articles.loading,
  articles: state.articles.articles,
  error: state.articles.error,
  isAuthenticated: state.profile.isAuth,
  savedArticles: state.articles.saved,
})

const mapDispatch: MapDispatchTypes = {
  requestArticles,
  toggleArticle,
}

export default connect<MapStateTypes, MapDispatchTypes, {}, RootState>(mapState, mapDispatch)(Feed)
