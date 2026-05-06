import { useState } from 'react';
import { useGetPageContentQuery, useAddPageContentMutation } from '../../store/apiSlice';

function ContentForm({ initialContent, onSave, isAdding }) {
  const [formData, setFormData] = useState({
    homeTitle: initialContent.home?.title || '',
    homeSubtitle: initialContent.home?.subtitle || '',
    projectsTitle: initialContent.projects?.title || '',
    projectsSubtitle: initialContent.projects?.subtitle || '',
    experienceTitle: initialContent.experience?.title || '',
    experienceSubtitle: initialContent.experience?.subtitle || '',
    educationTitle: initialContent.education?.title || '',
    educationSubtitle: initialContent.education?.subtitle || '',
    contactTitle: initialContent.contact?.title || '',
    contactSubtitle: initialContent.contact?.subtitle || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      home: { title: formData.homeTitle, subtitle: formData.homeSubtitle },
      projects: { title: formData.projectsTitle, subtitle: formData.projectsSubtitle },
      experience: { title: formData.experienceTitle, subtitle: formData.experienceSubtitle },
      education: { title: formData.educationTitle, subtitle: formData.educationSubtitle },
      contact: { title: formData.contactTitle, subtitle: formData.contactSubtitle }
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
            <input id="homeTitle" type="text" name="homeTitle" value={formData.homeTitle} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
          </div>
          <div className="space-y-2">
            <label htmlFor="homeSubtitle" className="font-label-mono text-label-mono text-surface-variant">
              <span>Subtitle</span>
            </label>
            <textarea id="homeSubtitle" name="homeSubtitle" value={formData.homeSubtitle} onChange={handleChange} rows="3" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none resize-none"></textarea>
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
            <input id="projectsTitle" type="text" name="projectsTitle" value={formData.projectsTitle} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
          </div>
          <div className="space-y-2">
            <label htmlFor="projectsSubtitle" className="font-label-mono text-label-mono text-surface-variant">
              <span>Subtitle</span>
            </label>
            <textarea id="projectsSubtitle" name="projectsSubtitle" value={formData.projectsSubtitle} onChange={handleChange} rows="2" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none resize-none"></textarea>
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
            <input id="experienceTitle" type="text" name="experienceTitle" value={formData.experienceTitle} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
          </div>
          <div className="space-y-2">
            <label htmlFor="experienceSubtitle" className="font-label-mono text-label-mono text-surface-variant">
              <span>Subtitle</span>
            </label>
            <textarea id="experienceSubtitle" name="experienceSubtitle" value={formData.experienceSubtitle} onChange={handleChange} rows="2" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none resize-none"></textarea>
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
            <input id="educationTitle" type="text" name="educationTitle" value={formData.educationTitle} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
          </div>
          <div className="space-y-2">
            <label htmlFor="educationSubtitle" className="font-label-mono text-label-mono text-surface-variant">
              <span>Subtitle</span>
            </label>
            <textarea id="educationSubtitle" name="educationSubtitle" value={formData.educationSubtitle} onChange={handleChange} rows="2" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none resize-none"></textarea>
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
            <input id="contactTitle" type="text" name="contactTitle" value={formData.contactTitle} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none" />
          </div>
          <div className="space-y-2">
            <label htmlFor="contactSubtitle" className="font-label-mono text-label-mono text-surface-variant">
              <span>Subtitle</span>
            </label>
            <textarea id="contactSubtitle" name="contactSubtitle" value={formData.contactSubtitle} onChange={handleChange} rows="2" className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-2 outline-none resize-none"></textarea>
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

  const handleSave = async (payload) => {
    try {
      await addPageContent(payload).unwrap();
    } catch {
      console.error('Failed to update Page Content');
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
