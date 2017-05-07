"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

/*
	errors tracking object
*/
var errors = exports.errors = {
	6: {
		5: "Request timeout",
		8: "Hit rate limit"
	},
	8: {
		1: "Not connected to chat",
		2: "Bad request"
	}
};

/*
	Requests
*/
var authenticate = exports.authenticate = function authenticate(request_id, api_key) {
	var request = {
		command: "Botapiauth.AuthenticateRequest",
		request_id: request_id,
		payload: {
			api_key: api_key
		}
	};

	return JSON.stringify(request);
};

var connect = exports.connect = function connect(request_id) {
	var request = {
		command: "Botapichat.ConnectRequest",
		request_id: request_id,
		payload: {}
	};

	return JSON.stringify(request);
};

var disconnect = exports.disconnect = function disconnect(request_id) {
	var request = {
		command: "Botapichat.DisconnectRequest",
		request_id: request_id,
		payload: {}
	};

	return JSON.stringify(request);
};

var sendMessage = exports.sendMessage = function sendMessage(request_id, message) {
	var request = {
		command: "Botapichat.DisconnectRequest",
		request_id: request_id,
		payload: {
			message: message
		}
	};

	return JSON.stringify(request);
};

var sendWhisper = exports.sendWhisper = function sendWhisper(request_id, message, user_id) {
	var request = {
		command: "Botapichat.DisconnectRequest",
		request_id: request_id,
		payload: {
			message: message,
			user_id: user_id
		}
	};

	return JSON.stringify(request);
};

/*
	Responses
*/
var readResponse = exports.readResponse = function readResponse(response) {
	var responseParsed = JSON.parse(response),
	    responseObject = {
		type: "",
		request_id: null,
		status: {
			area: null,
			code: null
		},
		payload: {}
	};

	switch (responseParsed.command) {
		case "Botapiauth.AuthenticateResponse":
			responseObject.type = "authenticate";

			break;
		case "Botapichat.ConnectResponse":
			responseObject.type = "connect";

			break;
		case "Botapichat.DisconnectResponse":
			responseObject.type = "disconnect";

			break;
	}

	responseObject.request_id = responseParsed.request_id;
	responseObject.status.area = responseParsed.status.area;
	responseObject.status.code = responseParsed.status.code;

	return responseObject;
};

/*
	Async events
*/
var readEvent = exports.readEvent = function readEvent(event) {
	var eventParsed = JSON.parse(event),
	    eventObject = {
		type: "",
		payload: {}
	};

	switch (eventParsed.command) {
		case "Botapichat.ConnectEventRequest":
			eventObject.type = "connect";
			eventObject.request_id = eventParsed.request_id;

			break;
		case "Botapichat.DisconnectEventRequest":
			eventObject.type = "disconnect";
			eventObject.request_id = eventParsed.request_id;

			break;
		case "Botapichat.MessageEventRequest":
			eventObject.type = "newMessage";

			break;
		case "Botapichat.UserUpdateEventRequest":
			eventObject.type = "userUpdate";

			break;
		case "Botapichat.UserLeaveEventRequest":
			eventObject.type = "userLeave";

			break;
	}

	eventObject.payload = eventParsed.payload;

	return eventObject;
};