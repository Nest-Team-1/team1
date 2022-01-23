// DOM-ын хэсэг Login
const $loginForm = document.getElementById('login-form');
const $loginNameInput = document.getElementById('login-email');
const $loginPasswordInput = document.getElementById('login-password');
const $registBtn = document.getElementById('regist-btn');

const $center2 = document.querySelector('.center2');
const $center3 = document.querySelector('.center3')

const $google = document.querySelector('.google');
const $facebook = document.querySelector('.facebook');

// DOM-ын verication email
const $vericationEmail = document.getElementById('verication-email');
const $vericationForm = document.getElementById('verication-form');



// Profile page
const $inputImg = document.querySelector('.regist-upload-img'); 

let registerEmail;

// Login email, username or password
$loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('clicked...');
  const inputValue = $loginNameInput.value;
  const userPassword = $loginPasswordInput.value;
  if(inputValue && userPassword){
    const arrStr = inputValue.split('');
    const inputValueType = checkValue(arrStr);
    db.collection('users').where(inputValueType, '==', inputValue).get().then((querySnapshot) => {
      const data = querySnapshot.docs[0].data();
      console.log(data.password);
      if(data.password === userPassword){
        signInEmail(data.email, data.password); 
      }
      else{
        alert(`username or password wrong....1`);
      }  
  }).catch((err) => { 
    console.log(err);
    alert(`username or password wrong....2`);
  });
  }
})
//////////////////////////////////////////////////////////////////////////
// Inpuiin utgiig email phone or username Shalgana
checkValue = (arrString) => {
  let flag = 'phone';
  for(const i of arrString){
    const code = i.charCodeAt();
    console.log(code);
    if(code === 64){
      return 'email';
    }
    else if((code > 64 && code < 91) || (code > 96 && code < 123)){
      flag = 'name';
    }
  }
  return flag;
}


//////////////////////////////////////////////////////////////////////////
// Login page register button show to verication email screen 
$registBtn.addEventListener('click', () => {
    $center2.style.display = 'none';
    $center3.style.display = 'block';
});

//////////////////////////////////////////////////////////////////////////

// Email link Authentication
var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'http://localhost:5500/team1/register/index.html',
  // This must be true.
  handleCodeInApp: true,
};

const vericationEmail = (email) =>{
  firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
  .then(() => {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
    alert('И-мейл хаяг руу бүртгүүлэх линкийг илгээлээ.');
    // Confirm the link is a sign-in with email link.
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
    // ...
  });
}

//Sign up email authentication 
$vericationForm.addEventListener('submit', (e)=> {
  e.preventDefault();
  const email = $vericationEmail.value;
  if(email){
    vericationEmail(email);
  }
  else{
    alert('Email zaaval oruulna uu ');
  }
});

//////////////////////////////////////////////////////////////////////////
// Sign in email account
signInEmail = (email, password) =>{
  console.log("sign in function......", email);
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
    console.log(user);
    location.replace('../profile/index.html')
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
}
//////////////////////////////////////////////////////////////////////////
// Google-eer newtreh
let googleProvider = new firebase.auth.GoogleAuthProvider();
$google.addEventListener('click', () => {
  console.log('Google sign-in');
  firebase.auth()
  .signInWithPopup(googleProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    console.log(user);
    location.replace('./home.html');
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    console.log(errorCode, errorMessage, email, credential);
  });
});
//////////////////////////////////////////////////////////////////////////
// Facebook-eer nevtreh
let facebookProvider = new firebase.auth.FacebookAuthProvider();
$facebook.addEventListener('click', () => {
  console.log('Facebook sign-in');
  firebase.auth()
  .signInWithPopup(facebookProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    location.replace('./home.html');
    console.log(user);
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    console.log(errorCode, errorMessage, email, credential);
  });
});
