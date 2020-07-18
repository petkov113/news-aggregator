import React, { FC, useEffect, useState } from 'react'
import {
  requestSaved,
  toggleArticle,
  saveComment,
  getComments,
} from '../../../redux/actions/articlesActions'
import { PropsTypes, MapStateTypes, MapDispatchTypes } from './SavedTypes'
import { savedVariants } from '../../../utilities/variants'
import { RootState } from '../../../redux/reducers/rootReducer'
import { Article } from '../../../redux/reducers/ReducersTypes'
import { connect } from 'react-redux'
import { motion } from 'framer-motion'
import SmallCard from '../../SmallCard/SmallCard'
import Comments from '../../Comments/Comments'
import './Saved.scss'
import SocialButtons from '../../SocialButtons/SocialButtons'

const Saved: FC<PropsTypes> = ({
  loading,
  requestSaved,
  articles,
  toggleArticle,
  comments,
  saveComment,
  getComments,
}) => {
  useEffect(() => {
    requestSaved()
  }, [requestSaved])

  const [activeArticle, setActiveArticle] = useState<null | Article>(null)

  const handleRead = (id: string) => {
    const article = articles!.find((el) => el.id === id)
    setActiveArticle(article!)
    getComments(article!.id)
  }

  const handleDelete = (id: Article['id']) => {
    const article = articles!.find((el) => el.id === id)
    toggleArticle(article!, false)
  }

  return (
    <motion.div className='Saved' variants={savedVariants} initial='hidden' animate='visible'>
      {articles && articles.length > 0 ? (
        <div className='Saved__cards'>
          {articles.map((article) => (
            <SmallCard {...article} key={article.id} onDelete={handleDelete} onClick={handleRead} />
          ))}
        </div>
      ) : (
        <span className='Saved__message'>You haven't saved anything yet</span>
      )}
      {activeArticle && articles && articles.length > 0 && (
        <div className='Saved__reader'>
          <div
            className='Saved__image'
            style={{
              backgroundImage:
                'linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,1)),' +
                `url(${activeArticle.urlToImage})`,
            }}>
            <h1 className='Saved__title'>{activeArticle.title}</h1>
            <SocialButtons url={activeArticle.url} />
          </div>
          <div className='Saved__info'>
            <h2 className='Saved__description'>{activeArticle.description}</h2>
            <span className='Saved__source'>{activeArticle.source.name}</span>
            <a href={activeArticle.url} target='blank'>
              <i className='fas fa-external-link-alt' title='Read the article' />
            </a>
            <div className="Saved__comments">
              <i className="fas fa-comment" /><span>Comments</span>
            </div>
            <Comments
              comments={comments}
              saveComment={(message) => saveComment(message, activeArticle.id)}
              loading={loading}
            />
          </div>
        </div>
      )}
    </motion.div>
  )
}

const mapStateToProps = (state: RootState): MapStateTypes => ({
  loading: state.articles.loading,
  articles: state.articles.saved,
  error: state.articles.error,
  comments: state.articles.comments,
})

const mapDispatchToProps: MapDispatchTypes = {
  requestSaved,
  toggleArticle,
  saveComment,
  getComments,
}

export default connect<MapStateTypes, MapDispatchTypes, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(Saved)
