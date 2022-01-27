const $profileForm = document.getElementById("profile-form");
const $profileEmail = document.querySelector('.profile-email');
const $profileUsername = document.querySelector('.profile-username');
const $profilePhone = document.querySelector('.profile-phone-number');
const $profilePassword = document.querySelector('.profile-password');
const $profileImg = document.getElementById('profile-img'); 
const $profilePhoto = document.querySelector('.profilep'); 
const $ulTag = document.querySelector('.ul-tag');
const $contentContainer = document.querySelector('.content-container');
const $cancelBtn = document.getElementById('cancel');
let userData, phone, confirmationResult;

updateProfileData = () => {
  console.log(`Update profile Data`);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      $profileEmail.innerText = user.email;
      $profileUsername.innerText = user.displayName;
      $profilePhone.innerText = user.phoneNumber;
      $profilePassword.innerText = '********';
      // console.log(user);
      if(user.photoURL){
        $profilePhoto.style.backgroundImage = `url(${user.photoURL})`;
      }
      // Check the verified Email
      if(user.emailVerified === true){
        db.collection("users").doc(user.uid).update({
          oldEmail: firebase.firestore.FieldValue.delete()
        });
      }
      else{
        db.collection('users').doc(user.uid).get().then((doc)=>{
          const data = doc.data();
          console.log(data);
          if(data.oldEmail){
            alert('Имейл хаягаа баталгаажуулна уу ?');
          }
        })
      }
    } else {
      // console.log(uid);
      // if(uid){
      //   db.collection('users').doc(uid).get().then((doc) => {
      //     const data = doc.data();
      //     console.log(data);
      //     signInEmail(data.email, data.password);
      //   }).catch((err) => {
      //     console.log(err);
      //   })
      //   uid = null;
      // }
      // else{
        // User is signed out
        alert('Sign-out...');
        location.replace('../login/index.html');
      // }
    }
  });
}

updateProfileData();

