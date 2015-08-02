# event-sender
Provide an `EventSender` prototype to send Server Sent Events, meant to be consumed by the EventSource interface.

## Installation

```bash
npm install --save event-sender
```

## Usage

Initialize your `EventSender` object with an HTTP response object (the ExpressJS `res` parameter, for instance):
```js
var EventSender = require('event-sender');
var event = new EventSender(response);
```

Then you can use its `send()` method to send events to the client:
```js
// Send plain text to the client:
event.send({ name: 'greeting', data: 'Hello, World!\nHow the hell are yer?!' });

// Send JSON data to the client:
event.send({
 name: 'direct-message',
 data: { author: 'cGuille', content: 'Hope you like it!' }
});
```
 
Non string data are JSON stringified.

It is also possible to provide a callback which will be called when the data have been sent to the client :
```js
event.send(eventObj, function () {
 console.log('The event has been flushed to the network.');
});
```

## Licence

This small library is distributed under the MIT licence.
