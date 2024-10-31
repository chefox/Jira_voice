const request = require('request');
const { SpeechRecognition } = require('speech-recognition');

const jiraUrl = 'https://your_jira_address.atlassian.net';
const username = 'your_username';
const password = 'your_password';

// Function to change the Jira issue status
function changeJiraIssueStatus(issueNumber, newStatus) {
  const options = {
    url: `${jiraUrl}/rest/api/3/issue/${issueNumber}/transitions`,
    auth: { user: username, pass: password },
    method: 'POST',
    json: true,
    body: { transition: { id: newStatus } }
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode === 204) {
      console.log(`Status for issue ${issueNumber} successfully changed.`);
    } else {
      console.error('Error:', body?.errorMessages || error);
    }
  });
}

// Map of possible status phrases to Jira transition IDs
const statusMap = {
  "to do": 11,
  "in progress": 21,
  "done": 31,
  "review": 41
};

// Function to handle voice command for status change
function handleVoiceCommand(command) {
  const issuePattern = /issue ([A-Z]+-\d+)/i;
  const statusPattern = /change status to ([a-z\s]+)/i;

  const issueMatch = command.match(issuePattern);
  const statusMatch = command.match(statusPattern);

  if (issueMatch && statusMatch) {
    const issueNumber = issueMatch[1];
    const statusName = statusMatch[1].trim().toLowerCase();

    if (statusMap[statusName] !== undefined) {
      changeJiraIssueStatus(issueNumber, statusMap[statusName]);
    } else {
      console.log(`Unknown status: "${statusName}". Available statuses: ${Object.keys(statusMap).join(', ')}`);
    }
  } else {
    console.log('Command format: "change status of issue [ISSUE-123] to [status]"');
  }
}

// Start listening for voice commands
const recognizer = new SpeechRecognition();
recognizer.lang = 'en-US';

recognizer.onresult = (event) => {
  const command = event.results[0][0].transcript;
  console.log('Heard:', command);
  handleVoiceCommand(command);
};

// Start speech recognition
recognizer.start();
