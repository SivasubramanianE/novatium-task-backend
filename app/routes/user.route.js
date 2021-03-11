const user = require('../api/user');

module.exports = function(express) {

    // Create a new user
    express.post('/user/reg', user.create);

     // User login
    express.post('/user/login', user.login);

    //Cartupdate
    express.post('/user/cart', user.cartUpdate);
    
}