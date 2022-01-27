// DOM-ын хэсэг Login
const $loginForm = document.getElementById('login-form');
const $loginNameInput = document.getElementById('login-email');
const $loginPasswordInput = document.getElementById('login-password');
const $login = document.querySelector('.login');
const $registBtn = document.getElementById('regist-btn');

const $center2 = document.querySelector('.center2');
const $center3 = document.querySelector('.center3');
const $center4 = document.querySelector('.center4');
const $center5 = document.querySelector('.center5');

const $google = document.querySelector('.google');
const $facebook = document.querySelector('.facebook');
const $phone = document.querySelector('.phone');

const $phoneCancelVericationBtn = document.querySelector('.cancel-phone-verication-btn');
const $phoneCancelBtn = document.querySelector('.cancel-phone-btn');
const $emailCancelBtn = document.querySelector('.cancel-email-btn');

const $phoneForm = document.getElementById('phone-form');
const $phoneNumber = document.getElementById('phone-number'); 

const $phoneVericationForm = document.getElementById('phone-verication-form');
const $phoneVericationCode = document.getElementById('phone-verication-code'); 

// DOM-ын verication email
const $vericationEmail = document.getElementById('verication-email');
const $vericationForm = document.getElementById('verication-form');

const $recaption = document.getElementById('recaption');


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
      console.log(data);
      if(data.password === userPassword){
        if(inputValueType === 'email'){
          if(data.oldEmail ){
            alert('Шинэ и-мейл хаяг баталгаажаагүй байна. Та хэрэглэгчийн нэр эсвэл утасны дугаараа нэвтэрнэ үү ?');
          }
          else{
            signInEmail(data.email, data.password); 
          }
        }
        else{
          signInEmail(data.email, data.password); 
        }
        
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
    $center3.style.display = 'flex';
});
// email verication cancel button
$emailCancelBtn.addEventListener('click', () => {
  $center3.style.display = 'none';
  $center2.style.display = 'flex';
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
    db.collection('users').where('email', '==', email).get().then((querySnapshot) =>{
      const data = querySnapshot.docs[0].data();
      console.log(data);
      alert(`${email} и-мейлтэй хэрэглэгч бүртгэлтэй байна. Та өөр и-мейл оруулна уу ?`);
    }).catch((err) => {
      console.log(err);
      vericationEmail(email);
    });
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

// Phone register
$phone.addEventListener('click', () => {
  $login.style.display = 'none';
  $center4.style.display = 'flex';
  $center5.style.display = 'none';
});

// Phone cancel button
$phoneCancelBtn.addEventListener('click', () => {
  $center4.style.display = 'none';
  $login.style.display = 'block';
  $center5.style.display = 'none';
});
// Phone verication cancel button
$phoneCancelVericationBtn.addEventListener('click', () => {
  $center5.style.display = 'none';
  $center4.style.display = 'flex';
  $login.style.display = 'none';
});

firebase.auth().languageCode = 'mn';
let confirmationResult;
// Phone number submit button
$phoneForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const phoneNumber = $phoneNumber.value;
  if(phoneNumber.length === 8){
    console.log(phoneNumber.length);
    db.collection('users').where('phone', '==', phoneNumber).get().then((querySnapshot) =>{
      const data = querySnapshot.docs[0].data();
      console.log(data);
      alert(`${phoneNumber} дугаартай хэрэглэгч бүртгэлтэй байна. Та өөр утасны дугаар оруулна уу ?`);
    }).catch((err) => {
      console.log(err);
      $login.style.display = 'none';
      $center4.style.display = 'none';
      $center5.style.display = 'flex';
      const appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber(`+976${ phoneNumber}`, appVerifier).then((result) => {
          confirmationResult = result;
          console.log('result');
          alert('Таны утасруу баталгаажуулах код илгээлээ.');
        }).catch((error) => {
          console.log(error);
        });
    });
  }
  else{
    alert('Таны оруулсан утасны дугаар алдаатай байна. Дугаараа шалгаад дахин оролдоно уу ?');
  }
});

// Phone verication code submit 
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaption', {
  'size': 'invisible',
  'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    console.log("recaptcha/...");
    onSignInSubmit();
  }
});

// submit phone verication code
$phoneVericationForm.addEventListener('submit', (e) => {
  e.preventDefault(); 
  const code = $phoneVericationCode.value;
confirmationResult.confirm(code).then((result) => {
  // User signed in successfully.
  const user = result.user;
  console.log(user);
  db.collection('users').doc(user.uid).set({
    phone: user.phoneNumber
  }).then(() => {
      console.log('successfull save data in firestore');
      location.replace('../profile/index.html');
  }).catch((err) => {
      console.log('failed save data error:', err);
  })
  // ...
}).catch((error) => {
  // User couldn't sign in (bad verification code?)
  // ...
  console.log(error);
});
  // console.log(phone)
  
})

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
    location.replace('../Homepage/index.html');
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
    location.replace('../Homepage/index.html');
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
