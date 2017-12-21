import React from 'react';
import Masonry from 'react-masonry-component';

import Card from './Card';

import styles from './PullRequests.css';

function groupByAssignees(prs) {
  const users = {};
  const grouped = {};
  prs.forEach(pr => {
    if (pr.reviewers == null) {
      return;
    }
    pr.reviewers.forEach(user => {
      if (typeof users[user.login] === 'undefined') {
        users[user.login] = user;
        grouped[user.login] = [];
      }
      grouped[user.login].push(pr);
    });
  });
  return { users, grouped };
}

export default class PullRequests extends React.Component {
  render() {
    const { users, grouped } = groupByAssignees(this.props.prs);
    return (
      <Masonry
        className={styles.cards}
        elementType="div"
        options={{ transitionDuration: 0 }}
      >
        {Object.keys(grouped)
          .sort((a, b) => grouped[b].length - grouped[a].length)
          .map(login => {
            const user = users[login];
            return <Card key={user.login} user={user} prs={grouped[login]} />;
          })}
      </Masonry>
    );
  }
}
