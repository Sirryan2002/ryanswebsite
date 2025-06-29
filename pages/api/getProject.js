import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kfertsnxgwbttkfwjplg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmZXJ0c254Z3didHRrZndqcGxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3NDU3NjMsImV4cCI6MjAzNDMyMTc2M30.8R8yFfmtYVwFctDXcNakButpHj9XreD9GqjoZomAoFI'

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Project ID is required' });
    }

    // Handle special case for creating new project
    if (id === 'new') {
        return res.status(200).json({
            id: null,
            title: '',
            description: '',
            body: '',
            website: '',
            github: '',
            demo: '',
            image: '',
            category: '',
            date: '',
            location: '',
            technologies: [],
            gallery: [],
            metadata: {}
        });
    }

    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single(); // Use single() to get one object instead of array

        if (error) {
            console.error('Error fetching project:', error.message);
            if (error.code === 'PGRST116') {
                return res.status(404).json({ error: 'Project not found' });
            }
            return res.status(500).json({ error: 'Failed to load project' });
        }

        // Transform the data to match your editor's expected format
        const transformedData = {
            ...data,
            // Ensure technologies is always an array
            technologies: data.technologies || [],
            // Add fields that might not exist in DB yet
            demo: data.demo || '',
            date: data.date || '',
            gallery: data.gallery || [],
            metadata: data.metadata || {}
        };

        res.status(200).json(transformedData);
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Failed to load project' });
    }
}