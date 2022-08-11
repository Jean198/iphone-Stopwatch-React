
import './App.css';
import React, { useState, useRef } from 'react';
import Lap from './Lap'

function App() {
  const hLap=useRef(this)
  const minLap=useRef(this)
  const secLap=useRef(this)
  const msecLap=useRef(this)
  const[time,setTime]=useState({h:0,min:0,sec:0,msec:0})
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  const[showLap,setShowLap]=useState(false);
  const[lapsList,setLapsList]=useState([]);
  const[lapCounter,setLapCounter]=useState(1);
  

 
  // Not started = 0
  // started = 1
  // stopped = 2

  const start=()=>{
    setStatus(1);
    setInterv(setInterval(run,10))
    
  }

  

  const run=()=>{
    if(currentM===60){
      currentH++;
      currentM=0
    }

    if(currentS===60){
      currentM++;
      currentS=0;
    }
    if(currentMs===100){
      currentS++;
      currentMs=0;
    }else{
      currentMs++;

    }

    setTime({h:currentH,min:currentM,sec:currentS,msec:currentMs})
  }

  var currentMs = time.msec, currentS = time.sec, currentM = time.min, currentH = time.h; 
  var elapsedTime=`${currentMs.toString()}`+`${currentS.toString()}`

  const stop=()=>{
    
    clearInterval(interv);
    setStatus(2)
  }

  const reset=()=>{
    clearInterval(interv);
    setStatus(0);
    setTime({h:0,min:0,sec:0,msec:0})
    setLapsList([])
    setLapCounter(1)


  }

  const resume = () => start();

  

  const lapTimer=()=>{
    
    
    var hoursLap = hLap.current.innerHTML.toString();
    var minutesLap = minLap.current.innerHTML.toString();
    var secondsLap = secLap.current.innerHTML.toString();
    var millisecondsLap = msecLap.current.innerHTML.toString();
    if(millisecondsLap!=0){
      setLapCounter(lapCounter+1)
      var wholeLap=hoursLap+":"+minutesLap+":"+secondsLap+":"+millisecondsLap;
      setLapsList(lapsList=>[...lapsList, "Lap "+lapCounter+Array(20).fill('\xa0').join('')+wholeLap])
    }

    
  
    
    
}

  return (
    <div className="App">

      <div className='display'>
        
        <div className='diplay-fields'ref={hLap}>{(time.h>=10)?time.h:"0"+time.h}</div>
        <div className='diplay-fields' ref={minLap}>{(time.min)>=10?time.min:"0"+time.min}</div>
        <div className='diplay-fields'ref={secLap}>{(time.sec>=10)?time.sec:"0"+time.sec}</div>
        <div className='diplay-fields' ref={msecLap}>{(time.msec>=10)?time.msec:"0"+time.msec}</div>
        

      </div>

      <div className='buttons-container'>
      {status===0||status===1?<div className='big-button lap'><div className='button lap small-lap' onClick={()=>{setShowLap(true); lapTimer()}}>Lap</div></div>:""}
      {status===2?<div className='big-button reset'><div className='button reset small-reset' onClick={()=>{reset();setShowLap(false)}}>Reset</div></div>:""}
      {status===0||status===2?<div className='big-button start'><div className='button start small-start' onClick={start}>Start</div></div>:""}
      {status===1?<div className='big-button stop'><div className='button stop small-stop' onClick={()=>{stop()}}>Stop</div></div>:""}
        
        
        
      </div>

      {showLap?<Lap lapsList={lapsList} />:""}

      
      
    </div>
  );
}

export default App;
