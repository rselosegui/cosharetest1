
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth latency
    setTimeout(() => {
        setIsLoading(false);
        navigate('/dashboard');
    }, 800);
  };

  const fillDemo = () => {
    setEmail('demo@familyoffice.com');
    setPassword('platinum_access_2024');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left: Image */}
      <div className="hidden md:block relative bg-swiss-900">
        <img 
          src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop" 
          alt="Luxury Lifestyle" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-swiss-900 via-transparent to-transparent"></div>
        <div className="absolute bottom-12 left-12 text-white p-6 max-w-md">
          <h2 className="text-3xl font-serif mb-4">"The ultimate sophistication is simplicity."</h2>
          <p className="text-white/60 font-light">— Leonardo da Vinci</p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex flex-col justify-center items-center p-8 bg-white min-h-[100dvh]">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-marketing-black block mb-2">
               c<span className="inline-block transform scale-x-[1.6] mx-1">o</span>share
            </Link>
            <h2 className="text-sm uppercase tracking-widest text-slate-500">Partner Portal</h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  autoComplete="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-zinc-300 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-swiss-900 focus:border-swiss-900 text-base sm:text-sm" 
                  placeholder="investor@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  autoComplete="current-password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-zinc-300 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-swiss-900 focus:border-swiss-900 text-base sm:text-sm" 
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-swiss-900 focus:ring-swiss-900 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-swiss-900 hover:text-swiss-800">Forgot password?</a>
              </div>
            </div>

            <div className="space-y-4">
              <Button type="submit" className="w-full py-3" size="lg" disabled={isLoading}>
                {isLoading ? 'Authenticating...' : 'Access Dashboard'}
              </Button>
              
              <div className="pt-4 border-t border-zinc-100 text-center">
                 <button 
                   type="button"
                   onClick={fillDemo}
                   className="text-xs uppercase tracking-widest text-emerald-600 hover:text-emerald-800 transition-colors font-bold"
                 >
                   Try Demo Account
                 </button>
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 mt-4">
               By accessing this portal, you agree to the NDA and confidentiality terms.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
