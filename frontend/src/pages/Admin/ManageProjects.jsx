import { useState } from 'react';
import { useGetProjectsQuery, useAddProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation } from '../../store/apiSlice';

export default function ManageProjects() {
  const { data: projects = [], isLoading } = useGetProjectsQuery();
  const [addProject] = useAddProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const [formData, setFormData] = useState({ id: '', title: '', subtitle: '', description: '', icon: 'code', codeSnippet: '', technologies: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      technologies: typeof formData.technologies === 'string' ? formData.technologies.split(',').map(t => t.trim()) : formData.technologies
    };

    try {
      if (isEditing) {
        await updateProject(payload).unwrap();
      } else {
        delete payload.id;
        await addProject(payload).unwrap();
      }
      resetForm();
    } catch (err) {
      console.error('Failed to save project', err);
    }
  };

  const handleEdit = (proj) => {
    setFormData({
      ...proj,
      technologies: proj.technologies.join(', ')
    });
    setIsEditing(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id).unwrap();
    } catch (err) {
      console.error('Failed to delete project', err);
    }
  };

  const resetForm = () => {
    setFormData({ id: '', title: '', subtitle: '', description: '', icon: 'code', codeSnippet: '', technologies: '' });
    setIsEditing(false);
  };

  if (isLoading) return <div className="font-label-mono text-primary-container"><span className="cursor-blink">Loading...</span></div>;

  return (
    <div>
      <h2 className="font-headline-md text-headline-md text-on-surface mb-6 border-b border-surface-container-highest pb-2 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary-container">code</span>
        Manage Projects
      </h2>

      {/* Form */}
      <div className="bg-surface-container border border-surface-container-highest p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-label-mono text-primary-container">
            {isEditing ? `Edit Project: ${formData.title}` : 'Add New Project'}
          </h3>
          {isEditing && (
            <button onClick={resetForm} className="font-code-snippet text-sm text-surface-variant hover:text-on-surface">
              [ Cancel_Edit ]
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
            <input required type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="Subtitle" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
            <input required type="text" name="icon" value={formData.icon} onChange={handleChange} placeholder="Icon (e.g. code, terminal)" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
            <input required type="text" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="Technologies (comma separated)" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
          </div>
          <textarea required name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows="3" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none resize-none"></textarea>
          <textarea required name="codeSnippet" value={formData.codeSnippet} onChange={handleChange} placeholder="Code Snippet" rows="3" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none resize-none"></textarea>
          <button type="submit" className="font-label-mono text-label-mono border border-surface-container-highest text-on-surface hover:text-surface-container-lowest hover:bg-primary-container hover:border-primary-container px-4 py-2 transition-all duration-200">
            {isEditing ? '[ Update_Project ]' : '[ Add_Project ]'}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="space-y-4">
        {projects.map(proj => (
          <div key={proj.id} className="flex justify-between items-center p-4 border border-surface-container-highest bg-surface-container group">
            <div>
              <div className="font-headline-md text-on-surface text-lg">{proj.title}</div>
              <div className="font-code-snippet text-on-surface-variant text-sm">{proj.subtitle}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(proj)} className="text-secondary-container hover:text-primary-container material-symbols-outlined transition-colors opacity-0 group-hover:opacity-100">
                edit
              </button>
              <button onClick={() => handleDelete(proj.id)} className="text-error hover:text-error-container material-symbols-outlined transition-colors">
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
