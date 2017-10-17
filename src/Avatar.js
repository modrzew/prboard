import React from 'react';

import styles from './Avatar.css';

export default class Avatar extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <img
          className={styles.avatar}
          src={this.props.url}
          alt={this.props.login}
          title={this.props.login}
        />
        <div className={styles.badge}>{this.props.count}</div>
      </div>
    );
  }
}
