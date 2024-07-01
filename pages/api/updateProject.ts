import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kfertsnxgwbttkfwjplg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmZXJ0c254Z3didHRrZndqcGxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3NDU3NjMsImV4cCI6MjAzNDMyMTc2M30.8R8yFfmtYVwFctDXcNakButpHj9XreD9GqjoZomAoFI'

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    console.log('Received request body:', req.body);
  
    const {
      id,
      title,
      description,
      body,
      website = "",
      github = "",
      image,
      category = "Unspecified"
    } = req.body;
  
    if (id === undefined) {
      return res.status(400).json({ error: 'Missing project ID' });
    }
  
    const missingFields = [];
    if (!title) missingFields.push('title');
    if (!description) missingFields.push('description');
    if (!body) missingFields.push('body');
    if (!website) missingFields.push('website');
    if (!github) missingFields.push('github');
    if (!image) missingFields.push('image');
    if (!category) missingFields.push('category');
  
    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
    }
  
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({ title, description, body, website, github, image, category })
        .eq('id', id);
  
      if (error) {
        throw error;
      }
  
      res.status(200).json({ message: 'Project updated successfully' });
    } catch (err) {
      console.error('Error updating project:', err);
      res.status(500).json({ error: 'Failed to update project', details: err.message });
    }
  }