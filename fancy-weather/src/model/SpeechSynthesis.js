// const msg = new SpeechSynthesisUtterance();
// let voices = [];
// const voicesDropdown = document.querySelector('[nae="voice"]');
// const speakButton = document.querySelector('.btn-volume-start');
// const stopButton = document.querySelector('.btn-volume-stop');
// msg.text = '';

// function populateVoices() {
// 	voices = this.getVoices;
// 	voicesDropdown.innerHTML = voices
// 		.map((voice) => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
// 		.join('');
// }

// function setVoice() {
//     msg.voice = voices.find((voice)) = voice.name === this.value);
//     toggle();
// }

// function toggle(startOver = true) {
//     speechSynthesis.cancel();
//     speechSynthesis.speack(msg);
//     if(startOver) {
//         speechSynthesis.speak(msg);
//     }
// }

// speechSynthesis.addEventListener('voiceschanged', populateVoices);
// voicesDropdown.addEventListener('change', setVoice);
