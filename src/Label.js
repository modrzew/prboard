import * as classNames from 'classnames';
import React from 'react';

import styles from './Label.css';

export const Label = ({ daysOpen }) => {
  if (daysOpen <= 2) {
    return null;
  }
  const className = classNames(styles.label, {
    [styles.warning]: daysOpen > 2 && daysOpen < 6,
    [styles.error]: daysOpen >= 6,
  });
  const divider = daysOpen < 6 ? 5 : 9;
  const opacity = `${(daysOpen / divider).toFixed(2)}`;
  return (
    <div className={className} style={{ opacity }}>
      <b>{daysOpen}</b> days
    </div>
  );
};
