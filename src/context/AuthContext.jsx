import { useState, useEffect, createContext, useContext } from "react";
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut} from "firebase/auth"
import {addDoc,collection,where,doc,query,getDocs} from "firebase/firestore"
import { uploadStaticImage } from "../utils/helpers";
import {auth,storage,db} from "../firebase"
import { useNavigate } from "react-router";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";


const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // should have username and email
  const [useDemoData,setUseDemoData] = useState(false)
  const [alert,setAlert] = useState(null);
  const navigate = useNavigate()





  useEffect(() => {
    if(useDemoData)return;
    onAuthStateChanged(auth,async(user)=>{
        if(!user){
            navigate("/login")
        }else{
            let q = await query(collection(db,"users"),where("email","==",user.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              setUser({id:doc.id,...doc.data()})
            });
        }
    })
  }, []);




  useEffect(()=>{
    if(useDemoData){
      const fetchDummyData=async()=>{
      let response = await fetch("data.json");
      let data = await response.json();
      // console.log("Data",data);
      setUser(data.user);
      navigate('/')
      }
      fetchDummyData();
    }
  },[useDemoData])


  const signup = async(userData)=>{

    try{
        await createUserWithEmailAndPassword(auth,userData.email,userData.password);
      if(!userData.avatarUrl){
        console.log("successfully created a sessioned user")
        let blobFile = await uploadStaticImage("./custom_assets/generic_avatar.jpg");
        let imgRef = await ref(storage,"avatars/avatar.jpg")
        await uploadBytes(imgRef,blobFile);
        let downloadUrl = await getDownloadURL(imgRef);
        userData.avatarUrl = downloadUrl;
        }
        else{
          let imgRef = await ref(storage,`avatars/${userData.avatarUrl.file.name}`)
          await uploadBytes(imgRef,userData.avatarUrl.file);
          let downloadUrl = await getDownloadURL(imgRef);
          userData.avatarUrl = downloadUrl;
        }
        // console.log(userData);
        let firestoreUser = await addDoc(collection(db,"users"),userData);
        console.log("firestoreUser",firestoreUser);
        setUser(userData);
        navigate("/")
      // }
    }
    catch(e){
      console.log("Error",e,e.message)
      toggleAlert(e.message)
    }
  }

  const signin = async(userData)=>{
    try{
      console.log("Userdata",userData);
      await signInWithEmailAndPassword(auth,userData.email,userData.password);
    }
    catch(e){
      console.log("Error with signing in :(")
      toggleAlert(e.message);
    }
  }


  const signout = async()=>{

    try{
      if(useDemoData){
          setUseDemoData(false);
      }else{
          await signOut(auth);
          }
          setUser(null);
          navigate('/login')
        }
        catch(e){}
      }

  const signinwithdemodata=()=>{
    // console.log('signin with demo data!')
    setUseDemoData(true);
  }


  const toggleAlert = (msg)=>{
    setAlert(msg);
    setTimeout(()=>setAlert(""),2000);
  }

  const values = {
    signup,
    signin,
    signout,
    signinwithdemodata,
    user,
    setUser,
    alert,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};