# LIRI-Bot
**Purpose:**

This application provides information to a user after they enter the title of a song, title of a movie or name of a singer/band then choose the appropriate option from a list to execute the program. 

**App Instructions:**
1. Intiating the node application by typing _node liri.js <<title of movie, title of song, name of singer/band or nothing>>_ in the terminal. The user is then presented with a list of options from which they must choose the appropriate option to match their input when the program is invoked.

So for a song "Thunder", the user subsequently chooses "Spotify a song" from the list of options available. For a movie "Kill Bill" they subsequently choose "Find out about a movie" from the list of options available.

The table below demonstrates example inputs and outputs for the various options available in the program:

<table border="1">
    <thead>
        <tr>
            <th>What is happening?</th>
            <th>Application invocation</th>
            <th>Selection from options list</th>
            <th>Interim results</th>
            <th>Final results</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Research a song</td>
            <td>node liri thunder</td>
            <td>Spotify a song</td>
            <td><img src="images/Song interim.png" alt="Spotify a song interim"></td>
            <td><img src="images/Song success.png" alt="Spotify a song success"></td>
        </tr>
        <tr>
            <td>Research a movie</td>
            <td>node liri zootopia</td>
            <td>Find out about a movie</td>
            <td><img src="images/Movie interim.png" alt="Research a movie interim"></td>
            <td><img src="images/Movie success.png" alt="Research a movie success"></td>
        </tr>
        <tr>
            <td>Research a band or singer</td>
            <td>node liri tash sultana</td>
            <td>Find out about upcoming concerts for a band</td>
            <td><img src="images/Concert interim.png" alt="Research upcoming concerts interim"></td>
            <td><img src="images/Concert success.png" alt="Research upcoming concerts success"></td>
        </tr>
        <tr>
            <td>Run something random</td>
            <td>node liri</td>
            <td>Something random</td>
            <td><img src="images/Something random interim.png" alt="Generate something random interim"></td>
            <td><img src="images/Something random success.png" alt="Generate something random success"></td>
        </tr>
    </tbody>
</table>


 


