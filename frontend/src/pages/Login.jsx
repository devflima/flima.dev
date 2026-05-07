import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLoginMutation } from '../store/apiSlice';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password }).unwrap();
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.username);
      localStorage.setItem('role', response.role);
      toast.success(`Welcome back, ${response.username}!`);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.data?.message || 'ACCESS_DENIED: Invalid credentials.');
    }
  };

  return (
    <main className="flex-grow pt-[120px] pb-24 px-6 md:px-12 w-full max-w-xl mx-auto flex flex-col items-center justify-center">
      <div className="w-full border border-surface-container-highest bg-surface/80 backdrop-blur-md">
        <div className="flex items-center px-4 py-2 bg-surface-container border-b border-surface-container-highest">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <div className="w-3 h-3 rounded-full bg-[#f1c40f]"></div>
            <div className="w-3 h-3 rounded-full bg-primary-container"></div>
          </div>
          <div className="mx-auto font-label-mono text-label-mono text-on-surface-variant opacity-70">
            root@auth:~
          </div>
        </div>
        
        <div className="p-8">
          <h1 className="font-headline-md text-headline-md text-on-background mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container">lock</span>
            {' ADMIN_AUTH_REQUIRED'}
          </h1>
          
          {error && (
            <div className="mb-6 p-3 border border-error/50 bg-error/10 text-error font-code-snippet text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="font-label-mono text-label-mono text-primary-container flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">person</span>
                {' Username'}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-code-snippet text-code-snippet text-on-surface-variant">&gt;</span>
                <input id="username" required type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-surface-container-low border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet pl-8 py-3 outline-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="font-label-mono text-label-mono text-primary-container flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">key</span>
                {' Password'}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-code-snippet text-code-snippet text-on-surface-variant">&gt;</span>
                <input id="password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-surface-container-low border border-surface-container-highest focus:border-primary-container text-on-background font-code-snippet pl-8 py-3 outline-none" />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full font-label-mono text-label-mono border border-surface-container-highest text-on-surface hover:text-surface-container-lowest hover:bg-primary-container hover:border-primary-container py-3 mt-4 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '[ Authorizing... ]' : '[ Execute_Login ]'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
