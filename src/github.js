import moment from 'moment';

import { FILTER_LABELS, REPO, TOKEN } from './config';

export async function getPrs() {
  const headers = new Headers({
    Authorization: `token ${TOKEN}`,
  });
  const labels = FILTER_LABELS.join(',');
  const response = await fetch(
    `https://api.github.com/repos/${REPO}/issues?labels=${labels}`,
    {
      headers,
    },
  );
  const prs = await response.json();
  const reviewers = {};
  const promises = prs.map(async pr => {
    const response = await fetch(
      `https://api.github.com/repos/${REPO}/pulls/${pr.number}/requested_reviewers`,
      {
        headers,
      },
    );
    const users = await response.json();
    reviewers[pr.number] = users.users;
  });
  await Promise.all(promises);
  return prs.map(pr => {
    return {
      number: pr.number,
      title: pr.title,
      author: pr.user,
      reviewers: reviewers[pr.number],
      url: pr.html_url,
      daysOpen: moment().diff(pr.created_at, 'd'),
    };
  });
}
