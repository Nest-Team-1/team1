// DOM-ын хэсэг
const $loginBtn = document.getElementById('submit-btn');
const $loginNameInput = document.getElementById('login-email');
const $loginPasswordInput = document.getElementById('login-password');
const $registBtn = document.getElementById('regist-btn');
const $loginField = document.querySelector('.login');
const $signUpField = document.querySelector('.sign-up');
const $googleSigInField = document.querySelector('.google-sign-in');
const $registRegisterBtn = document.getElementById('.registRegisterBtn');
const $registEmail = document.getElementById('register-email');
const $registPassword = document.getElementById('register-password');
const $registUsername = document.getElementById('register-name');
const $registerRegistBtn = document.getElementById('register-regist-btn');
const $inputImg = document.querySelector('.regist-upload-img'); 
const $google = document.querySelector('.google');
const $facebook = document.querySelector('.facebook');
let registerEmail;

// Login email, username or password
$loginBtn.addEventListener('click', () => {
  const userName = $loginNameInput.value;
  const userPassword = $loginPasswordInput.value;
  if(userName && userPassword){
    userName``
    db.collection('users').onSnapshot((snapshot) => {
      console.log('lenght:123', snapshot.docs.length);
      for(let i=0; i<snapshot.docs.length; i++){

      }
  });
  }
})
//////////////////////////////////////////////////////////////////////////

searchName = () => {
  
}

searchEmail

//////////////////////////////////////////////////////////////////////////
// Login page бүртгүүлэх button
$registBtn.addEventListener('click', () => {
    $loginField.style.display = 'none';
    $signUpField.style.display = 'flex';
});

//////////////////////////////////////////////////////////////////////////
// Email link Authentication

var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'http://localhost:5500/team1/register/register.html',
  // This must be true.
  handleCodeInApp: true,
};

vericationEmail = (email) =>{
  firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
  .then(() => {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
    // createEmail(email, password, uName, profileImg);
    // ...
    alert('И-мейл хаяг руу бүртгүүлэх линкийг илгээлээ.');
    // Confirm the link is a sign-in with email link.
if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  // Additional state parameters can also be passed via URL.
  // This can be used to continue the user's intended action before triggering
  // the sign-in operation.
  // Get the email if available. This should be available if the user completes
  // the flow on the same device where they started it.
  var email = window.localStorage.getItem('emailForSignIn');
  if (!email) {
    // User opened the link on a different device. To prevent session fixation
    // attacks, ask the user to provide the associated email again. For example:
    email = window.prompt('Please provide your email for confirmation');
  }
  // The client SDK will parse the code from the link for you.
  firebase.auth().signInWithEmailLink(email, window.location.href)
    .then((result) => {
      // Clear email from storage.
      window.localStorage.removeItem('emailForSignIn');
      // You can access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is new or existing:
      // result.additionalUserInfo.isNewUser
    })
    .catch((error) => {
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
    });
}

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
    // ...
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
//////////////////////////////////////////////////////////////////////////
//Sign up email authentication 
$registerRegistBtn.addEventListener('click', ()=> {
  const email = $registEmail.value;
  // const password = $registPassword.value;
  // const uName = $registUsername.value;
  // const profileImg = $inputImg.files[0];
  if(email){
    vericationEmail(email);
  }
  else{
    alert('Email zaaval oruulna uu ');
  }
});
//////////////////////////////////////////////////////////////////////////
// Create Email
createEmail = (email, password, uName, profileImg) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
.then((userCredential) => {
  const user = userCredential.user;
  console.log(user);
  // Signed in 
  if(profileImg){
    console.log('if');
    const profileRef = storageRef.child(`images/profile${user.uid}`);
    const uploadTask = profileRef.put(profileImg);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    console.log(err, 'asddd');
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
    () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        console.log(user);
        user.updateProfile({
          displayName: uName,
          photoURL: downloadURL
        }).then(() => {
            console.log('Update data...');
        }).catch((err) => {
            console.log(`Error:${err}`);
        })
        // ...
        });
    }
  );
  }
  else{
    console.log('else...')
    const pathReference = storageRef.child(`images/defaultProfile.png`).getDownloadURL().then((url) => {
      user.updateProfile({
        displayName: uName,
        photoURL: url
      }).then(() => {
          console.log('Update data...');
      }).catch((err) => {
          console.log(`Error:${err}`);
      })
    }).catch((err) => {
      console.log(err);
    })
}

})
.catch((error) => {
  var errorCode = error.code;
  var errorMessage = error.message;
  // ..
});
}