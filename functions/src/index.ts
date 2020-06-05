// import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin')

const functions = require('firebase-functions')

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://ssss-ss.firebaseio.com'
})
const db = admin.firestore()

exports.addUserOnSignUp = functions.auth
  .user()
  .onCreate(
    (user: {
      uid: String
      email: String
      displayName: String
      photoURL: String
    }) => {
      let docRef = db.collection('users').doc(user.uid)
      docRef.set({
        email: user.email,
        name: user.displayName,
        pic: user.photoURL
      })
    }
  )
