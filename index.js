const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')
const app = express() ;
const {getUsers, getUserByUsername, updateUser, addHobby, addUser} = require('./user');
const multer = require('multer');
const upload = multer();

app.set('views', './views');
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use('/img', express.static('img'));
app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin ,X-Request-With  ,Content-Type ,Accept");
  next();
})

app.get('/', (req,res)=>{
  const users = getUsers();
  res.render('index', {users : users, title: 'Title from Handlebars', lengthOfUsers: users.length});
});
app.get('/create', (req,res)=>{
  res.render('createUser');

});
app.post('/create', upload.none(), (req,res)=>{
  const newUser = req.body;
  console.log(addUser(newUser));
});
app.put('/:username', (req, res)=>{
  const user = getUserByUsername(req.params.username);
  if(!user) return res.status(404).json({message: `User ${req.params.username} does not exist!`});

  updateUser(user.username, {...req.body});

  return res.status(200).json({message: 'User successfully update'});

  
});
app.get('/:username', (req, res)=>{
  const user = getUserByUsername(req.params.username);
  const img = fs.existsSync('img/' + user.username + '.png');

  if(img){
    user.avatar = 'http://localhost:3000/img/' + user.username + '.png';
  }
  res.render('user', {user:user});
});

app.post('/:username', (req, res)=>{
  const user = getUserByUsername(req.params.username);
  const hobby = req.body.hobbies;
  const step = addHobby(user,hobby);
  if(!step) return res.status(404).json({message: `Error, you want to add empty hobby!`});
  updateUser(user.username, {hobbies : step});
  return res.status(201).json({message: 'New hobby added successfully'});

});
app.listen(3000, () => {
  console.log('Server is running on 3000 port')
})