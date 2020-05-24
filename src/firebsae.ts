import * as firebase from "firebase/app";

import "firebase/analytics";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDpGbD8rjVdcI0pV8uNBG2yBu-lVGMEmP8",
	authDomain: "minimal-portfolio-4b77d.firebaseapp.com",
	databaseURL: "https://minimal-portfolio-4b77d.firebaseio.com",
	projectId: "minimal-portfolio-4b77d",
	storageBucket: "minimal-portfolio-4b77d.appspot.com",
	messagingSenderId: "78885806261",
	appId: "1:78885806261:web:f0ae709fcb7adf7cb41efc",
	measurementId: "G-D70GLMP8ZS"
};

const app = firebase.initializeApp(firebaseConfig);

console.log("hello baby")

export const firestore = app.firestore();