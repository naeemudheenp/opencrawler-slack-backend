# Slack Broken Links Notifier

This repository provides a  application to notify broken links in a website to a Slack channel. The app uses the [Slack Bolt Framework](https://slack.dev/bolt-js/tutorial/getting-started) and can be integrated with [OpenCrawler](https://opencrawler.in/) to automate broken link reporting.

## Features
- Sends a daily report of broken links detected on your website to a Slack channel.
- Provides a detailed summary, including the total pages scanned and the broken links.
- Can be deployed on platforms like [Vercel](https://vercel.com/).
- Supports scheduled API calls using services like [cron-job.org](https://cron-job.org/en/).

## How to setup

### Goto slack and create a app using below manifest.

```json
{
    "display_information": {
        "name": "opencrawler"
    },
    "features": {
        "bot_user": {
            "display_name": "opencrawler",
            "always_online": false
        }
    },
    "oauth_config": {
        "redirect_urls": [
            "<hosteddomain>/slack/events"
        ],
        "scopes": {
            "bot": [
                "chat:write"
            ]
        }
    },
    "settings": {
        "org_deploy_enabled": false,
        "socket_mode_enabled": false,
        "token_rotation_enabled": false
    }
}
```
Also make sure that you save SLACK_BOT_TOKEN and SLACK_SIGNING_SECRET. 

### Deploy the app in vercel by click below button and also add  following env
- ```SLACK_BOT_TOKEN```
- ```SLACK_SIGNING_SECRET```
- ```CHANNEL_ID   //This should be the id of channel  where you want to receave the message ```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnaeemudheenp%2Fopencrawler-slack-backend&env=SLACK_BOT_TOKEN,SLACK_SIGNING_SECRET,CHANNEL_ID&envDescription=Make%20sure%20you%20add%20slack%20app%20token%20%2C%20signing%20secret%20%20and%20channel%20id%20where%20you%20want%20to%20sent%20message%2C)

### Setup schedule 
- Goto cron-job.org
- Create a cron-job
- Add following url in api
```
https://opencrawler-backend.onrender.com/add-job
```
- Click on advanced setting
- In advanced section chnage GET METHOD TO POST and add below in Request body section
```
{
    
    "email":"{test@test.com}",
    "url":"https://test.com/",
    "mode":"deepscan",
    "postActionApi":"http://<replace with the url you got from vercel after deploying>/api/slack"

}        
```
# Done thats it :) Now the app will check your website based on schedule you have set and will report slack channel if any broken links is found.
# Contributions are welcome



