import React from 'react';
import Masonry from 'react-masonry-component';

import Card from './Card';

import styles from './PullRequests.css';

export default class PullRequests extends React.Component {
  render() {
    return (
      <Masonry
        className={styles.cards}
        elementType="div"
        options={{ transitionDuration: 0 }}
      >
        {this.props.prs.map(({ member, prs }) => (
          <Card key={member.login} member={member} prs={prs} />
        ))}
      </Masonry>
    );
  }
}
