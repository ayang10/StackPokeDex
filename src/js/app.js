$(document).ready(function () {

    $(".pokeContainer, #pokeball").hide();

    $( "#submitButton" ).on("click", PokeDex);

    $( "#randomSearch" ).on("click", PokeDex);

    $("#pokeInput").keyup(function(e) {
        if (e.keyCode == 13) {
            PokeDex();
        }
    })

    function PokeDex(button, num) {
        var pokemon = num;
        // empty the listview
        $(".pokeContainer, #pokeball").show();
        var param = '';

        if (button === 'previous'){
            param = pokemon - 1;
        }
        else if (button === 'next'){
            param = pokemon + 1;
        }
        else if($(this).attr('id') === 'submitButton' || $(this).attr('id') === undefined){
            param = document.getElementById('pokeInput').value.toLowerCase();
        }
        else{
            param = Math.floor(Math.random() * 718) + 1;
        }
        pokemon = param;
        console.log(pokemon);
        var pokeURL = "http://pokeapi.co/api/v1/pokemon/" + param;
        var pokeURL2 = "http://pokeapi.co/api/v2/pokemon/" + param;

        if(param === '') {
        $(".pokeContainer, #pokeball").hide();
        $("#error").html('<div class="alert alert-warning"><strong>Warning!</strong> Error.  There was no entry.</div>').fadeOut(3500);
        }
        else{
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
            // console.log('hello', descriptionURI);

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

                var div = '';
                div += '<div style="text-align: center;"><img src="' + imageURI + '" width="150" height="150">';
                div += '<h1>#' + pokeID + ' ' + pokeName + '</h1>';
                div += '<p>Type 1: ' + pokeType1 + '</p>';

                if (pokeType2 != null){
                    div += '<p>Type 2: ' + pokeType2 + '</p>';
                }

                div += '<p>Description: ' + pokeDescription + '</p>';
                div += '</div>';

                $(".pokeContainer, #pokeball").hide();
                
                PokemonModal(div, pokeID);
            
            });

        })
        .fail(function() {
        $(".pokeContainer, #pokeball").hide();
        $("#error").html('<div class="alert alert-warning"><strong>Warning!</strong> Error.  Not a valid entry.</div>').fadeOut(3500);
    })
        }
    }

    function PokemonModal(details, pokemon) {

        bootbox.dialog({
                message: details,
                onEscape: function() { console.log("Escape!"); },
                backdrop: true,
                buttons: {
                    confirm: {
                        label: "Previous",
                        className: 'btn-danger btn-previous',
                        callback: function(){
                           PokeDex('previous', pokemon);
                        }
                    },
                    ok: {
                        label: "Next",
                        className: 'btn-info',
                        callback: function(){
                            if(pokemon === 718){
                                return false;
                            }
                            else{
                            PokeDex('next', pokemon);
                            }
                        }
                    }
                }
                });  $(".btn-previous").attr("id", "previous");
    }

});