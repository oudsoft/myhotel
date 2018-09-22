
//importScripts(webworker);
importScripts("../../../resoureces/js/webworker/workerFakeDOM.js");
importScripts("../../../resoureces/js/webworker/jquery-3.2.1.js");
importScripts("../../../resoureces/js/webworker/jquery.cookie.js");


var connections = 0; // count active connections

self.addEventListener("connect", function (e) {

	var port = e.ports[0];
	connections++;

	port.addEventListener("message", function (e) {
		port.postMessage("Hello " + e.data + " (port #" + connections + ")");
		replyToClientMessage(event, port);
	}, false);

	port.start();

}, false);

replyToClientMessage = function (event, port) {
    port.postMessage(event.data);

}