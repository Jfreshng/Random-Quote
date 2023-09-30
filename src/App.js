import { useEffect, useState } from 'react';
import useOnlineStatus from './useOnlineStatus'
import axios from 'axios';

function App() {

  const [quotes, setQuotes] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState(null);

  const generateQuote = ()=> {
    axios.get('https://api.adviceslip.com/advice')
    .then((res)=> {
        //destructuring
        if(res.status !== 200) {
          console.log('cant fetch data from api');
          setErrMsg(setErrMsg)
        }
        const {advice} = res.data.slip;  
        setQuotes(advice);        
        //console.log(res)     
    })
    .catch((error)=>{
      setErrMsg(error);
    });
    
  };

  const setIsOnline = useOnlineStatus();
  if (setIsOnline === true) {
    console.log("You are online!!");
  } else {
    setConnectionStatus("You're offline")
    console.log("You're offline");
  }

  useEffect(()=>{
    if(isFirstLoad){
      generateQuote();
      setIsFirstLoad(false);
    }
  }, [isFirstLoad]);


  return (
    <div>
      {connectionStatus && <div>{ connectionStatus }</div>}
      <div className="App flex flex-col justify-center items-center text-white">
        
        <div className="flex flex-col min-h-screen items-center pb-52">     
          <h1 className="text-center m-10 text-4xl py-15 text-[#dd8b79]">Random Quote App</h1>
          <div className="border-[rgb(202, 71, 25, 0.5)] rounded-md min-w-[400px] mx-auto text-center p-5 my-40 shadow">
          {errMsg && <div className="border rounded-sm bg-red-200 p-2 my-1">{ errMsg }</div>}
            {!quotes && <div>Loading quote...</div>}
            {quotes && <h2 className="my-10 quote font-semibold">{quotes}</h2>}
            <button className="bounce border rounded-sm p-2 border-[#CD3400] mb-5" onClick={generateQuote}>Generate New Quote</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
