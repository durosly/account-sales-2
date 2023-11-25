// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyD3DUWC1oJWGcznAjt9MYibATkItiDXrBc",
	authDomain: "smartsales-173bc.firebaseapp.com",
	projectId: "smartsales-173bc",
	storageBucket: "smartsales-173bc.appspot.com",
	messagingSenderId: "990138199179",
	appId: "1:990138199179:web:8d6da6352dcf8b20f5f88e",
	measurementId: "G-VNPWCL1DRH",
};
export const vapid =
	"BD2do5z9aEqEyd9vNoX54iGiwgzxILUR3SeRaewoMmJdVG4sbywYgwttqkLMZhVPxLeyuB5R2HKdY07pNokvhLg";
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
