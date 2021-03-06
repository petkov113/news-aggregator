import React, { FC, useEffect, useState } from 'react'
import {
  requestSaved,
  toggleArticle,
  saveComment,
  getComments,
} from '../../../redux/actions/articlesActions'
import { savedVariants, readerVariants } from '../../../utilities/js/variants'
import { motion, AnimatePresence } from 'framer-motion'
import { RootState } from '../../../redux/reducers/rootReducer'
import { Article } from '../../../redux/types/ReducersTypes'
import { useDispatch, useSelector } from 'react-redux'
import SmallCard from '../../SmallCard/SmallCard'
import Comments from '../../Comments/Comments'
import SocialButtons from '../../SocialButtons/SocialButtons'
import './Saved.scss'

const Saved: FC = () => {
  const dispatch = useDispatch()
  const [activeArticle, setActiveArticle] = useState<null | Article>(null)
  const [reader, setReader] = useState(false) // for the mobile version
  const articles = useSelector((state: RootState) => state.articles.saved)
  const comments = useSelector((state: RootState) => state.articles.comments)
  const loading = useSelector((state: RootState) => state.articles.loading)

  const handleRead = (id: string) => {
    const article = articles!.find((el) => el.id === id) as Article
    setActiveArticle(article)
    dispatch(getComments(article.id))
    setReader(true)
  }

  const handleDelete = (id: Article['id']) => {
    const article = articles!.find((el) => el.id === id)
    dispatch(toggleArticle(article!, false))
  }

  useEffect(() => {
    dispatch(requestSaved())
  }, [dispatch])

  return (
    <motion.div className="Saved" variants={savedVariants} initial="hidden" animate="visible">
      {articles && articles.length > 0 ? (
        <div className="Saved__cards">
          {articles.map((article) => (
            <SmallCard {...article} key={article.id} onDelete={handleDelete} onClick={handleRead} />
          ))}
        </div>
      ) : (
        <span className="Saved__message">You haven't saved anything yet</span>
      )}
      <AnimatePresence>
        {activeArticle && articles && articles.length > 0 && reader && (
          <motion.div
            variants={readerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="Saved__reader active"
            key="reader"
          >
            <div
              className="Saved__image"
              style={{
                backgroundImage:
                  'linear-gradient(0deg, rgba(0,0,0,0.7047820104604341) 0%, rgba(255,255,255,0) 49%,' +
                  'rgba(0,0,0,0.755202178527661) 100%),' +
                  `url(${activeArticle.image})`,
              }}
            >
              <h1 className="Saved__title">{activeArticle.title}</h1>
              <SocialButtons url={activeArticle.url} />
            </div>
            <div className="Saved__info">
              <button className="Saved__closeBtn" onClick={() => setReader(false)}>
                <i className="fas fa-arrow-left" />
              </button>{' '}
              <h2 className="Saved__description">{activeArticle.description}</h2>
              <span className="Saved__source">{activeArticle.author}</span>
              <a href={activeArticle.url} target="blank">
                <i className="fas fa-external-link-alt" title="Read the article" />
              </a>
              <div className="Saved__comments">
                <i className="fas fa-comment" />
                <span>Comments</span>
              </div>
              <Comments
                comments={comments}
                saveComment={(message) => dispatch(saveComment(message, activeArticle.id))}
                loading={loading}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Saved
