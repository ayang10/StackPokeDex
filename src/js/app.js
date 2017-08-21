function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}
 
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}

// $('#submitButton').click(function (){
// // Adding loading GIF
//  $('#content').html('<img id="loader-img" alt="" src="http://adrian-design.com/images/loading.gif" width="100" height="100" align="center" />');
 
//  // Ajax Request
//  $.ajax({
//  type: "GET",
//  dataType: "json",
//  url: "https://api.github.com/users/sam",
//   success: function (loader) {
//  // This replace the retrieved data to the div after the setTimeOut function
//       setTimeout(function () {
//         $('#content').html('Hi I am ' + loader.login + '!' + 'From ' +loader.location).addClass('border');
//             }, 3000);
//         }
//     });
// });

$('#pokeball').hide();

$( "#submitButton" ).click(function() {

    // empty the listview
    $("#pokeDetails").empty();
    $('#pokeball').show();
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
            console.log(descriptionURI);
            pokeDescription = data2.description;
        });

        $.getJSON(pokeURL2, function(data3){
        
            var imageURI = data3.sprites.front_default;

            console.log("Number: ", pokeID);
            console.log("Name: ", pokeName);
            console.log("Type 1: ", pokeType1);
            console.log("Type 2: ", pokeType2);
            console.log("Description URI: ", descriptionURI);
            console.log("Description: ", pokeDescription);
            console.log("Image URI: ", imageURI);

            var div = "";
            div += '<div style="text-align: center;"><img src="' + imageURI + '" width="150" height="150">';
            div += '<h1>#' + pokeID + ' ' + pokeName + '</h1>';
            div += '<p>Type 1: ' + pokeType1 + '</p>';

            if (pokeType2 != null){
                div += '<p>Type 2: ' + pokeType2 + '</p>';
            }

            div += '<p>Description: ' + pokeDescription + '</p>';
            div += '</div>';

            $('#pokeball').hide();
            
            $("#pokeDetails").append(div);
            
        });

    })
    .fail(function() {
      $('#pokeball').hide();
      $('#error').html('<div class="alert alert-warning"><strong>Warning!</strong> Error.  Not a valid entry.</div>').fadeOut(3500);
  })

});