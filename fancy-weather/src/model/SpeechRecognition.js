
// window.SpeechRecognition = window.SpeechRecognition || window.webkit.SpeechRecognition;

// const recognition = new SpeechRecognition();
// recognition.interimResults = true;

// const value = document.querySelector('#input-7');

// recognition.addEventListener('result', (e) => {
// 	const transcript = Array.from(e.results)
// 		.map((result) => result[0])
// 		.map((result) => result.transcript)
// 		.join('');

// 	value.textContent = transcript;
// 	if (e.results[0].isFinal) {
// 		// this.model.searchCity(this.input.value);
// 		console.log(transcript);
// 	}
// });

// recognition.addEventListener('end', recognition.start);

// document.querySelector('.btn-voice').addEventListener('click', () => {
// 	recognition.start();
// 	console.log('specc');
// });
