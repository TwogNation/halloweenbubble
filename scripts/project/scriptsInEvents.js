var postMsg = ''

function postText(value){
	console.log('iFrame sender: ' + value) 
	parent.postMessage(value, "*")
}


const scriptsInEvents = {

		async Game_events_Event118_Act3(runtime, localVars)
		{
			postText(runtime.globalVars.finalScore)
		}

};

self.C3.ScriptsInEvents = scriptsInEvents;

