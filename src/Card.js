import moment from 'moment';
import React from 'react';

import Avatar from './Avatar';
import { Label } from './Label';
import styles from './Card.css';

export default class Card extends React.Component {
  render() {
    const { member, prs } = this.props;
    return (
      <div className={styles.card} key={member.login}>
        <Avatar
          login={member.login}
          url={member.avatarUrl}
          count={prs.length}
        />
        <ul className={styles.list}>
          {prs.map(pr => (
            <li className={styles.row} key={pr.number}>
              <div>
                {pr.title} (<a href={pr.url}>#{pr.number}</a>)
              </div>
              <div className={styles.label}>
                <Label daysOpen={moment().diff(pr.createdAt, 'd')} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
