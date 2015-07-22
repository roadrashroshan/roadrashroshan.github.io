$(document).ready(function() {
    console.log(checkBtn);
    /* We hide the information menu from the user before any search is done */
    $(".heading").hide();
    /* Function to fix casing on strings */
    var fixCasing = function(str) {
        str = str.toLowerCase();
        str[0] = str[0].toUpperCase();
        for (var i = 1; i < str.length; i++) {
            if (str[i-1] === " ") {
                str[i] = str[i].toUpperCase();
            }
        }
        return str;
    }
    /* This function will handle the task of searching information from the openFDA API */
    var searchFDA = function() {
         /* Getting the wanted search term */
    	var toAdd = $("#searchValue").val();
        
        /* Grabbing data from the JSON on the SPL of the drug */
		var jqxhr = $.getJSON("https://api.fda.gov/drug/label.json?search=brand_name:"+toAdd, function(data) {
            var brand, generic, purpose, activeIngredient, warnings, instructs = "No information found on instructions.";
            
            /* Checking if the information is in the JSON and then displaying it */
            /* Displaying the instructions for the user */
            (data.results[0].description) ? 
                instructs = data.results[0].description+"" : instructs += "";
            (data.results[0].indications_and_usage) ? 
                instructs += data.results[0].indications_and_usage+"" : instructs+="";
            (data.results[0].instructions_for_use) ? 
                instructs += data.results[0].instructions_for_use+"" : instructs+="";
            (data.results[0].when_using) ? 
                instructs += data.results[0].when_using+"" : instructs += "";
            (data.results[0].storage_and_handling) ? 
                instructs += data.results[0].storage_and_handling+"" : instructs += "";
            $("#instructions").text(instructs);
            /* Displaying warnings to the user */
            (data.results[0].warnings) ? 
                warnings = data.results[0].warnings+"" : warnings = "No information found on warnings";
            $("#warnings").text(warnings);
            /* Getting and dispaying brand name*/
			(data.results[0].openfda.brand_name) ? 
                brand = data.results[0].openfda.brand_name + "" : brand = "No information found on brand name.";
            brand = fixCasing(brand);
            $("#brand_name").text(brand);
            
            /* Getting and displaying generic name */
            (data.results[0].openfda.generic_name) ? 
                generic = data.results[0].openfda.generic_name + "": generic = "No information found on generic name";
			generic = fixCasing(generic);
            $("#generic_name").text(generic);
            
            /* Getting and displaying purpose */
            (data.results[0].purpose) ? 
                purpose = data.results[0].purpose + "" : purpose = "No information found on purpose.";
            $("#purpose").text(purpose);
            /* Grabbing and displaying the information for active ingredients */
            (data.results[0].active_ingredient) ? 
                activeIngredient = data.results[0].active_ingredient : activeIngredient = "No information found on active ingredients.";
            
            $("#active_ingred").text(activeIngredient);
            $.getJSON("https://api.fda.gov/drug/label.json?search=generic_name:"+generic+"&count=openfda.brand_name.exact",function(jso){
                var brands;
                jso.results[0] ? brands = "" : brands = "No information found on other brands.";              
                for(var i = 0; i < jso.results.length && i < 10; i++) {
                    var currBrand = fixCasing(jso.results[i].term + "");
                    if (currBrand !== brand || toAdd !== currBrand) {
                        brands += currBrand + "";
                        i === 9 || i === (jso.results.length - 1) ? brands += "": brands +=", ";
                    }
                    
               }
                $("#other_brands").text(brands);
            });
                      
            $(".heading").show();
		})
        /* This function will execute will tell the user the drug ins't found when no valid json is returned  */
        .fail(function(){
            document.querySelector('#errortoast').show();
        });
        
        /* Third JSON request to get every single side effect and ranked by reported occurences with their reported counts */
        $.getJSON("https://api.fda.gov/drug/event.json?search=brand_name:"+ toAdd +"&count=patient.reaction.reactionmeddrapt.exact", 
                  function(data){
            var sideEffect;
            /* Grabbing the side-effects and then following four form the array */
            (data.results[0]) ? 
                sideEffect = data.results[0].term : sideEffect = "No information found on sideffects";
            
            for(var i = 1; i < data.results.length && i < 5 ; ++i) {
                sideEffect += ", "+data.results[i].term;
            }
            //sideEffect = fixCasing(sideEffect);
            $("#side_effects").text(sideEffect);
        });
    }
    /* The two ways for the user to prompt a search : clicking the search button or hitting enter */
    $("#searchBtn").click(function() {
       searchFDA();
        checkBtn = true;
        enableBtn();
    });
    
    $(document).keypress(function(event) {
        if (event.which === 13){
            searchFDA();
            checkBtn = true;
            enableBtn();
        }
    });
});

