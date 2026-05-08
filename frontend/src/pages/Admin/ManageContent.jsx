import { useState } from 'react';
import { useGetPageContentQuery, useAddPageContentMutation, useUpdatePageContentMutation } from '../../store/apiSlice';
import toast from 'react-hot-toast';

function ContentForm({ initialContent, onSave, isAdding }) {
  const [formData, setFormData] = useState({
    home: { title: initialContent.home?.title || '', subtitle: initialContent.home?.subtitle || '' },
    projects: { title: initialContent.projects?.title || '', subtitle: initialContent.projects?.subtitle || '' },
    experience: { title: initialContent.experience?.title || '', subtitle: initialContent.experience?.subtitle || '' },
    education: { title: initialContent.education?.title || '', subtitle: initialContent.education?.subtitle || '' },
    contact: { title: initialContent.contact?.title || '', subtitle: initialContent.contact?.subtitle || '' }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      home: formData.home,
      projects: formData.projects,
      experience: formData.experience,
      education: formData.education,
      contact: formData.contact,
      _ids: initialContent._ids
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="font-label-mono text-primary-container mb-4">HOME_PAGE</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="homeTitle" className="font-label-mono text-label-mono text-surface-variant">
              <span>Title</span>
            </label>
            <input id="homeTitle" type="text" name="home.title" value={formData.home.title} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
          </div>
          <div className="space-y-2">
            <label htmlFor="homeSubtitle" className="font-label-mono text-label-mono text-surface-variant">
              <span>Subtitle</span>
            </label>
            <textarea id="homeSubtitle" name="home.subtitle" value={formData.home.subtitle} onChange={handleChange} rows="3" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none resize-none"></textarea>
          </div>
        </div>
      </div>

      <div className="border-t border-surface-container-highest pt-6">
        <h3 className="font-label-mono text-primary-container mb-4">PROJECTS_PAGE</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="projectsTitle" className="font-label-mono text-label-mono text-surface-variant">
              <span>Title</span>
            </label>
            <input id="projectsTitle" type="text" name="projects.title" value={formData.projects.title} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
          </div>
          <div className="space-y-2">
            <label htmlFor="projectsSubtitle" className="font-label-mono text-label-mono text-surface-variant">
              <span>Subtitle</span>
            </label>
            <textarea id="projectsSubtitle" name="projects.subtitle" value={formData.projects.subtitle} onChange={handleChange} rows="2" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none resize-none"></textarea>
          </div>
        </div>
      </div>

      <div className="border-t border-surface-container-highest pt-6">
        <h3 className="font-label-mono text-primary-container mb-4">EXPERIENCE_PAGE</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="experienceTitle" className="font-label-mono text-label-mono text-surface-variant">
              <span>Title</span>
            </label>
            <input id="experienceTitle" type="text" name="experience.title" value={formData.experience.title} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
          </div>
          <div className="space-y-2">
            <label htmlFor="experienceSubtitle" className="font-label-mono text-label-mono text-surface-variant">
              <span>Subtitle</span>
            </label>
            <textarea id="experienceSubtitle" name="experience.subtitle" value={formData.experience.subtitle} onChange={handleChange} rows="2" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none resize-none"></textarea>
          </div>
        </div>
      </div>

      <div className="border-t border-surface-container-highest pt-6">
        <h3 className="font-label-mono text-primary-container mb-4">EDUCATION_PAGE</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="educationTitle" className="font-label-mono text-label-mono text-surface-variant">
              <span>Title</span>
            </label>
            <input id="educationTitle" type="text" name="education.title" value={formData.education.title} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
          </div>
          <div className="space-y-2">
            <label htmlFor="educationSubtitle" className="font-label-mono text-label-mono text-surface-variant">
              <span>Subtitle</span>
            </label>
            <textarea id="educationSubtitle" name="education.subtitle" value={formData.education.subtitle} onChange={handleChange} rows="2" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none resize-none"></textarea>
          </div>
        </div>
      </div>

      <div className="border-t border-surface-container-highest pt-6">
        <h3 className="font-label-mono text-primary-container mb-4">CONTACT_PAGE</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="contactTitle" className="font-label-mono text-label-mono text-surface-variant">
              <span>Title</span>
            </label>
            <input id="contactTitle" type="text" name="contact.title" value={formData.contact.title} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
          </div>
          <div className="space-y-2">
            <label htmlFor="contactSubtitle" className="font-label-mono text-label-mono text-surface-variant">
              <span>Subtitle</span>
            </label>
            <textarea id="contactSubtitle" name="contact.subtitle" value={formData.contact.subtitle} onChange={handleChange} rows="2" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none resize-none"></textarea>
          </div>
        </div>
      </div>

      <button type="submit" disabled={isAdding} className="font-label-mono text-label-mono border border-surface-container-highest text-on-surface hover:text-surface-container-lowest hover:bg-primary-container hover:border-primary-container px-6 py-3 mt-4 transition-all duration-200">
        {isAdding ? (
          ' [ Saving... ] '
        ) : (
          ' [ Save_Content ] '
        )}
      </button>
    </form>
  );
}

export default function ManageContent() {
  const { data: content, isLoading } = useGetPageContentQuery();
  const [addPageContent, { isLoading: isAdding }] = useAddPageContentMutation();
  const [updatePageContent] = useUpdatePageContentMutation();

  const handleSave = async (payload) => {
    try {
      const ids = payload._ids || {};
      const promises = Object.entries(payload).map(([key, contentObj]) => {
        if (key === '_ids') return null;
        const requestBody = { sectionType: key.toUpperCase(), sectionContent: contentObj };
        if (ids[key]) {
          return updatePageContent({ id: ids[key], ...requestBody }).unwrap();
        } else {
          return addPageContent(requestBody).unwrap();
        }
      }).filter(Boolean);
      await Promise.all(promises);
      toast.success('Page Content saved successfully!');
    } catch (err) {
      console.error('Failed to update Page Content', err);
      toast.error('Failed to save Page Content.');
    }
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
        <span className="material-symbols-outlined text-primary-container">edit_document</span><span>Manage Page Content</span>
      </h2>
      <div className="bg-surface-container border border-surface-container-highest p-6 max-w-3xl">
        {content && <ContentForm initialContent={content} onSave={handleSave} isAdding={isAdding} />}
      </div>
    </div>
  );
}
