// // Here we display an initial message
// console.log("Welcome to the interactive messaging system");

// // Here ask the user for name and age 


  
  function valid_string () {
    let name = prompt("Type your name: ");
    if (!isNaN(name)) {
      console.error("Type a valid name: ")
      valid_string()
    }
  }
 




const valid_int = (name) => {
  
  valid_string()
  let age = prompt("Type your age: ")  
  let nueage = parseInt(age)
  if (nueage <= 0) {
    console.error("Type a correct number: ")
    valid_int()
  }
  else if (0 < nueage && nueage < 18) {
    console.log(name + " you are a minor, keep learning!")
  } else {
    console.log(name + " continue exploring new experiencies!")
  }
}

valid_int()




























// // let age = prompt("Type your age: ");




// // We convert the name to a number for validation 
// // if (typeof name === 'string') {
// //   console.log("Es una cadena");
// // } else {
// //   console.log("No es una cadena");
// // }

// // # def get_valid_int(prompt):
// // #     while True:
// // #         try:
// // #             value = int(input(prompt))
// // #             if value > 0:
// // #                 return value
// // #             else:
// // #                 print("\033[31mError: Type a positive number.\033[0m")
// // #         except ValueError:
// // #             print("\033[31mError: Type a valid character.\033[0m")   

// // age = parseInt(age);

// // We validate if the user type a number
// // if (isNaN(age)) {
// //     console.error("Please, type a number!")

// // // if age user is less than 18
// // } else if (age < 18) {
// //     console.log(name + " you are a minor, keep learning!")
// // // else 
// // } else {
// //     console.log(name + " continue exploring new experiencies!")
// // }



