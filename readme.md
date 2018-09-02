*As per Whatsapp API version 2.19.4*

## Sending a message

### sendWhatsappMessage(params)

The sendWhatsappMessage function is available in the settings object. This function sends a whatsapp message to the user and makes entries into **NotificationMaster** and **WhatsappOutgoingMessages** Tables

#### Simple Example

```js
 var params = {
     refID: '432',
     refTable: 'SourceAssignmentMaster',
     empID: 'EI201500002',
     eventType: 'vehicle_status',
     recipientID: 'EI201700004',
     recipientRole: 'employee',
     messageObj: {
         to: '911234567890',
         message: 'Location of vehicle going towards delhi has been updated',
         type: 'hsm',
         templateName: 'vehicle_status',
         templateParamater: [delhi]
     }
 };

 sendWhatsappMessage(params).then(function(response){
     console.log(response);
 });

```

The **sendWhatsappMessage** function returns a promise. The promise will always gets resolved even if any error occurrs during the execution
of the function. You do not need to handle a catch for this. On successfull execution the promise gets resolved with a 'success' message while other conditions have their respective error messages attached.

For each execution of the **sendWhatsappMessage** function you will get 1 entry in **NotificationMaster** table and 1 entry in **WhatsappOutgoingMessages** table.

#### Accepted Parameters

| Name | Required | Description | Default |
| :---- | :--------- | :----------- | :------- |
| `refID` | no | ID of the table row which can be linked to this action | NULL |
| `refTable` | no | Name of the table for which the ID is given | NULL |
| `empID` | yes | Sender's employeeID, either manager's or admin's | N/A |
| `eventType` | yes | A unique string describing the event that is happenning | N/A |
| `recipientID` | no | ID of the recipient, if known. | NULL |
| `recipientRole` | no | Role of the recipient, if known. | NULL |
| `generateShortUrl` | no | A boolean value to specify weather to generate a shortUrl or not | false |
| `shortUrlPayload` | no | An object containing the payload for shortUrl. Required in case of shortUrl | N/A |
| `appName` | no | Name of the application which needs to be opened from click of shortUrl. Required in case of shortUrl | N/A |
| `messageObj` | yes | A message object containing fields required to send a message | N/A |


#### Accepted parameters for messageObj


| Name | Required | Description | Default |
| :---- | :-------- | :----------- | :---- |
| `to` | yes | Phone number of the reciever. Should be a valid Indian mobile number. Valid formats are `+919876543210` \| `9876543210` \| `919876543210` | N/A |
| `type` | yes | Type can be text, hsm, image or attachment based on the nature of the message | text |
| `message` | yes | A message string \| caption in case of media | N/A |
| `mediaID` | no | ID of the media uploaded to the whatsapp server. Required when type is image or attachment | NULL |
| `mediaUrl` | no | URL of the media uploaded to the Google Cloud Storage. Required when type is image or attachment | NULL |
| `templateName` | no | Name of the HSM template to be used | N/A |
| `templateParameters` | no | An array containing template parameters | N/A |


#### Example of a text message


```js

var params = {
     refID: '432',
     refTable: 'SourceAssignmentMaster',
     empID: 'EI201500002',
     eventType: 'vehicle_status',
     recipientID: 'EI201700004',
     recipientRole: 'employee',
     messageObj: {
         to: '911234567890',
         message: 'Location of vehicle going towards delhi has been updated',
         type: 'text'
     }
 };

 sendWhatsappMessage(params).then(function(response){
     console.log(response);
 });

```

#### Example of a HSM message


```js
var params = {
     refID: '432',
     refTable: 'SourceAssignmentMaster',
     empID: 'EI201500002',
     eventType: 'vehicle_status',
     recipientID: 'EI201700004',
     recipientRole: 'employee',
     generateShortUrl: true,
     shortUrlPayload: { id: 1, type: 'some-type' },
     appName: 'farmerDTM',
     messageObj: {
         to: '911234567890',
         message: 'Location of vehicle going towards delhi has been updated. Kindly open app for more details.',
         type: 'text',
         templateName: 'vehicle_status',
         templateParamater: [delhi] // short url will be pushed in the function call.
     }
 };

 sendWhatsappMessage(params).then(function(response){
     console.log(response);
 });

```

#### Example of an image message


```js
var params = {
     refID: '432',
     refTable: 'SourceAssignmentMaster',
     empID: 'EI201500002',
     eventType: 'vehicle_status',
     recipientID: 'EI201700004',
     recipientRole: 'employee',
     messageObj: {
         to: '911234567890',
         message: 'This is the caption',
         type: 'image',
         mediaID: '34cc4dd232jl3UR3k432-344m',
         mediaUrl: 'https://kisannetwork.com/some/media/picture.jpg'
     }
 };

```

