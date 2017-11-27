import React from 'react';

import Avatar from './Avatar';
import { Label } from './Label';
import styles from './Card.css';

export default class Card extends React.Component {
  render() {
    const { user, prs } = this.props;
    return (
      <div className={styles.card} key={user.login}>
        <Avatar login={user.login} url={user.avatar_url} count={prs.length} />
        <ul className={styles.list}>
          {prs.map(pr => (
            <li className={styles.row} key={pr.number}>
              <div>
                {pr.title} (<a href={pr.url}>#{pr.number}</a>)
              </div>
              <div className={styles.label}>
                <Label daysOpen={pr.daysOpen} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
