//@ts-check

require("dotenv").config();
let keys = require("./keys.js");
let Spotify = require('node-spotify-api');
let axios = require('axios');
let moment = require("moment");
let inquirer = require("inquirer");
let fs = require("fs");


let spotify = new Spotify(keys.spotify);
let bandsIT = keys.bandsInTown;
let OMDB = keys.OMDB;

// let searchType = process.argv[2].toLowerCase();
let searchType;
let searchParam;
let testFile;

function movieResults(data) {
    let movie = {};
    movie.title = data.Title;
    movie.year = data.Year;
    movie.IMDBrating = data.imdbRating;
    if (data.Ratings.length !== 0) {
        movie.rotten = data.Ratings[1].Value;
    }
    else {
        movie.rotten = "N/A";
    }
    movie.country = data.Country;
    movie.language = data.Language;
    movie.plot = data.Plot;
    movie.actors = data.Actors;

    console.log("\n\n");
    Object.keys(movie).forEach(function (key) {
        console.log(key.charAt(0).toUpperCase() + key.slice(1) + ": ", movie[key]); //capitalise the first letter of the object's key
    })
    console.log("\n");
}

//capitalise the first letter of each word in the band name
function titleCase() {
    let splitString = searchParam.split(' ');
    for (let i = 0; i < splitString.length; i++) {
        splitString[i] = splitString[i].charAt(0).toUpperCase() + splitString[i].slice(1);
    }
    return splitString.join(' '); 
}

function bandResults(data) {
    let allResults = [];
    data.forEach(function(arrayItem) {
        let concert = {};
        concert.date = moment(arrayItem.datetime).format("MM/DD/YYYY");
        concert.venue = arrayItem.venue.name;
        concert.location = arrayItem.venue.city + ", " + 
            arrayItem.venue.country;
            arrayItem.venue.city + " " + arrayItem.venue.country;
        allResults.push(concert);
    })
    console.log("\n\n");
    console.table(allResults);
    console.log("\n");
}


async function axiosReturn(url) {
    let data = []; //this was necessary to prevent UnhandledPromiseRejectionWarning
                   //but results in an array within an array that must handled below
                   //ie data must be passed as data[0]
    try {
        let response = await axios.get(url);
        data.push(response.data);
        if (searchType === "Find out about upcoming concerts for a band" && data[0].length !== 0) {
            bandResults(data[0]);
        }
        else if (searchType === "Find out about a movie" && data[0].length !== 0) {
            // console.log(data[0]);
            if (data[0].Error === undefined) { //no error from the query so proceed
                movieResults(data[0], searchParam);
            }
            else { //Error return parameter exists
                console.log("\n\n************************************************************\n" +
                data[0].Error + " Your search for was unable to find any matches. " +
                "\nfind any matches. Check your spelling and try again.\n" + 
                "************************************************************\n\n");
            }
        }
        else {
            if (searchType === "Find out about upcoming concerts for a band") {
                console.log("\n\nThere are no planned concerts for " + titleCase(searchParam) + ".\n");
            }
        }
    }
    catch (err) {
        console.log(err)
        if (err.response.status === 404  || err.response.status === 400) {
            console.log("\n\n******************************************************\n" +
                "Your search was unable to find any matches. Check your" +
                "\n spelling or enter a band name and try again.\n" + 
                "******************************************************\n\n");
        }
    }
} 

function spotifyThisSong () {
    console.log(searchParam);
    spotify.search({type: 'track', query: searchParam}, function(err, data) {
        if (err) {
            console.log("\n\n******************************************************\n" +
                "Your search was unable to find any matches. Check your" +
                "\nspelling or enter another song and try again.\n" + 
                "******************************************************\n\n");
        }
        else {
            console.log("\n\n" + data.tracks.items[0].album.artists[0].name);
            console.log(searchParam);
            console.log(data.tracks.items[0].preview_url);        
            console.log(data.tracks.items[0].album.name);
        }
    })
}

function searchP() {
    if (!testFile) {
        searchParam = process.argv.splice(2).join(' ');
    }
    else {
        searchParam = testFile[1];
    }
}

function whatToBeDone() {
    searchP();
    if (searchType === "Spotify a song") {
        spotifyThisSong(searchParam);
    } else if (searchType === "Find out about a movie") {
        if (searchParam === "") {
            searchParam = "Mr.Nobody";
        }
        let url = "http://www.omdbapi.com/?apikey=" + "trilogy" + "&t=" + searchParam;
        axiosReturn(url);
    } else if (searchType === "Find out about upcoming concerts for a band") {
        let url = "https://rest.bandsintown.com/artists/" + 
            searchParam + "/events?app_id=" + bandsIT + 
            "&date=upcoming";
        axiosReturn(url);
    } else if (searchType === "Something random") {
        fs.readFile('random.txt', 'utf8', (err, contents) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    console.error('random.txt does not exist');
                    return;
                }
                throw err;
            }
            testFile = contents.split(',');
            searchType = testFile[0];
            whatToBeDone();
        })
    }
}

function nextTask() {
    inquirer
        .prompt ([
            {
                type: "list",
                name: "whatYouWant",
                message: "\n\nWhat would you like to do?\n\n",
                choices: ["Spotify a song", "Find out about a movie", 
                    "Find out about upcoming concerts for a band", "Something random"],
                default: "Spotify a song"
            },
        ])
        .then(answers => {
            searchType = answers.whatYouWant;
            whatToBeDone();
        })
}

nextTask();