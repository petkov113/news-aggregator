import React, { FC } from 'react'
import { Article } from '../../redux/reducers/ReducersTypes'
import { motion } from 'framer-motion'
import 'react-lazy-load-image-component/src/effects/blur.css'
import './SmallCard.scss'

const variants = {
  hidden: { x: '-100%' },
  visible: { x: 0 },
  exit: {
    x: '-100%'
  }
}

const validateImgSrc = (url: null | string): string => {
  const imagesBlacklist = new RegExp(
    /(.*kubrick.*)|(.*wthr.*)|(.*nydailynews.*)|(.*statesman.*)|(.*arabnews.*)|(.*washingtonpost.*)/
  )
  return url && !imagesBlacklist.test(url) ? url : './placeholder.jpg'
}

export type CardProps = Pick<Article, 'title' | 'image' | 'id'> & {
  onClick: (id: Article['id']) => void
  onDelete: (id: Article['id']) => void
}

const SmallCard: FC<CardProps> = ({ image, title, id, onClick, onDelete }) => {
  return (
    <motion.div variants={variants} initial='hidden' exit='exit'  whileHover={{ y: -2 }} className='SmallCard'>
      <button className='SmallCard__btn' onClick={() => onDelete(id)}>
        <i className='fas fa-times' />
      </button>
      <div className='SmallCard__info' onClick={() => onClick(id)}>
        <img src={validateImgSrc(image)} alt='Article' className='SmallCard__image' />
        <span className='SmallCard__title'>{title}</span>
      </div>
    </motion.div>
  )
}

export default SmallCard
