 $(document).ready(function() {
    $('#saveBtn').click(function(e){
        addDrug(e);
    });
     
    
    $(document).keypress(function(e) {
        if (e.which === 13) {
            enableBtn();
        }
    });
     
   $('#clear_drugs').on('click', function(){
        clearAllDrugs();  
     });   
 
    
//remove drug event from list
$('#drug_table').on('click','#remove_drug', function(e){
    key = $(this).data('id');
    console.log("drug from list");
    alert(key);
    //id equal to attribute in clear link
    removeDrug(key);
    console.log("removing drug from list"); 
});
        
    
    $('#drug_table').on('click','#more_info', function(e){
   
    key = $(this).data('id');
        
    //alert(key);    
    console.log("drug from list");
    var check_storage = JSON.parse(localStorage.getItem('drug'));
      /* if(check_storage != null){
            localStorage.delete(drug);
            alert("erasing stored drug");
        }*/       
        
    moreInfo(key);
    console.log("retrieving more information"); 
    });
     
      displayDrugs();
     
       
    
    function moreInfo(id){
         var drugList = JSON.parse(localStorage.getItem('drugs')); 
        var specific_drug;
        
        //loop to make sure we have the correct drug name to delete
        for(var i=0; i < drugList.length; i++){
            if(drugList[i].id == id){
                //alert("found a match:" + drugList[i].brand); 
                specific_drug = drugList[i];
            }
            
        }
        localStorage.setItem('drug', JSON.stringify(specific_drug));
        console.log('drug is now specified');
       
    }

});