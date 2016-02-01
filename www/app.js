/*document.addEventListener ("deviceready", onDeviceReady, false);
    function onDeviceReady () {*/        
    angular.module('Main', [])
        .controller( 'mainController', function ($scope) {
            var mainCtrl = this;

            var line = new Object();

            mainCtrl.svg = d3.select("svg");
            mainCtrl.planes = [];

            mainCtrl.showInput = false;
            
            mainCtrl.img = new Image();
            mainCtrl.img.src = './img/teste.jpg';

            /*start drawing functions*/
            mainCtrl.drawMode = function() {
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
                    mainCtrl.svg.on("mousemove", null)
                                .on("touchmove", null)
                    if(line != "" && line != null){
                        mainCtrl.planes[mainCtrl.currPlane].lines.push(line);
                        drawDone();
                    }               
                }
            }

            /*overrides/stops drawing functions*/
            function drawDone() {
                if(isFirstDraw) {
                    $scope.toggleInput(true);
                    $scope.$apply();
                }else{}

                mainCtrl.svg
                    .on("mousedown", null)
                    .on("mouseup", null)
                    .on("touchstart", null)
                    .on("touchend", null);
            }

             mainCtrl.newPlane = function() {
                //TODO
                var plane = new Object();
                plane.id = mainCtrl.planes.length + 1;
                plane.lines = [];
                plane.color = "red";
                mainCtrl.planes.push(plane);
                mainCtrl.currPlane = plane.id; 
                mainCtrl.drawMode();
            }

            mainCtrl.changePlane = function(cPlane) {
                console.log(cPlane);
                mainCtrl.currPlane = cPlane;
            }

            mainCtrl.mParameters = function() {
                //record first line in plane
                line.mValue = mainCtrl.mValue;
                line.mUnit = mainCtrl.mUnit;
                line.mPlane = 1;
                mainCtrl.planes[mainCtrl.currPlane].lines.push(line);
                $scope.toggleInput(false);
            }

            // clears all drawings
            mainCtrl.clearSVG = function(){
               mainCtrl.svg.selectAll("*").remove();
               mainCtrl.planes[mainCtrl.currPlane].lines.length = 0;
            }


            // toggles m parameters input
            $scope.toggleInput = function(value) {
                mainCtrl.showInput = value;
                if(value == true){document.getElementById("measure").focus();}
            }

/*             mainCtrl.svg
                .on("mousedown", function(){
                    mainCtrl.svg.select("line").on("mousedown", function(){
                        var line = d3.select("#"+this.id);
                        console.log(line);
                        var drag = d3.behavior.drag().on('drag', dragmove);
                        line.call(drag);
                    });
                })
                .on("touchstart", function(){
                    mainCtrl.svg.select("line").on("touchstart", function(){
                        var line = d3.select("#"+this.id);
                        console.log(line);
                        var drag = d3.behavior.drag().on('drag', dragmove);
                        line.call(drag);
                    });
                })
                .on("mouseup", null)
                .on("touchend", null)
                .on("mousemove", null)
                .on("touchmove", null);   */                   

            function isFirstDraw(){
                if(mainCtrl.planes[mainCtrl.currPlane].lines > 0){
                    return false;
                }else{return true;}
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

