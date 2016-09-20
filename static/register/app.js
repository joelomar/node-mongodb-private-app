$(document).ready(function() {


var sockets = io.connect('http://localhost:3000',  { 'forceNew': true }),
    feedMsg = 'Thank You for register!',
    feedLink2 = 'Go to login page';

//-------Sign Up Socket--------//

    $('#but_sign').click(function() {

            var nameSInp = $('#name_sign').val(),
                lastInp = $('#last_sign').val(),
                emailSInp = $('#email_sign').val(),
                userInp = $('#user_sign').val(),
                passInp = $('#pass_sign').val();

            sockets.emit('secondLine', {name: nameSInp, lastname: lastInp, email: emailSInp, username: userInp, password: passInp});

            $('#form').fadeOut();
            $('#feed_one').append($('<h1>').text(feedMsg));
            $('#link_chat').append($('<a href="http://localhost:3000">').text(feedLink2));

     });



});