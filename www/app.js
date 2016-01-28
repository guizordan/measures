/*document.addEventListener ("deviceready", onDeviceReady, false);
    function onDeviceReady () {*/        
    angular.module('Main', [])
        .controller( 'mainController', function ( ) {

            var mainCtrl = this;
            mainCtrl.img = new Image();
            mainCtrl.img.src = './img/teste.jpg';

            mainCtrl.snapPicture = function() {
                navigator.camera.getPicture (onSuccess, onFail, 
                    { quality: 50, destinationType: Camera.DestinationType.DATA_URL});

                //A callback function when snapping picture is success.
                function onSuccess (imageData) {    
                    mainCtrl.img.src = "data:image/jpeg;base64," + imageData;
                }

                //A callback function when snapping picture is fail.
                function onFail (message) {
                    alert ('Error occured: ' + message);
                }
            }

    });
/*}*/

