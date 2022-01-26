let $fileinp = document.querySelector(".fileinp");
let $upload = document.querySelector(".upload");
let $profilep = document.querySelector(".profilep");
let $username = document.getElementById("username");
let $loginbtn = document.querySelector(".loginbtn");
let $emailinp = document.getElementById("emailinp");
let $remove = document.querySelector(".remove");
$upload.onclick = () => {
  $fileinp.click();
};
$loginbtn.onclick = () => {
  let docRef = db.collection("users").doc();
  const storage = firebase.storage().ref();
  const imageRef = storage.child(`photoimg${docRef.id}.png`);

  imageRef.put($fileinp.files[0]).then((res) => {
    imageRef.getDownloadURL().then((url) => {
      docRef
        .set(
          {
            username: $username.value,
            userphoto: url,
          },
          { merge: true }
        )
        .then(() => {
          console.log("done");
        });
    });
  });
};
db.collection("users").onSnapshot((snapshot) => {
  snapshot.forEach((doc) => {
    $profilep.src = doc.data().userphoto;
  });
});

let imgUrl = "";
$username.onchange = () => {
  changebtn();
};

$upload.onchange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    $profilep.src = reader.result;

    changebtn(reader.result);
  };
};
function changebtn(img) {
  if ($emailinp.value !== "" || $username.value !== "" || img !== undefined) {
    $loginbtn.style.backgroundColor = "rgb(24, 101, 242)";
  } else {
    $loginbtn.style.backgroundColor = "#c4c4c4";
  }
}
$emailinp.onchange = () => {
  changebtn();
};
$remove.onclick = () => {
  var fileUrl = userphoto;

  // Create a reference to the file to delete
  var fileRef = storage.refFromURL(fileUrl);

  console.log("File in database before delete exists : " + fileRef.exists());

  // Delete the file using the delete() method
  fileRef
    .delete()
    .then(function () {
      // File deleted successfully
      console.log("File Deleted");
    })
    .catch(function (error) {
      // Some Error occurred
    });

  console.log("File in database after delete exists : " + fileRef.exists());
};
