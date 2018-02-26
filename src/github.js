import { ORGANIZATION, TEAM, TOKEN } from './config';

async function sendRequest(query) {
  const headers = new Headers({
    Authorization: `bearer ${TOKEN}`,
  });
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers,
    body: JSON.stringify({ query }),
  });
  return response.json();
}

export async function getPrs() {
  const loginsResponse = await sendRequest(`
    query {
      organization(login:"${ORGANIZATION}") {
        team(slug:"${TEAM}") {
          members(first:100) {
            nodes {
              login
              avatarUrl
            }
          }
        }
      }
    }
  `);
  const members = loginsResponse.data.organization.team.members.nodes;
  const subqueries = members.map(
    member => `
      ${member.login}: search(type:ISSUE,query:"is:open is:pr review-requested:${member.login} sort:created-asc user:${ORGANIZATION}",first:100) {
        nodes {
          ...PrFields
        }
      }
    `,
  );
  const prsResponse = await sendRequest(`
    query {
      ${subqueries.join('\n')}
    }

    fragment PrFields on PullRequest {
      id
      number
      author {
        login
        avatarUrl
      }
      title
      createdAt
      updatedAt
      lastEditedAt
      url
    }
  `);
  const results = members
    .map(member => ({
      member,
      prs: prsResponse.data[member.login].nodes,
    }))
    .filter(r => r.prs.length > 0)
    .sort((a, b) => b.prs.length - a.prs.length);
  return results;
}
