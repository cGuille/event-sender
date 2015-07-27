module.exports = EventSender;

function EventSender(httpResponse) {
  this.httpResponse = httpResponse;
  this.httpResponse.setHeader('Content-Type', 'text/event-stream');
}

EventSender.prototype.send = function EventSender_send(event) {
  if (typeof(event.data) === 'undefined') {
    event.data = '';
  } else if (typeof(event.data) !== 'string') {
    event.data = JSON.stringify(event.data);
  }
  this.httpResponse.write(
    (event.name ? 'event: ' + event.name + '\n' : '') +
    dataize(event.data) +
    '\n\n'
  );
};

function dataize(string) {
  return string.split('\n').map(function (line) {
    return 'data: ' + line;
  }).join('\n');
}
