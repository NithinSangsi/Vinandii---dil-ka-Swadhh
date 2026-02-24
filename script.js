console.log("Welcome To My Spotify");

//initialize the variables
let songIndex=0;
let audioElement = new Audio(); // start with empty audio; we'll set src when a track is selected
let masterPlay = document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songDurations = []; // fallback durations parsed from HTML timestamps

let songs=[
    {songName:"Nanna Nuv Naa Pranam - Sonu Nigam (2023)",filePath:"songs/1.mp3",coverPath:"images/nanna logo.png"},
    {songName:"Prathikadalo",filePath:"songs/2.mp3",coverPath:"images/sallar 2 logo.png"},
    {songName:"Odiyamma",filePath:"songs/3.mp3",coverPath:"images/hi_nnanna_logo.png"},
    {songName:"Sooreede",filePath:"songs/4.mp3",coverPath:"images/salaar logo.png"},
    {songName:"Yaalo Yaalaa",filePath:"songs/5.mp3",coverPath:"images/animal_logo.png"},
    {songName:"Sound Of Salaar",filePath:"songs/6.mp3",coverPath:"images/SoS logo.png"},
]



//audioElement.play();

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    // parse timestamp for fallback duration
    const tsEl = element.getElementsByClassName('timestamp')[0];
    let fallback = 0;
    if(tsEl){
        const t = tsEl.innerText.trim();
        const parts = t.split(':').map(x=>parseInt(x,10));
        if(parts.length===2 && !isNaN(parts[0]) && !isNaN(parts[1])){
            fallback = parts[0]*60 + parts[1];
        }
    }
    songDurations[i] = fallback;
    // click cover to toggle play/pause like the icon button
    element.getElementsByTagName("img")[0].addEventListener('click', ()=>{
        const curIcon = document.getElementById(String(i));
        if(songIndex === i && !audioElement.paused && audioElement.currentTime>0){
            audioElement.pause();
            if(curIcon){ curIcon.classList.remove('fa-pause-circle'); curIcon.classList.add('fa-play-circle'); }
            masterPlay.classList.remove('fa-pause-circle'); masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else {
            makeAllPlays();
            songIndex = i;
            if(curIcon){ curIcon.classList.remove('fa-play-circle'); curIcon.classList.add('fa-pause-circle'); }
            playSongIndex(songIndex);
        }
    });
})

// Shuffle & Repeat
let shuffleBtn = document.getElementById('shuffle');
let repeatBtn = document.getElementById('repeat');
let repeatBadge = document.getElementById('repeatCount');
let isShuffle = false;
let repeatMode = 0; // 0=off, 1=once, 2=twice, 3=infinite

function playSongIndex(index){
    audioElement.src = `songs/${index+1}.mp3`;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    // show initial remaining time based on timestamp if available
    const fallback = (songDurations[index] && songDurations[index] > 0) ? songDurations[index] : 0;
    const timeEl = document.getElementById('timeRemaining');
    if(fallback > 0 && timeEl){ timeEl.innerText = formatTime(fallback); }
    // try to play and then update display
    audioElement.play().then(()=>{ updateTimeDisplay(); }).catch(()=>{ updateTimeDisplay(); });
}

if(shuffleBtn){
    shuffleBtn.addEventListener('click', ()=>{
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('active', isShuffle);
        shuffleBtn.title = isShuffle ? 'Shuffle: ON' : 'Shuffle: OFF';
    });
}

if(repeatBtn){
    repeatBtn.addEventListener('click', ()=>{
        repeatMode = (repeatMode + 1) % 4; // cycles 0->1->2->3->0
        updateRepeatUI();
    });
}

function updateRepeatUI(){
    if(!repeatBtn || !repeatBadge) return;
    repeatBtn.classList.toggle('active', repeatMode > 0);
    if(repeatMode === 0){
        repeatBadge.style.display = 'none';
        repeatBtn.title = 'Repeat: OFF';
    } else if(repeatMode === 3){
        repeatBadge.style.display = 'inline-block';
        repeatBadge.innerText = '∞';
        repeatBtn.title = 'Repeat: infinite';
    } else{
        repeatBadge.style.display = 'inline-block';
        repeatBadge.innerText = repeatMode;
        repeatBtn.title = `Repeat: ${repeatMode}`;
    }
}

