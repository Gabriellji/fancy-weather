import state from '../state/state';

const speechRecognition = {
	state,

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
				recognition.lang = this.state.getter('control.lang') === 'en'
					? 'en-US' : 'ru-RU';
			} catch (err) {
				reject(new Error('Браузер не поддерживает данную технологию'));
			}


			recognition.addEventListener('result', (e) => {
				const transcript = Array.from(e.results)
					.map((result) => result[0].transcript)
					.join('');

				if (e.results[0].isFinal) {
					return resolve(transcript);
				}
			});
			recognition.start();
		});
	},
};

export default speechRecognition;
