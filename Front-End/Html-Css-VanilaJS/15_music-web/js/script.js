console.log("Let's write javascript");
let currentSong = new Audio();
let songPlay = false

async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/audio/");
  let res = await a.text();
  // console.log(res);

  let div = document.createElement("div");
  div.innerHTML = res;
  let as = div.getElementsByTagName("a");
  // console.log(as);

  let songs = [];
  for (let i = 0; i < as.length; i++) {
    const e = as[i];

    if (e.href.endsWith(".mp3") || e.href.endsWith(".m4a")) {
      songs.push(e.href.split("/audio/")[1]);
    }
  }

  return songs;
}


const playMusic = (audio, songPlay) => {

  // let music = new Audio(`/audio/${audio}`);
  currentSong.src = `/audio/${audio}`

  // if (songPlay) {
  //   currentSong.play()
  //     play.src = "img/pause.svg"
  // }

  // else {
  //   currentSong.pause()
  //   play.src = "img/play.svg"
  // }

  currentSong.play()
  play.src = "img/pause.svg"

  document.querySelector(".songinfo").innerHTML = `${audio}`
  document.querySelector(".songtime").innerHTML = `00:00/00:00`

    
};

async function main() {
  let songs = await getSongs();
  let firstSong = songs[0].replaceAll("%20", " ");
  currentSong.src = `audio/${firstSong}`
  document.querySelector(".songinfo").innerHTML = `${firstSong}`
  document.querySelector(".songtime").innerHTML = `00:00/00:00`
  // playMusic(firstSong, true)


  let songUl = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];

  for (let song of songs) {
    song = song.replaceAll("%20", " ");
    let artist = song.replaceAll("%20", " ").split("-")[1].split(".")[0];
    songUl.innerHTML =
      songUl.innerHTML +
      `<li>
        <img class="invert" src="img/music.svg" alt="music">
                            <div class="info">
                                <div class="mb-1">${song}</div>
                                <div>${artist}</div>
                            </div>
                            <div class="playnow">
                                <span>Play</span>
                                <img class="invert" src="img/play.svg" alt="play">

                            </div>
        </li>`;
  }

  Array.from(
    document.querySelector(".songList").getElementsByTagName("li")).forEach((e) => {
    e.addEventListener("click", (ele) => {
      // console.log(e.querySelector(".playnow").getElementsByTagName('img')[0]);
      let togglePlay = e.querySelector(".playnow").getElementsByTagName('img')[0]
      console.log(togglePlay);
      
      // togglePlay.src = 'img/pause.svg'
      // if (!songPlay) {
      //   songPlay = true
      // }
      
      // else {
      //   // togglePlay.src = 'img/play.svg'
      //   songPlay = false
      // }

      playMusic(e.querySelector(".info").firstElementChild.innerHTML, songPlay);
            
    })
  })

  play.addEventListener('click', () => {
    
    if (currentSong.paused) {
      currentSong.play()
      play.src = "img/pause.svg"
      songPlay = true
    }
    else {
      currentSong.pause()
      play.src = "img/play.svg"
      songPlay = false
    }

  })

    currentSong.addEventListener("timeupdate", (e) => {
      console.log(currentSong.currentTime, currentSong.duration);
      // document.querySelector(".songtime").innerHTML = `${secToMin(currentSong.currentTime)}/${secToMin(currentSong.duration)}`
      document.querySelector('.circle').style.left = (currentSong.currentTime / currentSong.duration) * 100 + '%'
      
    })

    

  document.querySelector('.seekbar').addEventListener('click', (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
    document.querySelector('.circle').style.left = percent + "%"
    currentSong.currentTime = (currentSong.duration * percent) / 100  
  })

  document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.left').style.left = 0
  })

  document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.left').style.left = -130+'%';
  })
  
}

main();