// Change profile image
$profileImg.addEventListener('change', () => {
  const file = $profileImg.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    $profilePhoto.style.backgroundImage = `url(${reader.result})`;
  }
});
$profileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const file = $profileImg.files[0];
  if(file){
    //Profile zurag uplaod hiih
    console.log('if');
      const profileRef = storageRef.child(`images/profile${userData.uid}`);
      const uploadTask = profileRef.put(file);
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
          console.log(userData);
          userData.updateProfile({
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
});

function cancelBtn(){
  console.log($contentContainer.childNodes);
  $contentContainer.removeChild($contentContainer.childNodes[7]);
}
/////////////////////////////////////////////
// Change Profile Data 
// Save button clicked
function saveChanges(labelText){
  console.log(`saveChanges`);
  const $changeDataInput = document.getElementById('changeDataInput');
  if($changeDataInput.value){
    if(labelText === 'New Username'){
      db.collection('users').where('name', '==', $changeDataInput.value).get().then((querySnapshot) =>{
        const data = querySnapshot.docs[0].data();
        console.log(data);
        alert(`${$changeDataInput.value} нэвтрэх нэртэй хэрэглэгч бүртгэлтэй байна. Та өөр  нэр оруулна уу ?`);
      }).catch((err) => {
        console.log(err);
        userData.updateProfile({
          displayName: $changeDataInput.value
        }).then(() => {
          console.log('auth save successful');
            db.collection('users').doc(userData.uid).set({
              name: $changeDataInput.value
            },{merge: true});
            console.log('Update data...');
            updateProfileData();
        }).catch((err) => {
            console.log(`Error:${err}`);
        });
      })
      
    }
    else if(labelText === 'New Email'){
      db.collection('users').where('email', '==', $changeDataInput.value).get().then((querySnapshot) =>{
        const data = querySnapshot.docs[0].data();
        console.log(data);
        alert(`${$changeDataInput.value} и-мейлтэй хэрэглэгч бүртгэлтэй байна. Та өөр и-мейл оруулна уу ?`);
      }).catch((err) => {
        console.log(err);
        const oldEmail = userData.email;
      userData.updateEmail($changeDataInput.value).then(() => {
        // Update successful
        userData.sendEmailVerification().then(() => {
          window.localStorage.setItem('emailForSignIn', $changeDataInput.value);
          db.collection('users').doc(userData.uid).set({
            oldEmail,
            email: $changeDataInput.value
          },{merge: true}).catch((err) => {
            console.log(`Error:${err}`);
          });
          alert("Шинэ и-мейл хаяг руу баталгаажуулах линк илгээлээ.");
        }).catch((err) => {
          console.log(err);
        });      
      }).catch((error) => {
        console.log(error);
        // An error occurred
        // ...
      });
      });
    }
    else if(labelText === 'New Password'){
      userData.updatePassword($changeDataInput.value).then(() => {
          db.collection('users').doc(userData.uid).set({
            password: $changeDataInput.value
          },{merge: true});
          console.log('Update data...');
          console.log(userData.password);
          updateProfileData();
      }).catch((err) => {
          console.log(`Error:${err}`);
      });
    }
    $contentContainer.removeChild($contentContainer.childNodes[7]);
  }
}

function updateProfilePhoneNumber() {
  const phoneNumber = document.getElementById('changeDataInput').value;
  if(phoneNumber.length === 8){
    console.log(phoneNumber.length);
    db.collection('users').where('phone', '==', phoneNumber).get().then((querySnapshot) =>{
      const data = querySnapshot.docs[0].data();
      console.log(data);
      alert(`${phoneNumber} дугаартай хэрэглэгч бүртгэлтэй байна. Та өөр утасны дугаар оруулна уу ?`);
    }).catch((err) => {
      console.log(err.message);
      // This will render a fake reCAPTCHA as appVerificationDisabledForTesting is true.
      // This will resolve after rendering without app verification.
      // Phone verication code submit 
      console.log(userData.phoneNumber);
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('phone-number-send', {
        size: 'invisible',
      });
      const appVerifier = window.recaptchaVerifier
        firebase.auth().currentUser.linkWithPhoneNumber(`+976${phoneNumber}`, appVerifier)
        .then((confirmationResult) => {
          phone = phoneNumber
          window.confirmationResult = confirmationResult
          alert('Таны утасруу баталгаажуулах код илгээлээ.');
          cancelBtn(); 
          createHTMLElementPhone2();
          // prompt user to entre code 
        })
        .catch((error) => {
          // reset rechatcha and try again 
          appVerifier.reset('phone-number-send')
          alert(error.message)
        })
    });
  }
  else{
    alert('Таны оруулсан утасны дугаар алдаатай байна. Дугаараа шалгаад дахин оролдоно уу ?');
  }
}

function verifyCode(){
  const $vericationCodeNumber = document.getElementById('verication-code-number'); 
  code = $vericationCodeNumber.value;
  if(code){
    window.confirmationResult.confirm(code).then((result) => {
      console.log(result);
      const credential = firebase.auth.PhoneAuthProvider.credential(window.confirmationResult.verificationId, code)
      firebase.auth().currentUser.linkWithCredential(credential)
    })
      .then(() => {
        // done 
        db.collection('users').doc(userData.uid).set({
          phone
        },{merge: true});
        console.log('then...');
        cancelBtn();
        updateProfileData();
      })
      .catch((error) => {
        alert(error.message)
      // try again
      })
  }
}

// Sign in email account
// signInEmail = (email, password) =>{
//   console.log("sign in function......", email);
//   firebase.auth().signInWithEmailAndPassword(email, password)
//   .then((userCredential) => {
//     // Signed in
//     var user = userCredential.user;
//     // ...
//     console.log(phone);
//     user.updateProfile({
//       phoneNumber: `${phone}`
//     }).then(()=>{
//       console.log('phone successful');
//       db.collection('users').doc(userData.uid).set({
//         phone
//       },{merge: true});
//       console.log('Update data...');
//       updateProfileData();
//     }).catch((err)=>{
//       console.log(err);
//     })
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.log(errorCode, errorMessage);
//   });
// }


createHTMLElement = (labelTitle, text, type) => {
  console.log('clicked...');
  const div = document.createElement('div');
  div.classList.add('changed-field-phone', 'column', 'flex', 'just-center', 'align-center');
    const html = `<div class="big-text">
    <label for="usernamechange">${labelTitle}</label>
    <input type=${type} name="usernamechange" id="changeDataInput">
  </div>
  <div>
    <button onclick = "saveChanges('${labelTitle}')" class="changeBtn" id="changeDataSave">${text}</button>
    <button onclick="cancelBtn()" class="changeBtn" id="cancel">Cancel</button>
  </div>`;
  div.innerHTML = html;
  $contentContainer.append(div);
}
createHTMLElementPhone1 = () => {
  const div = document.createElement('div');
  div.classList.add('changed-field-phone', 'column', 'flex', 'just-center', 'align-center');
  
  const html = `<div class="big-text">
    <label for="usernamechange">New Phone Number:</label>
    <input type="number" name="usernamechange" id="changeDataInput">
  </div>
  <div>
    <button class="changeBtn"onclick='updateProfilePhoneNumber()' id="phone-number-send">Send Code</button>
    <button onclick="cancelBtn()" class="changeBtn" id="cancel">Cancel</button>
  </div>`;  

  div.innerHTML = html;  
  $contentContainer.append(div);
}

createHTMLElementPhone2 = () => {
  const div = document.createElement('div');
  div.classList.add('changed-field-phone', 'column', 'flex', 'just-center', 'align-center');
  
  const html = `<div class="big-text">
    <label for="usernamechange">Verication Code:</label>
    <input type="number" name="usernamechange" id="verication-code-number">
  </div>
  <div>
    <button class="changeBtn"onclick='verifyCode()' id="verify-code-send">Send Code</button>
    <button onclick="cancelBtn()" class="changeBtn" id="cancel">Cancel</button>
  </div>`;  

  div.innerHTML = html;  
  $contentContainer.append(div);
}

 
// Change profile information
$ulTag.addEventListener("click", (e) => {
  const edit = e.target;
  if(edit.classList.value === 'edit'){
    const li =  edit.parentElement.classList[0];
    userData = firebase.auth().currentUser;
    // if(userData){
    //   uid = userData.uid;
    // }
    console.log(li);
    switch(li) {
      case 'li1':
        createHTMLElement('New Username', 'Save', 'text');
        break;
      case 'li2':
        createHTMLElement('New Email', 'Send', 'email');
        break;
      case 'li3':
        // Phone verication code submit 
        createHTMLElementPhone1();
        break;
      case 'li4':
        createHTMLElement('New Password', 'Save', 'password');
        break;
    }
  }
});


// Email link Authentication
var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'http://localhost:5500/team1/profile/puujee.html',
  // This must be true.
  handleCodeInApp: true,
};
