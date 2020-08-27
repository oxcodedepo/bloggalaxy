  // Your web app's Firebase configuration
  //var firebaseConfig = {
    //apiKey: "AIzaSyAVTf_L-G0kKf00pxxFiM_tpPszvhMeADk",
    //authDomain: "my-everyday-life.firebaseapp.com",
    //databaseURL: "https://my-everyday-life.firebaseio.com",
    //projectId: "my-everyday-life",
    //storageBucket: "my-everyday-life.appspot.com",
    //messagingSenderId: "514831887508",
    //appId: "1:514831887508:web:367658ee3055c5def19881",
    //measurementId: "G-VGC8TB0CXR"
  //};
  // Initialize Firebase
  //firebase.initializeApp(firebaseConfig);
  //firebase.auth.Auth.Persistence.LOCAL;

  $("#btn-login").click(function()
  {
    var email = $("#email").val();
    var password = $("#password").val();

    if (email != "" && password != ""){
        var result = firebase.auth().signInWithEmailAndPassword(email, password);
        result.catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message : " + errorMessage);
        });
    }else {
        window.alert("Please fill all fields.");
    }
  });


  $("#btn-logout").click(function()
  {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("Sign Out sucessfull");
    }).catch(function(error) {
      // An error happened.
      console.log("Error occurred.");
    });
  });


  $("#btn-signup").click(function()
  {
    var email = $("#email").val();
    var password = $("#password").val();
    var cpassword = $("#confirmPassword").val();

    if (email != "" && password != "" && cpassword != ""){
      if (password == cpassword){
                var result = firebase.auth().createUserWithEmailAndPassword(email, password);
        result.catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message : " + errorMessage);
        });
      } else {
        window.alert("Password does not match Confirmed Password");
      }
    }else {
        window.alert("Please fill all fields.");
    }
  });

  
  $("#btn-resetPassword").click(function()
  {
    var auth = firebase.auth().signOut();
    var email = $("#email").val();
    if (email != ""){
      auth.sendPasswordResetEmail(email).then(function(){
        window.alert("Email has been sent to your mail, Please check and verify");
      })
      .catch(function(error)
      {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
        window.alert("Message : " + errorMessage);
      });
    } else {
      window.alert("Please write your email first.");
    }
  });

  
  $("#btn-update").click(function()
  {
    var phone = $("#phone").val();
    var address = $("#address").val();
    var bio = $("#bio").val();
    var fname = $("#firstName").val();
    var sname = $("#secondName").val();
    var gender = $("#gender").val();
    var country = $("#country").val();

    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);

    if (phone != "" && address != "" && bio != "" && fname != "" && sname != "" && gender != "" && country != ""){
      var userData = {
        "phone": phone,
        "address": address,
        "bio": bio,
        "firstName":fname,
        "secondName": sname,
        "gender": gender,
        "country": country
      };
      usersRef.set(userData, function(error){
        if (error){
          var errorCode = error.code;
          var errorMessage = error.message;
  
          console.log(errorCode);
          console.log(errorMessage);
          window.alert("Message : " + errorMessage);
        } else {
          window.location.href = "mainPage.html"
        }
      });

      
    } else {
      window.alert("Please fill all fields.");
    }
  });

  function switchView(view){
    $.get({
      url:view,
      cache:false,
    })
    .then(function(data){
      $("#container").html(data)
    });
  }