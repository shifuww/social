const { Console } = require('console')
const fs = require('fs')
// CRUD  - Create Read Update Delete

exports.addUser = (user) => {
  const data = fs.readFileSync('./text.txt')
  if(!data) throw data
  
  const users = JSON.parse(data.toString())
  users.push(user)

  fs.writeFileSync('./text.txt', JSON.stringify(users), null, 2)
}

exports.getUsers = () => {
  const data = fs.readFileSync('./text.txt')
  if(!data) throw data
  const users = JSON.parse(data.toString())

  return users
}

exports.updateUser = (username, userData) => {
  const data = fs.readFileSync('./text.txt')
  if(!data) throw data
  const users = JSON.parse(data.toString())

  const updatedUsers = users.map(item => {
    if(item.username === username) return {...item, ...userData}
    return item
  })

  fs.writeFileSync('./text.txt', JSON.stringify(updatedUsers, null, 2))
}

exports.deleteUser = (username) => {
  const data = fs.readFileSync('./text.txt')
  if(!data) throw data
  const users = JSON.parse(data.toString())

  const updatedUsers = users.filter(item => {
    return item.username !== username
  })

  fs.writeFileSync('./text.txt', JSON.stringify(updatedUsers, null, 2))
}

exports.getUserByUsername = (username) =>{
  const data = fs.readFileSync('./text.txt')
  if(!data) throw data
  const users = JSON.parse(data.toString())

  const target = users.find(users => users.username === username);
  if(!target) return null;
  return target;
}

exports.addHobby = (obj, string) =>{
  const array = obj.hobbies;
  if(!string){
    return null;
  }
  array.push(string);
  return array;
}

exports.addUser = (obj) => {
  if(!obj.name && !obj.username && !obj.city){
    return null;
  }

  const user = this.getUserByUsername(obj.username);
  if(user) return null;

  obj['avatar'] = "https://avatars3.githubusercontent.com/u/1071625?s=400&u=f19e921ec34fc145d2b0b05f6cdd3472240c885b&v=4";
  obj['hobbies'] = [];
  const data = fs.readFileSync('./text.txt');
  const users = JSON.parse(data.toString())
  users.push(obj);
  fs.writeFileSync('./text.txt', JSON.stringify(users, null, 2));

}