"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Bell, Shield, Palette, Database, Mail, Phone, MapPin, Save, Eye, EyeOff } from "lucide-react"

export function SettingsDashboard() {
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    appointments: true,
    reminders: true,
    reports: false,
    marketing: false,
  })

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#16697A]">Settings</h1>
        <Button className="bg-[#489FB5] hover:bg-[#16697A] transition-colors cursor-pointer">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="text-[#16697A] cursor-pointer">Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="text-[#16697A] cursor-pointer">Notifications</TabsTrigger>
          <TabsTrigger value="security" className="text-[#16697A] cursor-pointer">Security</TabsTrigger>
          <TabsTrigger value="appearance" className="text-[#16697A] cursor-pointer">Appearance</TabsTrigger>
          <TabsTrigger value="system" className="text-[#16697A] cursor-pointer">System</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#16697A]">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[#16697A]">First Name</Label>
                  <Input id="firstName" defaultValue="Dr. John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[#16697A]">Last Name</Label>
                  <Input id="lastName" defaultValue="Smith" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#16697A]">Email Address</Label>
                <Input id="email" type="email" defaultValue="dr.smith@medical.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#16697A]">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty" className="text-[#16697A]">Medical Specialty</Label>
                <Select defaultValue="general">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Practice</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-[#16697A]">Professional Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell patients about your background and expertise..."
                  defaultValue="Board-certified physician with over 10 years of experience in general practice. Specializing in preventive care and patient wellness."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#16697A]">
                <MapPin className="h-5 w-5" />
                Practice Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="practiceName">Practice Name</Label>
                <Input id="practiceName" defaultValue="Smith Medical Center" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Medical Drive, Healthcare City, HC 12345" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="practicePhone">Practice Phone</Label>
                  <Input id="practicePhone" type="tel" defaultValue="+1 (555) 987-6543" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="practiceEmail">Practice Email</Label>
                  <Input id="practiceEmail" type="email" defaultValue="info@smithmedical.com" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Appointment Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get notified about new appointments and changes</p>
                </div>
                <Switch
                  checked={notifications.appointments}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, appointments: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Appointment Reminders</Label>
                  <p className="text-sm text-muted-foreground">Receive reminders before scheduled appointments</p>
                </div>
                <Switch
                  checked={notifications.reminders}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, reminders: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Report Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get notified when reports are generated or updated</p>
                </div>
                <Switch
                  checked={notifications.reports}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, reports: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Communications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, marketing: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <Switch id="emailNotifications" defaultChecked />
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <Label htmlFor="smsNotifications">SMS Notifications</Label>
                  <Switch id="smsNotifications" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" placeholder="Enter new password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
              </div>

              <Button>Update Password</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable 2FA</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch />
              </div>
              <Button variant="outline">Setup Authenticator App</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Active Sessions</Label>
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">Chrome on Windows • Last active now</p>
                    </div>
                    <Badge variant="secondary">Current</Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline">Sign Out All Other Sessions</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select defaultValue="system">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date Format</Label>
                <Select defaultValue="mm-dd-yyyy">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Time Format</Label>
                <Select defaultValue="12h">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12h">12 Hour</SelectItem>
                    <SelectItem value="24h">24 Hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                System Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Automatic Backup</Label>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Automatically backup your data daily</p>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Data Retention</Label>
                <Select defaultValue="1year">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="2years">2 Years</SelectItem>
                    <SelectItem value="5years">5 Years</SelectItem>
                    <SelectItem value="forever">Forever</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Export Data</Label>
                <p className="text-sm text-muted-foreground">Download a copy of all your data</p>
                <Button variant="outline">Export All Data</Button>
              </div>

              <div className="space-y-2">
                <Label>System Information</Label>
                <div className="bg-muted p-3 rounded-lg text-sm">
                  <p>Version: 2.1.0</p>
                  <p>Last Updated: January 15, 2024</p>
                  <p>Database: Connected</p>
                  <p>Storage Used: 2.4 GB / 10 GB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-destructive rounded-lg p-4">
                <h4 className="font-semibold text-destructive mb-2">Delete Account</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}