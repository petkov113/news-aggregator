import React, { FC, memo } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Article } from '../../redux/reducers/ReducersTypes'
import 'react-lazy-load-image-component/src/effects/blur.css'
import './Card.scss'

const validateImgSrc = (url: null | string): string => {
  const imagesBlacklist = new RegExp(
    /(.*kubrick.*)|(.*wthr.*)|(.*nydailynews.*)|(.*statesman.*)|(.*arabnews.*)|(.*washingtonpost.*)/
  )
  return url && !imagesBlacklist.test(url) ? url : './placeholder.jpg'
}

const validateDescription = (description: null | string): string => (description ? description : '')

export type CardProps = Article & {
  showButtons?: boolean
  onSave?: (article: Article) => void
  onFollow?: () => void
}

const Card: FC<CardProps> = ({
  url,
  urlToImage,
  source,
  title,
  id,
  isSaved,
  content,
  publishedAt,
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
      data-tooltip={validateDescription(description)}>
      <LazyLoadImage
        src={validateImgSrc(urlToImage)}
        alt='Article'
        className='Card__image'
        effect='blur' />
      <span className='Card__title'>{title.replace(/-\s.*/, '')}</span>
    </a>
    <div className='Card__info'>
      <div className='Card__source'>{source.name}</div>
      {showButtons && (
        <div className='Card__buttons'>
          <input
            checked={isSaved}
            id={id}
            type='checkbox'
            onChange={() => onSave!({
              id,
              url,
              urlToImage,
              title,
              source,
              description,
              publishedAt,
              isSaved,
              content,
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
