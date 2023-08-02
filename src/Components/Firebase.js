import { initializeApp } from 'firebase/app';
import { getFirestore } from "@firebase/firestore"
import { getAuth } from 'firebase/auth';
import { getStorage} from "firebase/storage";
//import 
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  
        apiKey: "AIzaSyDK_bNd3z1KwukXLfsFsaox4qm6XA_V-RE",
        authDomain: "nilwalaweb-4478c.firebaseapp.com",
        projectId: "nilwalaweb-4478c",
        storageBucket: "nilwalaweb-4478c.appspot.com",
        messagingSenderId: "956870344024",
        appId: "1:956870344024:web:57b0c774730a38e109b92d",
        measurementId: "G-K8SBR3ESPC"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();

export  {
    firestore,
    auth,
    storage
}