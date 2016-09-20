var mongoose = require('mongoose'),
    app = require('./server'),
    url = 'mongodb://localhost:27017/app_data';

mongoose.connect(url);

var userSchema = new mongoose.Schema({name: String, lastname: String, email: String, username: String, password: String});
var dataModel = mongoose.model('users', userSchema);


     var saveModule = function(nameP, lastP, emailP, userP, passP) {

     var incomeUser = new dataModel({ name: nameP, lastname: lastP, email: emailP, username: userP, password: passP });

     incomeUser.save(function (err, savedObj) {

      if (err) throw err;
       
       else {

            console.log('Success saving data ' + savedObj);

       }

   });

};


var accessGranted;

     var findModule = function(userIncome) {

          dataModel.find({'username': userIncome}, function (err, results) {

         if (err) {

         	console,log('error in find module: ' + err);

         } else {
                   var userMatch = results.length;
                   console.log('Results in DB: ' + userMatch);

                if (userMatch === 1) {

                       console.log('Username match with database');
                       accessGranted = userIncome;
                       app.dbAuth(accessGranted);


                } else {

                	console.log('Username did not match with database');
                }  


         }

   }); 

};


exports.saveModule = saveModule;
exports.findModule =  findModule;






