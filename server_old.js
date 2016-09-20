var express = require('express'),
    app = express(),
    mongo = require('mongodb'),
    mc = mongo.MongoClient,
    url = 'mongodb://localhost:27017/app_data',
    server = require('http').Server(app),
    io = require('socket.io')(server);

//-------------Open Dbs-------------//

var usersDB,
    userNme,
    userPass;

mc.connect(url, function (err, db) {

     if (err) {

     console.log('Err open DBs');

     }else {

     console.log('Success open DBs');

     var appData =  db.collection('users');

     appData.find({}).toArray(function (err, results) {

          if (err) {

            console.log('error query in Main DB');
          }

           if (results.length){

               usersDB = results;
               //userNme = results[];
               //userPass = results[password];

               console.log(usersDB);

          }

       });

     db.close();

   }

});


//-------------Socket Lines-------------//

io.on('connection', function (socket) {

    console.log('Socket connected');

    var userData,
    chatData,
    signData;

    socket.on('firstLine', function (userDataReceiver) {

          userData = userDataReceiver;
          var checkUser = userData.username;

//--------------Saving to Mongo--------------//

mc.connect(url, function (err, db) {

         if (err) {

           console.log('error conecting to the db');

         }else {

          console.log('success conecting to the db');

           var collections = db.collection('users');

           //--------------Query Data--------------//

           collections.find({username: checkUser}).toArray(function (err, results) {
           
              if (err) {
                
                console.log('error reading');

              }else if (results.length) {

                 //console.log(results);
                 console.log('Welcome you are already in DB');
                 var aproved = 1;
                 socket.emit('firstLine', aproved);


              }else {

               //console.log('no data found');
               console.log('You are not in the db');
               var rejected = 0;
               socket.emit('firstLine', rejected);

              }



           });

         db.close();
      }

  });

});

//-------------Socket Lien for Sign In-------------//


    socket.on('secondLine', function (userSignReceiver) {

          signData = userSignReceiver;

        //io.emit('secondLine', signData);

        mc.connect(url, function (err, db) {

         if (err) {

           console.log('error conecting to the db');

         }else {

          console.log('success conecting to the db');

           var coll = db.collection('users');

           //--------------Inserting Data--------------//

           coll.insert(signData, function (err, records) {

               if (err) {

                  console.log('err iserting in db');

               }else {

                console.log('success inseting in db');

               }

           });

         db.close();
      }


  });

});

//-------------Socket chat connection-------------//


    socket.on('thirdLine', function (chatReceiver) {

          chatData = chatReceiver;

        io.emit('thirdLine', chatData);


    });


});//-------Socket End Point----------// 


//---------Routes and Auth----------// 


app.use(express.static('public'));


app.get('/', function (req, res, next) {
    
    console.log('requuest from home page');
    res.render('index');

});


app.get('/register', function (req, res, next) {

    console.log('requuest from about page');
    res.render('index');

});


app.get('/chat', function (req, res, next) {

    console.log('requuest from services page');
    res.render('index');


});


app.get('/private', function (req, res, next) {

    console.log('private page');
    res.render('index');


});


app.get('/api/:user-:age', function (req, res, next) {
     
     //req.query.user;
     console.log(req.params);
     //res.render('index');
     res.send(req.params, 200);


});




//-------------Server listen-------------//

server.listen(3000, function() {

    console.log('exp server waiting for connections in port 3000');
});































