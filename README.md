
<p align="center">
  <img src="https://github.com/NithinSangsi/Vinandii---dil-ka-Swadhh/blob/0cd34372f1d8281eeb5a5f5e752aae054eca4a69/images/bg.webp" alt="Vinandiii Logo" width="150" height="150"/>
</p>
<h2 align="center">
    🎶 Vinandii - dill ka Swadhhh
</h2>

---
📂 Project Structure

    ├── index.html      # Main HTML structure
    ├── style.css       # Styling (UI design, layout, responsiveness)
    ├── script.js       # Core functionality (play, pause, next, previous, progress bar)
    ├── songs/          # Folder containing all .mp3 audio files
    ├── MP4/            # short videos     
    └── images/         # Album covers, background images, and icons
    

# Vinandii Features

  🎵 Play / Pause songs with a single click

  ⏮️⏭️ Previous / Next buttons to switch between tracks

  🔀🔂 Shuffle / replay (1,2, and infinte times)

  📀 Playlist view with song names, durations, and album art

  📊 Progress bar to seek through a song and sounf adjustement progress bar

  🎬 Animated GIF when music is playing


# How It Works (Code Focus)

  script.js initializes an Audio object and manages song playback.
  
  Event listeners handle play, pause, progress updates, and seeking.
  
  The function makeAllPlays() ensures only one song plays at a time.
  
  The playlist is defined in a JavaScript array with songName, filePath, and coverPath.
  
  Clicking a song updates the current index, loads the new file, and starts playback.

# Getting Started
 
1. Clone the Repository

          git clone https://github.com/NithinSangsi/Vinandii---dil-ka-Swadhh.git

2. Add Songs & Images

   Place all .mp3 files inside the songs/ folder.

   Place all album cover images inside the images/ folder.

3. Open in Browser

   Just open index.html in your browser (Live Server).

# 📸 Demo Screenshot

  ![image alt](https://github.com/NithinSangsi/Vinandii---dil-ka-Swadhh/blob/16db21b4057980d2cb6f6d2d5c437b66483d630b/Vinandii.png)

 
# NOTE :

  Update the songs[]  array in script.js to match your own songs.

  Ensure that the songs/ and images/ paths are correct.

  Works best on modern browsers (Chrome, Edge).

# Future Enhancements  
  (like shuffle ✅, repeat ✅, volume control ✅,playlist from API) so it looks more professional on GitHub?
