var checkBtn = false;

function enableBtn(){
    if(checkBtn == true){   document.getElementById("saveBtn").disabled = false;
    }
}

/*function savedSearches(){
        addDrug();  
 }*/
 
        
 //function to display drug list
 function displayDrugs(){

        //get drugs
        var drugList = JSON.parse(localStorage.getItem('drugs'));
        //sort drugs by name
        if(drugList != null){
            drugList = drugList.sort(sortByName); 
        }
        
        
        //set counter
        var i = 0;
        //check drugs 
        if(drugList != null) {
            //loop through array and display
            $.each(drugList, function(key, value){
                $("#drug_table").append('<tr id= "' + value.id + '">'+ 
                '<td>' + value.id + '</td>' + 
               /* '<td><a href="#" id="remove_drug" data-id="'+ value.id +'">Clear</a> | <a href="infoPage.html?id="'+ value.id +'" id="more_info" data-id="'+ value.id +'">View Info</a></td>' +
                '</tr>');*/
                                        
                '<td><a href="#" id="remove_drug" data-id="'+ value.id +'"><core-icon id="delete" icon="delete"></core-icon></a> <a href="infoPage.html?id="'+ value.id +'" id="more_info" data-id="'+ value.id +'"><core-icon id="moreInfo" icon="info"></core-icon></a></td>' +
                '</tr>');
                
              //  alert(value.brand);
                
            })
    
        }
        //document.getElementById("saveBtn").disabled = true;
        console.log('display drug'); 
    }
                                 
   //function to sort drug names 
    function sortByName(a,b){
        var aName = a.id;
        var bName = b.id;
        
        if(aName < bName){
            return -1;
        }
        
        if(aName > bName){
            return 1;    
        
        }else{
            return 0;    
        }
    }
                  

    //Function to add a drug save
    function addDrug(e){
        if(checkBtn == true){
        
        //Add unique ID using drug name
        var id = $("#searchValue").val();
        id = id.charAt(0).toUpperCase() + id.substr(1).toLowerCase();
      
        var brandNm = document.getElementById("brand_name").innerHTML;
        
        var genericNm = document.getElementById("generic_name").innerHTML;
         
        var purpose = document.getElementById("purpose").innerHTML;
          
        var effects = document.getElementById("side_effects").innerHTML;
           
        var ingredient = document.getElementById("active_ingred").innerHTML;
            
        var altBrand = document.getElementById("other_brands").innerHTML;
             
        //Simple Validation
        if(id == ''){
            alert('drug name is required');
            e.preventDefault();
        } else{
            
            drugs = JSON.parse(localStorage.getItem('drugs'));
            
            //check if to see if storage of drugs already exist
            if(drugs == null){
                drugs = [];
            }else{
            
           
            
            //variable reference to array
            var drugList = JSON.parse(localStorage.getItem('drugs'));
            
            //loop to make sure we have the correct drug name to delete
        for(var i=0; i < drugList.length; i++){
            if(drugList[i].id == id){
               alert('drug name is already save');
                e.preventDefault();
                return;
            }
        }
            }
            
            //New drug object
            var new_drug = {
                "id" : id,
                "brand" : brandNm,
                "generic": genericNm,
                "reason": purpose,
                "effects": effects,
                "active": ingredient,
                "altBrand": altBrand
            } 
            
            //add "new_drug" object of drug list array
            drugs.push(new_drug);
            
            //set the item to local storage
            localStorage.setItem('drugs', JSON.stringify(drugs));
            
            
            console.log('Drug Added');
            
            document.getElementById("saveBtn").disabled = true;
         
            console.log("save button disabled");                
            checkBtn = false;    
        }
    }
    }

    //Function to remove drug
    function removeDrug(id){
      if(confirm('Are you sure you want to delete this saved drug?')){
         var drugList = JSON.parse(localStorage.getItem('drugs')); 
        
        //loop to make sure we have the correct drug name to delete
        for(var i=0; i < drugList.length; i++){
            if(drugList[i].id == id){
               drugList.splice(i,1);
            }
        
            //then reset array of objects, excluding the object [drug] that was just deleted
            localStorage.setItem('drugs', JSON.stringify(drugList));
        }
        
        //after making changes, reload the page
        location.reload();
        
        }

    }
                
     
        
        
    //Function to clear all save drugs
    function clearAllDrugs(){
        if(confirm('Are you sure you want to delete all drugs?')){
         localStorage.clear('drugs');
           //localStorage.clear();
            location.reload();             
        }
    }



         

