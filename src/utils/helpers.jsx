import { monthAbbreviationMap } from "../const";

export const uploadStaticImage = async (filePath) => {
  const imageUrl = filePath; // Path inside public folder
  const response = await fetch(imageUrl); // Fetch the image
  const blob = await response.blob(); // Convert response to Blob
  console.log("Response", response);
  return blob;
};


export const getStaticImgPath=(category)=>{
    let formattedCategory = category.toLowerCase();
    let filePath = "./assets/generic_transaction_images/generic.png";
    let imgCategories = ["groceries","sports","transportation"];
    let idx = imgCategories.indexOf(formattedCategory);
    console.log("Idx",idx,"Category",formattedCategory);
    if(idx != -1){
      filePath = `./assets/generic_transaction_images/${formattedCategory}.png`
    }
    return filePath;
}

export const formatAmount = (amt) => {
  if (amt > 0) {
    return <span className="success-text bold">+${parseFloat(amt).toFixed(2)}</span>;
  } else {
    return (
      <span className="bold">-${Math.abs(parseFloat(amt)).toFixed(2)}</span>
    );
  }
};

export const formatDate = (date) => {
  const utcDate = new Date(date);
  const formattedDate = utcDate.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  return formattedDate;
};



export const parseAndReturnDate = (formattedDate)=>{
  let stringDate = formattedDate;
  let month = stringDate.split(" ")[0];
  let year = stringDate.split(" ")[2];
  let day = stringDate.split(" ")[1].split("");
      day.pop();
      day = day.join("");
  let formattedStr = `${day} ${monthAbbreviationMap[month]} ${year}`

    return formattedStr
}

export const createZuluTimestamp=()=>{
  return new Date().toISOString()
}

export const reduceTotal=(items,field)=>{
  // console.log(items,field)
  return items.reduce((a,b)=>a + parseFloat(b[field]),0);
}



export const getMonthlyTotals=(transactions,isDemo=false)=>{
  let temp_total = 0;
  let currMonth = 0;
  if(isDemo){
    currMonth = 8;
    // console.log("Demo")
  }else{
  let zuluTime = createZuluTimestamp();
  let date = new Date(zuluTime);
  currMonth = date.getUTCMonth() + 1;
  }
  transactions.forEach(transaction=>{
        let transactionMonth = new Date(transaction.date);
            transactionMonth = transactionMonth.getUTCMonth() + 1;
            // console.log("currMonth",currMonth,"TransactionMonth",transactionMonth);
        if(transactionMonth == currMonth){
          // console.log('add transaction!')
          temp_total += Math.abs(parseFloat(transaction.amount));
        }
  })

  return temp_total;
}



export const getUpcomingBills=(recurring,currDay,currMonth)=>{
  let tempPaidTransactions = [];
  let tempUpcomingTransactions = [];
  let tempDueSoonTransactions = [];
  recurring.forEach(transaction=>{
    let tDate = new Date(transaction.date);
    let tDay = tDate.getUTCDate();
    let tMonth = tDate.getUTCMonth() + 1;
    // console.log(`t-date:${tDay}-${tMonth}`);
    if(tMonth < currMonth || tDay < currDay){
      tempPaidTransactions.push(transaction);
    }
    else if(tMonth == currMonth && tDay - currDay < 2){
      tempDueSoonTransactions.push(transaction);
      tempUpcomingTransactions.push(transaction);
    }
    else if(tMonth == currMonth && tDay > currDay){
      tempUpcomingTransactions.push(transaction)
    }
  })
  let x = "testing-value!!!"
  // console.log(x)
  return {tempPaidTransactions,tempUpcomingTransactions,tempDueSoonTransactions}
  // return x
}
