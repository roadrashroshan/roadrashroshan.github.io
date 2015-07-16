$(document).ready(function(){
   

    
    $("core-item[label='Warning']").click(function(){
        $("#field").text("Warnings");
         //displayWarning();
        $("#fieldText").text("This text is just a placeholder for actual warnings.");
    });
    $("core-item[label='Side Effects']").click(function() {
        $("#field").text("Side Effects");
        displayEffects();
    });
    
    $("core-item[label='Purpose']").click(function() {
        $("#field").text("Purpose");
        displayPurpose();
    });
    
    $("core-item[label='Active Ingredients']").click(function() {
        $("#field").text("Active Ingredients");
        displayIngredient();
    });
    
    $("core-item[label='Other Brands']").click(function() {
        $("#field").text("Other Brands");
        displayBrands();
    });
    
 
 //function to display drug list
 /*function displayWarning(){
     console.log("entering displayWarning()");

        //get drug
     var specific_drug = JSON.parse(localStorage.getItem('drug'));
        
        //set counter
        var i = 0;
        //check drugs 
        if(specific_drug != null) {
            //loop through array and display
            $.each(specific_drug, function(key, value){
                $("#fieldText").text(specific_drug.);     
            });
    
        }
 }*/
    
    
//function to display drug side effects
 function displayEffects(){
     console.log("entering displayEffects()");
    //get drug
     var specific_drug = JSON.parse(localStorage.getItem('drug'));
        
        //set counter
        var i = 0;
        //check drugs 
        if(specific_drug != null) {
                $("#fieldText").text(specific_drug.effects);     
            }
        }
 
    //function to display drug purpose
 function displayPurpose(){
     console.log("entering displayPurpose()");
    //get drug
     var specific_drug = JSON.parse(localStorage.getItem('drug'));
        
        //set counter
        var i = 0;
        //check drugs 
        if(specific_drug != null) {
                $("#fieldText").text(specific_drug.purpose);     
            }
        }
    
    //function to display drug active ingredient
 function displayIngredient(){
     console.log("entering displayIngredient()");
    //get drug
     var specific_drug = JSON.parse(localStorage.getItem('drug'));
        
        //set counter
        var i = 0;
        //check drugs 
        if(specific_drug != null) {
                $("#fieldText").text(specific_drug.active);     
            }
        }
    
    //function to display drug alternative brands
 function displayBrands(){
     console.log("entering displayBrands()");
    //get drug
     var specific_drug = JSON.parse(localStorage.getItem('drug'));
        
        //set counter
        var i = 0;
        //check drugs 
        if(specific_drug != null) {
                $("#fieldText").text(specific_drug.altBrand);     
            }
        }
    
});


  