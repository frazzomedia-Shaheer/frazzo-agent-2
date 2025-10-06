import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Leads from './components/Leads';
import Finance from './components/Finance';
import AIHub from './components/AIHub';
import AdminPanel from './components/AdminPanel';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function App(){
  const [view, setView] = useState('dashboard');
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, u=> setUser(u));
    return ()=>unsub();
  },[]);
  if(!user) return <Login />;
  return (
    <div className="app-root">
      <div className="bg-animated" aria-hidden="true"></div>
      <Sidebar onNavigate={setView} onLogout={()=>signOut(auth)} user={user} />
      <main className="main-area">
        <header className="topbar">
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <img src="/frazzo-logo.png" alt="logo" style={{width:46,height:46,borderRadius:8}}/>
            <div>
              <h1>Frazzo Media Agent</h1>
              <div style={{fontSize:12,color:'#9aa4c0'}}>Welcome, {user.email}</div>
            </div>
          </div>
        </header>
        <section className="content">
          {view==='dashboard' && <Dashboard />}
          {view==='leads' && <Leads />}
          {view==='finance' && <Finance />}
          {view==='ai' && <AIHub />}
          {view==='admin' && <AdminPanel />}
        </section>
      </main>
    </div>
  );
}