import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Patient } from '@/lib/mock-medical-data';
import { 
  Activity, 
  Heart, 
  Thermometer, 
  Weight, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  FileText,
  Clock,
  Shield
} from 'lucide-react';
interface PatientDetailSheetProps {
  patient: Patient | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function PatientDetailSheet({ patient, open, onOpenChange }: PatientDetailSheetProps) {
  if (!patient) return null;
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700 border-green-200';
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'Observation': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Recovered': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl overflow-y-auto p-0">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 bg-slate-50 dark:bg-muted/30 border-b">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20 border-4 border-white shadow-sm">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.id}`} />
                <AvatarFallback className="text-xl">{getInitials(patient.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">{patient.name}</h2>
                  <Badge variant="outline" className={getStatusColor(patient.status)}>
                    {patient.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground font-mono">{patient.id}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {patient.age} yrs ({patient.dob})
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-3.5 w-3.5" />
                    {patient.insurance.provider}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6">
              <Button className="w-full bg-teal-600 hover:bg-teal-700">
                Book Appointment
              </Button>
              <Button variant="outline" className="w-full">
                Send Message
              </Button>
            </div>
          </div>
          {/* Content */}
          <div className="flex-1">
            <Tabs defaultValue="overview" className="w-full">
              <div className="px-6 pt-4 border-b">
                <TabsList className="w-full justify-start h-10 bg-transparent p-0 space-x-6">
                  <TabsTrigger 
                    value="overview" 
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-teal-600 rounded-none px-0 pb-2"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="history" 
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-teal-600 rounded-none px-0 pb-2"
                  >
                    History
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notes" 
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-teal-600 rounded-none px-0 pb-2"
                  >
                    Clinical Notes
                  </TabsTrigger>
                </TabsList>
              </div>
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="p-6 space-y-6">
                  <TabsContent value="overview" className="mt-0 space-y-6">
                    {/* Contact Info */}
                    <Card className="shadow-sm border-none bg-slate-50/50 dark:bg-muted/20">
                      <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <Phone className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Phone</p>
                            <p className="text-sm font-medium">{patient.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                            <Mail className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Email</p>
                            <p className="text-sm font-medium truncate">{patient.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 sm:col-span-2">
                          <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                            <MapPin className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Address</p>
                            <p className="text-sm font-medium">{patient.address}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    {/* Vitals Grid */}
                    <div>
                      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <Activity className="h-4 w-4 text-teal-600" />
                        Latest Vitals
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <Card className="shadow-sm">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Heart className="h-4 w-4 text-rose-500" />
                              <span className="text-xs text-muted-foreground">Heart Rate</span>
                            </div>
                            <p className="text-2xl font-bold">{patient.vitals.heartRate} <span className="text-xs font-normal text-muted-foreground">bpm</span></p>
                          </CardContent>
                        </Card>
                        <Card className="shadow-sm">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Activity className="h-4 w-4 text-blue-500" />
                              <span className="text-xs text-muted-foreground">Blood Pressure</span>
                            </div>
                            <p className="text-2xl font-bold">{patient.vitals.bloodPressure} <span className="text-xs font-normal text-muted-foreground">mmHg</span></p>
                          </CardContent>
                        </Card>
                        <Card className="shadow-sm">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Thermometer className="h-4 w-4 text-amber-500" />
                              <span className="text-xs text-muted-foreground">Temp</span>
                            </div>
                            <p className="text-2xl font-bold">{patient.vitals.temperature.toFixed(1)} <span className="text-xs font-normal text-muted-foreground">°C</span></p>
                          </CardContent>
                        </Card>
                        <Card className="shadow-sm">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Weight className="h-4 w-4 text-emerald-500" />
                              <span className="text-xs text-muted-foreground">Weight</span>
                            </div>
                            <p className="text-2xl font-bold">{patient.vitals.weight} <span className="text-xs font-normal text-muted-foreground">kg</span></p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="history" className="mt-0">
                    <div className="space-y-6">
                      {patient.history.length > 0 ? (
                        patient.history.map((event, index) => (
                          <div key={index} className="flex gap-4 relative pb-6 last:pb-0">
                            {index !== patient.history.length - 1 && (
                              <div className="absolute left-[19px] top-8 bottom-0 w-0.5 bg-border" />
                            )}
                            <div className="h-10 w-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center shrink-0 z-10">
                              <Clock className="h-5 w-5 text-slate-500" />
                            </div>
                            <div className="flex-1 pt-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold text-sm">{event.type}</h4>
                                <span className="text-xs text-muted-foreground">{event.date}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{event.notes}</p>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-[10px] h-5">
                                  {event.doctor}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          No medical history recorded.
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="notes" className="mt-0">
                    <div className="space-y-4">
                      {patient.notes.length > 0 ? (
                        patient.notes.map((note) => (
                          <Card key={note.id} className="shadow-sm">
                            <CardHeader className="p-4 pb-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-[10px]">DR</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm font-medium">{note.author}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">{note.date}</span>
                              </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-2">
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {note.content}
                              </p>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          No clinical notes available.
                        </div>
                      )}
                      <Button variant="outline" className="w-full border-dashed">
                        <FileText className="mr-2 h-4 w-4" /> Add Clinical Note
                      </Button>
                    </div>
                  </TabsContent>
                </div>
              </ScrollArea>
            </Tabs>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}