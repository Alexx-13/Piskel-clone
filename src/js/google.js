/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
function renderButton() {
  // eslint-disable-next-line no-undef
  gapi.signin2.render('gSignIn', {
      'scope': 'profile email',
      'width': 150,
      'height': 30,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
  });
}

// Sign-in success callback
function onSuccess(googleUser) {
  // Get the Google profile data (basic)
  
  // Retrieve the Google account data
  gapi.client.load('oauth2', 'v2', function () {
      const request = gapi.client.oauth2.userinfo.get({
          'userId': 'me'
      });
      request.execute(function (resp) {
          // Display the user details
          const profileHTML = `<h3>Welcome ${resp.given_name}! <a href="javascript:void(0);" onclick="signOut();">Sign out</a></h3>`;
          // profileHTML += '<img src="'+resp.picture+'"/><p><b>Google ID: </b>'+resp.id+'
          // </p><p><b>Name: </b>'+resp.name+'</p><p><b>Email: </b>'+resp.email+'</p><p>
          // <b>Gender: </b>'+resp.gender+'</p><p><b>Locale: </b>'+resp.locale+'</p><p><b>Google Profile:</b> <a target="_blank" 
          // href="'+resp.link+'">click to view profile</a></p>';
          document.getElementsByClassName("userContent")[0].innerHTML = profileHTML;
          
          document.getElementById("gSignIn").style.display = "none";
          // document.getElementsByClassName("userContent")[0].style.display = "block";
      });
  });
}

// Sign-in failure callback
function onFailure(error) {
  alert(error);
}

// Sign out the user
function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
      document.getElementsByClassName("userContent")[0].innerHTML = '';
      document.getElementsByClassName("userContent")[0].style.display = "none";
      document.getElementById("gSignIn").style.display = "block";
  });
  
  auth2.disconnect();
}