import { App } from "@slack/bolt";//Slack Bolt is a framework for building Slack apps

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,//Your Slack Bot Token
  signingSecret: process.env.SLACK_SIGNING_SECRET,//Your Slack Signing Secret 
});
let CHANNEL_ID = process.env.CHANNEL_ID;//Your Slack Channel ID where you want to send the message

// Function to send a message to Slack
async function sendSlackMessage(message) {
  try {
    await app.client.chat.postMessage({
      channel: CHANNEL_ID,  //Your Slack Channel ID where you want to send the message
      text: message,  //Message to send to Slack
    });
  } catch (error) {
    console.error("Error sending Slack message:", error);
  }
}

export async function POST(request) {
  const body = await request.json();

  //You will get allPages and brokenLinks from the body
  const allPages = body.allPages;
  const brokenLinks = body.brokenLinks;

  try {
    //Send a message to Slack You can change the message as per your needs
    await sendSlackMessage(
      `:warning: <!channel> 
      \nScan mode : DeepScan
      \nTotal pages scanned : ${allPages.length}
      \nBroken links found : ${brokenLinks.length}
      \nBroken links are : ${brokenLinks.join("\n")}
      `
    );
  } catch (error) {
    console.error("Error during URL status check:", error);
    return new Response("Error during URL check", { status: 500 });
  }
}
//Please add the CHANNEL_ID, SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET in the .env file

//You can deploy this in vercel.
//The api will  <https://hosteddomain.com/api/slack>
//You can intergate the with opencrawler to get daily broken links report in slack.
//You can use https://cron-job.org/en/ to run the api daily at a specific time.
//Visit opencrawler.in to get more details about opencrawler.