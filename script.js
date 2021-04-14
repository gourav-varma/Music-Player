const musicContainer = document.querySelector(".music-container");
const btnPlay = document.querySelector("#play");
const btnPrev = document.querySelector("#prev");
const btnNext = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

// Song titles
const songs = ["The-Nights", "Wake-Me-Up", "Waiting-For-Love"];

// Keep track of the songs
let songIndex = 1;

// Initially loading song
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  let temp = song.replaceAll("-", " ");
  title.innerText = temp;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  btnPlay.querySelector("i.fas").classList.remove("fa-play");
  btnPlay.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  btnPlay.querySelector("i.fas").classList.remove("fa-pause");
  btnPlay.querySelector("i.fas").classList.add("fa-play");

  audio.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;     
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  // console.log(e.srcElement.duration);
  const {duration, currentTime} = e.srcElement;
  const progressPrecent = (currentTime/duration) * 100;
  progress.style.width = `${progressPrecent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

/////// Event listeners ///////

// play button
btnPlay.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// change songs
btnPrev.addEventListener("click", prevSong);
btnNext.addEventListener("click", nextSong);

// update progress
audio.addEventListener("timeupdate", updateProgress);

// progress change 
progressContainer.addEventListener("click", setProgress);

// song ends
audio.addEventListener('ended', nextSong);