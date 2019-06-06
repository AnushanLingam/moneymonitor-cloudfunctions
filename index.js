const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.createData = functions.auth.user().onCreate((user) => {
    const data = {
        firstRun: true,
        expenses: {},
        savings: {},
        preferences: {
            currency: "en-gb",
            theme: "light",
            userCategories: {},
        }
    }

    return admin.database().ref(`users/${user.uid}/`).set(data);
    // ...
});

exports.deleteUser = functions.auth.user().onDelete((user) => {
    return admin.database().ref(`users/${user.uid}`).remove();
});