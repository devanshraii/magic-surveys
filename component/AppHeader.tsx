'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AppHeader() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/sign-out');
      toast.success('Signed out successfully');
      router.push('/sign-in');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
            onClick={() => router.push('/dashboard')}
          >
            Magic Surveys
          </h1>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}