import { FC, useEffect, useState } from 'react'
import { PropsTypes, MapStateTypes, MapDispatchTypes } from './FeedTypes'
import { requestArticles, toggleArticle } from '../../../redux/actions/articlesActions'
import { cancellPendingRequests } from '../../../axios/requestStore'
import { useExchangeRates } from '../../../utilities/js/hooks'
import { toCapital } from '../../../utilities/js/utils'
import { RootState } from '../../../redux/reducers/rootReducer'
import { Category } from '../../../redux/reducers/ReducersTypes'
import { connect } from 'react-redux'
import PostPlaceholder from '../../UI/PostPlaceholder/PostPlaceholder'
import Search from '../../Search/Search'
import Grid from '../../Grid/Grid'
import meme from './meme.gif'
import './Feed.scss'

export const categoriesList: Category[] = [...Object.values(Category)]
const placeholders = Array(8).fill(<PostPlaceholder />)

const Feed: FC<PropsTypes> = ({
  articles,
  loading,
  requestArticles,
  error,
  isAuthenticated,
  toggleArticle,
}) => {
  const [category, setCategory] = useState<Category>(Category.ALL)
  const [navigation, setNavigation] = useState<boolean>(false)
  const { currency, rate } = useExchangeRates()

  const toggleNavigation = () => {
    setNavigation((navigation) => !navigation)
  }

  const changeCategory = (category: Category): void => {
    requestArticles(category)
    setCategory(category)
  }

  const onSearchSubmit = (keyword: string) => {
    const encodedKeyword = encodeURIComponent(keyword.toString())
    requestArticles(Category.ALL, encodedKeyword)
    setCategory(Category.ALL)
  }

  useEffect(() => {
    requestArticles()
    return () => cancellPendingRequests()
  }, [requestArticles])

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
            {currency && (
              <div className="Feed__currency">
                <span className="Feed__currency-name">{currency} / EUR</span>
                <span className="Feed__currency-rate">{rate}</span>
              </div>
            )}
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
            <Grid items={placeholders} />
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
