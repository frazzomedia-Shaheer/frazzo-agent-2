const handler = async (req,res)=>{
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  if(!process.env.REPLICATE_API_TOKEN) return res.status(500).json({error:'REPLICATE_API_TOKEN not configured'});
  const { prompt } = req.body || {};
  try{
    const r = await fetch('https://api.replicate.com/v1/predictions', {
      method:'POST',
      headers:{
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ version: 'stability-ai/stable-diffusion', input: { prompt } })
    });
    const j = await r.json();
    return res.status(200).json({ output: j });
  }catch(e){ return res.status(500).json({error:e.message}); }
};
module.exports = handler;