import React from 'react';
import './PostPlaceholder.scss'

export default function PostPlaceholder() {
  return (
    <div className='timeline-wrapper' data-testid='post-placeholder'>
      <div className='timeline-item'>
        <div className='animated-background'>
          <div className='background-masker content-image'></div>
          <div className='background-masker content-title'></div>
          <div className='background-masker content-title-2'></div>
          <div className='background-masker content-title-short'></div>
          <div className='background-masker content-subtitle'></div>
        </div>
      </div>
    </div>
  );
}
