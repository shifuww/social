const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {getUsers, getUserByUsername, updateUser, addHobby} = require('./user');

app.set('views', './views');
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())

app.get('/', (req,res)=>{
  const users = getUsers();
  res.render('index', {users : users, title: 'Title from Handlebars', lengthOfUsers: users.length});
});

app.get('/:username', (req, res)=>{
  const users = getUsers();
  const param = req.params.username;
  res.render('user', {user: users.find(item => item.username === param)});
});

app.put('/:username', (req, res)=>{
  const user = getUserByUsername(req.params.username);
  if(!user) return res.status(404).json({message: `User ${req.params.username} does not exist!`});

  updateUser(user.username, {...req.body});

  return res.status(200).json({message: 'User successfully update'});
  
})
app.post('/:username', (req, res)=>{
  const user = getUserByUsername(req.params.username);
  const hobby = req.body.hobbies;
  const step = addHobby(user,hobby);
  if(!step) return res.status(404).json({message: `Error, you want to add empty hobby!`});
  updateUser(user.username, {hobbies : step});
  return res.status(201).json({message: 'New hobby added successfully'});

})
app.listen(3000, () => {
  console.log('Server is running on 3000 port')
});