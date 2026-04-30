console.log("Let's write javascript");
let currentSong = new Audio();
let songPlay = false
let currFolder;
let songs;

function secToMin (sec) {
  if (isNaN(sec) || sec < 0) {
    return '00:00'
  }

  const min = Math.floor(sec / 60)
  const remainSec = Math.floor(sec % 60)

  const formattedMin = String(min).padStart(2, '0')
  const formattedSec = String(remainSec).padStart(2, '0')

  return `${formattedMin}:${formattedSec}`
  
}

async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`/${folder}/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3") || element.href.endsWith(".m4a")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }
 


    // Show all the songs in the playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" width="34" src="img/music.svg" alt="">
                            <div class="info">
                                <div> ${decodeURI(song)}</div>
                                <div>Harry</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div> </li>`;
    }

    // Attach an event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
          let track = e.querySelector(".info").firstElementChild.innerHTML.trim()
            playMusic(track)
            // console.log("this is log", e.querySelector(".info").firstElementChild.innerHTML.trim())
            console.log("this is log", decodeURI(track))
            console.log('this is song', decodeURI(songs[0]));
            

        })
    })

    return songs
}


const playMusic = (track, pause = false) => {
    currentSong.src = `/${currFolder}/` + track
    if (!pause) {
        currentSong.play()
        play.src = "img/pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"


}

async function displayAlbums() {
  console.log('Albums Displayed');

  let a = await fetch(`/audio`)
  let res = await a.text()
  let div = document.createElement('div')
  div.innerHTML = res
  let anchors = div.getElementsByTagName('a')
  let cardContainer = document.querySelector('.cardContainer')
  let array = Array.from(anchors)
  for (let i = 2; i < array.length; i++) {
    const e = array[i];
    // console.log(e);
    
    if (e.href.includes('/audio') && !e.href.includes('.htaccess')) {
      let folder = e.href.split('/').slice(-1)[0]      
      console.log(e.href.split('/').slice(-1)[0])
      

      //get data
      let a = await fetch(`audio/${folder}/`)
      let res = await a.text();    

      cardContainer.innerHTML = cardContainer.innerHTML + `
      <div data-folder="${folder}" class="card">
            <img src="img/color-folder.svg" alt="img">
            <h2 style="font-size: 20px; text-align: center; color: #aaa7a7;">${folder}</h2>
       </div>
      `
    }
  
  }

  // click a library to load song
  Array.from(document.getElementsByClassName('card')).forEach((e) => {
    e.addEventListener('click', async (item) => {
    songs = await getSongs(`audio/${item.currentTarget.dataset.folder}`);
    // console.log("All songs", songs);
    if (songs[0] !== undefined) {
      playMusic(songs[0])
    }

    else {
      let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
      songUL.innerHTML = ""
      songUL.innerHTML = songUL.innerHTML + `
      <li style="color: red; font-size: 20px; display: flex; align-item: center; justify-content: center; height: 60vh; border: none;"><div>Error: Your folder has no mp3 songs!!!</div></li>                  
      `;
    }
    
    })
  })

}

async function main() {

  // await getSongs
  // playMusic(songs[0], songPlay)

  // try {
  //   await getSongs('audio/ncs')
  //   playMusic(songs[0], songPlay)
  // } catch (error) {
  //   console.log(error);
  // }
  
  // Display albums
  await displayAlbums()

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
      // console.log(currentSong.currentTime, currentSong.duration);
      document.querySelector(".songtime").innerHTML = `${secToMin(currentSong.currentTime)}/${secToMin(currentSong.duration)}`
      document.querySelector('.circle').style.left = (currentSong.currentTime / currentSong.duration) * 100 + '%'
      
    })

    
  // seekbar
  document.querySelector('.seekbar').addEventListener('click', (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
    document.querySelector('.circle').style.left = percent + "%"
    currentSong.currentTime = (currentSong.duration * percent) / 100  
  })

  // hamburger and close icon show and hide
  document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.left').style.left = 0
  })

  document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.left').style.left = -130+'%';
  })

  // previous song
  previous.addEventListener('click', () => {
    currentSong.pause()

    let index = songs.indexOf(currentSong.src.split('/').splice(-1)[0])
    if ((index - 1) >= 0) {
      playMusic(songs[index - 1])
    }

    else {
      playMusic(songs[songs.length - 1])
    }
    
  })

  // next song
  next.addEventListener('click', () => {
    currentSong.pause()

    let index = songs.indexOf(currentSong.src.split('/').splice(-1)[0])
    if ((index + 1) < songs.length ) {
      playMusic(songs[index + 1])
    }

    else {
      playMusic(songs[0])
    }
  
  })

  // volume up-down
  document.querySelector('.range').getElementsByTagName('input')[0].addEventListener('change', (e) => {
    currentSong.volume = parseInt(e.target.value) / 100

    if (currentSong.volume > 0) {
      document.querySelector('.volume>img').src = document.querySelector('.volume>img').src.replace("mute.svg", "volume.svg")
    }
    
  })

  //volume mute
  document.querySelector('.volume>img').addEventListener('click', (e) => {

    if (e.target.src.includes('volume.svg')) {
      e.target.src = e.target.src.replace('volume.svg', 'mute.svg')
      currentSong.volume = 0;
      document.querySelector('.range').getElementsByTagName('input')[0].value = 0;
    }
    
    else {
      e.target.src = e.target.src.replace('mute.svg', 'volume.svg')
      currentSong.volume = .10;
      document.querySelector('.range').getElementsByTagName('input')[0].value = 10;
    }
    
  })
  
}


main();
