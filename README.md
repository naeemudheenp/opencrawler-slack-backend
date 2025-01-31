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



