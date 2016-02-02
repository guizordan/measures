document.addEventListener ("deviceready", onDeviceReady, false);
    function onDeviceReady () {        
    angular.module('Main', [])
        .controller('mainController', function ($scope) {
            var mainCtrl = this;

            mainCtrl.svg = d3.select("svg");
            mainCtrl.planes = [];

            //controlls the current drawing
            mainCtrl.currPlane;
            mainCtrl.currDraw;

            mainCtrl.showInput = false;
            
            mainCtrl.img = new Image();
/*            mainCtrl.img.src = './img/teste.jpg';*/

            /*start drawing functions*/
            mainCtrl.drawMode = function() {
                var draw = new Object();
                mainCtrl.svg
                        .on("mousedown", mousedown)
                        .on("mouseup", mouseup)
                        .on("touchstart", mousedown)
                        .on("touchend", mouseup); 

                function mousedown() {
                    var m = d3.mouse(this);          
                    draw = mainCtrl.svg.append("line")
                      .attr("x1", m[0])
                      .attr("y1", m[1])
                      .attr("x2", m[0])
                      .attr("y2", m[1]);
                  
                  mainCtrl.svg.on("mousemove", mousemove)
                              .on("touchmove", mousemove);
                }

                function mousemove() {
                   var m = d3.mouse(this);
                   draw.attr("x2", m[0])
                        .attr("y2", m[1])
                        .attr("id", guid())
                        .attr("stroke-width", 6)
                        .attr("stroke", "red");      
                }

                function mouseup() {
                    mainCtrl.svg.on("mousemove", null)
                                .on("touchmove", null)
                    if(draw != "" && draw != null){
                        mainCtrl.currDraw = draw;
                        drawDone();
                    }               
                }
            }

            /*overrides/stops drawing functions*/
            function drawDone() {
                if(isFirstDraw()) {
                    $scope.toggleInput(true);
                    $scope.$apply();
                }else{
                    setLine();
                }

                mainCtrl.svg
                    .on("mousedown", null)
                    .on("mouseup", null)
                    .on("touchstart", null)
                    .on("touchend", null);
            }

            mainCtrl.newPlane = function() {
                var plane = new Object();
                plane.id = mainCtrl.planes.length;
                plane.lines = [];
                plane.color = "red";
                mainCtrl.planes.push(plane);
                mainCtrl.currPlane = plane.id; 
                mainCtrl.drawMode();
            }

            function setLine(){
                //push line into plane
                var line = new Object();
                line.draw = mainCtrl.currDraw;
                line.mValue = getLineMeasure();
                line.mUnit = mainCtrl.mUnit;
                line.plane = mainCtrl.currPlane;
                console.log(line);
                mainCtrl.planes[mainCtrl.currPlane].lines.push(line);
                $scope.$apply();
            }

            mainCtrl.setMainLine = function() {
                //push line into plane
                var line = new Object();
                line.draw = mainCtrl.currDraw;
                line.mValue = mainCtrl.mValue;
                line.mUnit = mainCtrl.mUnit;
                line.plane = mainCtrl.currPlane;
                mainCtrl.planes[mainCtrl.currPlane].lines.push(line);
                $scope.toggleInput(false);
            }

            function getLineMeasure() {
                var mainLine = mainCtrl.planes[mainCtrl.currPlane].lines[0];
                var mainLineHeight = mainLine.draw.node().getBBox().height;
                var currLineHeight = mainCtrl.currDraw.node().getBBox().height;
                console.log(mainLine.mValue);
                console.log(currLineHeight);
                console.log(mainLineHeight);
                return mainLine.mValue*currLineHeight/mainLineHeight;
            }

            function getPlane(id) {
                for(i = 0; i <= mainCtrl.planes.length; i++){
                    console.log(mainCtrl.planes[i]);
                    if(mainCtrl.planes[i].id == id){
                        return mainCtrl.planes[i];    
                    }
                }
            }

            mainCtrl.solveUnit = function(id) {
                if(id == 0){return "mm";}
                else if(id == 1){ return "cm";}
                else if (id == 2){return "m";} 
            }

            mainCtrl.setPlane = function() {
                mainCtrl.currPlane = mainCtrl.planeSelected;
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

            function isFirstDraw(){
                if(mainCtrl.planes[mainCtrl.currPlane].lines.length > 0){
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
}

