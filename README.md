
<p align="center">
  <img src="https://github.com/NithinSangsi/JillaPulse/blob/0f82a2460047af3dee98d5b106b3b9f45cb7bd28/frontend/src/assets/JP.png" alt="JillaPulse Logo" width="150" height="150"/>
</p>

<h2 align="center">
    🎶 Vinandii - dill ka Swadhhh
</h2>

This very Simple Task helped me gain the Knowlegde of the Html,Css and the JavaScript.

📂 Project Structure

    ├── vinandii.html      # Main HTML structure
    ├── vinandii.css       # Styling (UI design, layout, responsiveness)
    ├── vinandii.js        # Core functionality (play, pause, next, previous, progress bar)
    ├── songs/             # Folder containing all .mp3 audio files
    └── images/            # Album covers, background images, and icons

# Vinandii Features

  🎵 Play / Pause songs with a single click

  ⏮️⏭️ Previous / Next buttons to switch between tracks

  📀 Playlist view with song names, durations, and album art

  📊 Progress bar to seek through a song

  🎬 Animated GIF when music is playing


# How It Works (Code Focus)

  vinandii.js initializes an Audio object and manages song playback.
  
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

   Just open vinandii.html in your browser.

# 📸 Demo Screenshot

  ![image alt](https://github.com/NithinSangsi/Vinandii---dil-ka-Swadhh/blob/719e16f2180f8a23f49f4d7b88d40faf734fcb38/Screenshot%202025-09-02%20163808.png)

 
# NOTE :

  Update the songs[]  array in vinandii.js to match your own songs.

  Ensure that the songs/ and images/ paths are correct.

  Works best on modern browsers (Chrome, Edge).

# Future Enhancements  
  (like shuffle, repeat, volume control, playlist from API) so it looks more professional on GitHub?
