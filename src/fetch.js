export function getPrs(token) {
  const headers = new Headers({
    'Authorization': `token ${token}`,
  });
  return fetch('https://api.github.com/repos/modrzew/prboard/issues?labels=team', { headers: headers })
    .then(response => response.json())
    .then(response => {
      const prs = response.map(pr => {
        const ptal = pr.labels.some(label => label.name === 'ptal');
        return {
          number: pr.number,
          title: pr.title,
          author: pr.user,
          assignees: pr.assignees,
          ptal,
        };
      });
      console.log(prs);
      return prs;
    });
}
