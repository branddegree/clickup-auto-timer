
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const TOKEN = process.env.API_TOKEN;

app.post('/webhook', async (req, res) => {
  try {
    const event = req.body;

    if (
      event?.event === 'taskStatusUpdated' &&
      event?.task?.status?.status === 'IN PROGRESS'
    ) {
      const taskId = event.task.id;
      await axios.post(
        `https://api.clickup.com/api/v2/task/${taskId}/time`,
        {},
        {
          headers: { Authorization: TOKEN }
        }
      );
      console.log(`Timer started for task ${taskId}`);
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).send('Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
