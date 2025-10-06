import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function AdminPanel(){
  const [invEmail,setInvEmail]=useState('');
  const [users,setUsers]=useState([]);

  useEffect(()=>{ loadUsers(); },[]);
  async function loadUsers(){
    const snap = await getDocs(collection(db,'users'));
    setUsers(snap.docs.map(d=>({id:d.id,...d.data()})));
  }
  async function invite(){
    await addDoc(collection(db,'invites'), {email:invEmail,role:'Editor',createdAt:Date.now()});
    setInvEmail('');
    alert('Invite created (placeholder). Send invitation email externally.');
  }

  return (
    <div className="panel">
      <h2>Admin</h2>
      <div className="panel">
        <h4>Invite Employee</h4>
        <input placeholder="Email" value={invEmail} onChange={e=>setInvEmail(e.target.value)} />
        <button onClick={invite}>Create Invite</button>
      </div>
      <div style={{marginTop:12}} className="panel">
        <h4>Users</h4>
        <table className="table"><thead><tr><th>Email</th><th>Role</th></tr></thead><tbody>
        {users.map(u=> <tr key={u.id}><td>{u.email||'n/a'}</td><td>{u.role||'viewer'}</td></tr>)}
        </tbody></table>
      </div>
    </div>
  );
}