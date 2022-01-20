// DOM-ын sign up page
const $registEmail = document.getElementById('register-email');
const $registPassword = document.getElementById('register-password');
const $registUsername = document.getElementById('register-username');
const $registRegisterBtn = document.getElementById('registRegisterBtn');
const $registerForm = document.getElementById('register-form');

//////////////////////////////////////////////////////////////////////////
$registerForm.addEventListener('submit', () => {
const $registUsername = document.getElementById('register-username');
    const userName = $registUsername.value;
    const email = $registEmail.value;
    const password = $registPassword.value;
    createEmail($registEmail, $registPassword, $registUsername);
})
// Create Email
  createEmail = (email, password, uName) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    // Signed in 
        user.updateProfile({
          displayName: uName,
          email
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
    }).catch((err) => {
        console.log('failed save data error:', err);
    })
}




////Profile zurag uplaod hiih
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