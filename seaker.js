const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');

const client = new textToSpeech.TextToSpeechClient();

async function speak(text) {
  const request = {
    input: { text: text },
    voice: { languageCode: 'ru-RU', name: 'ru-RU-Wavenet-D', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await client.synthesizeSpeech(request);
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
}

// Использование функции
speak('Привет, мир! Это голосовой ответ.');
