import { FC, useEffect, useState } from 'react'
import { requestArticles, toggleArticle } from '../../../redux/actions/articlesActions'
import { cancellPendingRequests } from '../../../axios/requestStore'
import { useExchangeRates } from '../../../utilities/js/hooks'
import { toCapital } from '../../../utilities/js/utils'
import { RootState } from '../../../redux/reducers/rootReducer'
import { Category } from '../../../redux/types/ReducersTypes'
import { useDispatch, useSelector } from 'react-redux'
import PostPlaceholder from '../../UI/PostPlaceholder/PostPlaceholder'
import Search from '../../Search/Search'
import Grid from '../../Grid/Grid'
import meme from './meme.gif'
import './Feed.scss'
import RatesBar from '../Rates/RatesBar'

export const categoriesList: Category[] = [...Object.values(Category)]

const Feed: FC = () => {
  const [category, setCategory] = useState<Category>(Category.ALL)
  const [navigation, setNavigation] = useState<boolean>(false)
  const { currency, rate } = useExchangeRates()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state: RootState) => state.profile.isAuth)
  const articles = useSelector((state: RootState) => state.articles.articles)
  const loading = useSelector((state: RootState) => state.articles.loading)
  const error = useSelector((state: RootState) => state.articles.error)

  const toggleNavigation = () => {
    setNavigation((navigation) => !navigation)
  }

  const changeCategory = (category: Category): void => {
    dispatch(requestArticles(category))
    setCategory(category)
  }

  const onSearchSubmit = (keyword: string) => {
    const encodedKeyword = encodeURIComponent(keyword.toString())
    dispatch(requestArticles(Category.ALL, encodedKeyword))
    setCategory(Category.ALL)
  }

  useEffect(() => {
    dispatch(requestArticles())
    return () => cancellPendingRequests()
  }, [dispatch])

  return (
    <div className="Feed">
      <div className="Feed__header">
        <div className="Feed__top">
          <h1 className="Feed__main-title">Latest news</h1>
          <div
            className={navigation ? 'Feed__btn active' : 'Feed__btn'}
            onClick={toggleNavigation}
            data-testid="burger"
          >
            <span className="burger"> </span>
          </div>
          <div className="Feed__info">
            <div className="Feed__currency">
              <div className="Feed__currency__expander">Currency</div>
              <div className="Feed__currency__wrapper">
                <span className="Feed__currency__name">{currency} / EUR </span>
                <span className="Feed__currency__rate">{rate}</span>
              </div>
            </div>
            <RatesBar />
          </div>
        </div>
        <div className={navigation ? 'Feed__nav active' : 'Feed__nav'}>
          <ul className="Feed__categories_wrapper">
            {categoriesList.map((categoryItem: Category, index: number) => (
              <li
                className={categoryItem === category ? 'Feed__category active' : 'Feed__category'}
                key={index}
              >
                <button onClick={() => changeCategory(categoryItem)}>
                  {toCapital(categoryItem)}
                </button>
              </li>
            ))}
          </ul>
          <Search handleSubmit={onSearchSubmit} />
        </div>
      </div>
      <div className="Feed__wrapper container-fluid">
        <div className="Feed__content">
          {loading ? (
            <Grid items={Array(8).fill(<PostPlaceholder />)} />
          ) : articles ? (
            <Grid showButtons={isAuthenticated} items={articles} onSave={toggleArticle} />
          ) : (
            error && (
              <div className="Feed__errorscreen">
                <span data-testid="error" className="Feed__error">
                  {error}
                </span>
                <img src={meme} alt="meme" style={{ transform: 'translateX(40px)' }} />
              </div>
            )
          )}
        </div>
        <div className="Feed__footer">
          <span>
            Powered by{' '}
            <a href="https://currentsapi.services/en" target="_blank" rel="noopener noreferrer">
              Currentsapi
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Feed
