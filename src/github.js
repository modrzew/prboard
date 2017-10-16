import {
  FILTER_LABELS,
  PTAL_LABEL,
  REPO,
  TOKEN,
} from './config';

export function getPrs() {
  const headers = new Headers({
    'Authorization': `token ${TOKEN}`,
  });
  const labels = FILTER_LABELS.join(',');
  return fetch(`https://api.github.com/repos/${REPO}/issues?labels=${labels}`, { headers: headers })
    .then(response => response.json())
    .then(response => {
      const prs = response.map(pr => {
        const ptal = pr.labels.some(label => label.name === PTAL_LABEL);
        return {
          number: pr.number,
          title: pr.title,
          author: pr.user,
          assignees: pr.assignees,
          ptal,
          url: pr.html_url,
        };
      });
      return prs;
    });
}
