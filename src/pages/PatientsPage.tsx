import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { MOCK_PATIENTS, Patient } from '@/lib/mock-medical-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MoreHorizontal, FileText, Calendar } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from '@/components/ThemeToggle';
import { PatientDetailSheet } from '@/components/patients/PatientDetailSheet';
export function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const filteredPatients = MOCK_PATIENTS.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200';
      case 'Critical': return 'bg-red-100 text-red-700 hover:bg-red-200 border-red-200';
      case 'Observation': return 'bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200';
      case 'Recovered': return 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsSheetOpen(true);
  };
  return (
    <AppLayout container contentClassName="space-y-8 bg-slate-50/50 dark:bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Patient Directory</h1>
          <p className="text-muted-foreground mt-1">
            Manage patient records, history, and upcoming appointments.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <ThemeToggle className="static" />
          <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm">
            Add Patient
          </Button>
        </div>
      </div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-card p-4 rounded-xl shadow-sm border">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or ID..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>
      {/* Table */}
      <div className="rounded-xl border bg-white dark:bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-muted/50">
            <TableRow>
              <TableHead className="w-[250px]">Patient</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <TableRow 
                  key={patient.id} 
                  className="hover:bg-slate-50/50 dark:hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => handleViewDetails(patient)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-slate-200">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.id}`} />
                        <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm text-foreground">{patient.name}</span>
                        <span className="text-xs text-muted-foreground">{patient.age} yrs • {patient.gender}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {patient.id}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(patient.status)}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {patient.condition}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {patient.lastVisit}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewDetails(patient)}>
                          <FileText className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" /> Book Appointment
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Archive Record
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No patients found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PatientDetailSheet 
        patient={selectedPatient} 
        open={isSheetOpen} 
        onOpenChange={setIsSheetOpen} 
      />
    </AppLayout>
  );
}