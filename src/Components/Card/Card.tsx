import React, { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Card.scss';

const validateImgSrc = (url: null | string): string => {
  const imagesBlacklist = new RegExp(/(.*kubrick.*)|(.*wthr.*)|(.*nydailynews.*)|(.*statesman.*)/);
  return url && !imagesBlacklist.test(url) ? url : './placeholder.jpg';
};

const validateDescription = (description: null | string): string =>
  description ? description : '';

export type CardProps = {
  url: string;
  urlToImage: string;
  source: { id: string | null; name: string };
  title: string;
  description: string;
  showButtons?: boolean;
};

const Card: FC<CardProps> = ({ url, urlToImage, source, title, description, showButtons }) => {
  return (
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
        effect='blur'
      />
      <span className='Card__title'>{title}</span>
      <div className='Card__source'>{source.name}</div>
      {showButtons && (
        <div className='Card__buttons'>
          <button className='Card__btn'>Save</button>
          <button className='Card__btn'>Subscribe</button>
        </div>
      )}
    </a>
  );
};

export default Card;
