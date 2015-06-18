module.exports = EventSender;

function EventSender(httpResponse) {
  this.httpResponse = httpResponse;
  this.httpResponse.setHeader('Content-Type', 'text/event-stream');
}

EventSender.prototype.send = function EventSender_send(eventName, content) {
  this.httpResponse.write('event: ' + eventName + '\n' + dataize(content) + '\n\n');
};

EventSender.prototype.sendJson = function EventSender_sendJson(eventName, content) {
  this.send(eventName, JSON.stringify(content));
};

function dataize(string) {
  return string.split('\n').map(function (line) {
    return 'data: ' + line + '\n';
  });
}
