
const fetch = require('node-fetch');

// Vérifie que les variables d'environnement sont présentes
const API_TOKEN = process.env.CLICKUP_API_TOKEN;
const SPACE_URL = process.env.CLICKUP_SPACE_URL;

if (!API_TOKEN) {
    console.error("Error: Missing API token");
    process.exit(1); // Arrête le processus si l'API token n'est pas défini.
}

async function startTimer() {
    try {
        const taskId = "YOUR_TASK_ID";  // Remplace par ton ID de tâche ClickUp

        const response = await fetch(`https://api.clickup.com/api/v2/task/${taskId}/time`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Timer started:", data);
    } catch (error) {
        console.error("Error starting timer:", error);
    }
}

startTimer();
