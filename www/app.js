/*document.addEventListener ("deviceready", onDeviceReady, false);
    function onDeviceReady () {*/        
    angular.module('Main', [])
        .controller( 'mainController', function ( ) {
            var mainCtrl = this;

            mainCtrl.svg = d3.select("#dropzone");
            var line;

            mainCtrl.lines = document.getElementsByTagName("line");
            if(mainCtrl.lines != null){
                lines[0].addEventListener("touchstart", handleStart, false)
                        .addEventListener("mousedown", handleStart, false);
            }
            
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
                        .attr("class", "line")
                        .attr("stroke-width", 6)
                        .attr("stroke", "red");
                }

                function mouseup() {
                    mainCtrl.svg.on("mousemove", null);
                    console.log(line);
                    line = null;
                    console.log(line);
                }
            }

            /*overrides/stops drawing functions*/
            mainCtrl.endDraw = function() {
               line = null;
               mainCtrl.svg
                .on("mousedown", null)
                .on("mouseup", null)
                .on("touchstart", null)
                .on("touchend", null)
                .on("mousemove", null)
                .on("touchmove", null);
            }



            function handleStart(e) {
                console.log("dshad");
               var m = d3.mouse(this);
               e.path.attr("x2", m[0])
                    .attr("y2", m[1]);
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
              function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
              }
              return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
            }
    });
/*}*/

