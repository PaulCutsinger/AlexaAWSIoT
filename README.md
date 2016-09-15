# AlexaAWSIoT

## Overview

## AWS IoT

## Alexa to AWS IoT
### LambdaCode
### Developer Portal (SpeechAssets)

## AWS IoT to webpage
### grant permission
1) Cognito: create cognito identity pool, get creds from sample code tab
2) IAM: Add IoT full access policy to Cognito Auth and Unauth roles that were created in step 1
3) AWS IOT: create your things. The demo expects the following devices: light1, light2, light3, light4, frontlight, backlight, tv1, window1, window2, window3, window4, frontdoor. 
### WebsiteCode
1) update ./policy/cognito_unathenticated.json with your AWS IOT ARN
2) update index.html with your cognito ID pool and your AWS IOT endpoint. Also in this file, double check that you're subcribed to all the AWS IOT devices you created.
