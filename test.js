const data = {
  name : "rizwan",
  password : "hadhajdh"
}


data.toJSON = function(){
  const userObject = this
  delete userObject.password
  return this
}
console.log(data.toJSON());