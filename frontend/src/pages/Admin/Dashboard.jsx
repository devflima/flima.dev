import { useNavigate } from 'react-router-dom';
import { useGetMessagesQuery, useGetDashboardDataQuery, useGetMessagesCountQuery } from '../../store/apiSlice';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: messages = [], isLoading: isLoadingMessages } = useGetMessagesQuery();
  const { data: totalMessagesCount = 0 } = useGetMessagesCountQuery();
  const { data: dashboardData, isLoading: isLoadingDashboard } = useGetDashboardDataQuery();

  const isLoading = isLoadingMessages || isLoadingDashboard;

  // Filter out leftover replies from flima.dev
  const receivedMessages = messages.filter(m => m.email !== 'flima.dev');

  // Sorting locally (frontend) ensures it works regardless of json-server version
  const recentMessages = [...receivedMessages]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5);
  
  const unreadCount = receivedMessages.filter(m => m.statusMessage === 'UNREAD').length;

  if (isLoading) return <div className="font-label-mono text-primary-container"><span className="cursor-blink">Loading...</span></div>;

  return (
    <div className="space-y-8">
      <h2 className="font-headline-md text-headline-md text-on-surface mb-6 border-b border-surface-container-highest pb-2 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary-container">dashboard</span>
        <span>System Telemetry</span>
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface-container border border-surface-container-highest p-6 relative overflow-hidden group hover:border-primary-container transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <span className="material-symbols-outlined text-6xl text-primary-container">dns</span>
          </div>
          <div className="font-label-mono text-label-mono text-surface-variant mb-2">TOTAL_VISITORS</div>
          <div className="font-headline-xl text-headline-xl text-on-surface">{dashboardData?.totalVisitors || '0'}</div>
        </div>
        
        <div className="bg-surface-container border border-surface-container-highest p-6 relative overflow-hidden group hover:border-secondary-container transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <span className="material-symbols-outlined text-6xl text-secondary-container">speed</span>
          </div>
          <div className="font-label-mono text-label-mono text-surface-variant mb-2">UPTIME</div>
          <div className="font-headline-xl text-headline-xl text-on-surface">{dashboardData?.uptime || '0%'}</div>
        </div>

        <div className="bg-surface-container border border-surface-container-highest p-6 relative overflow-hidden group hover:border-error transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <span className="material-symbols-outlined text-6xl text-error">mark_email_unread</span>
          </div>
          <div className="font-label-mono text-label-mono text-surface-variant mb-2">UNREAD_LOGS</div>
          <div className="font-headline-xl text-headline-xl text-on-surface">{unreadCount}</div>
        </div>

        <div className="bg-surface-container border border-surface-container-highest p-6 relative overflow-hidden group hover:border-primary-container transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <span className="material-symbols-outlined text-6xl text-primary-container">mail</span>
          </div>
          <div className="font-label-mono text-label-mono text-surface-variant mb-2">TOTAL_MESSAGES</div>
          <div className="font-headline-xl text-headline-xl text-on-surface">{totalMessagesCount}</div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-surface-container border border-surface-container-highest">
        <div className="p-4 border-b border-surface-container-highest flex justify-between items-center bg-surface-container-low">
          <h3 className="font-label-mono text-label-mono text-on-surface-variant">RECENT_INBOX_LOGS</h3>
        </div>
        <div className="divide-y divide-surface-container-highest">
          {recentMessages.map(msg => (
            <div 
              key={msg.id} 
              onClick={() => navigate('/admin/messages', { state: { selectedMessageId: msg.id } })}
              className="p-4 flex flex-col md:flex-row md:items-center justify-between hover:bg-surface-container-high transition-colors cursor-pointer group"
            >
              <div className="mb-2 md:mb-0">
                <div className="font-code-snippet text-sm text-on-surface flex items-center gap-2 group-hover:text-primary-container transition-colors">
                  {msg.statusMessage === 'UNREAD' && <div className="w-2 h-2 rounded-full bg-error"></div>}
                  {msg.statusMessage === 'REPLIED' && <span className="material-symbols-outlined text-[14px] text-primary-container">done_all</span>}
                  {msg.username} &lt;{msg.email}&gt;
                </div>
                <div className="font-body-base text-on-surface-variant truncate max-w-lg mt-1">
                  {msg.message}
                </div>
              </div>
              <div className="font-code-snippet text-xs text-surface-variant flex items-center gap-4">
                {new Date(msg.timestamp).toLocaleString()}
                <span className="material-symbols-outlined text-surface-variant group-hover:text-primary-container transition-colors opacity-0 group-hover:opacity-100">arrow_forward</span>
              </div>
            </div>
          ))}
          {recentMessages.length === 0 && (
            <div className="p-8 text-center font-code-snippet text-surface-variant">No recent logs.</div>
          )}
        </div>
      </div>
    </div>
  );
}
