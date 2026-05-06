import { useState, useEffect } from 'react';
import { useGetStatsQuery, useAddStatsMutation, useUpdateStatsMutation } from '../../store/apiSlice';

export default function ManageStats() {
  const { data, isLoading } = useGetStatsQuery();
  const [addStats, { isLoading: isAdding }] = useAddStatsMutation();
  const [updateStats, { isLoading: isUpdating }] = useUpdateStatsMutation();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line
    if (data) setStats(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStats(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (stats.id) {
        await updateStats(stats).unwrap();
      } else {
        await addStats(stats).unwrap();
      }
    } catch (err) {
      console.error('Failed to save stats', err);
    }
  };

  if (isLoading || !stats) return <div className="font-label-mono text-primary-container"><span className="cursor-blink">Loading...</span></div>;

  return (
    <div>
      <h2 className="font-headline-md text-headline-md text-on-surface mb-6 border-b border-surface-container-highest pb-2 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary-container">monitoring</span>
        System Stats Overview
      </h2>
      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-label-mono text-label-mono text-on-surface-variant">YEARS_EXP</label>
            <input type="text" name="yearsExperience" value={stats.yearsExperience} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-3 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="font-label-mono text-label-mono text-on-surface-variant">SYS_DEPLOYED</label>
            <input type="text" name="systemDeployed" value={stats.systemDeployed} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-3 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="font-label-mono text-label-mono text-on-surface-variant">UPTIME_SLA</label>
            <input type="text" name="uptimeSLA" value={stats.uptimeSLA} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-3 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="font-label-mono text-label-mono text-on-surface-variant">COMMITS_LOGGED</label>
            <input type="text" name="commitsLogged" value={stats.commitsLogged} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-3 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="font-label-mono text-label-mono text-on-surface-variant">Status Label</label>
            <input type="text" name="status" value={stats.status} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-3 outline-none" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="font-label-mono text-label-mono text-on-surface-variant">Objective</label>
          <input type="text" name="objective" value={stats.objective} onChange={handleChange} className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet p-3 outline-none" />
        </div>
        <button type="submit" disabled={isUpdating || isAdding} className="font-label-mono text-label-mono border border-surface-container-highest text-on-surface hover:text-surface-container-lowest hover:bg-primary-container hover:border-primary-container px-6 py-3 mt-4 transition-all duration-200">
          {isUpdating || isAdding ? '[ Executing_Save... ]' : '[ Save_Changes ]'}
        </button>
      </form>
    </div>
  );
}
