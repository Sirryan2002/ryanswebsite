// api/projects.js
//import { supabase } from '../../lib/supabase';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kfertsnxgwbttkfwjplg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmZXJ0c254Z3didHRrZndqcGxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3NDU3NjMsImV4cCI6MjAzNDMyMTc2M30.8R8yFfmtYVwFctDXcNakButpHj9XreD9GqjoZomAoFI'

const supabase = createClient(supabaseUrl, supabaseKey)


export default async function handler(req, res) {
  const { startAfter, limit = 8 } = req.query;

  try {
    let query = supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: true })
      .limit(parseInt(limit, 10));

    if (startAfter) {
      query = query.gt('id', startAfter);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching projects:', error.message);
      return res.status(500).json({ error: 'Failed to load projects' });
    }

    res.status(200).json({ projects: data });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Failed to load projects' });
  }
}
