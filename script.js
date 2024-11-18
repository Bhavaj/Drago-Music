// function to display songs on the left side div
var currentSong = new Audio("/songs/A Thousand Miles.mp3");
async function getSongs() {
  const url = "http://127.0.0.1:5500/songs";

  const response = await fetch(url);

  const text = await response.text();

  let newDiv = document.createElement("div");

  newDiv.innerHTML = text;



  let songs = [];
  let songlinks = newDiv.getElementsByTagName("a");


  for (const element of songlinks) {
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href);

      let songfakename = element.href;
      let songrealname = songfakename.split("/songs/");

      let songfinalname = songrealname[1].split("%20").join(" ");
      let leftsongdiv = document.createElement("div");
      leftsongdiv.innerHTML = songfinalname;

      leftsongdiv.className = "leftsongdiv invert";

      leftsongdiv.style.border = "2px solid white";
      leftsongdiv.style.padding = "20px";
      leftsongdiv.style.margin = "10px";
      leftsongdiv.style.cursor = "pointer";

      let songslist = document.getElementById("songslist");
      let songsplay = document.createElement("img");

      songsplay.src = "play.svg";
      songslist.appendChild(leftsongdiv);
      leftsongdiv.appendChild(songsplay);
    }
  }

  return songs;
}

async function main() {
  let songs = await getSongs();
 
   
 

   currentSong.addEventListener('timeupdate', () => {
    let percent = Math.ceil((currentSong.currentTime/currentSong.duration) * (100)) + "%"

       if (!currentSong.paused && !currentSong.ended) {
           document.getElementById("seekbutton").style.left = percent;
       }
   });
   

  playSong();
  

  
}
 function playSong() {

   
    

    // playing songs from the playbar
  let playbutton = document.getElementById("playbutton");
  console.log(playbutton.src);

  

  playbutton.addEventListener("click", (e) => {
    
    
    

    if (playbutton.src == "http://127.0.0.1:5500/play.svg") {
      
        
      

      currentSong.play();
      playbutton.src = "http://127.0.0.1:5500/pause.svg";
      console.log(currentSong.played);

    } 

    else{
        playbutton.src = "http://127.0.0.1:5500/play.svg";

        currentSong.pause();
        console.log(currentSong.played);
  
        document.querySelectorAll(".leftsongdiv").forEach((button) => {
          button.childNodes[1].src = "http://127.0.0.1:5500/play.svg";
        });


    }


     
    

    
  });

  // playing songs from the left side div

  document.querySelectorAll(".leftsongdiv").forEach((button) => {
    button.onclick = function () {
      // rest of code
      let leftplayorpause = button.childNodes[1];
      currentSong.src = "/songs/" + button.innerText;

      if (leftplayorpause.src == "http://127.0.0.1:5500/play.svg") {
        playbutton.src = "http://127.0.0.1:5500/pause.svg";
        leftplayorpause.src = "http://127.0.0.1:5500/pause.svg";
        currentSong.play();
        console.log("bhaai")
      } else if (leftplayorpause.src == "http://127.0.0.1:5500/pause.svg") {
        playbutton.src = "http://127.0.0.1:5500/play.svg";
        leftplayorpause.src = "http://127.0.0.1:5500/play.svg";
        currentSong.pause();
      }
    };
  });
  

  

 

}


main();
