/*document.addEventListener ("deviceready", onDeviceReady, false);
    function onDeviceReady () {*/        
    angular.module('Main', [])
        .controller( 'mainController', function ( ) {
            var mainCtrl = this;

            mainCtrl.svg = d3.select("#dropzone");
            var line;
            mainCtrl.lines = [];

            mainCtrl.img = new Image();
            mainCtrl.img.src = './img/teste.jpg';

            /*start drawing functions*/
            mainCtrl.startDraw = function() {  
                mainCtrl.svg
                        .on("mousedown", mousedown)
                        .on("mouseup", mouseup)
                        .on("touchstart", mousedown)
                        .on("touchend", mouseup); 

                function mousedown() {
                    var m = d3.mouse(this);          
                    line = mainCtrl.svg.append("line")
                      .attr("x1", m[0])
                      .attr("y1", m[1])
                      .attr("x2", m[0])
                      .attr("y2", m[1]);
                  
                  mainCtrl.svg.on("mousemove", mousemove)
                              .on("touchmove", mousemove);
                }

                function mousemove() {
                   var m = d3.mouse(this);
                   line.attr("x2", m[0])
                        .attr("y2", m[1])
                        .attr("id", guid())
                        .attr("stroke-width", 6)
                        .attr("stroke", "red");
                    
                }

                function mouseup() {
                    mainCtrl.svg.on("mousemove", null);
                    var lineId = line[0][0].id;
                    if(lineId != ""){
                        mainCtrl.endDraw(lineId);
                    } else{
                        mainCtrl.endDraw(null);
                    }                  
                }
            }

            /*overrides/stops drawing functions*/
            mainCtrl.endDraw = function(id) {
/*             mainCtrl.svg
                .on("mousedown", null)
                .on("mouseup", null)
                .on("touchstart", null)
                .on("touchend", null)
                .on("mousemove", null)
                .on("touchmove", null);*/
            mainCtrl.svg.select("line")
                .on("click", startResizing(id));                
               

/*
                if(id){
                    var line = document.getElementById(id);
                    line.onclick = startResizing(line);
                }
*/
                

/*                for (i = 0; i < mainCtrl.lines.length; ++i) {
                    for (j = 0; j < mainCtrl.lines[i].length; ++j) {
                        var id = mainCtrl.lines[i][j][0].id;
                        var line = document.getElementById(id);
                        line.onclick = startResizing(line);
                    }
                }*/


            }

            function startResizing(line){
                console.log("teste yay"+line);
              /*  var line = d3.select("#"+id);
                line.addEventListener("touchstart", startResizing, false)
                    .addEventListener("mousedown", startResizing, false);

                    function startResizing(){

                    }*/
            }
            

            /*function for taking photos :-)*/
            mainCtrl.snapPicture = function() {
                navigator.camera.getPicture (onSuccess, onFail, 
                    { quality: 50, destinationType: Camera.DestinationType.DATA_URL});
                function onSuccess (imageData) {    
                    mainCtrl.img.src = "data:image/jpeg;base64," + imageData;
                }
                function onFail (message) {
                    alert ('Error occured: ' + message);
                }
            }

            /*id number generator*/
            function guid() {
              return '_' + Math.random().toString(36).substr(2, 9);
            }
    });
/*}*/

