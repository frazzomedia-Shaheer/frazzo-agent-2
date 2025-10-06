import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Dashboard(){
  const [counts,setCounts]=useState({leads:0,revenue:0});
  useEffect(()=>{
    async function load(){
      try{
        const leadsSnap = await getDocs(collection(db,'leads'));
        setCounts(c=>({...c,leads:leadsSnap.size}));
      }catch(e){ console.log(e) }
    }
    load();
  },[]);
  return (
    <div className="panel">
      <h2>Overview</h2>
      <p style={{color:'#9aa4c0'}}>Summary of your agency at a glance.</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:12}}>
        <div className="panel">
          <h3>Leads</h3>
          <div style={{fontSize:28,color:'#06b6d4'}}>{counts.leads}</div>
        </div>
        <div className="panel">
          <h3>Monthly Revenue</h3>
          <div style={{fontSize:28,color:'#7c3aed'}}>${counts.revenue}</div>
        </div>
      </div>
    </div>
  );
}