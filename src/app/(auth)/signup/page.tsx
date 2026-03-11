"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(''); 

  if (formData.password !== formData.confirmPassword) {
    return setError('Passwords do not match');
  }

  setIsLoading(true);

  try {
    
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    const endpoint = `${baseUrl}/api/auth/signup`;
    
    console.log("Attempting to connect to:", endpoint); 
    
    await axios.post(endpoint, formData);
    
    router.push('/login');
  } catch (err: any) { 
    console.error("Signup Error Details:", err); 
    
    // More specific error handling
    if (!err.response) {
      setError('Cannot connect to server. Ensure the backend is running.');
    } else {
      setError(err.response?.data?.message || 'Signup failed.');
    }
  } finally {
    setIsLoading(false);
  }
};

  return (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
    <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
      <h1 className="text-2xl font-bold text-center mb-6 dark:text-white">Create Account</h1>
      
      {error && <div className="mb-4 text-red-500 bg-red-100 p-2 rounded text-center text-sm">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div className="relative">
          <User className="absolute left-3 top-3.5 text-slate-400" size={20}/>
          <input required type="text" placeholder="Name" className="w-full pl-10 p-3 border rounded-lg dark:bg-slate-700 dark:text-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        
        {/* Email Field */}
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 text-slate-400" size={20}/>
          <input required type="email" placeholder="Email" className="w-full pl-10 p-3 border rounded-lg dark:bg-slate-700 dark:text-white" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
        </div>
        
        {/* Password Field */}
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 text-slate-400" size={20}/>
          <input required type={showPass ? "text" : "password"} placeholder="Password" className="w-full pl-10 pr-10 p-3 border rounded-lg dark:bg-slate-700 dark:text-white" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3.5 text-slate-400">
            {showPass ? <EyeOff size={20}/> : <Eye size={20}/>}
          </button>
        </div>
        
        {/* Confirm Password Field (Updated) */}
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 text-slate-400" size={20}/>
          <input required type={showConfirmPass ? "text" : "password"} placeholder="Confirm Password" className="w-full pl-10 pr-10 p-3 border rounded-lg dark:bg-slate-700 dark:text-white" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
          <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-3 top-3.5 text-slate-400">
            {showConfirmPass ? <EyeOff size={20}/> : <Eye size={20}/>}
          </button>
        </div>

        <button type="submit" disabled={isLoading} className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 disabled:opacity-50">
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      
      <div className="mt-4 text-center text-sm dark:text-slate-300">
        Already have an account? <Link href="/login" className="text-emerald-600 font-bold">Login</Link>
      </div>
    </div>
  </div>
);
}