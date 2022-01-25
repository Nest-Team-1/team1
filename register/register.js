// DOM-ын sign up page
const $registEmail = document.getElementById('register-email');
const $registPassword = document.getElementById('register-password');
const $registUsername = document.getElementById('register-username');
const $registRegisterBtn = document.getElementById('registRegisterBtn');
const $registerForm = document.getElementById('register-form');

//////////////////////////////////////////////////////////////////////////

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
  else{
    $registEmail.value = email;
    $registEmail.disabled = true;
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
      console.log(result);
    })
    .catch((error) => {
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
      console.log(error);
    });
}
//////////////////////////////////////////////////////////////////////////
$registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userName = $registUsername.value;
  const password = $registPassword.value;
  const email = $registEmail.value;
  
  db.collection('users').where('name', '==', userName).get().then((querySnapshot) =>{
    const data = querySnapshot.docs[0].data();
    console.log(data);
    alert(`${userName} нэртэй хэрэглэгч бүртгэлтэй байна. Та өөр нэр     оруулна уу ?`);
  }).catch((err) => {
    console.log(err);
    createEmail(email, password, userName);
  });
})
// Create Email
  createEmail = (email, password, uName) => {
    console.log(email, password, uName);
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    // Signed in 
        user.updateProfile({
          displayName: uName
        }).then(() => {
            console.log('Update data...');
            createUserFireStore(user, password);
        }).catch((err) => {
            console.log(`Error:${err}`);
        })
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage, errorCode );
    // ..
  });
  }

// write user information to firestore
createUserFireStore = (user, password) => {
    db.collection('users').doc(user.uid).set({
        name: user.displayName,
        password,
        email: user.email
    }).then(() => {
        console.log('successfull save data in firestore');
        location.replace('../profile/index.html');
    }).catch((err) => {
        console.log('failed save data error:', err);
    })
}
