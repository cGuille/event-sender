# event-sender
Provide an `EventSender` prototype to send Server Sent Events, meant to be consumed by the EventSource interface.

## Installation

```bash
npm install --save event-sender
```

## Usage

Initialize your `EventSender` object with an HTTP response object (the ExpressJS `res` parameter, for instance):
```js
var eventSender = new EventSender(response);
```

Then you can use the its `send()` or `sendJson()` method to send events to the client:
```js
# Send plain text to the client:
eventSender.send('greeting', 'Hello, World!');

# Send JSON data to the client:
eventSender.sendJson('message', { author: 'cGuille', content: 'Hope you like it!' });
```

Here are the signatures of these methods:
- EventSender#send(eventName, content);
- EventSender#sendJson(eventName, content);
 
The JSON version will just stringify the content before the event is sent.

## Licence

This small library is distributed under the MIT licence.
