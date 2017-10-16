import React from 'react';

import './PullRequests.css';

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
      <div className="cards">
        {Object.keys(grouped).sort((a, b) => grouped[a].length < grouped[b].length).map(login => {
          const user = users[login];
          return (
            <div className="card" key={login}>
              <img className="avatar" src={user.avatar_url} width="64" alt={login} title={login} />
              <ul>
                {grouped[login].map(pr =>
                  <li key={pr.number}>
                    {pr.title} <a href={pr.url}>(#{pr.number})</a>
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>
    );
  }  
}
