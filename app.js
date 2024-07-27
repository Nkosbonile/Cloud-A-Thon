const firebaseConfig = {
  apiKey: "AIzaSyCYOyJEDJ0cveLGq7Lou77GeUMXbc2X4nU",
  authDomain: "tender-application-system.firebaseapp.com",
  projectId: "tender-application-system",
  storageBucket: "tender-application-system.appspot.com",
  messagingSenderId: "337906950006",
  appId: "1:337906950006:web:1a07803d30bc4e188ee457",
  measurementId: "G-2CQGMEQBHJ",
};

const auth = firebase.auth();
const database = firebase.database();
const app = initializeApp(firebaseConfig);

 fullName = document.getElementById("full-name").value;
email = document.getElementById("email").value;
 password = document.getElementById("password").value;
const signUpBtn = document.getElementById("signup-btn");
function register() {
  if (validateEmail(email) === false || validatePassword(password) === false) {
    alert("Invalid Email or Password !");
    return;
    //Dont continue running the code
  }
  if (validateField(fullName) === false) {
    alert("Invalid Fullname");
  }

  //actual auth code
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      var user = auth.currentUser;
      //save to database
      var databaseRef = database.ref();

      //create User data
      var userData = {
        fullName: fullName,
        email: email,
        lastLogin: Date.now(),
      };

      databaseRef.child("users/" + user.uid).set(userData);
      alert("User Created Successfully!");
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMessage = err.message;
    });
}
function validateEmail(email) {
  //emailvalidation masteringjs website
   expression = /^[^@]+@\w+(\.\w+)+\w$/.test(str);
  if (expression.test(email) === true) {
    //Email is proper
    return true;
  } else {
    //Email is not proper
    return false;
  }
}
function validatePassword(password) {
  if (password < 8) {
    return false;
  } else {
    return true;
  }
}
function validateField(field) {
  if (field === null) {
    return false;
  }
  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}
