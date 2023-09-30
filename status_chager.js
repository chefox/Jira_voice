const request = require('request');

function changeJiraIssueStatus(issueNumber, newStatus) {
  // Ваш URL и учетные данные для доступа к API Jira
  const jiraUrl = 'https://ваш_адрес_jira.atlassian.net';
  const username = 'ваш_логин';
  const password = 'ваш_пароль';

  const options = {
    url: `${jiraUrl}/rest/api/3/issue/${issueNumber}/transitions`,
    auth: {
      user: username,
      pass: password
    },
    method: 'POST',
    json: true,
    body: {
      transition: {
        id: newStatus
      }
    }
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode === 204) {
      console.log(`Статус задачи ${issueNumber} успешно изменен.`);
    } else {
      console.error('Ошибка:', body.errorMessages || error);
    }
  });
}

// Пример использования метода
changeJiraIssueStatus('PROJ-123', 21); // Замените на актуальный номер и id нового статуса
