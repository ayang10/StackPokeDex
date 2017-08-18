function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}
 
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}


function pokeSubmit(){
    var param = document.getElementById("pokeInput").value.toLowerCase();
    var pokeURL = "http://pokeapi.co/api/v1/pokemon/" + param;
    var pokeURL2 = "http://pokeapi.co/api/v2/pokemon/" + param;

    $.getJSON(pokeURL, function(data){
        //console.log(data);
        var pokeID = data.national_id;
        var pokeName = data.name;
        var pokeType1 = data.types[0].name;
        if (data.types.length == 2) {
            var pokeType2 = data.types[1].name;
        }
        else var pokeType2 = null;
        var descriptionURI = "http://pokeapi.co" + data.descriptions[0].resource_uri;
        var pokeDescription = "";

        $.getJSON(descriptionURI, function(data2){
            //console.log(data2);
            pokeDescription = data2.description;
        });

        $.getJSON(pokeURL2, function(data3){
            //console.log(data3);

             //console.log(JSON.stringify(data, null, "  "));
            var imageURI = data3.sprites.front_default;

            console.log("Number: ", pokeID);
            console.log("Name: ", pokeName);
            console.log("Type 1: ", pokeType1);
            console.log("Type 2: ", pokeType2);
            console.log("Description URI: ", descriptionURI);
            console.log("Description: ", pokeDescription);
            console.log("Image URI: ", imageURI);

            // append data to HTML
            // empty string to hold HTML
            var div = "";
            div += '<div style="text-align: center;"><img src="' + imageURI + '" width="150" height="150">';
            div += '<h1>#' + pokeID + ' ' + pokeName + '</h1>';
            div += '<p>Type 1: ' + pokeType1 + '</p>';

            // only display Type 2 if it is not null
            if (pokeType2 != null){
                div += '<p>Type 2: ' + pokeType2 + '</p>';
            }

            div += '<p>' + pokeDescription + '</p>';
            div += '</div>';

            // empty the listview
            $("#pokeDetails").empty();

            // append new li to listview
            $("#pokeDetails").append(div);

        });

    });
}