// Volume and mute controls
let volumeControl = document.getElementById('volume');
let muteBtn = document.getElementById('muteBtn');
let lastVolume = 1;
if(volumeControl){
    audioElement.volume = volumeControl.value;
    volumeControl.addEventListener('input', ()=>{
        audioElement.volume = volumeControl.value;
        // swap icon when muted
        if(muteBtn){
            const icon = muteBtn.querySelector('i');
            if(audioElement.volume == 0){
                icon.classList.remove('fa-volume-up');
                icon.classList.add('fa-volume-mute');
            } else {
                icon.classList.remove('fa-volume-mute');
                icon.classList.add('fa-volume-up');
            }
        }
    });
}
if(muteBtn){
    muteBtn.addEventListener('click', ()=>{
        const icon = muteBtn.querySelector('i');
        if(audioElement.volume > 0){
            lastVolume = audioElement.volume;
            audioElement.volume = 0;
            if(volumeControl) volumeControl.value = 0;
            icon.classList.remove('fa-volume-up');
            icon.classList.add('fa-volume-mute');
        } else {
            audioElement.volume = lastVolume || 1;
            if(volumeControl) volumeControl.value = audioElement.volume;
            icon.classList.remove('fa-volume-mute');
            icon.classList.add('fa-volume-up');
        }
    });
}

// when song ends, handle repeat or move to next (or shuffle)
audioElement.addEventListener('ended', ()=>{
    if(repeatMode > 0 && repeatMode !== 3){
        // finite repeats: replay and decrement
        repeatMode -= 1;
        updateRepeatUI();
        audioElement.currentTime = 0;
        audioElement.play();
        return;
    } else if(repeatMode === 3){
        // infinite repeat of current track
        audioElement.currentTime = 0;
        audioElement.play();
        return;
    }

    // no repeat remaining - move to next track
    if(isShuffle){
        songIndex = Math.floor(Math.random() * songs.length);
    } else {
        songIndex = (songIndex + 1) % songs.length;
    }
    playSongIndex(songIndex);
});

// Updated next/previous to respect shuffle
document.getElementById('next').addEventListener('click', ()=>{
    if(isShuffle){
        songIndex = Math.floor(Math.random() * songs.length);
    } else{
        if(songIndex >= songs.length-1){ songIndex = 0 }
        else{ songIndex += 1; }
    }
    playSongIndex(songIndex);

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(isShuffle){
        songIndex = Math.floor(Math.random() * songs.length);
    } else{
        if(songIndex <= 0){ songIndex = songs.length-1 }
        else{ songIndex -= 1; }
    }
    playSongIndex(songIndex);

})


//Handle play/pause
// Handle play/pause. If no source is loaded, start the first song.
masterPlay.addEventListener('click', ()=>{
    // if no audio source yet, start first track
    if(!audioElement.src || audioElement.src === ""){
        makeAllPlays();
        songIndex = 0;
        const firstIcon = document.getElementById('0');
        if(firstIcon){ firstIcon.classList.remove('fa-play-circle'); firstIcon.classList.add('fa-pause-circle'); }
        playSongIndex(0);
        return;
    }

    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});
