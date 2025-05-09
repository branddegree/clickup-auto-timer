
const fetch = require('node-fetch');

const API_TOKEN = process.env.CLICKUP_API_TOKEN;
const SPACE_URL = process.env.CLICKUP_SPACE_URL;

async function startTimer() {
    try {
        const taskId = "YOUR_TASK_ID";  // Replace with your ClickUp Task ID

        const response = await fetch(`https://api.clickup.com/api/v2/task/${taskId}/time`, {
            method: "POST",
            headers: {
                "Authorization": API_TOKEN,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        });

        const data = await response.json();
        console.log("Timer started:", data);
    } catch (error) {
        console.error("Error starting timer:", error);
    }
}

startTimer();
