import React, { FC, memo } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Article } from '../../redux/reducers/ReducersTypes'
import 'react-lazy-load-image-component/src/effects/blur.css'
import './Card.scss'

export type CardProps = Article & {
  showButtons?: boolean
  onSave?: (article: Article) => void
  onFollow?: () => void
}

const Card: FC<CardProps> = ({
  url,
  image,
  author,
  title,
  id,
  isSaved,
  published,
  description,
  showButtons,
  onSave,
  onFollow,
}) => (
  <div className='Card__wrapper'>
    <a
      href={url}
      className='Card'
      target='_blank'
      rel='noopener noreferrer'
      data-tooltip={description}>
      <LazyLoadImage
        src={image}
        alt='Article'
        className='Card__image'
        effect='blur' />
      <span className='Card__title'>{title.replace(/-\s.*/, '')}</span>
    </a>
    <div className='Card__info'>
      <div className='Card__source'>{author}</div>
      {showButtons && (
        <div className='Card__buttons'>
          <input
            checked={isSaved}
            id={id}
            type='checkbox'
            onChange={() => onSave!({
              id,
              url,
              image,
              title,
              author,
              description,
              published,
              isSaved,
            })}></input>
          <label htmlFor={id} className='Card__btn'>
            <i className='fas fa-bookmark' />
          </label>
        </div>
      )}
    </div>
  </div>
)

export default memo(Card)
