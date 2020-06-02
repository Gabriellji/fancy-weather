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
				// const input = document.querySelector('#input-7');
				// input.focus();
				// input.value = transcript;

				const searchResult = document.querySelector('.err');
				searchResult.style.display = 'unset';
				searchResult.classList.add('tracking-in-expand-fwd');
				searchResult.textContent = `Searching for ${transcript}...`;
				setTimeout(() => {
					searchResult.style.display = 'none';
					searchResult.textContent = '';
				}, 7000);
				if (e.results[0].isFinal) {
					return resolve(transcript);
				}
				// if (transcript.contains('play')) {

				// }
			});
			recognition.start();
		});
	},
};

export default speechRecognition;
