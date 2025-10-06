import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Finance(){
  const [items,setItems]=useState([]);
  const [form,setForm]=useState({type:'revenue',amount:'',note:''});

  useEffect(()=>{ load(); },[]);

  async function load(){
    const snap = await getDocs(collection(db,'finance'));
    setItems(snap.docs.map(d=>d.data()));
  }
  async function add(){
    const entry = {...form,amount: Number(form.amount),date: new Date().toISOString()};
    await addDoc(collection(db,'finance'), entry);
    setForm({type:'revenue',amount:'',note:''});
    load();
  }
  const sample = items.slice(-8).map((it,i)=>({name:`${i+1}`,val:it.amount}));
  return (
    <div className="panel">
      <h2>Finance & Subscriptions</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        <div className="panel">
          <h4>Add Entry</h4>
          <select value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}><option value="revenue">Revenue</option><option value="expense">Expense</option></select>
          <input placeholder="Amount" value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} />
          <input placeholder="Note" value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))} />
          <button onClick={add}>Add</button>
        </div>
        <div className="panel" style={{height:240}}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sample}><XAxis dataKey="name" /><YAxis /><Tooltip /><Line type="monotone" dataKey="val" stroke="#7c3aed" /></LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{marginTop:12}} className="panel">
        <h4>Subscriptions / Purchases</h4>
        <ul><li>Canva Pro — Purchased: 2024-06-01 — Expires: 2025-06-01</li></ul>
      </div>
    </div>
  );
}