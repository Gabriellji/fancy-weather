
const speechRecognition = {
	getSpeech() {
		return new Promise((resolve, reject) => {
			let recognition = {};
			try {
				recognition = new (
					window.SpeechRecognition
                    || window.webkitSpeechRecognition
                    || window.mozSpeechRecognition
                    || window.msSpeechRecognition
				)();
			} catch (err) {
				reject(new Error('Браузер не поддерживает данную технологию'));
			}

			

			recognition.addEventListener('result', (e) => {
				const transcript = Array.from(e.results)
					.map((result) => result[0].transcript)
					.join('');
				console.log(transcript);

				if (e.results[0].isFinal) {
					return resolve(transcript);
				}
            });
            recognition.start();
		});
	},
};

export default speechRecognition;
