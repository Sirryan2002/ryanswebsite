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
        demo = "",
        image = "",
        category = "",
        date = null,
        location = "",
        technologies = [],
        gallery = [],
        metadata = {}
    } = req.body;

    // Validate required fields
    const missingFields = [];
    if (!title) missingFields.push('title');
    if (!description) missingFields.push('description');
    if (!category) missingFields.push('category');

    if (missingFields.length > 0) {
        return res.status(400).json({ 
            error: `Missing required fields: ${missingFields.join(', ')}` 
        });
    }

    try {
        // Prepare the data object for database
        const projectData = {
            title,
            description,
            body: body || '',
            website,
            github,
            image,
            category,
            location,
            technologies: Array.isArray(technologies) ? technologies : []
        };

        // Add optional fields that exist in your schema
        if (date) {
            projectData.date = date;
        }

        // Handle creating new project vs updating existing
        if (!id || id === 'new' || id === null) {
            // Create new project
            const { data, error } = await supabase
                .from('projects')
                .insert([projectData])
                .select()
                .single();

            if (error) {
                throw error;
            }

            res.status(201).json({ 
                message: 'Project created successfully', 
                project: data 
            });
        } else {
            // Update existing project
            const { data, error } = await supabase
                .from('projects')
                .update(projectData)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw error;
            }

            if (!data) {
                return res.status(404).json({ error: 'Project not found' });
            }

            res.status(200).json({ 
                message: 'Project updated successfully', 
                project: data 
            });
        }
    } catch (err) {
        console.error('Error saving project:', err);
        res.status(500).json({ 
            error: 'Failed to save project', 
            details: err.message 
        });
    }
}