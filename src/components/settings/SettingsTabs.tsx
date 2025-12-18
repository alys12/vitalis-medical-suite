import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Lock, User, Building, Mail, Shield } from 'lucide-react';
export function GeneralSettings() {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Clinic Profile</CardTitle>
          <CardDescription>Manage your clinic's public information and contact details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-20 w-20 border-2 border-slate-100">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CL</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">Change Logo</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clinic-name">Clinic Name</Label>
              <Input id="clinic-name" defaultValue="Vitalis Medical Center" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="license">License Number</Label>
              <Input id="license" defaultValue="MED-2024-8892" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input id="email" type="email" defaultValue="contact@vitalis.med" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+1 (555) 123-4567" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="123 Healthcare Blvd, Suite 400, Metropolis, NY 10012" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-6">
          <Button className="bg-teal-600 hover:bg-teal-700">Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
export function NotificationSettings() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Configure how you receive alerts and updates.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex flex-col space-y-1">
            <Label className="text-base font-medium">Email Notifications</Label>
            <span className="text-sm text-muted-foreground">Receive daily summaries and urgent alerts via email.</span>
          </div>
          <Switch defaultChecked />
        </div>
        <Separator />
        <div className="flex items-center justify-between space-x-2">
          <div className="flex flex-col space-y-1">
            <Label className="text-base font-medium">SMS Alerts</Label>
            <span className="text-sm text-muted-foreground">Get text messages for appointment reminders.</span>
          </div>
          <Switch defaultChecked />
        </div>
        <Separator />
        <div className="flex items-center justify-between space-x-2">
          <div className="flex flex-col space-y-1">
            <Label className="text-base font-medium">Push Notifications</Label>
            <span className="text-sm text-muted-foreground">Real-time browser notifications for new messages.</span>
          </div>
          <Switch />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t pt-6">
        <Button variant="outline">Reset to Defaults</Button>
      </CardFooter>
    </Card>
  );
}
export function SecuritySettings() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>Update your password and manage session security.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-password">Current Password</Label>
          <Input id="current-password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input id="new-password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input id="confirm-password" type="password" />
        </div>
        <div className="pt-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50 dark:bg-muted/20">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-teal-600" />
              <div className="flex flex-col">
                <span className="font-medium text-sm">Two-Factor Authentication</span>
                <span className="text-xs text-muted-foreground">Add an extra layer of security to your account.</span>
              </div>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t pt-6">
        <Button className="bg-teal-600 hover:bg-teal-700">Update Password</Button>
      </CardFooter>
    </Card>
  );
}