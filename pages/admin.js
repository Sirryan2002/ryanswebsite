import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Tabs, Tab, Box, Typography, Container, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { fetchContacts, deleteContact } from '@/lib/adminAPI'; // You'll create these functions next
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';


import AdminAuth from '@/components/AdminAuth'; // Create this component based on the code above

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Container>
      {isAuthenticated ? (
        <AdminContent />
      ) : (
        <AdminAuth onAuthSuccess={() => setIsAuthenticated(true)} />
      )}
    </Container>
  );
}

const AdminContent = () => {
  const [value, setValue] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [projects, setProjects] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const fetchProjects = async () => {
    try {
      const res = await fetch(`/api/projects`);
      const data = await res.json();

      setProjects(data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchContacts().then(data => setContacts(data));
    fetchProjects();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Tabs value={value} onChange={handleChange} aria-label="admin dashboard tabs">
        <Tab label="Website Metrics" />
        <Tab label="Contact Form Responses" />
        <Tab label="Projects Table Manager" />
        <Tab label="Blog Page Manager" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography>Website Metrics (Unimplemented)</Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ContactsTab contacts={contacts} setContacts={setContacts} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProjectsTab projects={projects} setProjects={setProjects} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography>Blog Page Manager (Unimplemented)</Typography>
      </TabPanel>
    </Container>
  );
}

function ContactsTab({ contacts, setContacts }) {
  const handleDelete = async (id) => {
    await deleteContact(id);
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleMarkAsRead = (id) => {
    setContacts(contacts.map(contact => contact.id === id ? { ...contact, status: 'read' } : contact));
  };

  return (
    <Box>
      <Typography variant="h6">Contact Form Responses</Typography>
      {contacts.map(contact => (
        <Box key={contact.id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
          <Typography variant="subtitle1">Name: {contact.name}</Typography>
          <Typography variant="subtitle1">Email: {contact.email}</Typography>
          <Typography variant="body1">Message: {contact.message}</Typography>
          <Typography variant="body2">Status: {contact.status}</Typography>
          <Button onClick={() => handleMarkAsRead(contact.id)} disabled={contact.status === 'read'}>
            Mark as Read
          </Button>
          <Button onClick={() => handleDelete(contact.id)}>Delete</Button>
        </Box>
      ))}
    </Box>
  );
}

function ProjectsTab({ projects, setProjects }) {
    const router = useRouter();
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [openNewProjectDialog, setOpenNewProjectDialog] = useState(false);
    const [newProject, setNewProject] = useState({
      title: '',
      description: '',
      category: '',
      image: ''
    });
  
    const handleDeleteClick = (project) => {
      setProjectToDelete(project);
      setOpenDeleteDialog(true);
    };
  
    const handleDeleteConfirm = () => {
      setProjects(projects.filter(p => p.id !== projectToDelete.id));
      setOpenDeleteDialog(false);
    };
  
    const handleEditClick = (id) => {
      router.push(`/admin/editproject?id=${id}`);
    };
  
    const handleNewProjectClick = () => {
      setOpenNewProjectDialog(true);
    };
  
    const handleNewProjectChange = (event) => {
      setNewProject({ ...newProject, [event.target.name]: event.target.value });
    };
  
    const handleNewProjectSubmit = () => {
      const newId = Math.max(...projects.map(p => p.id)) + 1;
      setProjects([...projects, { id: newId, ...newProject }]);
      setOpenNewProjectDialog(false);
      addProject();
      setNewProject({ title: '', description: '', category: '', image: '' });
    };

    const addProject = async () => {
        try {
            const response = await fetch('/api/addProject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProject),
            });
            console.log(response)

            if (!response.ok) {
                throw new Error('Failed to update project');
            }

            const result = await response.json();
            console.log(result.message);
        } catch (error) {
            console.error('Error updating project:', error);
        }
    }
  
    return (
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Projects</Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleNewProjectClick}>
            New Project
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Website</TableCell>
                <TableCell>GitHub</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.id}</TableCell>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>{project.website}</TableCell>
                  <TableCell>{project.github}</TableCell>
                  <TableCell>
                    <Button 
                      startIcon={<EditIcon />} 
                      onClick={() => handleEditClick(project.id)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button 
                      startIcon={<DeleteIcon />} 
                      color="error"
                      onClick={() => handleDeleteClick(project)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        {/* Delete Confirmation Dialog */}
        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the project {projectToDelete?.title}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
          </DialogActions>
        </Dialog>
  
        {/* New Project Dialog */}
        <Dialog open={openNewProjectDialog} onClose={() => setOpenNewProjectDialog(false)}>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              value={newProject.title}
              onChange={handleNewProjectChange}
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={newProject.description}
              onChange={handleNewProjectChange}
            />
            <TextField
              margin="dense"
              name="category"
              label="Category"
              type="text"
              fullWidth
              value={newProject.category}
              onChange={handleNewProjectChange}
            />
            <TextField
              margin="dense"
              name="image"
              label="Image Path"
              type="text"
              fullWidth
              value={newProject.image}
              onChange={handleNewProjectChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenNewProjectDialog(false)}>Cancel</Button>
            <Button onClick={handleNewProjectSubmit} color="primary">Create</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }