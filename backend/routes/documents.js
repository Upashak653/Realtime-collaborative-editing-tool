const express = require('express');
const Document = require('../models/Document');
const router = express.Router();

router.get('/documents', async (req, res) => {
  try {
    const document = await Document.find();
    res.status(200).json(document);
    console.log(document);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

router.get('/documents/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const document = await Document.findById({_id:id});
    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ error: 'Document not found' });
  }
});

router.put('/documents/:id',async(req,res)=>{
  try{
      const id = req.params.id;
      const document=await Document.findByIdAndUpdate({_id:id},req.body)
      return res.status(200).json({updated: true,document})
  }catch(error){
    return  res.status(500).json({ error: 'Please try again.' });
  }
})

router.delete('/documents/:id',async(req,res)=>{
  try{
      const id = req.params.id;
      const document=await Document.findByIdAndDelete({_id:id})
      return res.status(200).json({Deleted: true,document})
  }catch(error){
      return  res.status(500).json({ error: 'Please try again.' });
  }
})
module.exports = router;
