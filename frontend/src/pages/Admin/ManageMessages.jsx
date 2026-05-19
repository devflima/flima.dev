import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGetMessagesQuery, useUpdateMessageStatusMutation, useDeleteMessageMutation } from '../../store/apiSlice';

export default function ManageMessages() {
  const location = useLocation();
  const { data: messages = [], isLoading } = useGetMessagesQuery();
  const [updateMessageStatus] = useUpdateMessageStatusMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 10;

  // Filter out any leftover replies from the old system (from flima.dev)
  const receivedMessages = messages.filter(m => m.email !== 'flima.dev');

  // Sorting locally (frontend) ensures it works regardless of json-server version
  const sortedMessages = [...receivedMessages].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  useEffect(() => {
    if (location.state?.selectedMessageId && sortedMessages.length > 0) {
      const msg = sortedMessages.find(m => m.id === location.state.selectedMessageId);
      if (msg && (!replyingTo || replyingTo.id !== msg.id)) {
        const timer = setTimeout(() => {
          setReplyingTo(msg);
          setReplyText('');
          
          // mark as read if unread
          if (msg.statusMessage === 'UNREAD') {
            updateMessageStatus({ id: msg.id, type: 'read' }).catch(err => console.error('Failed to mark read', err));
          }
          
          // Calculate page
          const index = sortedMessages.findIndex(m => m.id === msg.id);
          if (index !== -1) {
            const page = Math.floor(index / messagesPerPage) + 1;
            setCurrentPage(page);
          }
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [location.state, sortedMessages, replyingTo, updateMessageStatus]);

  const handleReplyClick = async (msg) => {
    setReplyingTo(msg);
    setReplyText('');
    
    // mark as read if unread
    if (msg.statusMessage === 'UNREAD') {
      try {
        await updateMessageStatus({ id: msg.id, type: 'read' }).unwrap();
      } catch (err) {
        console.error('Failed to mark read', err);
      }
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    try {
      await updateMessageStatus({ 
        id: replyingTo.id, 
        type: 'reply',
        body: {
          email: replyingTo.email,
          subject: `Re: ${replyingTo.subject || 'Portfolio Contact'}`,
          message: replyText
        }
      }).unwrap();
      setReplyingTo(prev => ({...prev, statusMessage: 'REPLIED', replyText: replyText, replyTimestamp: new Date().toISOString()}));
      toast.success('Reply sent successfully!');
    } catch (err) {
      console.error('Failed to send reply', err);
      toast.error('Failed to send reply');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await deleteMessage(id).unwrap();
      if(replyingTo?.id === id) setReplyingTo(null);
      toast.success('Message deleted successfully!');
    } catch (err) {
      console.error('Failed to delete message', err);
      toast.error('Failed to delete message');
    }
  };

  if (isLoading) return <div className="font-label-mono text-primary-container"><span className="cursor-blink">Loading...</span></div>;

  // Pagination logic
  const totalPages = Math.ceil(sortedMessages.length / messagesPerPage) || 1;
  const currentMessages = sortedMessages.slice(
    (currentPage - 1) * messagesPerPage,
    currentPage * messagesPerPage
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-6 h-[800px] md:h-[600px]">
        <div className="w-full md:w-1/3 flex flex-col bg-surface-container border border-surface-container-highest overflow-hidden">
          <div className="p-4 border-b border-surface-container-highest font-label-mono text-primary-container flex justify-between">
            <span>INBOX_LOGS {sortedMessages.length > 0 && `(PG ${currentPage}/${totalPages})`}</span>
          </div>
          <div className="overflow-y-auto flex-grow divide-y divide-surface-container-highest">
            {currentMessages.map(msg => (
              <div 
                key={msg.id} 
                role="button"
                tabIndex="0"
                onClick={() => handleReplyClick(msg)}
                onKeyDown={(e) => e.key === 'Enter' && handleReplyClick(msg)}
                className={`p-4 cursor-pointer hover:bg-surface-container-high transition-colors ${replyingTo?.id === msg.id ? 'bg-surface-container-high border-l-2 border-primary-container' : 'border-l-2 border-transparent'}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-label-mono text-on-surface flex items-center gap-2">
                    {msg.statusMessage === 'UNREAD' && <div className="w-2 h-2 rounded-full bg-error"></div>}
                    {msg.statusMessage === 'REPLIED' && <span className="material-symbols-outlined text-[14px] text-primary-container">done_all</span>}
                    <span className="truncate max-w-[120px]">{msg.username}</span>
                  </span>
                  <span className="text-[10px] font-code-snippet text-surface-variant whitespace-nowrap">
                    {new Date(msg.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-xs font-code-snippet text-on-surface-variant truncate">
                  {msg.message}
                </div>
              </div>
            ))}
            {sortedMessages.length === 0 && <div className="p-4 text-sm font-code-snippet text-surface-variant">No logs found.</div>}
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center p-3 border-t border-surface-container-highest bg-surface-container-lowest">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="font-code-snippet text-xs text-on-surface hover:text-primary-container disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                &lt; PREV
              </button>
              <span className="font-code-snippet text-[10px] text-surface-variant">
                PAGE {currentPage}
              </span>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="font-code-snippet text-xs text-on-surface hover:text-primary-container disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                NEXT &gt;
              </button>
            </div>
          )}
        </div>

        <div className="w-full md:flex-grow flex flex-col bg-surface-container border border-surface-container-highest overflow-y-auto">
          {replyingTo ? (
            <>
              <div className="p-6 border-b border-surface-container-highest">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-headline-md text-on-surface">{replyingTo.username}</h3>
                    <div className="font-code-snippet text-sm text-secondary-container break-all">&lt;{replyingTo.email}&gt;</div>
                    {replyingTo.lgpdConsent && (
                      <div className="font-code-snippet text-[10px] text-primary-container mt-1 border border-primary-container/30 bg-primary-container/10 px-2 py-0.5 inline-block">
                        [ LGPD_CONSENT_OK ]
                      </div>
                    )}
                  </div>
                  <button onClick={() => handleDelete(replyingTo.id)} className="text-error hover:bg-error/10 p-2 rounded transition-colors material-symbols-outlined flex-shrink-0">
                    delete
                  </button>
                </div>
                <div className="font-body-base text-on-surface-variant p-4 bg-surface-container-lowest border border-surface-container-highest rounded whitespace-pre-wrap">
                  {replyingTo.message}
                </div>
              </div>

              {replyingTo.replyText ? (
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-label-mono text-secondary-container">REPLY_HISTORY</h4>
                    {replyingTo.replyTimestamp && (
                      <span className="font-code-snippet text-xs text-surface-variant">
                        {new Date(replyingTo.replyTimestamp).toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="font-body-base text-on-surface-variant p-4 bg-surface-container-lowest border border-surface-container-highest border-l-4 border-l-secondary-container rounded whitespace-pre-wrap flex-grow">
                    {replyingTo.replyText}
                  </div>
                </div>
              ) : (
                <div className="p-6 flex-grow flex flex-col">
                  <h4 className="font-label-mono text-primary-container mb-2">COMPOSE_REPLY</h4>
                  <form onSubmit={handleSendReply} className="flex flex-col flex-grow">
                    <label htmlFor="replyText" className="sr-only">Reply Text</label>
                    <textarea 
                      id="replyText"
                      required
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="flex-grow bg-surface-container-lowest border border-surface-container-highest focus:border-primary-container p-4 font-code-snippet text-on-background outline-none resize-none mb-4" 
                      placeholder="&gt; Type response..."
                    ></textarea>
                    <button type="submit" className="font-label-mono text-label-mono border border-primary-container text-primary-container hover:bg-primary-container/10 px-6 py-3 transition-colors self-end flex items-center gap-2">
                      [ Transmit_Reply ] <span className="material-symbols-outlined text-[18px]">send</span>
                    </button>
                  </form>
                </div>
              )}
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center font-code-snippet text-surface-variant p-4 text-center">
              &gt; Select a log to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
