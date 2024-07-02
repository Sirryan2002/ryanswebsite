import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

const TestPage = () => {
    const router = useRouter()
    const { id } = router.query

    const [project, setProject] = useState({
        title: '',
        description: '',
        body: '',
        website: '',
        github: '',
        image: '',
        category: ''
    });

    const [projectDraft, setProjectDraft] = useState({
        title: '',
        description: '',
        body: '',
        website: '',
        github: '',
        image: '',
        category: ''
    });

    const grabProject = async (projectID) => {
        console.log(projectID)
        const res = await fetch(`../api/getProject?id=${projectID}`);
        const data = await res.json();
        setProject(data);
        setProjectDraft(data);
    }

    useEffect(() => {
        if(!id) {
          return;
        }
        grabProject(id)
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProjectDraft(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const updateProject = async () => {
        try {
            const response = await fetch('../api/updateProject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, ...projectDraft }),
            });
            console.log(response)

            if (!response.ok) {
                throw new Error('Failed to update project');
            }

            const result = await response.json();
            console.log(result.message);
            setProject(projectDraft);
        } catch (error) {
            console.error('Error updating project:', error);
        }
    }

    const isDataChanged = () => {
        return JSON.stringify(project) !== JSON.stringify(projectDraft);
    }

    const resetChanges = () => {
        setProjectDraft({...project});
    }

    return (
        <>
        <div>
                ID: {id}<br />
                <Box sx={{ width: "50%", '& .MuiTextField-root': { m: 1, width: '100%' } }}>
                    <TextField
                        name="title"
                        label="Title"
                        value={projectDraft.title}
                        onChange={handleChange} />
                    <TextField
                        name="description"
                        label="Description"
                        multiline
                        rows={2}
                        value={projectDraft.description}
                        onChange={handleChange} />
                    <TextField
                        name="body"
                        label="Body"
                        multiline
                        rows={4}
                        value={projectDraft.body}
                        onChange={handleChange} />
                    <TextField
                        name="website"
                        label="Website"
                        value={projectDraft.website}
                        onChange={handleChange} />
                    <TextField
                        name="github"
                        label="GitHub"
                        value={projectDraft.github}
                        onChange={handleChange} />
                    <TextField
                        name="image"
                        label="Image URL"
                        value={projectDraft.image}
                        onChange={handleChange} />
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            name="category"
                            value={projectDraft.category}
                            label="Category"
                            onChange={handleChange}
                        >
                            <MenuItem value="school">School</MenuItem>
                            <MenuItem value="fun">Fun</MenuItem>
                            <MenuItem value="coding">Coding</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick={resetChanges}>Reset</Button>
                    <Button 
                        onClick={updateProject} 
                        disabled={!isDataChanged()}
                    >
                        Update
                    </Button>
                </Box>
            </div>
        </>
    );
}

export default TestPage;