var express = require('express'),
    dataStruct = require('./data-struct'),
    app = express(),
    session = require('express-session'),
    server = require('http').Server(app),
    bodyParser = require('body-parser'),
    io = require('socket.io')(server);
    
    var port = process.env.PORT || 5000;


//---------App Routes and Auth----------// 

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
         
         secret: '1234-1234-abcd',
         resave: true,
         saveUninitialized: true

}));

var userPars;
var passPars;
var codeAuth;

var dbAuth = function(accessDBCode) {

        codeAuth = accessDBCode;

        console.log('User acepted from DB: ' + codeAuth);
      
};

var auth = function (req, res, next) {

    if (req.session && req.session.user === codeAuth && req.session.admin) {
            
            return next();

    } else {

            console.log('You are not welcome in chat');
            return res.sendStatus(401);
    }
};


app.get('/', function (req, res, next) {
    
    console.log('requuest from home page');
    res.sendFile('./client/index.html', {root: __dirname});

});


app.get('/register', function (req, res, next) {

    console.log('request from register page');
    res.sendFile('./client/register.html', {root: __dirname}); 

});


app.post('/register', function (req, res) {

    //res.end(JSON.stringify(req.body));
    var namePars = req.body.firstname,
        lastPars = req.body.lastname,
        emailPars = req.body.email,
        usernamePars = req.body.username,
        passkeyPars = req.body.password;

    dataStruct.saveModule(namePars, lastPars, emailPars, usernamePars, passkeyPars);

    res.redirect('http://localhost:3000/login');

});


app.get('/login', function (req, res) {

    console.log('request from login page');
    res.sendFile('./client/login.html', {root: __dirname});


});


app.post('/login', function (req, res) {

    //res.end(JSON.stringify(req.body));
        userPars = req.body.username;
        passPars = req.body.password;

        dataStruct.findModule(userPars);

        req.session.user = userPars;
        req.session.admin = true;


        console.log('User saved in session: ' + req.session.user);
        res.redirect('http://localhost:3000');

});


app.get('/logout', function (req, res) {

     req.session.destroy();
     res.send('you are out');


});


app.get('/chat', auth, function (req, res, next) {

    console.log('private chat');
    res.sendFile('./client/chat.html', {root: __dirname});


});


app.get('/api/:user-:age', function (req, res, next) {
     
     //req.query.user;
     console.log(req.params);
     //res.render('index');
     res.send(req.params, 200);


});




//-------------Socket Lines-------------//

io.on('connection', function (socket) {

    console.log('Socket connected');

    var chatData;

//-------------Socket chat connection-------------//


    socket.on('lineOne', function (chatReceiver) {

          chatData = chatReceiver;

        io.emit('lineOne', chatData);


    });


});//-------Socket End Point----------// 




//-------------Server listen-------------//

server.listen(port, function() {

    console.log('exp server waiting for connections in port 3000');
});


exports.dbAuth = dbAuth;
exports.app = app;
