
/*
	errors tracking object
*/
export let errors = {
	6: {
		5: `Request timeout`,
		8: `Hit rate limit`
	},
	8: {
		1: `Not connected to chat`,
		2: `Bad request`
	}
};

/*
	Requests
*/
export let authenticate = (request_id, api_key) => {
	let request = {
		command: `Botapiauth.AuthenticateRequest`,
		request_id,
		payload: {
			api_key
		}
	};

	return JSON.stringify(request);
}

export let connect = (request_id) => {
	let request = {
		command: `Botapichat.ConnectRequest`,
		request_id,
		payload: {}
	};

	return JSON.stringify(request);
}

export let disconnect = (request_id) => {
	let request = {
		command: `Botapichat.DisconnectRequest`,
		request_id,
		payload: {}
	};

	return JSON.stringify(request);
}

export let sendMessage = (request_id, message) => {
	let request = {
		command: `Botapichat.DisconnectRequest`,
		request_id,
		payload: {
			message
		}
	};

	return JSON.stringify(request);
}

export let sendWhisper = (request_id, message, user_id) => {
	let request = {
		command: `Botapichat.DisconnectRequest`,
		request_id,
		payload: {
			message,
			user_id
		}
	};

	return JSON.stringify(request);
}

/*
	Responses
*/
export let readResponse = (response) => {
	let responseParsed = JSON.parse(response), responseObject = {
		type: ``,
		request_id: null,
		status: {
			area: null,
			code: null
		},
		payload: {}
	};

	switch(responseParsed.command){
		case(`Botapiauth.AuthenticateResponse`):
			responseObject.type = `authenticate`;

			break;
		case(`Botapichat.ConnectResponse`):
			responseObject.type = `connect`;

			break;
		case(`Botapichat.DisconnectResponse`):
			responseObject.type = `disconnect`;

			break;
	}

	responseObject.request_id = responseParsed.request_id;
	responseObject.status.area = responseParsed.status.area;
	responseObject.status.code = responseParsed.status.code;

	return responseObject;
}

/*
	Async events
*/
export let readEvent = (event) => {
	let eventParsed = JSON.parse(event), eventObject = {
		type: ``,
		payload: {}
	};

	switch(eventParsed.command){
		case(`Botapichat.ConnectEventRequest`):
			eventObject.type = `connect`;
			eventObject.request_id = eventParsed.request_id;

			break;
		case(`Botapichat.DisconnectEventRequest`):
			eventObject.type = `disconnect`;
			eventObject.request_id = eventParsed.request_id;

			break;
		case(`Botapichat.MessageEventRequest`):
			eventObject.type = `newMessage`;

			break;
		case(`Botapichat.UserUpdateEventRequest`):
			eventObject.type = `userUpdate`;

			break;
		case(`Botapichat.UserLeaveEventRequest`):
			eventObject.type = `userLeave`;

			break;
	}

	eventObject.payload = eventParsed.payload;

	return eventObject;
}