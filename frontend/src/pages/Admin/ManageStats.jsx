import PropTypes from 'prop-types';
import { useState } from 'react';
import { useGetStatsQuery, useAddStatsMutation, useUpdateStatsMutation } from '../../store/apiSlice';

function StatsForm({ initialData, onSave, isSaving }) {
  const [stats, setStats] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStats(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(stats);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="yearsExperience" className="font-label-mono text-label-mono text-on-surface-variant">YEARS_EXP</label>
          <input id="yearsExperience" type="text" name="yearsExperience" value={stats.yearsExperience} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-3 outline-none" />
        </div>
        <div className="space-y-2">
          <label htmlFor="systemDeployed" className="font-label-mono text-label-mono text-on-surface-variant">SYS_DEPLOYED</label>
          <input id="systemDeployed" type="text" name="systemDeployed" value={stats.systemDeployed} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-3 outline-none" />
        </div>
        <div className="space-y-2">
          <label htmlFor="uptimeSLA" className="font-label-mono text-label-mono text-on-surface-variant">UPTIME_SLA</label>
          <input id="uptimeSLA" type="text" name="uptimeSLA" value={stats.uptimeSLA} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-3 outline-none" />
        </div>
        <div className="space-y-2">
          <label htmlFor="commitsLogged" className="font-label-mono text-label-mono text-on-surface-variant">COMMITS_LOGGED</label>
          <input id="commitsLogged" type="text" name="commitsLogged" value={stats.commitsLogged} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-3 outline-none" />
        </div>
        <div className="space-y-2">
          <label htmlFor="status_label" className="font-label-mono text-label-mono text-on-surface-variant">Status Label</label>
          <input id="status_label" type="text" name="status" value={stats.status} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-3 outline-none" />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="objective" className="font-label-mono text-label-mono text-on-surface-variant">Objective</label>
        <input id="objective" type="text" name="objective" value={stats.objective} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-3 outline-none" />
      </div>
      <button type="submit" disabled={isSaving} className="font-label-mono text-label-mono border border-surface-container-highest text-on-surface hover:text-surface-container-lowest hover:bg-primary-container hover:border-primary-container px-6 py-3 mt-4 transition-all duration-200">
        {isSaving ? '[ Executing_Save... ]' : '[ Save_Changes ]'}
      </button>
    </form>
  );
}

StatsForm.propTypes = {
  initialData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired
};

export default function ManageStats() {
  const { data, isLoading } = useGetStatsQuery();
  const [addStats, { isLoading: isAdding }] = useAddStatsMutation();
  const [updateStats, { isLoading: isUpdating }] = useUpdateStatsMutation();

  const handleSave = async (updatedStats) => {
    try {
      if (updatedStats.id) {
        await updateStats(updatedStats).unwrap();
      } else {
        await addStats(updatedStats).unwrap();
      }
    } catch (err) {
      console.error('Failed to save stats', err);
    }
  };

  if (isLoading || !data) return <div className="font-label-mono text-primary-container"><span className="cursor-blink">Loading...</span></div>;

  return (
    <div>
      <h2 className="font-headline-md text-headline-md text-on-surface mb-6 border-b border-surface-container-highest pb-2 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary-container">monitoring</span>
        System Stats Overview
      </h2>
      <StatsForm 
        key={data.id || 'new'} 
        initialData={data} 
        onSave={handleSave} 
        isSaving={isAdding || isUpdating} 
      />
    </div>
  );
}
