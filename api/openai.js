const handler = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const { prompt } = req.body || {};
  if(!process.env.OPENAI_API_KEY) return res.status(500).json({error:'OPENAI_API_KEY not configured'});
  try{
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'Authorization':`Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({ model:'gpt-3.5-turbo', messages:[{role:'user',content:prompt}], max_tokens:500 })
    });
    const j = await r.json();
    const out = j.choices && j.choices[0] && j.choices[0].message ? j.choices[0].message.content : JSON.stringify(j);
    return res.status(200).json({ output: out });
  }catch(e){ return res.status(500).json({error:e.message}); }
};
module.exports = handler;