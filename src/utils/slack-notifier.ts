export const notifySlack = async (text: string): Promise<void> => {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL?.trim();

  if (!slackWebhookUrl) {
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error(
        `[Slack]: No se pudo enviar la notificacion (${response.status} ${response.statusText})`,
      );
    }
  } catch (error) {
    console.error('[Slack]: Error al enviar la notificacion:', error);
  } finally {
    clearTimeout(timeout);
  }
};
