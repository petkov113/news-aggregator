import {
  FacebookShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share'
import './SocialButtons.scss'

export const SocialButtons = ({ url }: { url: string }) => {
  return (
    <div className='Social' data-testid='Social'>
      <FacebookShareButton url={url} children={<i className='fab fa-facebook' />} />
      <RedditShareButton url={url} children={<i className='fab fa-reddit' />} />
      <TwitterShareButton url={url} children={<i className='fab fa-twitter' />} />
      <TelegramShareButton url={url} children={<i className='fab fa-telegram' />} />
    </div>
  )
}


export default SocialButtons
