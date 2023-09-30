const { dialogflow, BasicCard, Suggestions } = require('actions-on-google');
const express = require('express');
const app = dialogflow();

app.intent('OpenLink', (conv, { link }) => {
  // Проверяем, что link действительно является URL
  if (/^https?:\/\//i.test(link)) {
    // Открываем ссылку
    require('open')(link);
    conv.close('Ссылка открыта');
  } else {
    conv.close('Не удалось распознать ссылку');
  }
});

const expressApp = express().use(app);
expressApp.listen(3000, () => console.log('Сервер запущен на порту 3000'));
