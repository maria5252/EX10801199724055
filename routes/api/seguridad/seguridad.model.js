var fs = require('fs');
var fileToSave = 'security.json';
var userModel = {};
var userCollection = [];

function writeToFile(){
  var serializedJSON = JSON.stringify(userCollection);
  fs.writeFileSync(fileToSave, serializedJSON, { encoding: 'utf8' } );
  return true;
}
function openFile(){
  try{
  var serializedJSON = fs.readFileSync(fileToSave,{encoding:'utf8'});
  userCollection = JSON.parse(serializedJSON);
  } catch(e){
    console.log(e);
  }
}

var userTemplate = {
  id:'',
  title:"",
  urlfoto:"",
  thumbnailUrl:"",
  album: ""
}

openFile();

userModel.getAll = ()=>{
  return userCollection;
}

userModel.getById = (id)=>{
  var filteredUsers = userCollection.filter(
    (o)=>{
      return o.userID === id;
    }
  );
  if(filteredUsers.length){
    return filteredUsers[0];
  }else{
    return null
  }
}

userModel.addNew = ({ title, urlfoto, thumbnailUrl }  )=>{
  var newUser = Object.assign(
    {},
    userTemplate,
    {
      id: id,
      title: title,
      urlfoto: urlfoto,
      thumbnailUrl: thumbnailUrl,
      album: album
    }
  );
  newUser.userID = userCollection.length + 1;

  userCollection.push(newUser);
  writeToFile();
  return newUser;
}

userModel.update = (id, { urlfoto, thumbnailUrl })=>{
 var updatingUser = userCollection.filter(
   (o, i)=>{
     return o.userID === id;
   }
 );
 if(updatingUser && updatingUser.length>0){
   updatingUser = updatingUser[0];
 } else {
   return null;
 }
 var updateUser = {};
 var newUpdatedCollection = userCollection.map(
   (o, i)=>{
     if(o.userID === id){
       updateUser = Object.assign({},
          o,
         { urlfoto: 'unsplash.com' , urlthumbnail: 'unsplash.com'}
       );
       return updateUser;
     }else{
       return o;
     }
   }
 );
  userCollection = newUpdatedCollection;
  writeToFile();
  return updateUser;
}

userModel.deleteByCode = (id)=>{
  var newCollection = [];
  newCollection = userCollection.filter(
    (o)=>{
      return o.userID !== id;
    }
  );
  userCollection = newCollection;
  writeToFile();
  return true;
}


module.exports = userModel;
