import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Project ID is required' });
    }

    if (req.method === 'DELETE') {
        try {
            const { data, error } = await supabase
                .from('projects')
                .delete()
                .eq('id', id)
                .select()
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    return res.status(404).json({ error: 'Project not found' });
                }
                throw error;
            }

            res.status(200).json({ 
                message: 'Project deleted successfully',
                deletedProject: data 
            });
        } catch (error) {
            console.error('Error deleting project:', error);
            res.status(500).json({ 
                error: 'Failed to delete project',
                details: error.message 
            });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}