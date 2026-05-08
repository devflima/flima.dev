import { useState } from 'react';
import toast from 'react-hot-toast';
import { useGetExperienceQuery, useAddExperienceMutation, useUpdateExperienceMutation, useDeleteExperienceMutation } from '../../store/apiSlice';

export default function ManageExperience() {
  const { data: experiences = [], isLoading } = useGetExperienceQuery();
  const [addExperience] = useAddExperienceMutation();
  const [updateExperience] = useUpdateExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();

  const [formData, setFormData] = useState({ id: '', title: '', company: '', period: '', bullets: '', technologies: '', icon: 'dns', colorClass: 'primary' });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      bullets: (typeof formData.bullets === 'string' && formData.bullets.trim()) ? formData.bullets.split(String.raw`\n`).map(b => b.trim()).filter(Boolean) : ['N/A'],
      technologies: (typeof formData.technologies === 'string' && formData.technologies.trim()) ? formData.technologies.split(',').map(t => t.trim()).filter(Boolean) : ['N/A']
    };
    if (payload.bullets.length === 0) payload.bullets = ['N/A'];
    if (payload.technologies.length === 0) payload.technologies = ['N/A'];

    try {
      if (isEditing) {
        await updateExperience(payload).unwrap();
        toast.success('Experience updated successfully!');
      } else {
        delete payload.id;
        await addExperience(payload).unwrap();
        toast.success('Experience added successfully!');
      }
      resetForm();
    } catch (err) {
      console.error('Failed to save experience', err);
      toast.error('Failed to save experience');
    }
  };

  const handleEdit = (exp) => {
    setFormData({
      ...exp,
      bullets: exp.bullets.join(String.raw`\n`),
      technologies: exp.technologies.join(', ')
    });
    setIsEditing(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return;
    try {
      await deleteExperience(id).unwrap();
      toast.success('Experience deleted successfully!');
    } catch (err) {
      console.error('Failed to delete experience', err);
      toast.error('Failed to delete experience');
    }
  };

  const resetForm = () => {
    setFormData({ id: '', title: '', company: '', period: '', bullets: '', technologies: '', icon: 'dns', colorClass: 'primary' });
    setIsEditing(false);
  };

  if (isLoading) return <div className="font-label-mono text-primary-container"><span className="cursor-blink">Loading...</span></div>;

  return (
    <div>
      <h2 className="font-headline-md text-headline-md text-on-surface mb-6 border-b border-surface-container-highest pb-2 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary-container">work</span><span>Manage Experience</span>
      </h2>

      {/* Form */}
      <div className="bg-surface-container border border-surface-container-highest p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-label-mono text-primary-container">
            {isEditing ? `Edit Experience: ${formData.company}` : 'Add New Experience'}
          </h3>
          {isEditing && (
            <button onClick={resetForm} className="font-code-snippet text-sm text-surface-variant hover:text-on-surface">
              [ Cancel_Edit ]
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="title" className="font-label-mono text-[10px] text-surface-variant">Title</label>
              <input id="title" required type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
            </div>
            <div className="space-y-1">
              <label htmlFor="company" className="font-label-mono text-[10px] text-surface-variant">Company</label>
              <input id="company" required type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
            </div>
            <div className="space-y-1">
              <label htmlFor="period" className="font-label-mono text-[10px] text-surface-variant">Period</label>
              <input id="period" required type="text" name="period" value={formData.period} onChange={handleChange} placeholder="Period (e.g. 2021 - PRESENT)" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
            </div>
            <div className="space-y-1">
              <label htmlFor="technologies" className="font-label-mono text-[10px] text-surface-variant">Technologies</label>
              <input id="technologies" required type="text" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="Technologies (comma separated)" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
            </div>
            <div className="space-y-1">
              <label htmlFor="icon" className="font-label-mono text-[10px] text-surface-variant">Icon</label>
              <input id="icon" required type="text" name="icon" value={formData.icon} onChange={handleChange} placeholder="Icon (e.g. dns, database)" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
            </div>
            <div className="space-y-1">
              <label htmlFor="colorClass" className="font-label-mono text-[10px] text-surface-variant">Color</label>
              <select id="colorClass" name="colorClass" value={formData.colorClass} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none">
                <option value="primary">Primary (Green)</option>
                <option value="secondary">Secondary (Cyan)</option>
                <option value="surface-variant">Neutral (Gray)</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label htmlFor="bullets" className="font-label-mono text-[10px] text-surface-variant">Bullets</label>
            <textarea id="bullets" required name="bullets" value={formData.bullets} onChange={handleChange} placeholder="Bullets (separate by \n)" rows="3" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none resize-none"></textarea>
          </div>
          <button type="submit" className="font-label-mono text-label-mono border border-surface-container-highest text-on-surface hover:text-surface-container-lowest hover:bg-primary-container hover:border-primary-container px-4 py-2 transition-all duration-200">
             {isEditing ? '[ Update_Experience ]' : '[ Add_Experience ]'}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="space-y-4">
        {experiences.map(exp => (
          <div key={exp.id} className="flex justify-between items-center p-4 border border-surface-container-highest bg-surface-container group">
            <div className="flex items-center gap-4">
              <div className={`w-2 h-10 ${exp.colorClass === 'secondary' ? 'bg-secondary-container' : (exp.colorClass === 'surface-variant' ? 'bg-surface-variant' : 'bg-primary-container')}`}></div>
              <div>
                <div className="font-headline-md text-on-surface text-lg">{exp.title}</div>
                <div className="font-code-snippet text-on-surface-variant text-sm">{exp.company}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(exp)} className="text-secondary-container hover:text-primary-container material-symbols-outlined transition-colors opacity-0 group-hover:opacity-100">
                edit
              </button>
              <button onClick={() => handleDelete(exp.id)} className="text-error hover:text-error-container material-symbols-outlined transition-colors">
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
