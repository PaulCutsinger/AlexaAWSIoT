'use strict';
var config = {};

config.IOT_BROKER_ENDPOINT      = "a32z24mjwr1har.iot.us-east-1.amazonaws.com".toLowerCase();

config.IOT_BROKER_REGION        = "us-east-1";

config.IOT_THING_NAME           = "frontporchlight";

//Loading AWS SDK libraries

var AWS = require('aws-sdk');

AWS.config.region = config.IOT_BROKER_REGION;

//Initializing client for IoT

var iotData = new AWS.IotData({endpoint: config.IOT_BROKER_ENDPOINT});

var Alexa = require('alexa-sdk');
var APP_ID = undefined; //OPTIONAL: replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';
var SKILL_NAME = 'home automation demo';
var scenes = require('./scenes');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {

      var sceneUpdates = [
        {'state':{ 'desired':{'percent_on':0,'color':'red','device':'light1','type':'light','state':'locked'}}},
        {'state':{ 'desired':{'percent_on':0,'color':'red','device':'light2','type':'light','state':'locked'}}},
        {'state':{ 'desired':{'percent_on':1,'color':'blue','device':'light3','type':'light','state':'locked'}}},
        {'state':{ 'desired':{'percent_on':1,'color':'green','device':'frontlight','type':'light','state':'locked'}}},
        {'state':{ 'desired':{'percent_on':.8,'color':'purple','device':'tv1','type':'tv','state':'locked'}}},
        {'state':{ 'desired':{'percent_on':1,'color':'blue','device':'window1','type':'portal','state':'locked'}}}
      ];
      var speechOutput="it's alive";
      AWSIoT.sendMessage(this, sceneUpdates,speechOutput);

    },
    'PortalIntent': function() {

    },
    'TvIntent':function(){

    },
    'LightIntent':function(){

    },
    'SceneIntent': function () {
      //ToDO this intent is broken right now.
      var speechOutput;
      var itemSlot = this.event.request.intent.slots.Scene;
      console.log("itemSlot: "+itemSlot);
      var sceneName="none";
      if (itemSlot && itemSlot.value) {
          sceneName = itemSlot.value.toLowerCase();
      }
      console.log("sceneName: "+sceneName);
      var sceneUpdates=null;
      switch (sceneName) {
        case "movie":
        sceneUpdates = [
          {'state':{ 'desired':{'percent_on':.5,'color':'yellow','device':'light1','type':'light','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':0,'color':'yellow','device':'light2','type':'light','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':0,'color':'yellow','device':'light3','type':'light','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':0,'color':'yellow','device':'light4','type':'light','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':0,'color':'yellow','device':'backlight','type':'light','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':0,'color':'yellow','device':'frontlight','type':'light','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':0.8,'color':'purple','device':'tv1','type':'tv','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':1,'color':'blue','device':'window1','type':'portal','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':1,'color':'blue','device':'window2','type':'portal','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':1,'color':'blue','device':'window3','type':'portal','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':1,'color':'blue','device':'window4','type':'portal','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':1,'color':'blue','device':'frontdoor','type':'portal','state':'locked'}}}
        ];
        speechOutput="enjoy the movie";
        break;
        case "all on":
        sceneUpdates = [
          {'state':{ 'desired':{'percent_on':1,'color':'yellow','device':'light1','type':'light','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':1,'color':'yellow','device':'light2','type':'light','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':1,'color':'yellow','device':'light3','type':'light','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':1,'color':'yellow','device':'light4','type':'light','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':1,'color':'yellow','device':'backlight','type':'light','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':1,'color':'yellow','device':'frontlight','type':'light','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':0.5,'color':'purple','device':'tv1','type':'tv','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':1,'color':'green','device':'window1','type':'portal','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':1,'color':'green','device':'window2','type':'portal','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':1,'color':'green','device':'window3','type':'portal','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':1,'color':'green','device':'window4','type':'portal','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':1,'color':'green','device':'frontdoor','type':'portal','state':'locked'}}}
        ];
        speechOutput="all on";
        break;
        case "all off":
        sceneUpdates = [
          {'state':{ 'desired':{'percent_on':0,'color':'red','device':'light1','type':'light','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':0,'color':'red','device':'light2','type':'light','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':0,'color':'blue','device':'light3','type':'light','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':0,'color':'blue','device':'light4','type':'light','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':0,'color':'blue','device':'backlight','type':'light','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':0,'color':'green','device':'frontlight','type':'light','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':0,'color':'purple','device':'tv1','type':'tv','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':1,'color':'blue','device':'window1','type':'portal','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':1,'color':'blue','device':'window2','type':'portal','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':1,'color':'blue','device':'window3','type':'portal','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':1,'color':'blue','device':'window4','type':'portal','state':'locked'}}},
          {'state':{ 'desired':{'percent_on':1,'color':'blue','device':'frontdoor','type':'portal','state':'locked'}}}
        ];
        speechOutput="all off";
        break;
        case "party":
        speechOutput="it's party time!";
        break;
        case "none":
        default:
        speechOutput="no scene";
        break;
      }
      if (sceneUpdates==null) {
        this.emit(':tell',speechOutput);
      } else {
        AWSIoT.sendMessage(this, sceneUpdates, speechOutput);
      }


    },
    'AMAZON.HelpIntent': function () {
        this.attributes['speechOutput'] = 'You can ask questions such as, what\'s the scene, or, you can say exit... ' +
            'Now, what can I help you with?';
        this.attributes['repromptSpeech'] = 'You can say things like, what\'s the scene, or you can say exit...' +
            ' Now, what can I help you with?';
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest':function () {
        this.emit(':tell', 'Goodbye!');
    }
  };
var AWSIoT = {
    postSendMessage: function (thisOfParent,speechOutput) {
      console.log('all done');
      thisOfParent.emit(':tell', speechOutput);
    },
    sendMessage: function (thisOfParent, sceneUpdates, speechOutput) {
      //for each message in messages

      var itemsProcessed = 0;

      //var deleteme = {'state':{ 'desired':{'percent_on':0,'color':'blue','device':'light1','type':'light','state':'locked'}}};
      sceneUpdates.forEach((item, index, array) => {
          console.log("item "+index+": "+JSON.stringify(item));
          console.log("device "+index+": "+item.state.desired.device)

          var thingNameAndPayload= {
            "thingName" : item.state.desired.device,
            "payload" : JSON.stringify(item)
          };
          iotData.updateThingShadow(thingNameAndPayload, function(err, data) {

            if (err){
              console.log("update error: ");
              console.log(err);
              //Handle the error here
              speechOutput = "epic fail";
              //thisOfParent.emit(':tell', speechOutput);
            }

            else {
              console.log("update success: ");
              console.log(data);
              //callback(sessionAttributes,buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
              //thisOfParent.emit(':tell', speechOutput);
            }
          itemsProcessed++;
          if(itemsProcessed === array.length) {
              AWSIoT.postSendMessage(thisOfParent, speechOutput);
            }


          });
        });
    }

  };
