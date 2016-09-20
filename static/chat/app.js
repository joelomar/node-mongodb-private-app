$(document).ready(function() {

var sockets = io.connect('http://localhost:3000',  { 'forceNew': true });


//-------Chat Socket--------//       


    $('#send_but').click(function() {


                sockets.emit('thirdLine', $('#chat_box').val());
     

     });

    sockets.on('thirdLine', function (outputData) {

           $('#msg_holder').append($('<li>').text(outputData));


     });

           
});//-------end jQuery--------//
   

