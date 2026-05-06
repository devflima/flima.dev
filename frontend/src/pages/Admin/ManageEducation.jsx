import { useState } from 'react';
import { useGetEducationQuery, useAddEducationMutation, useUpdateEducationMutation, useDeleteEducationMutation } from '../../store/apiSlice';

export default function ManageEducation() {
  const { data: education = [], isLoading } = useGetEducationQuery();
  const [addEducation] = useAddEducationMutation();
  const [updateEducation] = useUpdateEducationMutation();
  const [deleteEducation] = useDeleteEducationMutation();

  const [formData, setFormData] = useState({ id: '', type: 'degree', degree: '', title: '', institution: '', period: '', concentration: '', thesis: '', architectures: '', description: '', issued: '', icon: 'school', colorClass: 'primary' });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };
    if (payload.type === 'degree') {
      payload.architectures = typeof payload.architectures === 'string' ? payload.architectures.split(',').map(a => a.trim()).filter(a => a) : payload.architectures;
    }

    try {
      if (isEditing) {
        await updateEducation(payload).unwrap();
      } else {
        delete payload.id;
        await addEducation(payload).unwrap();
      }
      resetForm();
    } catch (err) {
      console.error('Failed to save education', err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      ...item,
      architectures: item.architectures ? item.architectures.join(', ') : ''
    });
    setIsEditing(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEducation(id).unwrap();
    } catch (err) {
      console.error('Failed to delete education', err);
    }
  };

  const resetForm = () => {
    setFormData({ id: '', type: 'degree', degree: '', title: '', institution: '', period: '', concentration: '', thesis: '', architectures: '', description: '', issued: '', icon: 'school', colorClass: 'primary' });
    setIsEditing(false);
  };

  if (isLoading) return <div className="font-label-mono text-primary-container"><span className="cursor-blink">Loading...</span></div>;

  return (
    <div>
      <h2 className="font-headline-md text-headline-md text-on-surface mb-6 border-b border-surface-container-highest pb-2 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary-container">school</span>
        Manage Education
      </h2>

      {/* Add Form */}
      <div className="bg-surface-container border border-surface-container-highest p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-label-mono text-primary-container">
            {isEditing ? `Edit Entry: ${formData.title}` : 'Add New Entry'}
          </h3>
          {isEditing && (
            <button onClick={resetForm} className="font-code-snippet text-sm text-surface-variant hover:text-on-surface">
              [ Cancel_Edit ]
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none">
              <option value="degree">Degree</option>
              <option value="cert">Certification/Module</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
            
            {formData.type === 'degree' && (
              <>
                <input type="text" name="degree" value={formData.degree} onChange={handleChange} placeholder="Degree Type (e.g. BS, MS)" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
                <input type="text" name="institution" value={formData.institution} onChange={handleChange} placeholder="Institution" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
                <input type="text" name="period" value={formData.period} onChange={handleChange} placeholder="Period" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
                <input type="text" name="concentration" value={formData.concentration} onChange={handleChange} placeholder="Concentration" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
                <input type="text" name="architectures" value={formData.architectures} onChange={handleChange} placeholder="Architectures (comma separated)" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
              </>
            )}

            {formData.type === 'cert' && (
              <>
                <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
                <input type="text" name="issued" value={formData.issued} onChange={handleChange} placeholder="Issued text" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
                <input type="text" name="icon" value={formData.icon} onChange={handleChange} placeholder="Icon name" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
              </>
            )}
          </div>
          
          <button type="submit" className="font-label-mono text-label-mono border border-surface-container-highest text-on-surface hover:text-surface-container-lowest hover:bg-primary-container hover:border-primary-container px-4 py-2 transition-all duration-200">
            {isEditing ? '[ Update_Entry ]' : '[ Add_Entry ]'}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="space-y-4">
        {education.map(item => (
          <div key={item.id} className="flex justify-between items-center p-4 border border-surface-container-highest bg-surface-container group">
            <div>
              <div className="font-headline-md text-on-surface text-lg">{item.title}</div>
              <div className="font-code-snippet text-on-surface-variant text-sm">[{item.type}] {item.institution || item.issued}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(item)} className="text-secondary-container hover:text-primary-container material-symbols-outlined transition-colors opacity-0 group-hover:opacity-100">
                edit
              </button>
              <button onClick={() => handleDelete(item.id)} className="text-error hover:text-error-container material-symbols-outlined transition-colors">
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
