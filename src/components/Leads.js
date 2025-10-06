import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';

export default function Leads(){
  const [results,setResults]=useState([]);
  const [newLead,setNewLead]=useState({name:'',email:'',phone:'',notes:''});

  useEffect(()=>{ loadAll(); },[]);

  async function loadAll(){
    try{
      const snap = await getDocs(collection(db,'leads'));
      setResults(snap.docs.map(d=>({id:d.id, ...d.data()})));
    }catch(e){ console.error(e) }
  }

  async function createLead(){
    try{
      await addDoc(collection(db,'leads'), {...newLead, createdAt: Date.now()});
      setNewLead({name:'',email:'',phone:'',notes:''});
      loadAll();
    }catch(e){ console.error(e) }
  }

  async function remove(id){
    await deleteDoc(doc(db,'leads',id));
    loadAll();
  }

  return (
    <div className="panel">
      <h2>Lead Finder & CRM</h2>
      <p style={{color:'#9aa4c0'}}>Add leads manually or connect a lead provider later.</p>
      <div style={{marginTop:12}} className="panel">
        <h4>Add Lead</h4>
        <input placeholder="Name" value={newLead.name} onChange={e=>setNewLead(s=>({...s,name:e.target.value}))} />
        <input placeholder="Email" value={newLead.email} onChange={e=>setNewLead(s=>({...s,email:e.target.value}))} />
        <input placeholder="Phone" value={newLead.phone} onChange={e=>setNewLead(s=>({...s,phone:e.target.value}))} />
        <input placeholder="Notes" value={newLead.notes} onChange={e=>setNewLead(s=>({...s,notes:e.target.value}))} />
        <button onClick={createLead}>Add Lead</button>
      </div>

      <div style={{marginTop:12}} className="panel">
        <h4>Saved Leads</h4>
        <table className="table"><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Action</th></tr></thead><tbody>
        {results.map(r=> <tr key={r.id}><td>{r.name}</td><td>{r.email}</td><td>{r.phone}</td><td><button onClick={()=>remove(r.id)}>Delete</button></td></tr>)}
        </tbody></table>
      </div>
    </div>
  );
}