const ObjectId = require('mongodb').ObjectID;
module.exports= {

    create:(req,res)=>{
        db=req.app.get('mongoInstance')
        var myobj = req.body;
         db.collection("user").insertOne(myobj, function(err, result) {
            if (err) {
                res.send('ERROR');
              } else {
                res.send({success:true,data:"created Successfull"});
              }
      });
    },

    login:(req,res)=>{
      db=req.app.get('mongoInstance')
      let userData = req.body;
      db.collection("user").findOne({ 'email': req.body.email},function(err,result){
        if (err) {
          res.send('ERROR');
        } else {
          if(!result){
            res.send("Couldn't find that email. Register or try again!");
          }else if(userData.password !== result.password){
              res.send("Password Error");
          }else{
            res.send({success:true,data:result});
          }
        }
      })
    },

    cartUpdate:(req,res)=>{
      db=req.app.get('mongoInstance')
      var myobj = req.body;
      var id = {'_id':ObjectId(myobj.id)}
      var newvalues = { $set: {cart: myobj.cart, dateModifided: new Date()} };
       db.collection("user").updateOne(id,newvalues, function(err, result) {
          if (err) {
              res.send('ERROR');
            } else {
              res.send({success:true,data:result});
            }
    });
  }

}