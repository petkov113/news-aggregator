import React, { FC } from "react";
import { PropsTypes } from "./GridTypes";
import Card from "../Card/Card";

const Grid: FC<PropsTypes> = ({ items }) => {
  return (
    <div className="row">
      {items.map((item, index) => (
        <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3">
          <Card
            source={item.source}
            url={item.url}
            urlToImage={item.urlToImage}
            title={item.title}
            description={item.description}
          />
        </div>
      ))}
    </div>
  );
};

export default Grid;
