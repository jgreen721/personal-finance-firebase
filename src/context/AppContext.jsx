import { useState, useEffect, createContext, useContext } from "react";
import {ref,uploadBytes,getDownloadURL,listAll} from "firebase/storage"
// import {collection,addDoc,onSnapshot,where} from "firebase/firestore"
// import {storage} from "../firebase"
import { addItemToFirestore,fetchItemsFromFirestore, editItemFromFirestore,deleteItemFromFirestore } from "../utils/firestore";
import {useAuthContext} from "./AuthContext"
import { createZuluTimestamp,getStaticImgPath } from "../utils/helpers";
import { colors } from "../const";


const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [transactions,setTransactions] = useState([]);
  const [pots,setPots] = useState([])
  const [budgets,setBudgets] = useState([]);
  const [recurring,setRecurring] = useState([]);
  const [showNav,setShowNav] = useState(true)
  const [showModal,setShowModal] = useState(false);
  const [alertStatus,setAlertStatus] = useState({status:null,msg:""})
  const {user,setUser} = useAuthContext();
  const [isDemo,setIsDemo] = useState(false);
  const DEMO_USER = "demo-user"


  // console.log("User",user);

  useEffect(()=>{
    let unsubscribeTransactions;
    let unsubscribePots;
    let unsubscribeBudgets
    // console.log("fetchingFirebasePromise firing!!!")
 
      if(user?.username == DEMO_USER){
        setIsDemo(true);
         fetch("data.json")
         .then(res=>res.json())
         .then(localData=>{
            setTransactions(localData.transactions.map((item,idx)=>({id:idx+1,...item})));
            setPots(localData.pots.map((item,idx)=>({id:idx+1,...item,theme:colors[item.theme]})));
            setBudgets(localData.budgets.map((item,idx)=>({id:idx+1,max:item.maximum,...item,theme:colors[item.theme]})));
            setRecurring((localData.transactions.filter(transaction=>transaction.recurring).map((item,idx)=>({id:idx+1,...item}))))
            let tempUser = user;
            tempUser.balance = localData.balance.current;
            setUser(tempUser);

            
        })
      } 
      
      {
        unsubscribeTransactions = fetchItemsFromFirestore("transactions",user?.email,setTransactions);
        unsubscribePots = fetchItemsFromFirestore("pots",user?.email,setPots);
        unsubscribeBudgets = fetchItemsFromFirestore("budgets",user?.email,setBudgets);

    
        }

      
  return ()=>{
      if(unsubscribePots)unsubscribePots();
      if(unsubscribeTransactions)unsubscribeTransactions();
  }
  },[user]);


  useEffect(()=>{
    if(transactions.length){
      console.log("filter and sort budgets/transactions--")
      setRecurring((recurring)=>recurring = transactions.filter(t=>t.recurring));
    }
  },[transactions]);

  const add_transaction=async(transactionData)=>{
    if(isDemo){
      console.log("cannot add transaction --");
      return;
    }
    transactionData.date = createZuluTimestamp();
    // console.log(transactionData);

    try{
      let transactionImgUrl = ""
      if(!transactionData.avatarFile){
        console.log("handle get generic image!--");
        transactionImgUrl = getStaticImgPath(transactionData.category)
      }else{
      let imgRef = ref(storage,`transactions/${transactionData.avatarFile.name}`);
      await uploadBytes(imgRef,transactionData.avatarFile)
      let downloadUrl = await getDownloadURL(imgRef);
      transactionImgUrl = downloadUrl
      }
          delete transactionData.avatarFile;
          transactionData.avatar = transactionImgUrl;
          transactionData.amount = parseFloat(transactionData.amount).toFixed(2);
          transactionData.person_for = user.email.split("@")[0]
          transactionData.person_for_email = user.email
            console.log(transactionData);
      let firestoreResponse = await addItemToFirestore("transactions",transactionData)
      setAlertStatus(firestoreResponse);
      setTimeout(()=>{
        setAlertStatus({status:null,msg:""})
      },2000)
    }
    catch(e){
      console.log("Error",e)
    }
  }

  const add_pot=async(potData)=>{
    if(isDemo){
      console.log("cannot add pot --");
      return;
    }
    try{
    // console.log('addPot fired!--')
      potData.person_for = user.email.split("@")[0]
      potData.person_for_email = user.email
      potData.created_at = createZuluTimestamp();
      potData.updated_at = null;
      potData.target = parseInt(potData.target);
      potData.total = parseFloat(potData.achieved).toFixed(2);
      potData.theme = `bg-${potData.theme}`
    // console.log(potData);
    let collectionName = "pots"
    await addItemToFirestore(collectionName,potData);
    setShowModal(false);
    }
    catch(e){
      console.log("error",e);
    }

  }


  const editpot_total=async(pot,deltaAmt)=>{
    if(isDemo){
      console.log("cannot editpot_total --");
      return;
    }
      console.log(pot,deltaAmt)
      let collectionName = "pots"
      let updatedPot = {};
      updatedPot.achieved = parseFloat(pot.achieved) + deltaAmt;
      updatedPot.achieved = JSON.stringify(updatedPot.achieved)
      updatedPot.updated_at = createZuluTimestamp();
      // let updatedDoc = await updateDoc(itemRef, {
      //   achieved: JSON.stringify(newAchieved),
      //   updated_at: createZuluTimestamp(),
      // }
      await editItemFromFirestore(collectionName,pot.id,updatedPot)
      setShowModal(false);

  }


  const edit_item=async(item,updatedInfo,collectionName)=>{
    console.log("edit_item fired!",collectionName);
    // let collectionName = "pots"
    await editItemFromFirestore(collectionName,item.id,updatedInfo);
  }


  const delete_item=async(itemType,pot)=>{
    if(isDemo){
      console.log("cannot delete_item --");
      return;
    }
      try{
        let collectionName;
        if(itemType == "pot")collectionName = "pots";
        if(itemType == "budget")collectionName = "budgets";
          await deleteItemFromFirestore(collectionName,pot)
          setShowModal(false);
      }
      catch(e){

      }
  }


  const add_budget=async(budgetData)=>{
    if(isDemo){
      console.log("cannot add_budget --");
      return;
    }
    try{
      budgetData.person_for = user.email.split("@")[0]
      budgetData.person_for_email = user.email
      budgetData.theme = `bg-${budgetData.theme}`
      let firestoreResponse = await addItemToFirestore("budgets",budgetData)
      setShowModal(false);

    }
    catch(e){

    }
  }


  const values = {
      showNav,
      isDemo,
      setShowNav,
      alertStatus,
      showModal,
      setShowModal,
      add_transaction,
      transactions,
      recurring,
      add_pot,
      editpot_total,
      edit_item,
      delete_item,
      pots,
      add_budget,
      budgets,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};