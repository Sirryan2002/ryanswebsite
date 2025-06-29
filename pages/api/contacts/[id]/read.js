// api/contacts/[id]/read.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kfertsnxgwbttkfwjplg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmZXJ0c254Z3didHRrZndqcGxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3NDU3NjMsImV4cCI6MjAzNDMyMTc2M30.8R8yFfmtYVwFctDXcNakButpHj9XreD9GqjoZomAoFI'

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    const { error } = await supabase
      .from('contacts')
      .update({ read: true, read_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
    res.status(200).json({ message: 'Contact marked as read' });
  } catch (error) {
    console.error('Error marking contact as read:', error);
    res.status(500).json({ message: 'Failed to mark as read' });
  }
}