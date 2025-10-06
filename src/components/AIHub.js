import React, { useState } from 'react';

export default function AIHub(){
  const [prompt,setPrompt]=useState('Write a 30-second ad script for a cafe in Tampa.');
  const [output,setOutput]=useState('');
  const [loading,setLoading]=useState(false);

  async function runText(){
    setLoading(true); setOutput('');
    try{
      const res = await fetch('/api/openai', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({prompt})});
      const data = await res.json();
      setOutput(data.output || JSON.stringify(data));
    }catch(e){ setOutput('Error: '+e.message) }
    setLoading(false);
  }

  async function runImage(){
    setLoading(true); setOutput('');
    try{
      const res = await fetch('/api/replicate', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({prompt})});
      const data = await res.json();
      setOutput(JSON.stringify(data));
    }catch(e){ setOutput('Error: '+e.message) }
    setLoading(false);
  }

  return (
    <div className="panel">
      <h2>AI Hub</h2>
      <p style={{color:'#9aa4c0'}}>Text and image tools. Add OPENAI_API_KEY and REPLICATE_API_TOKEN in Vercel to enable.</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:12}}>
        <div className="panel">
          <h4>Script / Copy Writer</h4>
          <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} style={{width:'100%',minHeight:140}} />
          <div style={{display:'flex',gap:8,marginTop:8}}>
            <button onClick={runText} disabled={loading}>Generate Text</button>
            <button onClick={runImage} disabled={loading}>Generate Image</button>
          </div>
          <div style={{marginTop:12,whiteSpace:'pre-wrap',background:'#020319',padding:12,borderRadius:8}}>{loading ? 'Loading...' : output}</div>
        </div>
        <div className="panel">
          <h4>Providers</h4>
          <ul>
            <li><strong>OpenAI</strong> — Text generation (requires OPENAI_API_KEY)</li>
            <li><strong>Replicate</strong> — Image models (requires REPLICATE_API_TOKEN)</li>
            <li><strong>Stability/Runway</strong> — Video generation (placeholder)</li>
          </ul>
          <div style={{marginTop:12}} className="panel">
            <h5>How to use</h5>
            <p style={{color:'#9aa4c0'}}>Add provider API keys to Vercel environment variables and redeploy. Use the text box to ask for scripts, ads, image ideas. Images return URLs when model is available.</p>
          </div>
        </div>
      </div>
    </div>
  );
}