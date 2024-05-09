var postMsg = ''

function postText(value){
	console.log('iFrame sender: ' + value) 
	parent.postMessage(value, "*")
}


const scriptsInEvents = {

	async Game_events_Event1_Act1(runtime, localVars)
	{
		runtime.globalVars.webSocket.onMessage = (event) => {
			if (event.data.startsWith('s:')){
				const score_ = event.data.split(':')[1];
				console.log(score_);
				runtime.globalVars.score = score_;
				runtime.callFunction("updateScore")
			}
		}
	},

	async Game_events_Event63_Act5(runtime, localVars)
	{
		let scoreBonus = runtime.globalVars.ScoreBonus;
		
		let formattedScoreBonus = `s:${scoreBonus}`;
		
		runtime.globalVars.ScoreToSend = runtime.globalVars.ScoreToSend+scoreBonus;
		console.log("final score to websocket: " + runtime.globalVars.ScoreToSend);
		console.log("final player score: " + runtime.globalVars.Score);
		
		runtime.globalVars.webSocket.send(formattedScoreBonus);
	},

	async Game_events_Event114_Act3(runtime, localVars)
	{
		let scoreBonus = runtime.globalVars.ScoreBonus;
		
		let formattedScoreBonus = `s:${scoreBonus}`;
		runtime.globalVars.ScoreToSend = runtime.globalVars.ScoreToSend+scoreBonus;
		console.log(runtime.globalVars.ScoreToSend);
		console.log("final score to websocket: " + runtime.globalVars.ScoreToSend);
		console.log("final player score: " + runtime.globalVars.Score);
		
		runtime.globalVars.webSocket.send(formattedScoreBonus);
	},

	async Game_events_Event121_Act1(runtime, localVars)
	{
		console.log("final score to websocket: " + runtime.globalVars.ScoreToSend);
		console.log("final player score: " + runtime.globalVars.Score);
	},

	async Game_events_Event121_Act2(runtime, localVars)
	{
		runtime.globalVars.webSocket.close();
	},

	async Game_events_Event121_Act3(runtime, localVars)
	{
		window.parent.postMessage("WebSocketClosed", "*");
	},

	async Main_events_Event8_Act1(runtime, localVars)
	{
		const queryParams = new URLSearchParams(window.location.search)
		const token = queryParams.get('token');
		const gameId = queryParams.get('gameId');
		console.log("clicked")
					const textInstance = runtime.objects.ErrorText.getFirstInstance()
					textInstance.text = "PLEASE WAIT..."
					const button = runtime.objects.BtnStart.getFirstInstance();
					button.destroy(); 
		// Add a variable to track if the WebSocket is already connected or in the process of connecting
		let isWebSocketConnectingOrConnected = false; 
					
		try {
		    // Check if the WebSocket is already connected or in the process of connecting
		    if (!isWebSocketConnectingOrConnected) {
		        const webSocket = new WebSocket('wss://arcade.shadow.legacyarcade.com/ws', [token, gameId]);
		        runtime.globalVars.webSocket = webSocket;
		
		        webSocket.onopen = (event) => {
		            isWebSocketConnectingOrConnected = true;  // Set the flag to true when connection is established
		            runtime.callFunction('startendless');
		        };
		
		        webSocket.onclose = (event) => {
		            isWebSocketConnectingOrConnected = false; // Reset the flag when the connection is closed
		        };
		
		        webSocket.onerror = (event) => {
		            isWebSocketConnectingOrConnected = false; // Reset the flag on error
		        };
		
		        runtime.globalVars.playable = 1;
		    }
		} catch (e) {
		    const textInstance = runtime.objects.ErrorText.getFirstInstance();
		    textInstance.text = "ERROR CONNECTING";
		    console.log("error connecting to server", e);
		}
		
		
		
		
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

