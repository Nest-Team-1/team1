let $fileinput = document.querySelector(".fileinput");
let $myinput = document.querySelector(".myinput");
let $postbtn = document.querySelector(".postbtn");
let $text = document.querySelector(".text");
let $postsection = document.querySelector(".postsection");
let $like = {};
let inpbtn = document.querySelector(".inpbtn");
let $photoscrn = document.querySelector(".photoscrn");
let $img = document.querySelector(".img");
let $comimg = document.querySelector(".comimg");
let $comphotoscrn = document.querySelector(".comphotoscrn");
let $comments = document.querySelector(".comments");
let $comphoto = document.querySelector(".comphoto");
let $coms = document.querySelector(".coms");
let $comsize = document.querySelector(".comsize");
let cominp = document.querySelector(".cominp");
let center = document.querySelector(".center");
let pbut = document.querySelector(".pbut");
const $signUp = document.getElementById('signup');
const $log = document.getElementById('login'); 
inpbtn.onclick = function () {
  $fileinput.click();
};
// comment bichih
$postbtn.onclick = function () {
  console.log($myinput.value);
  const docRef = db.collection("forum").doc();
  document.getElementById("loader").style.display = "block";
  if (!$fileinput.files[0] && $myinput.value) {
    docRef
      .set({
        text: $myinput.value,
        date: new Date(),
      })
      .then(() => {
        document.getElementById("loader").style.display = "none";
      })
      .then(($myinput.value = ""));
  } else if (!$fileinput.files[0] && !$myinput.value) {
    document.getElementById("loader").style.display = "none";
  } else {
    const storage = firebase.storage().ref();
    const imageRef = storage.child(`photo${docRef.id}.png`);
    imageRef.put($fileinput.files[0]).then((res) => {
      imageRef.getDownloadURL().then((url) => {
        docRef
          .set({
            text: $myinput.value,
            date: new Date(),
            photo: url,
          })
          .then(() => {
            $myinput.value = "";
            $fileinput.value = "";
            document.getElementById("loader").style.display = "none";
          });
      });
    });
  }
};

function draw(doc) {
  firebase.auth().onAuthStateChanged((user) => {
    let $maindiv = document.createElement("div");
    $maindiv.classList.add("main");
    let $div1 = document.createElement("div");
    const $userContainer = document.createElement("div");
    $userContainer.classList.add("flex1");
    $div1.classList.add("flex");
    $div1.classList.add("space-between");
    let $div2 = document.createElement("div");
    $div2.classList.add("userphoto");
    // $div2.innerText = "photo"; //user.photo
    let $div3 = document.createElement("div");
    $div3.classList.add("username");
    let set = document.createElement("div");
    set.classList.add("del");
    set.textContent = "x";
    set.onclick = () => {
      db.collection("forum").doc(doc.id).delete();
    };
    $div3.innerText = "name"; //user.DisplayName
    $userContainer.append($div2, $div3);
    $div1.append($userContainer, set);
    let $posttxtdiv = document.createElement("div");
    $posttxtdiv.classList.add("text");
    $posttxtdiv.innerText = doc.data().text;
    let $comment = document.createElement("div");
    $comment.classList.add("comment");
    db.collection("forum")
      .doc(doc.id)
      .collection("comment")
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        $comment.innerHTML = "";
        for (let comDoc of snapshot.docs) {
          let $comments = document.createElement("div");
          let $compic = document.createElement("div");
          let containerdiv = document.createElement("div");
         
          let comname = document.createElement("div");
          comname.classList.add("comname");
          comname.innerText = "name1"; //user.name
          let $apart = document.createElement("div");
          $apart.classList.add("apart");
        
          containerdiv.classList.add("flex");
          containerdiv.classList.add("comclass");
          $apart.append($comments,);
          containerdiv.append(comname, $apart);
          $comments.innerText = comDoc.data().text;
          $comment.append(containerdiv);
          if (comDoc.data().comphoto) {
            $compic.style.width = "30%";
            $compic.style.height = "100px";
            $compic.style.marginLeft = "25px";
            $compic.style.background = `url(${comDoc.data().comphoto})`;
            $compic.style.backgroundSize = "cover";
            $compic.style.marginLeft = "20px";
            $compic.onclick = () => {
              $comphotoscrn.style.display = "flex";
              $comimg.src = comDoc.data().comphoto;
              $comimg.style.width = "100vw";
              $comimg.style.height = "100vh";
              $compic.style.objectFit = "contain";
              $comphotoscrn.onclick = () => {
                $comphotoscrn.style.display = "none";
                console.log("hi");
              };
            };
            $comment.append($compic);
          }
        }
      });

    let $commentdiv = document.createElement("div");
    let $input = document.createElement("input");
    $input.classList.add("commentinp");
    $input.placeholder = "Add a comment...";
    let $button = document.createElement("button");
    $button.classList.add("combtnsend");
    $button.innerText = "send";
    $button.onclick = function () {
      document.getElementById("loader").style.display = "block";
      const $doc = db
        .collection("forum")
        .doc(doc.id)
        .collection("comment")
        .doc();
      if (!$cominput.files[0] && $input.value) {
        $doc
          .set({
            text: $input.value,
            date: new Date(),
            like: 0,
            tf: false,
          })
          .then(
            ($input.value = ""),
            (document.getElementById("loader").style.display = "none")
          );
      } else if (!$cominput.files[0] && !$input.value) {
      } else {
        const storage = firebase.storage().ref();
        const image = storage.child(`commpic/${$doc.id}.png`);
        image.put($cominput.files[0]).then(() => {
          image.getDownloadURL().then((url) => {
            $doc
              .set({
                text: $input.value,
                comphoto: url,
                date: new Date(),
                like: 0,
                tf: false,
              })
              .then(
                ($input.value = ""),
                ($cominput.value = ""),
                (document.getElementById("loader").style.display = "none")
              );
          });
        });
      }
    };
    let $picbtn = document.createElement("button");
    $picbtn.classList.add("attachment");
    $picbtn.innerText = "+";

    let $cominput = document.createElement("input");
    $cominput.type = "file";
    $cominput.classList.add("cominput");
    $picbtn.append($cominput);
    $commentdiv.append($input);
    $maindiv.append($div1);
    if (doc.data().photo) {
      let $photodiv = document.createElement("div");
      $photodiv.classList.add("photo");
      $photodiv.style.background = `url(${doc.data().photo})`;
      $photodiv.style.backgroundSize = "100%";
      // $photodiv.style.backgroundRepeat = "no-repeat";
      $photodiv.onclick = () => {
        $photoscrn.style.display = "flex";
        $img.src = doc.data().photo;
        $photoscrn.onclick = () => {
          $photoscrn.style.display = "none";
        };
      };
      $maindiv.append($photodiv);
    }
    $picbtn.onclick = function () {
      $cominput.click();
    };
    let $commentnumContainer = document.createElement("div");
    $commentnumContainer.classList.add("margin-left");
    db.collection("forum")
      .doc(doc.id)
      .collection("comment")
      .onSnapshot((snap) => {
        size = snap.size; // will return the collection size
        let $commentnum = document.createElement("div");
        $commentnumContainer.innerHTML = "";
        if (size > 1) {
          $commentnum.innerText = "View all " + size + " answers";
          $commentnum.onclick = () => {
            center.style.display = "flex";
            $comphoto.style.background = `url(${doc.data().photo})`;
            $comphoto.style.backgroundSize = "cover";
            cominp.click = () => {
              console.log("hi");
            };
            // $comsize.append($comment);
            $comments.onclick = () => {
              center.style.display = "none";
            };
          };
        } else if (size === 0) {
          $commentnum.innerText = size + " answer";
        } else if (size === 1) {
          $commentnum.innerText = "View all " + size + " answer";
        }
        $commentnumContainer.append($commentnum);
        $maindiv.append($commentnumContainer);
      });

    $commentdiv.append($picbtn, $button);
    $maindiv.append($posttxtdiv, $commentdiv, $comment);
    $postsection.append($maindiv);
  });
}
db.collection("forum")
  .orderBy("date", "desc")
  .onSnapshot((snapshot) => {
    $postsection.innerHTML = "";
    snapshot.forEach((doc) => {
      draw(doc);
    });
  });

