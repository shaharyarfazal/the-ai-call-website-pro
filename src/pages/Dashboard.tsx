
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, Link, Navigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // [SECURITY] Hard redirect unauthenticated users — never show page content
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-24 sm:py-32">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <Card>
            <CardHeader>
              <CardTitle>Welcome, {profile?.full_name || user.email}!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>This is your personal dashboard. You can manage your account and settings here.</p>
              <div className="space-y-2 pt-4 border-t">
                <h3 className="font-semibold">Your Information</h3>
                <p><strong>Email:</strong> {user.email}</p>
                {profile?.full_name && <p><strong>Full Name:</strong> {profile.full_name}</p>}
              </div>

              <div className="space-y-2 pt-4 border-t">
                <h3 className="font-semibold">Quick Actions</h3>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Button asChild variant="outline">
                    <Link to="/admin/blog">Manage Blog Posts</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/admin">Admin Dashboard</Link>
                  </Button>
                </div>
              </div>

              <Button onClick={handleLogout} variant="destructive" className="mt-6">
                Log Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
