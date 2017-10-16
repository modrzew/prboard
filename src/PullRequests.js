import React from 'react';

import Card from './Card';

import styles from './PullRequests.css';

function groupByAssignees(prs) {
  const users = {};
  const grouped = {};
  prs.forEach(pr => {
    pr.assignees.forEach(user => {
      if (!pr.ptal) {
        return;
      }
      if (typeof users[user.login] === 'undefined') {
        users[user.login] = user;
        grouped[user.login] = [];
      }
      grouped[user.login].push(pr);
    })
  });
  return { users, grouped };
}

export default class PullRequests extends React.Component {
  render() {
    const { users, grouped } = groupByAssignees(this.props.prs);
    return (
      <div className={styles.cards}>
        {Object.keys(grouped).sort((a, b) => grouped[a].length < grouped[b].length).map(login => {
          const user = users[login];
          return <Card key={user.login} user={user} prs={grouped[login]} />;
        })}
      </div>
    );
  }  
}
