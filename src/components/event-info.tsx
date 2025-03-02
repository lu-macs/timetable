import { TableData, TableEvent } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

export const EventInfo = ({
  event,
  tableData,
  i,
}: {
  event: TableEvent;
  tableData: TableData;
  i: number;
}) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <EventButton event={event} tableData={tableData} i={i} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{event.eventName}</DialogTitle>
            <DialogDescription>
              <EventText event={event} tableData={tableData} i={i} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <EventButton event={event} tableData={tableData} i={i} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{event.eventName}</DrawerTitle>
          <DrawerDescription>
            <EventText event={event} tableData={tableData} i={i} />
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

type EventButtonProps = {
  event: TableEvent;
  tableData: TableData;
  i: number;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const EventButton = ({ event, tableData, ...props }: EventButtonProps) => {
  return (
    <button
      className={`absolute inset-1 rounded transition-colors keep-print-color ${
        event.eventType === tableData.types[0]
          ? 'bg-blue-500 hover:bg-blue-600 print:!bg-blue-500'
          : 'bg-green-500 hover:bg-green-600 print:!bg-green-500'
      }`}
      {...props}
    >
      {event.eventName}
    </button>
  );
};

const EventText = ({
  event,
  tableData,
  i,
}: {
  event: TableEvent;
  tableData: TableData;
  i: number;
}) => {
  return (
    <>
      Starts: {`${(tableData.start + i).toString().padStart(2, '0')}:00`}
      <br />
      Ends:{' '}
      {`${(tableData.start + i + event.length - 1)
        .toString()
        .padStart(2, '0')}:00`}
      <br />
      Area: {event.area}
    </>
  );
};
