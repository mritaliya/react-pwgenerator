import { useState,useCallback ,useEffect,useRef } from 'react'




function App() {
  const [length, setlength] = useState(8);
const[numberAllow,setnumberAllow]=useState(false);
const[password,setpassword]=useState("");
const[charAllow,setcharAllow]=useState(false);

// useref hook
const passwordRef=useRef(null);



const passwordgenerator=useCallback(()=>{
  let pass="";
  let str=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;
  

  if(numberAllow) str+="0123456789";
  if(charAllow) str+="!@#$%^&*";

  for (let i = 0; i <=length; i++) {
    let char=Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char)
  }

  setpassword(pass);

},[length,numberAllow,charAllow,setpassword]);

const copyPasswordtoclipboard=useCallback(()=>{
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)

},[password])


useEffect(()=>{
  passwordgenerator();
},[length,numberAllow,charAllow,setpassword])
  return (
    <>
    <div className='w-full max-w-md mx-auto text-center shadow-md rounded-lg px-3 my-8 text-white bg-gray-600' >
      PASSWORD GENERATOR
    </div>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg flex  my-8 ' >
      <input type="text"
      value={password}
      className='outline-none w-full py-1 px-3 rounded-lg' 
      placeholder='password'
      ref={passwordRef}
      readOnly
      />
      <button type="button" onClick={copyPasswordtoclipboard} className="btn btn-primary flex">Copy</button>
    </div>
    <div className='flex text-center justify-center gap-x-2 ' >
      <div className='flex text-center gap-x-1' >
      <input type="range" min={8} className='cursor-pointer' value={length} max={15} onChange={(e)=>{ let event=e.target.value; setlength(event); }}/>
      <label htmlFor="">length:{length}</label>
      <input type="checkbox" defaultChecked={numberAllow}
      id='numberInput'
      onChange={()=>{
        setnumberAllow((p)=> !p)
      }}
      />
      <label htmlFor="numberAllow">number</label>
      <input type="checkbox" defaultChecked={charAllow}
      id='charInput'
      onChange={()=>{
        setcharAllow((p)=> !p)
      }}
      />
      <label htmlFor="numberAllow">character</label>
      </div>
    </div>

     </>
  )
}

export default App
