import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const authToken = localStorage.getItem('adminToken');
    if (authToken) {
      // Verify token with backend
      verifyToken(authToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('adminToken');
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('adminToken');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <Head>
        <title>Admin Dashboard - Ryan Longo</title>
        <meta name="description" content="Admin dashboard for Ryan Longo's website" />
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </Head>
      <div id="admin">
        {isAuthenticated ? (
          <AdminContent />
        ) : (
          <AdminAuth onAuthSuccess={() => setIsAuthenticated(true)} />
        )}
      </div>
    </div>
  );
};

const AdminAuth = ({ onAuthSuccess }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        onAuthSuccess();
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-auth">
      <div className="auth-container">
        <div className="auth-header">
          <i className='bx bx-shield-check'></i>
          <h1>Admin Access</h1>
          <p>Please authenticate to access the admin dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              required
              className="auth-input"
              placeholder="Enter username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              required
              className="auth-input"
              placeholder="Enter password"
            />
          </div>
          
          {error && <div className="auth-error">{error}</div>}
          
          <button type="submit" disabled={isLoading} className="auth-submit">
            {isLoading ? (
              <>
                <div className="button-spinner"></div>
                Authenticating...
              </>
            ) : (
              <>
                <i className='bx bx-log-in'></i>
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminContent = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalContacts: 0,
    unreadContacts: 0,
    recentVisits: 0
  });

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.reload();
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header" style={{display : 'inline'}}>
        <div className="admin-header-content">
          <div className="admin-logo">
            <Link href="/">
              <i className='bx bx-home'></i>
              Ryan Longo
            </Link>
          </div>
          <div className="admin-user">
            <span>Welcome back, Admin</span>
            <button onClick={handleLogout} className="logout-btn">
              <i className='bx bx-log-out'></i>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="admin-nav">
        <div className="nav-container">
          <button
            className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className='bx bx-tachometer'></i>
            Overview
          </button>
          <button
            className={`nav-tab ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            <i className='bx bx-envelope'></i>
            Contact Messages
          </button>
          <button
            className={`nav-tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <i className='bx bx-folder'></i>
            Projects
          </button>
          <button
            className={`nav-tab ${activeTab === 'newsletter' ? 'active' : ''}`}
            onClick={() => setActiveTab('newsletter')}
          >
            <i className='bx bx-mail-send'></i>
            Newsletter
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="admin-content">
        {activeTab === 'overview' && <OverviewTab stats={stats} />}
        {activeTab === 'contacts' && <ContactsTab />}
        {activeTab === 'projects' && <ProjectsTab />}
        {activeTab === 'newsletter' && <NewsletterTab />}
      </div>
    </div>
  );
};

const OverviewTab = ({ stats }) => {
  return (
    <div className="overview-tab">
      <h1>Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon projects">
            <i className='bx bx-folder'></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalProjects}</h3>
            <p>Total Projects</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon contacts">
            <i className='bx bx-envelope'></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalContacts}</h3>
            <p>Contact Messages</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon unread">
            <i className='bx bx-bell'></i>
          </div>
          <div className="stat-content">
            <h3>{stats.unreadContacts}</h3>
            <p>Unread Messages</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon visits">
            <i className='bx bx-line-chart'></i>
          </div>
          <div className="stat-content">
            <h3>{stats.recentVisits}</h3>
            <p>Recent Visits</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-grid">
          <Link href="/admin/editproject?id=new" className="action-card">
            <i className='bx bx-plus'></i>
            <h3>New Project</h3>
            <p>Create a new portfolio project</p>
          </Link>
          
          <button className="action-card" onClick={() => window.open('/portfolio', '_blank')}>
            <i className='bx bx-external-link'></i>
            <h3>View Portfolio</h3>
            <p>See your live portfolio page</p>
          </button>
          
          <button className="action-card" onClick={() => window.open('/resume.pdf', '_blank')}>
            <i className='bx bx-download'></i>
            <h3>Download Resume</h3>
            <p>Get the latest resume PDF</p>
          </button>
        </div>
      </div>
    </div>
  );
};

