import { App } from '@slack/bolt';
import axios from 'axios';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});


let CHANNEL_ID = process.env.CHANNEL_ID;

async function checkUrlStatus(url) {
  let CHECK_URL = `https://www.opencrawler.in/api/rhc?url=${url}`;
  try {
    const response = await axios.get(CHECK_URL);
    console.log(response, "Response");

    if (response.data.status !== 200) {
      await sendSlackMessage(
        `:warning: <!channel> Few URLs are invalid:\n${response.data.brokenLinks.join('\n')}\n`
      );
    }
  } catch (error) {
    console.error('Error checking URL:', error);
    await sendSlackMessage('Unable to fetch URL status');
  }
}

async function sendSlackMessage(message) {
  try {
    await app.client.chat.postMessage({
      channel: CHANNEL_ID,
      text: message
    });
  } catch (error) {
    console.error('Error sending Slack message:', error);
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  try {
    await checkUrlStatus(url);
    return new Response('URL status check completed', { status: 200 });
  } catch (error) {
    console.error('Error during URL status check:', error);
    return new Response('Error during URL check', { status: 500 });
  }
}
