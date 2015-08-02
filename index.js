module.exports = EventSender;

var assert = require('assert');

function EventSender(httpResponse) {
  assert(httpResponse);
  assert.equal(typeof(httpResponse.setHeader), 'function', "The HTTP response must have a #setHeader() method.");
  assert.equal(typeof(httpResponse.write), 'function', "The HTTP response must have a #write() method.");

  this.httpResponse = httpResponse;
  this.httpResponse.setHeader('Content-Type', 'text/event-stream');
}

EventSender.prototype.send = function EventSender_send(event, cb) {
  if (typeof(event.data) === 'undefined') {
    event.data = '';
  } else if (typeof(event.data) !== 'string') {
    event.data = JSON.stringify(event.data);
  }
  return this.httpResponse.write(format(event), 'utf8', cb);
};

function format(event) {
  var lines = [];

  if (event.name) {
    lines.push('event: ' + event.name);
  }
  lines.push.apply(lines, event.data.split('\n').map(function (dataLine) {
    return 'data: ' + dataLine;
  }));

  return lines.join('\n') + '\n\n';
}
