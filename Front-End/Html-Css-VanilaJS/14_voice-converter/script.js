let speech = new SpeechSynthesisUtterance();

let voices = []

const playBtn = document.getElementById("play-btn")
const voiceSelect = document.getElementById("voice-select")
const userText = document.getElementById("user-text")

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices()
    speech.voice = voices[0]

    voices.forEach((voice, i) => ((voiceSelect.options[i]) = new Option(voice.name, i)))   
}

voiceSelect.addEventListener('change', () => {
    speech.voice = voices[voiceSelect.value]
})


playBtn.addEventListener('click', () => {
    speech.text = userText.value
    window.speechSynthesis.speak(speech)
})