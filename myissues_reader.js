const request = require('request');

function getMyJiraIssues() {
  const jiraUrl = 'https://ваш_адрес_jira.atlassian.net';
  const username = 'ваш_логин';
  const password = 'ваш_пароль';

  const options = {
    url: `${jiraUrl}/rest/api/3/search?jql=assignee=currentUser()`,
    auth: {
      user: username,
      pass: password
    },
    method: 'GET',
    json: true
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const issues = body.issues.map(issue => ({
        key: issue.key,
        summary: issue.fields.summary,
        status: issue.fields.status.name
      }));
      console.log('Задачи:', issues);
    } else {
      console.error('Ошибка:', body.errorMessages || error);
    }
  });
}

// Использование функции
getMyJiraIssues();
