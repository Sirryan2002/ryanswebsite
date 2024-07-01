export const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts');
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  };
  
  export const updateProject = async (id, updatedFields) => {
    try {
      const response = await fetch(`/api/project/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });
      if (!response.ok) {
        throw new Error('Failed to update project');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating project:', error);
      return null;
    }
  };
  
  export const deleteContact = async (id) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
      return true;
    } catch (error) {
      console.error('Error deleting contact:', error);
      return false;
    }
  };
  