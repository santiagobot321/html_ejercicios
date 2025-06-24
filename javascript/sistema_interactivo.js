// // Here we display an initial message
console.log("Welcome to the interactive messaging system");

// // Here I creat a function that validate if the username is not a number   
function valid_string() {
  // We ask for the username
  let name = prompt("Type your name: ")
  // After that we validate with isNaN method that is not a number
  if (!isNaN(name)) {
    console.error("Type a valid name: ")
    // if user type a number, we return the funcion to ask again
    return valid_string()
  }
  // if everything is ok, we return the valid name
  return name
}

// This is another way to creat a function. Just for practicing. 
// This funtion validates wheter the user types a valid age greater than 0. 
const valid_int = (name) => {
  let age = prompt("Type your age: ")
  // Because prompt returns a string, we need to convert it to an integer with parseInt
  let nueage = parseInt(age)

  // We verify if age is greater than 0 and if it's a number
  if (nueage <= 0 || isNaN(nueage)) {
    console.error("Type a correct number: ")
    // if not, return the function again with the same name
    return valid_int(name)
    // if age is between 0 and 18, is a minor
  } else if (0 < nueage && nueage < 18) {
    console.log(name + " you are a minor, keep learning!")
  } else {
    console.log(name + " continue exploring new experiences!")
  }
}

// Here we get the name from valid_string() and put into valid_int
let name = valid_string()
valid_int(name)