import { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography, Container, Button, TextField, DataGrid } from '@mui/material';
import { fetchContacts, fetchProjects, updateProject, deleteContact } from '@/lib/adminAPI'; // You'll create these functions next

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
          <Typography>{children}</Typography>
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

  useEffect(() => {
    fetchContacts().then(data => setContacts(data));
    fetchProjects().then(data => setProjects(data));
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
  const handleSave = async (id, updatedFields) => {
    const updatedProject = await updateProject(id, updatedFields);
    setProjects(projects.map(project => project.id === id ? updatedProject : project));
  };

  return (
    <Box>
      <Typography variant="h6">Projects Table Manager</Typography>
      <DataGrid
        rows={projects}
        columns={[
          { field: 'title', headerName: 'Title', width: 200, editable: true },
          { field: 'description', headerName: 'Description', width: 300, editable: true },
          { field: 'detailedDescription', headerName: 'Detailed Description', width: 400, editable: true },
          {
            field: 'save',
            headerName: 'Save',
            renderCell: (params) => (
              <Button
                onClick={() => handleSave(params.row.id, {
                  title: params.row.title,
                  description: params.row.description,
                  detailedDescription: params.row.detailedDescription,
                })}
              >
                Save
              </Button>
            ),
            width: 150,
          },
        ]}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        onCellEditCommit={(params) => {
          const updatedProjects = projects.map(project =>
            project.id === params.id ? { ...project, [params.field]: params.value } : project
          );
          setProjects(updatedProjects);
        }}
      />
    </Box>
  );
}
