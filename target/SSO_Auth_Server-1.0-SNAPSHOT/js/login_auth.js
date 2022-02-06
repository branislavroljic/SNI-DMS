function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    console.log('id_token: ' + googleUser.getAuthResponse().id_token);

    //do not post above info to the server because that is not safe.
    //just send the id_token

    var redirectUrl = '?action=oauth_login&serviceURL=https://localhost:8443/SNI_DMS_Documents_war_exploded';
    //using jquery to post data dynamically
    var form = $('<form action="' + redirectUrl + '" method="post">' +
        '<input type="text" name="id_token" value="' +
        googleUser.getAuthResponse().id_token + '" />' +
        '</form>');
    $('body').append(form);
    form.submit();
}