$(document).ready(function(){
var deletar = function(id){
    var data = { id: id};
    $.ajax({
    url: "/delete",
    method: "POST",
    data: data,
    success: function(data) { 
        if(data.success){
            $("#result").val(data.data);
        }
        else{
            $("#result").val(data.err);
        }
         /*console.log(data);*/
         //$("#time").val(console.timeEnd("deletar"));
          console.timeEnd("deletar");
        //  $("#btnGetAll").trigger("click");  
        } 
    });
};

var inserir = function(data){
    // var data = { id: 1 , value: "alterado"};
    $.ajax({
    url: "/insert",
    method: "POST",
    data: data,
    success: function(data) { 
        if(data.success){
            $("#result").val(data.data);
        }
        else{
            $("#result").val(data.err);
        }
          /*console.log(data);*/
          //$("#time").val(console.timeEnd("inserir"));
           console.timeEnd("inserir");
        //   $("#btnGetAll").trigger("click"); 
        } 
    });
};

var getAll = function(){
    
    $.ajax({
    url: "/getAll",
    method: "GET",
    success: function(data) { 
        if(data.success){
            $("#result").val(data.data);
        }
        else{
            $("#result").val(data.err);
        }
          /*console.log(data);*/
          //$("#time").val(console.timeEnd("getAll"));
           console.timeEnd("getAll");

        } 
    });
};
var getById = function(id){    
    $.ajax({
    url: "/getById/" + id,
    method: "GET",
    success: function(data) { 
        if(data.success){
            $("#result").val(data.data);
        }
        else{
            $("#result").val(data.err);
        }
          /*console.log(data);*/
          //$("#time").val(console.timeEnd("getById"));
           console.timeEnd("getById");

        } 
    });
};
var alterById = function(data){    
    $.ajax({
    url: "/getById",
    method: "POST",
    data: data,
    success: function(data) { 
        if(data.success){
            $("#result").val(data.data);
        }
        else{
            $("#result").val(data.err);
        }
          /*console.log(data);*/
          //$("#time").val(console.timeEnd("alterById"));
           console.timeEnd("alterById");

        } 
    });
};

$("#btnGetAll").on("click",function(e){
    console.time("getAll");
    getAll();
});
$("#btnGetId").on("click",function(e){
    console.time("getById");
    getById($("#txtIdBusca").val());
});
$("#btnAlterById").on("click",function(e){
    console.time("alterById");
    alterById({id: parseInt($("#txtIdAlter").val()) , value: $("#txtValueAlter").val()});
});  

$("#btnInserir").on("click",function(e){
    console.time("inserir");
    inserir({id: parseInt($("#txtId").val()) , value: $("#txtValue").val()});
});
$("#btnDeletar").on("click",function(e){
    console.time("deletar");
    deletar(parseInt($("#txtIdDelete").val()));
});
});