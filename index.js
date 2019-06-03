
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(express.json());
app.use(cors());



const User = require('./model/User');
const middleware = require('./middleware/middleware');
const auth = require('./middleware/auth');
 require('./db/mongoose');
app.get("/test11", middleware, function(req, res){
    console.log("this should load after the middleware");
   
    })

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login',function(req,res)
{
User.myFirst("user","pass");
})



app.post('/upload', (req, res) => {/// api created
    console.log(req.body);
    var mydata = new User(req.body);

    mydata.save().then(function () {
        res.send('fine');
    }).catch(function (e) {
        res.send(e);

    });
});

app.post('/product', (req, res) => { //add product
    console.log(req.body);
    var prod = new Product(req.body);

    prod.save().then(function () {
        res.send('fine');
    }).catch(function (e) {
        res.send(e);

    });
});
app.get('/users', function (req, res) { // api get data display garna lagi
    User.find().then(function (user) {
        res.send(user);
    }).catch(function (e) {
        res.send(e)
    });

});
app.get('/produsers', function (req, res) {   //get data in dashboard
    Product.find().then(function (product) {
        res.send(product);
    }).catch(function (e) {
        res.send(e)
    });
});
// const newdata = new User({
//     name: 'Sunny Kasalawat',
//     age: 20,
//     Address: 'Bhaktapur'

app.delete('/proddelete/:id', function (req, res) {    //product delete
  
   
    Product.findByIdAndDelete(req.params.id).then(function(){
        res.send('Product is deleted');
    }).catch(function(e){
        res.send(e);
    }) ;
    });
    app.get('/proddeletes/:id', function (req, res) {    //product delete
  
   
        Product.findByIdAndDelete(req.params.id).then(function(){
            res.send('Product is deleted');
        }).catch(function(e){
            res.send(e);
        }) ;
        });






app.get('/produpdate/:id', function (req, res) {     //product get from dashboard and set in form
    uid = req.params.id.toString();
    Product.findById(uid).then(function (product) {
        res.send(product);
    }).catch(function (e) {
        res.send(e)
    });
});
app.put('/updateprod/:id', function (req, res) {   //update productr
    uid = req.params.id.toString();
    console.log(uid);
    console.log(req.body);
    Product.findByIdAndUpdate(uid,req.body,{new: true}, (err,product) => {
        // Handle any possible database errors
        });


  

  

});

app.post("/login22", async function(req, res){
    const user = await User.checkCrediantialsDb(req.body.username,
        req.body.password)
         const token = await user.generateAuthToken()// function make gareko
         console.log(token);   
         res.send({token});
        })

        app.get('/user/me',auth,function(req,res){
            res.send(req.user);
        })
        app.get("/logut"), async function(req,res){
            
        }

//     const user = await User.checkCrediantialsDb(req.body.user,
//    req.body.pass)
//    console.log(user)
    //const token = await user.generateAuthToken()
   
   
   

// function generatetoken()
// {
//     const token= jwt.sign({_id:"userid"},"mysecretworld")
//     console.log (token);

// }
// generatetoken();
// newdata.save();
app.listen(8080);
