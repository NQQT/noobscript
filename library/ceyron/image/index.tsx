/**
 * Ceyron Image Mode.
 * This will load CYOA in an image mode. Great for tracking your options.
 */
import { objectKeys } from '@library/presource/js/object/keys';
import React from 'react';

export type CeyronImageType = (images: { [key: string]: string }) => React.ReactElement;

export const CeyronImage: CeyronImageType = (images) => {
  return (
    <div>
      {objectKeys(images).map((key) => (
        <img key={key} src={images[key]} alt={key.toString()} />
      ))}
    </div>
  );
};
