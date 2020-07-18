import React, { useState, FC, ChangeEvent } from 'react'
import Comment from './Comment/Comment'
import Button from '../UI/Button/Button'
import Loader from '../UI/Loader/Loader'
import './Comments.scss'

export type CommentType = {
  author: string
  id: string
  message: string
  date: string
}

type CommentsProps = {
  comments: null | CommentType[]
  saveComment: (comment: CommentType['message']) => void
  loading: boolean
}

const Comments: FC<CommentsProps> = ({ comments, saveComment, loading }) => {
  const [comment, setComment] = useState('')

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  const handleSave = () => {
    comment && saveComment(comment)
    setComment('')
  }

  return (
    <div className='Comments'>
      {loading ? (
        <div className='Comments__loader'>
          <Loader />
        </div>
      ) : (
        comments && comments.map((comment) => <Comment comment={comment} key={comment.id} />)
      )}
      <div className='Comments__field'>
        <textarea
          className='Comments__input'
          placeholder='Add a comment...'
          onChange={handleChange}
          value={comment}
        />
        <Button type='button' btnType='primary' onClick={handleSave} value='Submit' />
      </div>
    </div>
  )
}

export default Comments
