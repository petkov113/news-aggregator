import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IArticle } from "../../redux/reducers/types";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Card.scss";

const Card: FC<IArticle> = ({
  url,
  urlToImage,
  source,
  title,
  description,
}) => {
  return (
    <a
      href={url}
      className="Card"
      target="_blank"
      rel="noopener noreferrer"
      data-tooltip={description}
    >
      <LazyLoadImage
        src={urlToImage}
        alt="Article"
        className="Card__image"
        effect="blur"
      />
      <h3 className="Card__title">{title}</h3>
      <div className="Card__source">{source.name}</div>
    </a>
  );
};

export default Card;
