
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAmD902ToI9p2nu3o6AAGWHu244CX96Eik",
    authDomain: "medcross-b8c23.firebaseapp.com",
    projectId: "medcross-b8c23",
    storageBucket: "medcross-b8c23.appspot.com",
    messagingSenderId: "209532571097",
    appId: "1:209532571097:web:f5384e21862acfd47f1dc8",
    measurementId: "G-LP8LGJ178X"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

