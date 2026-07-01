import React from 'react';

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const ModalEditor = () => {
  return (<div >
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogTitle>Editor</DialogTitle>
      </DialogContent>
    </Dialog>
  </div>)
};

export default ModalEditor;