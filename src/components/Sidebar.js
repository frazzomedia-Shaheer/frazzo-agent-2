import React from 'react';
export default function Sidebar({onNavigate, onLogout, user}){
  return (
    <aside className="sidebar panel">
      <div className="logo"><div className="circle"><img src="/frazzo-logo.png" alt="logo" style={{width:32}}/></div><div style={{marginLeft:8}}>FRAZZO</div></div>
      <div style={{marginTop:10,color:'#9aa4c0'}}>{user.email}</div>
      <div className="nav">
        <button onClick={()=>onNavigate('dashboard')}>Dashboard</button>
        <button onClick={()=>onNavigate('leads')}>Leads</button>
        <button onClick={()=>onNavigate('finance')}>Finance</button>
        <button onClick={()=>onNavigate('ai')}>AI Hub</button>
        <button onClick={()=>onNavigate('admin')}>Admin</button>
        <button onClick={()=>onLogout()}>Sign out</button>
      </div>
    </aside>
  );
}