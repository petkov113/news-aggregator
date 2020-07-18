import React, { FC } from 'react'
import { CommentType } from '../Comments'
import './Comment.scss'

const Comment: FC<{ comment: CommentType }> = ({ comment }) => {
  return (
    <div className='Comment'>
      <i className='fas fa-user-circle' />
      <div className='Comment__area'>
        <div className='Comment__info'>
          <span className='Comment__author'>{comment.author}</span>
          <span className='Comment__date'>{comment.date}</span>
        </div>
        <span className='Comment__message'>{comment.message}</span>
      </div>
    </div>
  )
}

export default Comment
