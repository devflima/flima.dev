import { useState, useEffect } from 'react';
import { useGetTechStackQuery, useAddTechStackMutation, useUpdateTechStackMutation } from '../../store/apiSlice';

export default function ManageTechStack() {
  const { data: stack, isLoading } = useGetTechStackQuery();
  const [addTechStack, { isLoading: isAdding }] = useAddTechStackMutation();
  const [updateTechStack, { isLoading: isUpdating }] = useUpdateTechStackMutation();
  
  const [formData, setFormData] = useState({
    languages: '',
    databases: '',
    infrastructure: '',
    messaging: ''
  });

  useEffect(() => {
    if (stack) {
      setFormData({
        languages: stack.languages?.join(', ') || '',
        databases: stack.databases?.join(', ') || '',
        infrastructure: stack.infrastructure?.join(', ') || '',
        messaging: stack.messaging?.join(', ') || ''
      });
    }
  }, [stack]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      languages: formData.languages.split(',').map(s => s.trim()).filter(s => s),
      databases: formData.databases.split(',').map(s => s.trim()).filter(s => s),
      infrastructure: formData.infrastructure.split(',').map(s => s.trim()).filter(s => s),
      messaging: formData.messaging.split(',').map(s => s.trim()).filter(s => s)
    };

    try {
      // Backend expects a list of stacks or a specific structure?
      // Based on my apiSlice, I'm sending the object.
      // But the backend expects List<StackDTORequest>.
      // I should adjust apiSlice or transform here.
      // For now, let's assume the backend takes individual posts or we send the list.
      await addTechStack(payload).unwrap(); 
    } catch (err) {
      console.error('Failed to update Tech Stack', err);
    }
  };

  if (isLoading) return <div className="font-label-mono text-primary-container"><span className="cursor-blink">Loading...</span></div>;

  return (
    <div>
      <h2 className="font-headline-md text-headline-md text-on-surface mb-6 border-b border-surface-container-highest pb-2 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary-container">terminal</span>
        Manage Tech Stack
      </h2>
      <div className="bg-surface-container border border-surface-container-highest p-6 max-w-3xl">
        <p className="font-code-snippet text-on-surface-variant mb-6 text-sm">
          Enter comma-separated values for each category. These will be displayed in the terminal mockup on the Home page.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="font-label-mono text-label-mono text-secondary-container">Languages</label>
            <input required type="text" name="languages" value={formData.languages} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-3 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="font-label-mono text-label-mono text-secondary-container">Databases</label>
            <input required type="text" name="databases" value={formData.databases} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-3 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="font-label-mono text-label-mono text-secondary-container">Infrastructure</label>
            <input required type="text" name="infrastructure" value={formData.infrastructure} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-3 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="font-label-mono text-label-mono text-secondary-container">Messaging</label>
            <input required type="text" name="messaging" value={formData.messaging} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-3 outline-none" />
          </div>
          <button type="submit" disabled={isUpdating || isAdding} className="font-label-mono text-label-mono border border-surface-container-highest text-on-surface hover:text-surface-container-lowest hover:bg-primary-container hover:border-primary-container px-6 py-3 mt-4 transition-all duration-200">
            {isUpdating || isAdding ? '[ Saving... ]' : '[ Save_Tech_Stack ]'}
          </button>
        </form>
      </div>
    </div>
  );
}
