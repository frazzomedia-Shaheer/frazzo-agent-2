import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Login(){
  const [email,setEmail]=useState('');
  const [pwd,setPwd]=useState('');
  const [mode,setMode]=useState('login');
  const [err,setErr]=useState(null);

  const submit = async ()=>{
    setErr(null);
    try{
      if(mode==='login'){
        await signInWithEmailAndPassword(auth,email,pwd);
      } else {
        await createUserWithEmailAndPassword(auth,email,pwd);
      }
    }catch(e){ setErr(e.message) }
  };

  return (
    <div className="login-wrap">
      <div className="login-card panel">
        <div className="brand">
          <div className="circle"><img src="/frazzo-logo.png" alt="logo"/></div>
          <div style={{marginTop:8,color:'#fff',fontWeight:700}}>Frazzo Media</div>
        </div>
        <div className="login-body">
          <h2>{mode==='login' ? 'Welcome back' : 'Create an account'}</h2>
          <p className="muted">Your AI marketing partner. Sign in to continue.</p>
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={pwd} onChange={e=>setPwd(e.target.value)} style={{marginTop:8}} />
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <button onClick={submit}>{mode==='login' ? 'Sign in' : 'Register'}</button>
            <button style={{background:'transparent',border:'1px solid rgba(255,255,255,0.04)',color:'#9aa4c0'}} onClick={()=>setMode(mode==='login' ? 'register' : 'login')}>{mode==='login' ? 'Create account' : 'Back to login'}</button>
          </div>
          {err && <div style={{color:'salmon',marginTop:8}}>{err}</div>}
        </div>
      </div>
    </div>
  );
}