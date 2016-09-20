$(document).ready(function() {

var sockets = io.connect('http://localhost:3000',  { 'forceNew': true });

//-------Login Socket--------//

    $('#but_log').click(function() {

            var nameInp = $('#name_box').val(),
                passInp = $('#pass_box').val();

            sockets.emit('firstLine', {username: nameInp, pass: passInp});

            sockets.on('firstLine', function (auth) {

                  if (auth) {

                      window.location.replace('http://localhost:3000/chat');

                  }else {

                     window.location.replace('http://localhost:3000/register');

                  }

            });

     });


});//-------end jQuery--------//
   