#### Note for HSM:


when calling whatsappSendMessage function multiple times with same params object but different values for some properties of the
messageObj always pass params as a value and not by reference. For example, consider a situation in which you want to send a same message to
two different users with slight change in the content.

```js
var params = {
     refID: '432',
     refTable: 'SourceAssignmentMaster',
     empID: 'EI201500002',
     eventType: 'vehicle_status',
     recipientID: 'EI201700004',
     recipientRole: 'employee',
     generateShortUrl: true,
     shortUrlPayload: { id: 1, type: 'some-type' },
     appName: 'farmerDTM',
     messageObj: {
         to: '911234567890',
         message: 'Location of vehicle going towards delhi has been updated. Kindly open app for more details.',
         type: 'text',
         templateName: 'vehicle_status',
         templateParamater: [delhi] // short url will be pushed in the function call.
     }
 };

// send to first recipient
sendWhatsappMessage(params).then(function(){
    // change the messageObj
    params.messageObj.to = '910987654321';
    params.appName = 'buyerDTM' // shortUrl for template parameters is different this time.
    sendWhatsappMessage(params);
});

```

When you call the above function, you will get same shortUrl's in both the function calls. The reason is that the shortUrl is pushed by the sendWhatsappMessage function. Since params object is passed by reference, so the original params object will change to [delhi, 'short-url-1'].
Now, in the second call a new url has to be generated, but templateParameter is same. So, this time the template parameter will change to [delhi, short-url-1, short-url-2]. This will send the short-url-1 to the second call as well. To avoid this always pass params object by value whenever you are changing something inside the messageObj. A common practice is to use a technique like this:

```js

var params = {
     refID: '432',
     refTable: 'SourceAssignmentMaster',
     empID: 'EI201500002',
     eventType: 'vehicle_status',
     recipientID: 'EI201700004',
     recipientRole: 'employee',
     generateShortUrl: true,
     shortUrlPayload: { id: 1, type: 'some-type' },
     appName: 'farmerDTM',
     messageObj: {
         to: '911234567890',
         message: 'Location of vehicle going towards delhi has been updated. Kindly open app for more details.',
         type: 'text',
         templateName: 'vehicle_status',
         templateParamater: [delhi] // short url will be pushed in the function call.
     }
 };

var paramsByValue = JSON.parse(JSON.stringify(params)) // create a new memory location to hold params.

 sendWhatsappMessage(paramsByValue).then(function(){
    // change the messageObj
    params.messageObj.to = '910987654321';
    params.appName = 'buyerDTM';
    sendWhatsappMessage(params);
 });

```

## Uploading a media file

To send a media file to the user, you first need to upload the media file to the whatsapp server to obtain a mediaID. We also store the media
in our Cloud Bucket to obtain the URL of the media uploaded to whatsapp server.

#### Simple Example

```js

 // assuming that we have an image buffer stored in a buffer variable
 // if image is coming from client, you can use req.file.buffer
 // if you have the url, you can get the base4 encoded image out.
 // connection is a mysql connection

 var options = { 
     method: 'POST',
     url: '/v1/media',
     body: buffer
  };

var contentType = 'image/jpeg'; // or any other valid content type

WARequest(connection, options, contentType).then(function(body){
    var mediaID;
    try {
        body = JSON.parse(media);
        mediaID = body.media[0]['id'];
    } catch (e) {
        // recieved invalid response from whatsapp API call
        console.log(e);
    }
}).catch(function(e){
    // some error has occurred while uploading medid API
    console.log(e);
});

```

#### Some points to consider before using whatsapp notification functionality

* Whatsapp is meant for notification puprose only. The whatsapp API may not work all the time. Our main program should not be dependant on
whatsapp. To avoid this, **always call whatsapp function after the main program ends**.

* If calling a whatsapp function in a REST API, always send the response to the client before executing the whatsapp function. **There is no need for the client to wait for whatsapp message to succeed**. 

* If using a HSM template, always ensure that the message string is exactly matching with what is specified in the template given to whatsapp.

* The same function is being used by alteryx as well. If there is any need to make changes in the function, do not forget to test the alteryx API's as well.

* Whatsapp doesn't allow sending free form text or media messages to the users who did not reply to us in the last 24 hours. To overcome this,
we can use HSM. If there is a need to send a free text message, please first verify that we have recieved a message from the user in last
24 hours by looking into the **WhatsappIncomingMessages** table. If we don't verify, the message will fail and whatsapp API will give an error.
Above mentioned methodology should be used to prevent these failures.