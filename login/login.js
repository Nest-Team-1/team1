// DOM-ын хэсэг
const $loginBtn = document.getElementById('submit-btn');
const $registBtn = document.getElementById('regist-btn');
const $loginField = document.querySelector('.login');
const $signUpField = document.querySelector('.sign-up');
const $phoneSigInField = document.querySelector('phone-sign-in');
const $registRegisterBtn = document.getElementById('');
const $registEmail = document.getElementById('register-email');
const $registPassword = document.getElementById('register-password');
const $registUsername = document.getElementById('register-name');
const $registerRegistBtn = document.getElementById('register-regist-btn');
const $inputImg = document.querySelector('.regist-upload-img'); 
// Login page бүртгүүлэх button
$registBtn.addEventListener('click', () => {
    $loginField.style.display = 'none';
    $signUpField.style.display = 'flex';
});

// Register page submit button 
$registerRegistBtn.addEventListener('click', ()=> {
    console.log('kkk');
    const email = $registEmail.value;
    const password = $registPassword.value;
    const uName = $registUsername.value;
    const profileImg = $inputImg.files[0];
    if(email && password && uName){
      firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      if(!profileImg){
        profileImg = 
      }
      user.updateProfile({
          displayName: uName
      }).then(() => {
          console.log('Update data...');
      }).catch((err) => {
          console.log(`Error:${err}`);
      })
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
    }
    else{
      alert('Email, password, username zaaval oruulna uu ');
    }
})