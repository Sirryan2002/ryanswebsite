import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kfertsnxgwbttkfwjplg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmZXJ0c254Z3didHRrZndqcGxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3NDU3NjMsImV4cCI6MjAzNDMyMTc2M30.8R8yFfmtYVwFctDXcNakButpHj9XreD9GqjoZomAoFI'

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;
  console.log(req)
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {

    const { data, error } = await supabase
      .from('contacts')
      .insert([{ name, email, message, status: 'unread' }]);

    if (error) {
      throw error;
    }

    res.status(200).json({ message: 'Contact submitted successfully' });
  } catch (err) {
    if (err.message === 'Rate limit exceeded') {
      res.status(429).json({ error: 'You can only send one message every 5 minutes' });
    } else {
      res.status(500).json({ error: 'Failed to submit contact' });
    }
  }
}
