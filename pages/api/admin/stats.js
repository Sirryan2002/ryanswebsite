// api/admin/stats.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kfertsnxgwbttkfwjplg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmZXJ0c254Z3didHRrZndqcGxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3NDU3NjMsImV4cCI6MjAzNDMyMTc2M30.8R8yFfmtYVwFctDXcNakButpHj9XreD9GqjoZomAoFI'

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get project count
    const { count: projectCount } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true });

    // Get contact count
    const { count: contactCount } = await supabase
      .from('contacts')
      .select('*', { count: 'exact', head: true });

    // Get unread contact count (assuming you have a 'read' column)
    const { count: unreadCount } = await supabase
      .from('contacts')
      .select('*', { count: 'exact', head: true })
      .eq('read', false);

    // Mock recent visits (you can implement analytics later)
    const recentVisits = Math.floor(Math.random() * 1000) + 500;

    res.status(200).json({
      totalProjects: projectCount || 0,
      totalContacts: contactCount || 0,
      unreadContacts: unreadCount || 0,
      recentVisits
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
}