// helper to format seconds to mm:ss
function formatTime(s){
    if(!isFinite(s) || s<0) s = 0;
    s = Math.floor(s);
    const m = Math.floor(s/60);
    const sec = s % 60;
    return `${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
}

// Update progress and remaining time; prefer song-item timestamp as authoritative duration
function updateTimeDisplay(){
    const timeEl = document.getElementById('timeRemaining');
    const fallback = (songDurations[songIndex] && songDurations[songIndex] > 0) ? songDurations[songIndex] : 0;
    const durationToUse = (fallback > 0) ? fallback : ((isFinite(audioElement.duration) && audioElement.duration>0) ? audioElement.duration : 0);
    const remaining = Math.max(0, durationToUse - (audioElement.currentTime || 0));
    if(timeEl){ timeEl.innerText = formatTime(remaining); }
    if(durationToUse > 0){
        const progress = parseInt(((audioElement.currentTime || 0)/durationToUse)*100) || 0;
        myProgressBar.value = progress;
    } else {
        myProgressBar.value = 0;
    }
}

audioElement.addEventListener('timeupdate', updateTimeDisplay);
// when metadata loads, update display (but still use timestamp if available)
audioElement.addEventListener('loadedmetadata', ()=>{
    updateTimeDisplay();
})

myProgressBar.addEventListener('change',()=>{
    const fallback = (songDurations[songIndex] && songDurations[songIndex] > 0) ? songDurations[songIndex] : 0;
    const durationToUse = (fallback > 0) ? fallback : ((isFinite(audioElement.duration) && audioElement.duration>0) ? audioElement.duration : 0);
    if(durationToUse>0){
        audioElement.currentTime = myProgressBar.value * durationToUse/100;
    }
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        const idx = parseInt(e.target.id);
        const clicked = e.target;
        if(songIndex === idx && !audioElement.paused && audioElement.currentTime>0){
            // pause current
            audioElement.pause();
            clicked.classList.remove('fa-pause-circle');
            clicked.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else {
            makeAllPlays();
            songIndex = idx;
            clicked.classList.remove('fa-play-circle');
            clicked.classList.add('fa-pause-circle');
            playSongIndex(songIndex);
        }
    })
})

function updateTimeDisplay(){
  const timeEl = document.getElementById('timeRemaining');
  const fallback = (songDurations[songIndex] && songDurations[songIndex] > 0) ? songDurations[songIndex] : 0;
  const durationToUse = (fallback > 0) ? fallback : ((isFinite(audioElement.duration) && audioElement.duration>0) ? audioElement.duration : 0);

  // set progress bar to use seconds directly
  const durSec = Math.max(1, Math.round(durationToUse)); // ensure >=1
  if (myProgressBar.max != durSec) {
    myProgressBar.max = durSec;
    myProgressBar.step = 1; // 1 second steps
  }

  const remaining = Math.max(0, durationToUse - (audioElement.currentTime || 0));
  if (timeEl) timeEl.innerText = formatTime(remaining);

  // set value as current time in seconds (integer)
  myProgressBar.value = Math.floor(audioElement.currentTime || 0);
}// immediate seeking during drag
myProgressBar.addEventListener('input', () => {
  audioElement.currentTime = Number(myProgressBar.value);
  updateTimeDisplay();
});function playSongIndex(index){
  const fallback = (songDurations[index] && songDurations[index] > 0) ? songDurations[index] : 0;
  const initialMax = Math.max(1, Math.round(fallback || (isFinite(audioElement.duration) ? audioElement.duration : 1)));
  myProgressBar.max = initialMax;
  myProgressBar.step = 1;
  if (fallback > 0) document.getElementById('timeRemaining').innerText = formatTime(fallback);

  // rest of existing play logic:
  audioElement.src = `songs/${index+1}.mp3`;
  masterSongName.innerText = songs[index].songName;
  audioElement.currentTime = 0;
  gif.style.opacity = 1;
  masterPlay.classList.remove('fa-play-circle'); masterPlay.classList.add('fa-pause-circle');
  audioElement.play().then(()=>{ updateTimeDisplay(); }).catch(()=>{ updateTimeDisplay(); });
}audioElement.addEventListener('loadedmetadata', ()=>{
  if(!(songDurations[songIndex] && songDurations[songIndex] > 0)){
    const dur = Math.max(1, Math.round(audioElement.duration));
    myProgressBar.max = dur;
    myProgressBar.step = 1;
  }
  updateTimeDisplay();
});
