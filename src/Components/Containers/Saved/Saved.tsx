import React, { FC, useEffect, useState } from 'react'
import {
  requestSaved,
  toggleArticle,
  saveComment,
  getComments,
} from '../../../redux/actions/articlesActions'
import { PropsTypes, MapStateTypes, MapDispatchTypes } from './SavedTypes'
import { savedVariants, readerVariants } from '../../../utilities/variants'
import { RootState } from '../../../redux/reducers/rootReducer'
import { Article } from '../../../redux/reducers/ReducersTypes'
import { connect } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [reader, setReader] = useState(false) // for the mobile version

  const handleRead = (id: string) => {
    const article = articles!.find((el) => el.id === id) as Article
    setActiveArticle(article)
    getComments(article.id)
    setReader(true)
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
      <AnimatePresence>
        {activeArticle && articles && articles.length > 0 && reader && (
          <motion.div
            variants={readerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='Saved__reader active'
            key='reader'>
            <div
              className='Saved__image'
              style={{
                backgroundImage:
                  'linear-gradient(0deg, rgba(0,0,0,0.7047820104604341) 0%, rgba(255,255,255,0) 49%,' +
                  'rgba(0,0,0,0.755202178527661) 100%),' +
                  `url(${activeArticle.urlToImage})`,
              }}>
              <h1 className='Saved__title'>{activeArticle.title}</h1>
              <SocialButtons url={activeArticle.url} />
            </div>
            <div className='Saved__info'>
              <button className='Saved__closeBtn' onClick={() => setReader(false)}>
                <i className='fas fa-arrow-left' />
              </button>{' '}
              <h2 className='Saved__description'>{activeArticle.description}</h2>
              <span className='Saved__source'>{activeArticle.source.name}</span>
              <a href={activeArticle.url} target='blank'>
                <i className='fas fa-external-link-alt' title='Read the article' />
              </a>
              <div className='Saved__comments'>
                <i className='fas fa-comment' />
                <span>Comments</span>
              </div>
              <Comments
                comments={comments}
                saveComment={(message) => saveComment(message, activeArticle.id)}
                loading={loading}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
