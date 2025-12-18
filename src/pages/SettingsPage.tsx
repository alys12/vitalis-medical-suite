import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GeneralSettings, NotificationSettings, SecuritySettings } from '@/components/settings/SettingsTabs';
import { ThemeToggle } from '@/components/ThemeToggle';
import { User, Bell, Lock, Building } from 'lucide-react';
export function SettingsPage() {
  return (
    <AppLayout container contentClassName="space-y-8 bg-slate-50/50 dark:bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your clinic profile, preferences, and account security.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle className="static" />
        </div>
      </div>
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        <Tabs defaultValue="general" className="w-full flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation for Tabs */}
          <aside className="lg:w-64 shrink-0">
            <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-1 p-0">
              <TabsTrigger
                value="general"
                className="w-full justify-start px-4 py-3 h-auto font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-teal-700 border border-transparent data-[state=active]:border-border rounded-lg transition-all"
              >
                <Building className="mr-2 h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="w-full justify-start px-4 py-3 h-auto font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-teal-700 border border-transparent data-[state=active]:border-border rounded-lg transition-all"
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="w-full justify-start px-4 py-3 h-auto font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-teal-700 border border-transparent data-[state=active]:border-border rounded-lg transition-all"
              >
                <Lock className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>
          </aside>
          {/* Content Area */}
          <div className="flex-1 min-w-0">
            <TabsContent value="general" className="mt-0 space-y-6">
              <GeneralSettings />
            </TabsContent>
            <TabsContent value="notifications" className="mt-0 space-y-6">
              <NotificationSettings />
            </TabsContent>
            <TabsContent value="security" className="mt-0 space-y-6">
              <SecuritySettings />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
}