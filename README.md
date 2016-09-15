# AlexaAWSIoT

## Overview
Alexa skill > AWS IOT
Webpage > AWS IOT (uses cognito to grant access)


## AWS IoT
1. AWS IOT: create your things. The demo expects the following devices: light1, light2, light3, light4, frontlight, backlight, tv1, window1, window2, window3, window4, frontdoor. 

## Alexa to AWS IoT
### Backend
1. Lambda: create a Lamba function
2. Lambda: update index.js in the /LambdaCode folder with your AWS IOT endpoint
3. IAM: Add IoT full access policy to Lambda Access role created in 1

### Frontend
1. create a skill on developer.amazon.com with the invocation name "our house" and using information from /SpeechAssets

## AWS IoT to webpage
### grant permission
1. Cognito: create cognito identity pool, get creds from sample code tab
2. IAM: Add IoT full access policy to Cognito Auth and Unauth roles that were created in step 1
### WebsiteCode
1. update ./policy/cognito_unathenticated.json with your AWS IOT ARN
2. update index.html with your cognito ID pool and your AWS IOT endpoint. Also in this file, double check that you're subcribed to all the AWS IOT devices you created.

##Currently working scenarios: 
   * Alexa, tell [invocation name] to switch to [scene] mode. where scene is "all on", "all off", "movie"
   * Alexa, open [invocation name]. where several settings are toggled just to show it's working.
