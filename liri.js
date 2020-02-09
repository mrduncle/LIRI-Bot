//@ts-checkts-check

require("dotenv").config();
let keys = require("./keys.js");
let Spotify = require('node-spotify-api');
let moment = require("moment");

let spotify = new Spotify(keys.spotify);

let searchType = process.argv[2];

// axios({
//     method: 'get',
//     url: 'http://bit.ly/2mTM3nY',
//     responseType: 'stream'
//   })
//     .then(function (response) {
//       response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
//     });


function spotifyThisSong (songTitle) {
    spotify.search({type: 'track', query: songTitle}, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(JSON.stringify(data));
        console.log("\n\n" + data.tracks.items[0].album.artists[0].name);
        console.log(songTitle);
        console.log(data.tracks.items[0].preview_url);        
        console.log(data.tracks.items[0].album.name);
    })
}


if (searchType === "Spotify") {
    let searchSong = process.argv.splice(3).join(' ');
    spotifyThisSong(searchSong);
} else if (searchType === "OMDB") {
    // OmdbThisMovie();
} else if (searchType === "SomeOtherType") {
    // Num2();
}

