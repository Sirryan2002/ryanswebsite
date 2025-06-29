// api/newsletter/subscribers.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kfertsnxgwbttkfwjplg.supabase.co'
const supabaseKey = 'eyJhbGciOيJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmZXJ0c254Z3didHRrZndqcGxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3NDU3NjMsImV4cCI6MjAzNDMyMTc2M30.8R8yFfmtYVwFctDXcNakButpHj9XreD9GqjoZomAoFI'

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // First create the newsletter_subscribers table if it doesn't exist
    // You'll need to run this SQL in your Supabase dashboard:
    /*
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      is_active BOOLEAN DEFAULT true
    );
    */

    const { data: subscribers, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('is_active', true)
      .order('subscribed_at', { ascending: false })
      .limit(50);

    if (error && error.code !== 'PGRST116') { // Table doesn't exist
      throw error;
    }

    // Calculate stats
    const totalSubscribers = subscribers?.length || 0;
    const thisMonth = new Date();
    thisMonth.setDate(1); // First day of current month
    
    const recentSubscribers = subscribers?.filter(sub => 
      new Date(sub.subscribed_at) >= thisMonth
    ).length || 0;

    const growthRate = totalSubscribers > 0 ? 
      Math.round((recentSubscribers / totalSubscribers) * 100) : 0;

    res.status(200).json({
      subscribers: subscribers || [],
      stats: {
        totalSubscribers,
        recentSubscribers,
        growthRate
      }
    });

  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    res.status(500).json({ 
      message: 'Failed to fetch subscribers',
      subscribers: [],
      stats: { totalSubscribers: 0, recentSubscribers: 0, growthRate: 0 }
    });
  }
}