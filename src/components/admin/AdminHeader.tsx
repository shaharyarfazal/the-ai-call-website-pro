
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AdminHeader() {
  const { user, profile } = useAuth();

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          Welcome back, {profile?.full_name || user?.email}
        </span>
        <Avatar className="h-8 w-8">
          <AvatarImage src={profile?.avatar_url || ''} />
          <AvatarFallback>
            {profile?.full_name?.[0] || user?.email?.[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
