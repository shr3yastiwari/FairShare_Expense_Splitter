import React, { useEffect , useState , useRef } from 'react';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './App.css';
import './Payment.css';
import { usePDF } from 'react-to-pdf';
import { Document, Page, Text, View, StyleSheet, Image, PDFDownloadLink , Font , BlobProvider } from '@react-pdf/renderer';
const Payment = () => {
  Font.register({
    family: 'Inconsolata',
    src: 'https://fonts.gstatic.com/s/inconsolata/v31/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp4U8WR32kg.ttf'
  });
  
  
  const { toPDF, targetRef } = usePDF({filename: 'payment_details.pdf'});
  const pdfRef = useRef()
  const location = useLocation()
  const obj = location.state
  const tripName =  obj.tripName
  const members = obj.mem

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [value, setValue] = useState('');
  const [hidebut, sethidebut] = useState(false);
  const [paymentname, setPaymentname] = useState('');
  const [paymentArray, setPaymentArray] = useState([]);
  const [netAmountOwed1, setNetAmountOwed] = useState(new Map());
  const [finalbutton , setfinalbutton ] = useState('');

  const handleCheckboxChange = (member) => {
    const selectedIndex = selectedMembers.indexOf(member);
    if (selectedIndex === -1) {
      setSelectedMembers([...selectedMembers, member]);
    } else {
      const updatedMembers = [...selectedMembers];
      updatedMembers.splice(selectedIndex, 1);
      setSelectedMembers(updatedMembers);
    }
  };

  const print = () => {
    sethidebut(true);
    const paymentDetailsObj = {
      paymentname,
      payer,
      payees: [],
      amount: value / selectedMembers.length,
    };

    selectedMembers.forEach((member) => {
      if (member !== payer) {
        paymentDetailsObj.payees.push({ name: member });
      }
    });

    setPaymentArray((prevArray) => [...prevArray, paymentDetailsObj]);
  };

  const [payer, setSelectedMember] = useState('');
  const handleMemberChange = (event) => {
    setSelectedMember(event.target.value);
  };


  // const [netAmountOwed, setNetAmountOwed] = useState(new Map());
  // const [netAmountOwed, setNetAmountOwed] = useState(new Map());
  const final = () => {
     const netAmountOwed = new Map();
    paymentArray.forEach((payment) => {
      const payer = payment.payer;
      const payees = payment.payees;
      const amount = payment.amount;
  
      payees.forEach((payee) => {
        const payeeName = payee.name;
        if (payeeName !== payer) {
          const key = `${payeeName} - ${payer}`;
          const existingAmount = netAmountOwed.get(key) || 0;
          netAmountOwed.set(key, existingAmount + amount);
        }
      });
    });

    // Print the map entries
    for (const [key, value] of netAmountOwed.entries()) {
      const [payee, payer] = key.split(' - ');
      const reverseKey = `${payer} - ${payee}`;
      if( netAmountOwed.has(reverseKey) ){
        const k1 = netAmountOwed.get(key) || 0;
        const k2 = netAmountOwed.get(reverseKey) || 0;
        if( k1 > k2 ){
          netAmountOwed.set(key, k1 - k2);
          netAmountOwed.set(reverseKey, 0);
        }else
        if( k1 < k2 ){
          netAmountOwed.set(reverseKey, k2 - k1);
          netAmountOwed.set(key, 0);
        }else{
          netAmountOwed.set(reverseKey, 0);
          netAmountOwed.set(key, 0);
        }
      }
      
    }
    const maArray = Array.from(netAmountOwed);

// Sort the array by the first letter of the keys
maArray.sort((a, b) => {
    if (a[0][0] < b[0][0]) return -1;
    if (a[0][0] > b[0][0]) return 1;
    return 0;
});

// Convert the sorted array back to a map
const netAmountOwed1 = new Map(maArray);

// Log the sorted map
    // console.log(sortedMap);
    setNetAmountOwed(netAmountOwed1);
    
    console.log(netAmountOwed1);
    console.log(finalbutton);
    // setNetAmountOwed(netAmountOwed);

  };
  const openPdfInNewTab = (blob) => {
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };
  const styles = StyleSheet.create({
    page: {
      
      backgroundColor: 'white',
      borderWidth: 2,
    paddingTop: 30,
      fontFamily: 'Inconsolata',
      
    borderWidth:2
    },
    section: {
      flexGrow: 1,
      marginLeft:50,

    },
    title: {
      fontSize: 15,
      fontWeight:600,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 12,
      marginBottom: 5,
    },
    text: {
      fontSize: 8,
      marginBottom: 5,
      colour:'#ff5c5c',
    },
    amount: {
      fontWeight: 'bold',
    },
    image: {
      flexDirection:'row',
      alignItems: 'center',
      position: 'absolute',
      top: 5,
    //   left: '50%',
    // transform: [{ translateX: -'50%' }],

      width: 45,
      height: 45, // Set the desired height for the image
    },
    section1:{
      flexDirection:'row',
    },
    name1:{
      
      fontSize: 20,
      fontWeight:900,
      marginBottom: 30,
      textAlign:'center',
    }
    ,
    footer:{
      fontSize: 10,
      marginBottom: 10,
      colour:'red',
      textAlign:"center",
    }
  });
  const MyDocument = ({ paymentArray, netAmountOwed1 }) => (
    <Document >
      <Page size="A4" style={styles.page}>
      <Text style={styles.footer} fixed>
        ~FairShare~
      </Text>
      {/* <Image
        style={styles.image}
        src="logo.png"
        fixed
      /> */}
      <Text style={styles.name1}>{tripName}</Text>
      <View style={styles.section1} >
        <View style={styles.section}>
          <Text style={styles.title}>Payment Details</Text>
          {paymentArray.map((paymentDetail, index) => (
            <View key={index}>
              <Text style={styles.subtitle}>{paymentDetail.paymentname}</Text>
              {paymentDetail.payees.map((payee, index) => (
                <Text key={index} style={styles.text}>
                  {payee.name} -------> {paymentDetail.payer} Rs: <Text style={styles.amount}>{paymentDetail.amount}</Text>
                </Text>
              ))}
            </View>
          ))}
        </View>
        {netAmountOwed1.size > 0 && (
          <View style={styles.section}>
            <Text style={styles.title}>Final Bill</Text>
            {Array.from(netAmountOwed1.entries()).map(([key, value]) => {
              const [payee, payer] = key.split(' - ');
              return (
                <Text key={key} style={styles.text}>
                  {payee} ----> {payer} Rs: <Text style={styles.amount}>{value}</Text>
                </Text>
              );
            })}
          </View>
        )}
        </View>
        
      </Page>
    </Document>
  );
  return (
    <div>
    
      <div className="group-name1">
      {tripName}
      </div>
      <div className='pay'>
      <label className="group-name">
        Payer :{' '}
        <select className="opt" value={payer} onChange={handleMemberChange}>
          <option>Select The Payer</option>
          {members.map((m, index) => (
            <option key={index}>{m}</option>
          ))}
        </select>
      </label>
      <div className="group-name">
        <label>Payment of : </label>
        <input
          type="text"
          value={paymentname}
          onChange={(e) => setPaymentname(e.target.value)}
          placeholder="Dinner"
        />
      </div>
      <div className="group-name">
        <label>Price (Rs.): </label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="980 Rs"
        />
      </div>
      <div className="paymentfor">Payment for......</div>
      {members.map((member, index) => (
        <label key={index} className="checkbox-label">
          <input
            type="checkbox"
            value={member}
            checked={selectedMembers.includes(member)}
            onChange={() => handleCheckboxChange(member)}
          />
          {member}
        </label>
      ))}
      <div className='Calcul'>
      <div className='linein'></div>
      <div className='newbut'>
      <button className="create-groupc" onClick={print}>
        Calculate
      </button>
      </div>
      </div>
      

      {/* Render the paymentArray */}
      <div className='Side' ref={targetRef} >
      {paymentArray.length > 0 && (
        <div className='PaymentDetails' ref={targetRef}>
          <div className='details'>Payment Details</div>
          {paymentArray.map((paymentDetail, index) => (
            <div key={index}>
              <div className='p_name'>{paymentDetail.paymentname}</div>
              <ul className='list'>
  {paymentDetail.payees.map((payee, index) => (
    <li key={index}>{payee.name} <> -------> </> {paymentDetail.payer} Rs: <span className='amount'>{paymentDetail.amount} </span></li>
  ))}
</ul>
            </div>
          ))}
          
        </div>
      )}
      {paymentArray.length > 0 &&  (
  <div className='final' >
    
    { netAmountOwed1.size > 0 && (
      <div>
        <div className='details'>Final Bill</div>
        <ul>
          {Array.from(netAmountOwed1.entries()).map(([key, value]) => {
            const [payee, payer] = key.split(' - ');
            return (
              <li key={key}>
                {payee} ----> {payer} Rs: <span className='amount'>{value}</span>
              </li>
            );
          })}
        </ul>
      </div>
    )}
  </div>
)}
</div>
<div className='buttons'>
{ hidebut && ( <button className="create-group" onClick={final}>Final</button> ) }
{hidebut &&(<BlobProvider document={<MyDocument paymentArray={paymentArray} netAmountOwed1={netAmountOwed1} />}>
  {({ blob, url, loading, error }) => (
    <>
      <button className="create-group"
        onClick={() => blob && openPdfInNewTab(blob)}
        disabled={loading}
      >
        {loading ? 'Loading document...' : 'Preview PDF'}
      </button>
      {blob && (
        <button className="create-groupd" ><a href={URL.createObjectURL(blob)} download= {tripName + "_payment_details.pdf"}>
          Download PDF
        </a></button>
      )}
    </>
  )}
</BlobProvider>) }
</div>

{/* sdsg */}
      
    </div>
    
    </div>
  );
};

export default Payment;


