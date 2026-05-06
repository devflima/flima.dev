import { useState } from 'react';
import { useGetTechStackQuery, useAddTechStackMutation } from '../../store/apiSlice';

function TechStackForm({ initialStack, onSave, isAdding }) {
  const [formData, setFormData] = useState({
    languages: initialStack.languages?.join(', ') || '',
    databases: initialStack.databases?.join(', ') || '',
    infrastructure: initialStack.infrastructure?.join(', ') || '',
    messaging: initialStack.messaging?.join(', ') || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      languages: formData.languages.split(',').map(s => s.trim()).filter(Boolean),
      databases: formData.databases.split(',').map(s => s.trim()).filter(Boolean),
      infrastructure: formData.infrastructure.split(',').map(s => s.trim()).filter(Boolean),
      messaging: formData.messaging.split(',').map(s => s.trim()).filter(Boolean)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="languages" className="font-label-mono text-label-mono text-secondary-container">
          <span>Languages</span>
        </label>
        <input id="languages" required type="text" name="languages" value={formData.languages} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-3 outline-none" />
      </div>
      <div className="space-y-2">
        <label htmlFor="databases" className="font-label-mono text-label-mono text-secondary-container">
          <span>Databases</span>
        </label>
        <input id="databases" required type="text" name="databases" value={formData.databases} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-3 outline-none" />
      </div>
      <div className="space-y-2">
        <label htmlFor="infrastructure" className="font-label-mono text-label-mono text-secondary-container">
          <span>Infrastructure</span>
        </label>
        <input id="infrastructure" required type="text" name="infrastructure" value={formData.infrastructure} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-3 outline-none" />
      </div>
      <div className="space-y-2">
        <label htmlFor="messaging" className="font-label-mono text-label-mono text-secondary-container">
          <span>Messaging</span>
        </label>
        <input id="messaging" required type="text" name="messaging" value={formData.messaging} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-3 outline-none" />
      </div>
      <button type="submit" disabled={isAdding} className="font-label-mono text-label-mono border border-surface-container-highest text-on-surface hover:text-surface-container-lowest hover:bg-primary-container hover:border-primary-container px-6 py-3 mt-4 transition-all duration-200">
        {isAdding ? (
          ' [ Saving... ] '
        ) : (
          ' [ Save_Tech_Stack ] '
        )}
      </button>
    </form>
  );
}

export default function ManageTechStack() {
  const { data: stack, isLoading } = useGetTechStackQuery();
  const [addTechStack, { isLoading: isAdding }] = useAddTechStackMutation();

  const handleSave = async (payload) => {
    try {
      await addTechStack(payload).unwrap(); 
    } catch (err) {
      console.error('Failed to update Tech Stack', err);
    }
  };

  if (isLoading) {
    return (
      <div className="font-label-mono text-primary-container">
        <span className="cursor-blink">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-headline-md text-headline-md text-on-surface mb-6 border-b border-surface-container-highest pb-2 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary-container">terminal</span><span>Manage Tech Stack</span>
      </h2>
      <div className="bg-surface-container border border-surface-container-highest p-6 max-w-3xl">
        <p className="font-code-snippet text-on-surface-variant mb-6 text-sm">
          Enter comma-separated values for each category. These will be displayed in the terminal mockup on the Home page.
        </p>
        {stack && <TechStackForm initialStack={stack} onSave={handleSave} isAdding={isAdding} />}
      </div>
    </div>
  );
}
