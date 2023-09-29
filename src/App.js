import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [quotes, setQuotes] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  const generateQuote = ()=> {
    axios.get('git')
    .then((res)=> {
        //destructuring 
        const {advice} = res.data.slip.advice;  // doesn't work
        setQuotes(res.data.slip.advice);        // works
        console.log(res.data.slip.advice);      // works
        console.log(advice);                    // doesn't work
    })
    .catch((error)=>{
      setErrMsg(error);
    });
    
  };

  useEffect(()=>{
    generateQuote();
  });


  return (
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
  );
}

export default App;
