import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const PolicyModal = ({ triggerText, title, content }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-gray-200 hover:text-accent transition-colors">{triggerText}</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4 prose prose-sm max-w-none text-muted-foreground">
          {content}
        </div>
        <DialogClose asChild>
          <Button type="button" variant="secondary" className="mt-4">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default PolicyModal;