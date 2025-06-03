
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Lead, statuses, priorities, users } from '@/types/Lead';

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (leadData: any) => void;
  lead?: Lead | null;
  mode: 'add' | 'edit';
}

const LeadForm = ({ isOpen, onClose, onSubmit, lead, mode }: LeadFormProps) => {
  const [formData, setFormData] = useState({
    companyName: lead?.companyName || '',
    contactPerson: lead?.contactPerson || '',
    email: lead?.email || '',
    phone: lead?.phone || '',
    status: lead?.status || 'new',
    priority: lead?.priority || 'medium',
    assignee: lead?.assignee || '',
    nextFollowUp: lead?.nextFollowUp || '',
    notes: lead?.notes || ''
  });

  const handleSubmit = () => {
    if (mode === 'edit' && lead) {
      onSubmit({ ...lead, ...formData });
    } else {
      onSubmit(formData);
    }
    
    if (mode === 'add') {
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        status: 'new',
        priority: 'medium',
        assignee: '',
        nextFollowUp: '',
        notes: ''
      });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add New Lead' : `Edit Lead - ${lead?.companyName}`}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPerson">Contact Person</Label>
            <Input
              id="contactPerson"
              value={formData.contactPerson}
              onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorities.map(priority => (
                  <SelectItem key={priority} value={priority}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {mode === 'edit' && (
            <div className="space-y-2">
              <Label htmlFor="nextFollowUp">Next Follow-up</Label>
              <Input
                id="nextFollowUp"
                type="date"
                value={formData.nextFollowUp}
                onChange={(e) => setFormData({...formData, nextFollowUp: e.target.value})}
              />
            </div>
          )}
          <div className={`space-y-2 ${mode === 'add' ? 'col-span-2' : ''}`}>
            <Label htmlFor="assignee">Assign to</Label>
            <Select value={formData.assignee} onValueChange={(value) => setFormData({...formData, assignee: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user} value={user}>{user}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows={3}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            {mode === 'add' ? 'Add Lead' : 'Update Lead'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadForm;
