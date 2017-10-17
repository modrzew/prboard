import React from 'react';

import Avatar from './Avatar';
import styles from './Card.css';

export default class Card extends React.Component {
  render() {
    const { user, prs } = this.props;
    return (
      <div className={styles.card} key={user.login}>
        <Avatar login={user.login} url={user.avatar_url} count={prs.length} />
        <ul className={styles.list}>
          {prs.map(pr => (
            <li key={pr.number}>
              {pr.title} (<a href={pr.url}>#{pr.number}</a>)
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
