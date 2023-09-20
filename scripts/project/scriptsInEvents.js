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

	async Game_events_Event61_Act2(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:10")
	},

	async Game_events_Event61_Act3(runtime, localVars)
	{
		console.log(runtime.globalVars.ScoreBonus)
	},

	async Game_events_Event64_Act4(runtime, localVars)
	{
		console.log(runtime.globalVars.ScoreBonus)
	},

	async Game_events_Event64_Act5(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:ScoreBonus")
	},

	async Game_events_Event114_Act3(runtime, localVars)
	{
		console.log(runtime.globalVars.ScoreBonus)
	},

	async Game_events_Event114_Act4(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:ScoreBonus")
	},

	async Game_events_Event119_Act3(runtime, localVars)
	{
		runtime.globalVars.webSocket.close();
	},

	async Game_events_Event119_Act4(runtime, localVars)
	{
		window.parent.postMessage("WebSocketClosed", "*");
	},

	async Main_events_Event8_Act1(runtime, localVars)
	{
		const queryParams = new URLSearchParams(window.location.search)
		const token = queryParams.get('token');
		const gameId = queryParams.get('gameId');
		
		try{
			const webSocket = new WebSocket('wss://arcade.stage.legacyarcade.com/ws', [token,gameId]);
			runtime.globalVars.webSocket = webSocket;
			webSocket.onopen = (event) =>{
				runtime.callFunction('startendless');
			}; 
		}catch(e){
			const textInstance = runtime.objects.ErrorText.getFirstInstance()
			textInstance.text = "ERROR CONNECTING"
			console.log("error connecting to server", e)
		}
		
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

