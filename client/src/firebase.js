import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxuAgthGwunnaLsjcP0oQ7aBcJskc2SP0",
  authDomain: "typing-test-44b38.firebaseapp.com",
  projectId: "typing-test-44b38",
  appId: "1:1081207317859:web:1e2afc76404d99ed439f56",
};

// initialize firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);