// Navigation Login
const $myDivRight = document.querySelector('.mydiv-right');
let flag;
seeDiv = () => {
    if(flag){
        flag = false;
        const $settingContainer = document.querySelector('.setting-container');
        const $navImg = $myDivRight.querySelector('.nav-img');
        $navImg.removeChild($settingContainer);
    }
    else{
        flag = true;
        const $navImg = $myDivRight.querySelector('.nav-img');
        const div = document.createElement('div');
        div.classList.add('setting-container', 'flex', 'column' );
        $navImg.append(div);
        const $settingContainer = document.querySelector('.setting-container'); 
        const html = `<div class="profile-setting flex-1 nav-set-link" onclick=profilePage()> Profile Settings </div>
        <div class="logout flex-1 nav-set-link" onclick = signOut()> Log Out</div>`;
        $settingContainer.innerHTML = html;
    }
}

profilePage = ()=>{
    window.location = '../profile/index.html';
}

signOut = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location = '../login/index.html';
      }).catch((error) => {
        // An error happened.
      });
}

firebase.auth().onAuthStateChanged((user) => {
  console.log('asdasdasd');
    const divImg = document.createElement('div');
    const divUsername = document.createElement('div');
    const divReg = document.createElement('div');
    const divLogin = document.createElement('div');
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
    $myDivRight.removeChild($signUp);
    $myDivRight.removeChild($log);
    
    const htmlnavImg = `<div class="margin-left nav-img" onclick="seeDiv()"></div>`;
    // const divnavImg = document.createElement('div');
    // divImg.classList.add('nav-img'); 
    $myDivRight.innerHTML = htmlnavImg;
    const $navImg = $myDivRight.querySelector('.nav-img');
    // $navImg.innerHTML = htmlnavImg; 
    $navImg.style.backgroundImage = `url('${user.photoURL}')`;
    
    // const divUsername = document.createElement('div');
    divUsername.classList.add('flex', 'just-center', 'align-center', 'margin-left', 'nav-username');
    $myDivRight.append(divUsername);
    const $navUsername = $myDivRight.querySelector('.nav-username');
    $navUsername.innerText = user.displayName;
    
      // ...
    } else {
        if(document.getElementById('login')){
            console.log('login');
        }
        else{
            const $navImg = document.querySelector('.nav-img');
            $myDivRight.removeChild($navImg);
            const $navUsername = document.querySelector('.nav-username');
            $myDivRight.removeChild($navUsername);
            

            divReg.classList.add('margin-left', 'register');
            divReg.innerHTML = 'Бүртгүүлэх';
            $myDivRight.append(divReg);
            
            
            divLogin.classList.add('margin-left', 'login');
            divLogin.innerHTML = 'Нэвтрэх';
            $myDivRight.append(divLogin);
            location.replace('./index.html');
        }
      // User is signed out
      // ...
    }
  });

  linkToSign = () => {

    window.location = '../login/index.html';
  }