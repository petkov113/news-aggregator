import React, { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Card.scss';

const validateSrc = (url: null | string): string => {
  const imagesBlacklist = new RegExp(/(.*kubrick.*)|(.*wthr.*)|(.*nydailynews.*)/);
  const validUrl = url && !imagesBlacklist.test(url) ? url : './placeholder.jpg';
  return validUrl;
};

const validateDescription = (description: null | string): string =>
  description ? description : '';

type CardTypes = {
  url: string;
  urlToImage: string;
  source: { id: string | null; name: string };
  title: string;
  description: string;
  showButtons: boolean;
};

const Card: FC<CardTypes> = ({ url, urlToImage, source, title, description, showButtons }) => {
  return (
    <a
      href={url}
      className='Card'
      target='_blank'
      rel='noopener noreferrer'
      data-tooltip={validateDescription(description)}>
      <LazyLoadImage
        src={validateSrc(urlToImage)}
        alt='Article'
        className='Card__image'
        effect='blur'
      />
      <h3 className='Card__title'>{title}</h3>
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