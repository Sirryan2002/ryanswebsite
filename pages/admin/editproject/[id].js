import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const EnhancedProjectEditor = () => {
    const router = useRouter();
    const { id } = router.query; // pull id out of URL params

    const [project, setProject] = useState({
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

    const [projectDraft, setProjectDraft] = useState({...project});
    const [contentBlocks, setContentBlocks] = useState([]);
    const [activeTab, setActiveTab] = useState('basic');

    // Content block types
    const blockTypes = [
        { value: 'paragraph', label: 'Paragraph', icon: '📝' },
        { value: 'heading', label: 'Heading', icon: '📋' },
        { value: 'image', label: 'Image', icon: '🖼️' },
        { value: 'embed', label: 'Embed', icon: '🎬' },
        { value: 'table', label: 'Table', icon: '📊' },
        { value: 'dropdown', label: 'Dropdown', icon: '📁' },
        { value: 'list', label: 'List', icon: '📋' },
        { value: 'code', label: 'Code', icon: '💻' }
    ];

    const categories = [
        { value: 'research', label: 'Research' },
        { value: 'volunteering', label: 'Volunteering' },
        { value: 'fun', label: 'For Fun' },
    ];

    useEffect(() => {
        if (id) {
            loadProject(id);
        }
    }, [id]); // upon page load, load project from ID via API

    // makes a call to the getProject API
    const loadProject = async (projectId) => {
        try {
            const res = await fetch(`/api/getProject?id=${projectId}`);
            const data = await res.json();
            
            // Parse body content if it exists
            let parsedContent = [];
            if (data.body) {
                // if there is anything returned, the expected return is JSON
                // however, legacy rows will not be in JSON format so we default to paragraph block
                try { 
                    parsedContent = JSON.parse(data.body);
                } catch {
                    parsedContent = [{ type: 'paragraph', content: data.body }];
                }
            }
            
            setProject(data);
            setProjectDraft(data);
            setContentBlocks(parsedContent);
        } catch (error) {
            console.error('Error loading project:', error);
        }
    };

    // onChange() handler for when a basic field in the editor is changed
    // just updates the field with the new value.
    const handleBasicChange = (field, value) => {
        setProjectDraft(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // special onChange() handler for tech, needs to split the comma delimited input first!
    const handleTechnologiesChange = (value) => {
        const techArray = value.split(',').map(tech => tech.trim()).filter(tech => tech);
        setProjectDraft(prev => ({
            ...prev,
            technologies: techArray
        }));
    };

    // Helper function for creating a new content block in the content editor
    const addContentBlock = (type) => {
        const newBlock = createEmptyBlock(type);
        setContentBlocks(prev => [...prev, newBlock]);
    };

    // constructor for content blocks
    const createEmptyBlock = (type) => {
        const baseBlock = { type, id: Date.now() };
        
        switch (type) {
            case 'paragraph':
                return { ...baseBlock, content: '' };
            case 'heading':
                return { ...baseBlock, content: '', level: 3 };
            case 'image':
                return { ...baseBlock, src: '', alt: '', caption: '' };
            case 'embed':
                return { ...baseBlock, src: '', title: '', caption: '' };
            case 'table':
                return { ...baseBlock, headers: [''], rows: [['']], caption: '' };
            case 'dropdown':
                return { ...baseBlock, title: '', content: [{ type: 'paragraph', content: '' }] };
            case 'list':
                return { ...baseBlock, ordered: false, items: [''] };
            case 'code':
                return { ...baseBlock, content: '', language: 'javascript', caption: '' };
            default:
                return { ...baseBlock, content: '' };
        }
    };

    // 
    const updateContentBlock = (index, updates) => {
        // iterate through existing blocks until we find our one with the index ID provided
        setContentBlocks(prev => prev.map((block, i) => 
            // only update the block matching our ID, return all other blocks as they were
            i === index ? { ...block, ...updates } : block
            // we're using the spread operator here to map the changes on updates to the block we identified!
        ));
    };

    // just removes the block where we match the index! Input safe
    const deleteContentBlock = (index) => {
        setContentBlocks(prev => prev.filter((_, i) => i !== index));
    };

    
    const moveContentBlock = (index, direction) => {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= contentBlocks.length) return; // sanity check to stay in-bounds

        setContentBlocks(prev => {
            const newBlocks = [...prev]; // create a copy of prev
            // "array destructuring assignment", fancy way of swapping two indices in an array
            [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
            return newBlocks;
        });
    };

    const saveProject = async () => {
        try {
            const projectData = {
                ...projectDraft,
                body: JSON.stringify(contentBlocks)
            };

            const response = await fetch('/api/updateProject', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, ...projectData })
            });

            if (!response.ok) throw new Error('Failed to save project');
            
            const result = await response.json();
            
            // Handle successful creation of new project
            if (result.project && (!id || id === 'new' || id === null)) {
                // Update the URL to reflect the new project ID
                const newProjectId = result.project.id;
                router.replace(`/admin/editproject/${newProjectId}`, undefined, { shallow: true });
                
                // Update local state with the new project data
                setProject(result.project);
                setProjectDraft(result.project);
            } else {
                // Update existing project
                setProject(projectData);
            }
            
            alert(result.message || 'Project saved successfully!');
            
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Error saving project: ' + error.message);
        }
    };

    const renderContentBlockEditor = (block, index) => {
        const updateBlock = (updates) => updateContentBlock(index, updates);

        switch (block.type) {
            case 'paragraph':
                return (
                    <textarea
                        value={block.content}
                        onChange={(e) => updateBlock({ content: e.target.value })}
                        placeholder="Enter paragraph content..."
                        className="content-textarea"
                        rows="4"
                    />
                );

            case 'heading':
                return (
                    <div className="heading-editor">
                        <select
                            value={block.level}
                            onChange={(e) => updateBlock({ level: parseInt(e.target.value) })}
                            className="heading-level-select"
                        >
                            <option value={1}>H1</option>
                            <option value={2}>H2</option>
                            <option value={3}>H3</option>
                            <option value={4}>H4</option>
                        </select>
                        <input
                            type="text"
                            value={block.content}
                            onChange={(e) => updateBlock({ content: e.target.value })}
                            placeholder="Heading text..."
                            className="heading-input"
                        />
                    </div>
                );

            case 'image':
                return (
                    <div className="image-editor">
                        <input
                            type="url"
                            value={block.src}
                            onChange={(e) => updateBlock({ src: e.target.value })}
                            placeholder="Image URL..."
                            className="image-url-input"
                        />
                        <input
                            type="text"
                            value={block.alt}
                            onChange={(e) => updateBlock({ alt: e.target.value })}
                            placeholder="Alt text..."
                            className="image-alt-input"
                        />
                        <input
                            type="text"
                            value={block.caption}
                            onChange={(e) => updateBlock({ caption: e.target.value })}
                            placeholder="Caption (optional)..."
                            className="image-caption-input"
                        />
                        {block.src && (
                            <img src={block.src} alt="Preview" className="image-preview" />
                        )}
                    </div>
                );

            case 'embed':
                return (
                    <div className="embed-editor">
                        <input
                            type="url"
                            value={block.src}
                            onChange={(e) => updateBlock({ src: e.target.value })}
                            placeholder="Embed URL (YouTube, CodePen, etc.)..."
                            className="embed-url-input"
                        />
                        <input
                            type="text"
                            value={block.title}
                            onChange={(e) => updateBlock({ title: e.target.value })}
                            placeholder="Embed title..."
                            className="embed-title-input"
                        />
                        <input
                            type="text"
                            value={block.caption}
                            onChange={(e) => updateBlock({ caption: e.target.value })}
                            placeholder="Caption (optional)..."
                            className="embed-caption-input"
                        />
                    </div>
                );

            case 'table':
                return (
                    <div className="table-editor">
                        <div className="table-headers">
                            <label>Headers:</label>
                            {block.headers.map((header, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    value={header}
                                    onChange={(e) => {
                                        const newHeaders = [...block.headers];
                                        newHeaders[i] = e.target.value;
                                        updateBlock({ headers: newHeaders });
                                    }}
                                    placeholder={`Header ${i + 1}`}
                                    className="table-header-input"
                                />
                            ))}
                            <button
                                onClick={() => updateBlock({ headers: [...block.headers, ''] })}
                                className="add-column-btn"
                            >
                                Add Column
                            </button>
                        </div>
                        <div className="table-rows">
                            <label>Rows:</label>
                            {block.rows.map((row, rowIndex) => (
                                <div key={rowIndex} className="table-row">
                                    {row.map((cell, cellIndex) => (
                                        <input
                                            key={cellIndex}
                                            type="text"
                                            value={cell}
                                            onChange={(e) => {
                                                const newRows = [...block.rows];
                                                newRows[rowIndex][cellIndex] = e.target.value;
                                                updateBlock({ rows: newRows });
                                            }}
                                            placeholder={`Row ${rowIndex + 1}, Col ${cellIndex + 1}`}
                                            className="table-cell-input"
                                        />
                                    ))}
                                    <button
                                        onClick={() => {
                                            const newRows = block.rows.filter((_, i) => i !== rowIndex);
                                            updateBlock({ rows: newRows });
                                        }}
                                        className="delete-row-btn"
                                    >
                                        Delete Row
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => {
                                    const newRow = new Array(block.headers.length).fill('');
                                    updateBlock({ rows: [...block.rows, newRow] });
                                }}
                                className="add-row-btn"
                            >
                                Add Row
                            </button>
                        </div>
                        <input
                            type="text"
                            value={block.caption}
                            onChange={(e) => updateBlock({ caption: e.target.value })}
                            placeholder="Table caption (optional)..."
                            className="table-caption-input"
                        />
                    </div>
                );

            case 'list':
                return (
                    <div className="list-editor">
                        <div className="list-type">
                            <label>
                                <input
                                    type="radio"
                                    checked={!block.ordered}
                                    onChange={() => updateBlock({ ordered: false })}
                                />
                                Unordered List
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    checked={block.ordered}
                                    onChange={() => updateBlock({ ordered: true })}
                                />
                                Ordered List
                            </label>
                        </div>
                        {block.items.map((item, i) => (
                            <div key={i} className="list-item-editor">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => {
                                        const newItems = [...block.items];
                                        newItems[i] = e.target.value;
                                        updateBlock({ items: newItems });
                                    }}
                                    placeholder={`Item ${i + 1}`}
                                    className="list-item-input"
                                />
                                <button
                                    onClick={() => {
                                        const newItems = block.items.filter((_, index) => index !== i);
                                        updateBlock({ items: newItems });
                                    }}
                                    className="delete-item-btn"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => updateBlock({ items: [...block.items, ''] })}
                            className="add-item-btn"
                        >
                            Add Item
                        </button>
                    </div>
                );

            case 'code':
                return (
                    <div className="code-editor">
                        <div className="code-meta">
                            <select
                                value={block.language}
                                onChange={(e) => updateBlock({ language: e.target.value })}
                                className="code-language-select"
                            >
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                                <option value="html">HTML</option>
                                <option value="css">CSS</option>
                                <option value="json">JSON</option>
                                <option value="bash">Bash</option>
                                <option value="sql">SQL</option>
                            </select>
                            <input
                                type="text"
                                value={block.caption}
                                onChange={(e) => updateBlock({ caption: e.target.value })}
                                placeholder="Code caption (optional)..."
                                className="code-caption-input"
                            />
                        </div>
                        <textarea
                            value={block.content}
                            onChange={(e) => updateBlock({ content: e.target.value })}
                            placeholder="Enter code..."
                            className="code-textarea"
                            rows="10"
                            style={{ fontFamily: 'monospace' }}
                        />
                    </div>
                );

            default:
                return (
                    <textarea
                        value={block.content}
                        onChange={(e) => updateBlock({ content: e.target.value })}
                        placeholder="Content..."
                        className="content-textarea"
                        rows="3"
                    />
                );
        }
    };

    return (
        <div className="enhanced-editor" id='admin'>
            <div className="editor-header">
                <h1>Edit Project: {projectDraft.title || 'New Project'}</h1>
                <div className="editor-actions">
                    <button onClick={saveProject} className="save-btn">
                        Save Project
                    </button>
                    <button onClick={() => router.push('/admin')} className="back-btn">
                        Back to Admin
                    </button>
                </div>
            </div>

            <div className="editor-tabs">
                <button
                    onClick={() => setActiveTab('basic')}
                    className={`tab-btn ${activeTab === 'basic' ? 'active' : ''}`}
                >
                    Basic Info
                </button>
                <button
                    onClick={() => setActiveTab('content')}
                    className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
                >
                    Content
                </button>
                <button
                    onClick={() => setActiveTab('media')}
                    className={`tab-btn ${activeTab === 'media' ? 'active' : ''}`}
                >
                    Media & Links
                </button>
            </div>

            <div className="editor-content">
                {activeTab === 'basic' && (
                    <div className="basic-info-tab">
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                value={projectDraft.title}
                                onChange={(e) => handleBasicChange('title', e.target.value)}
                                className="form-input"
                                placeholder="Project title..."
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={projectDraft.description}
                                onChange={(e) => handleBasicChange('description', e.target.value)}
                                className="form-textarea"
                                rows="3"
                                placeholder="Brief project description..."
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    value={projectDraft.category}
                                    onChange={(e) => handleBasicChange('category', e.target.value)}
                                    className="form-select"
                                >
                                    <option value="">Select category...</option>
                                    {categories.map(cat => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Date</label>
                                <input
                                    type="date"
                                    value={projectDraft.date}
                                    onChange={(e) => handleBasicChange('date', e.target.value)}
                                    className="form-input"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Location</label>
                            <input
                                type="text"
                                value={projectDraft.location}
                                onChange={(e) => handleBasicChange('location', e.target.value)}
                                className="form-input"
                                placeholder="Project location..."
                            />
                        </div>

                        <div className="form-group">
                            <label>Technologies (comma-separated)</label>
                            <input
                                type="text"
                                value={projectDraft.technologies?.join(', ') || ''}
                                onChange={(e) => handleTechnologiesChange(e.target.value)}
                                className="form-input"
                                placeholder="React, Node.js, MongoDB..."
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'content' && (
                    <div className="content-tab">
                        <div className="content-actions">
                            <h3>Content Blocks</h3>
                            <div className="block-type-selector">
                                <label>Add block:</label>
                                {blockTypes.map(type => (
                                    <button
                                        key={type.value}
                                        onClick={() => addContentBlock(type.value)}
                                        className="add-block-btn"
                                        title={type.label}
                                    >
                                        {type.icon} {type.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="content-blocks">
                            {contentBlocks.map((block, index) => (
                                <div key={block.id || index} className="content-block">
                                    <div className="block-header">
                                        <span className="block-type">
                                            {blockTypes.find(t => t.value === block.type)?.icon} {block.type}
                                        </span>
                                        <div className="block-actions">
                                            <button
                                                onClick={() => moveContentBlock(index, 'up')}
                                                disabled={index === 0}
                                                className="move-btn"
                                            >
                                                ↑
                                            </button>
                                            <button
                                                onClick={() => moveContentBlock(index, 'down')}
                                                disabled={index === contentBlocks.length - 1}
                                                className="move-btn"
                                            >
                                                ↓
                                            </button>
                                            <button
                                                onClick={() => deleteContentBlock(index)}
                                                className="delete-btn"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                    <div className="block-content">
                                        {renderContentBlockEditor(block, index)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'media' && (
                    <div className="media-tab">
                        <div className="form-group">
                            <label>Hero Image URL</label>
                            <input
                                type="url"
                                value={projectDraft.image}
                                onChange={(e) => handleBasicChange('image', e.target.value)}
                                className="form-input"
                                placeholder="https://example.com/image.jpg"
                            />
                            {projectDraft.image && (
                                <img src={projectDraft.image} alt="Preview" className="image-preview" />
                            )}
                        </div>

                        <div className="form-group">
                            <label>Demo URL</label>
                            <input
                                type="url"
                                value={projectDraft.demo}
                                onChange={(e) => handleBasicChange('demo', e.target.value)}
                                className="form-input"
                                placeholder="https://example.com/demo"
                            />
                        </div>

                        <div className="form-group">
                            <label>Website URL</label>
                            <input
                                type="url"
                                value={projectDraft.website}
                                onChange={(e) => handleBasicChange('website', e.target.value)}
                                className="form-input"
                                placeholder="https://example.com"
                            />
                        </div>

                        <div className="form-group">
                            <label>GitHub URL</label>
                            <input
                                type="url"
                                value={projectDraft.github}
                                onChange={(e) => handleBasicChange('github', e.target.value)}
                                className="form-input"
                                placeholder="https://github.com/username/repo"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnhancedProjectEditor;