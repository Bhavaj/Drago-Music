async function getSongs() {
  const url = "http://127.0.0.1:5500/songs";

  const response = await fetch(url);

  const text = await response.text();

  let newDiv = document.createElement("div");

  newDiv.innerHTML = text;

  console.log(newDiv);

  let songs = [];
  let songlinks = newDiv.getElementsByTagName("a");
  console.log(songlinks);

for (const element of songlinks) {

    if(element.href.endsWith(".mp3")){
        songs.push(element.href)

        let songfakename = element.href;
        let songrealname = songfakename.split("/songs/");


        let songfinalname = songrealname[1].split("%20").join(" ");
        let leftsongdiv = document.createElement("div");
        leftsongdiv.innerHTML = songfinalname;

        let songslist = document.getElementById("songslist");
        songslist.appendChild(leftsongdiv);


    }
    
}

return songs
}


async function main(){

    let songs = await getSongs();
    console.log(songs)

}

main();


