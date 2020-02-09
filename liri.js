//@ts-checkts-check

require("dotenv").config();
let keys = require("./keys.js");
let Spotify = require('node-spotify-api');
let axios = require('axios');
let moment = require("moment");


let spotify = new Spotify(keys.spotify);
let bandsIT = keys.bandsInTown;

let searchType = process.argv[2].toLowerCase();

async function axiosReturn(url) {
    let response = await axios.get(url);
    let data = response.data;
    console.log(JSON.stringify(data));        
} 

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

if (searchType === "spotify") {
    let searchSong = process.argv.splice(3).join(' ');
    spotifyThisSong(searchSong);
} else if (searchType === "omdb") {
    // OmdbThisMovie();
} else if (searchType === "bands") {
    let searchArtist = process.argv.splice(3).join(' ');
    let url = "https://rest.bandsintown.com/artists/" + searchArtist + "?app_id=" + bandsIT;
    axiosReturn(url);
}

