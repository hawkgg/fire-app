import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyDo2lAPrDciQQ5brRpRNdoVhfxPH1SydhQ",
    authDomain: "fire-app-cf9ae.firebaseapp.com",
    databaseURL: 'https://fire-app-cf9ae.firebaseio.com',
    projectId: 'fire-app-cf9ae',
    storageBucket: "fire-app-cf9ae.appspot.com",
    messagingSenderId: "627524520544"
})

export default firebase.firestore()