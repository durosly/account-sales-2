importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
	"https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
	apiKey: "AIzaSyD3DUWC1oJWGcznAjt9MYibATkItiDXrBc",
	authDomain: "smartsales-173bc.firebaseapp.com",
	projectId: "smartsales-173bc",
	storageBucket: "smartsales-173bc.appspot.com",
	messagingSenderId: "990138199179",
	appId: "1:990138199179:web:8d6da6352dcf8b20f5f88e",
	measurementId: "G-VNPWCL1DRH",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	console.log(
		"[firebase-messaging-sw.js] Received background message ",
		payload
	);
	const {
		notification: { body, image, title },
	} = payload;

	const notificationTitle = title;
	const notificationOptions = {
		body,
		icon: image,
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
