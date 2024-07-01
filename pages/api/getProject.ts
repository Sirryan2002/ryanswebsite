import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next'
const supabaseUrl = 'https://kfertsnxgwbttkfwjplg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmZXJ0c254Z3didHRrZndqcGxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3NDU3NjMsImV4cCI6MjAzNDMyMTc2M30.8R8yFfmtYVwFctDXcNakButpHj9XreD9GqjoZomAoFI'

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Project ID is required' });
    }

    try {

        let query = supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();
        
        const { data, error } = await query;

        if (error) {
            console.error('Error fetching project:', error.message);
            return res.status(500).json({ error: 'Failed to load project' });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Failed to load project' });
    }
  }
  