const ContactsTab = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const response = await fetch('/api/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Failed to load contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`/api/contacts/${id}/read`, { method: 'POST' });
      setContacts(contacts.map(contact => 
        contact.id === id ? { ...contact, read: true } : contact
      ));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
        setContacts(contacts.filter(contact => contact.id !== id));
      } catch (error) {
        console.error('Failed to delete contact:', error);
      }
    }
  };

  const filteredContacts = contacts.filter(contact => {
    if (filter === 'unread') return !contact.read;
    if (filter === 'read') return contact.read;
    return true;
  });

  if (loading) {
    return <div className="loading">Loading contacts...</div>;
  }

  return (
    <div className="contacts-tab">
      <div className="contacts-header">
        <h1>Contact Messages</h1>
        <div className="contacts-filters">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({contacts.length})
          </button>
          <button 
            className={filter === 'unread' ? 'active' : ''}
            onClick={() => setFilter('unread')}
          >
            Unread ({contacts.filter(c => !c.read).length})
          </button>
          <button 
            className={filter === 'read' ? 'active' : ''}
            onClick={() => setFilter('read')}
          >
            Read ({contacts.filter(c => c.read).length})
          </button>
        </div>
      </div>

      <div className="contacts-list">
        {filteredContacts.map(contact => (
          <div key={contact.id} className={`contact-card ${contact.read ? 'read' : 'unread'}`}>
            <div className="contact-header">
              <div className="contact-info">
                <h3>{contact.name}</h3>
                <p className="contact-email">{contact.email}</p>
                <p className="contact-date">{new Date(contact.created_at).toLocaleDateString()}</p>
              </div>
              <div className="contact-actions">
                {!contact.read && (
                  <button onClick={() => markAsRead(contact.id)} className="mark-read-btn">
                    <i className='bx bx-check'></i>
                    Mark Read
                  </button>
                )}
                <button onClick={() => deleteContact(contact.id)} className="delete-btn">
                  <i className='bx bx-trash'></i>
                  Delete
                </button>
              </div>
            </div>
            <div className="contact-message">
              <p>{contact.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectsTab = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await fetch(`/api/projects/${id}`, { method: 'DELETE' });
        setProjects(projects.filter(project => project.id !== id));
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  return (
    <div className="projects-tab">
      <div className="projects-header">
        <h1>Project Management</h1>
        <Link href="/admin/editproject?id=new" className="new-project-btn">
          <i className='bx bx-plus'></i>
          New Project
        </Link>
      </div>

      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-image">
              {project.image ? (
                <img src={project.image} alt={project.title} />
              ) : (
                <div className="project-placeholder">
                  <i className='bx bx-image'></i>
                </div>
              )}
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p className="project-category">{project.category}</p>
              <p className="project-description">{project.description}</p>
              
              <div className="project-actions">
                <Link href={`/admin/editproject/${project.id}`} className="edit-btn">
                  <i className='bx bx-edit'></i>
                  Edit
                </Link>
                <Link href={`/portfolio/${project.id}`} target="_blank" className="view-btn">
                  <i className='bx bx-external-link'></i>
                  View
                </Link>
                <button onClick={() => deleteProject(project.id)} className="delete-btn">
                  <i className='bx bx-trash'></i>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NewsletterTab = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSubscribers: 0,
    recentSubscribers: 0,
    growthRate: 0
  });

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    try {
      const response = await fetch('/api/newsletter/subscribers');
      const data = await response.json();
      setSubscribers(data.subscribers || []);
      setStats(data.stats || stats);
    } catch (error) {
      console.error('Failed to load subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading newsletter data...</div>;
  }

  return (
    <div className="newsletter-tab">
      <h1>Newsletter Management</h1>
      
      <div className="newsletter-stats">
        <div className="stat-card">
          <h3>{stats.totalSubscribers}</h3>
          <p>Total Subscribers</p>
        </div>
        <div className="stat-card">
          <h3>{stats.recentSubscribers}</h3>
          <p>This Month</p>
        </div>
        <div className="stat-card">
          <h3>{stats.growthRate}%</h3>
          <p>Growth Rate</p>
        </div>
      </div>

      <div className="newsletter-actions">
        <button className="export-btn">
          <i className='bx bx-download'></i>
          Export Subscribers
        </button>
        <Link href="https://blog.ryanlongo.net" target="_blank" className="blog-btn">
          <i className='bx bx-external-link'></i>
          Manage Blog
        </Link>
      </div>

      <div className="subscribers-list">
        <h2>Recent Subscribers</h2>
        {subscribers.map(subscriber => (
          <div key={subscriber.id} className="subscriber-card">
            <div className="subscriber-info">
              <strong>{subscriber.email}</strong>
              <span>{new Date(subscriber.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;