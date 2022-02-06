// $('#a_logout').click(function(event) {
//     // Remember the link href
//     var href = this.href;
//
//     // Don't follow the link
//     event.preventDefault();
//
//     // Do the async thing
//     startSomeAsyncThing(function() {
//         // This is the completion callback for the asynchronous thing;
//
//         var auth2 = gapi.auth2.getAuthInstance();
//         auth2.signOut().then(function () {
//             console.log('User signed out.');
//         });
//
//         // go to the link
//         window.location = href;
//     });
// });