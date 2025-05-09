
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const CLICKUP_API_TOKEN = process.env.CLICKUP_API_TOKEN;
const PORT = process.env.PORT || 3000;

app.post('/webhook', async (req, res) => {
  try {
    const event = req.body;

    // Vérifie qu'on reçoit un changement de statut
    if (
      event?.event === 'taskStatusUpdated' &&
      event?.task?.status?.status === 'IN PROGRESS'
    ) {
      const taskId = event.task.id;

      await axios.post(
        `https://api.clickup.com/api/v2/task/${taskId}/time`,
        {},
        {
          headers: {
            Authorization: CLICKUP_API_TOKEN,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log(`✅ Timer started for task ${taskId}`);
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('❌ Failed to process webhook:', error.message);
    res.status(500).send('Error');
  }
});

app.get('/', (req, res) => {
  res.send('✅ ClickUp auto-timer webhook is running.');
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
