import data from '../data.json';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

const tableData = data as {
  start: number;
  end: number;
  areas: string[];
  types: string[];
  events: {
    id: number;
    eventType: string;
    area: string;
    eventName: string;
    startTime: number;
    length: number;
  }[];
};

export const Table = () => {
  return (
    <div className="overflow-auto">
      <table
        className="table-fixed [&>*>*>*]:border [&>*>*>*]:border-border"
        style={{ width: `calc(3rem + 12rem*${tableData.events.length})` }}
      >
        <thead className="w-full">
          <tr className="h-12">
            <th className="w-12">Time</th>
            {tableData.areas.map((area) => (
              <th key={area} className="w-48">
                {area}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: tableData.end - tableData.start }).map(
            (_, i) => (
              <tr key={i} className="h-12">
                <td>
                  {`${(tableData.start + i).toString().padStart(2, '0')}:00`}
                </td>
                {
                  // create number of columns equal to number of areas
                  Array.from({ length: tableData.areas.length }).map((_, j) => {
                    const event = tableData.events.find(
                      (event) =>
                        event.startTime === tableData.start + i &&
                        event.area === tableData.areas[j]
                    );

                    if (!event) {
                      return <td key={j}></td>;
                    }

                    return (
                      <td key={j} rowSpan={event.length} className="relative">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button
                              className={`absolute inset-1 rounded transition-colors ${
                                event.eventType === tableData.types[0]
                                  ? 'bg-blue-500 hover:bg-blue-600'
                                  : 'bg-green-500 hover:bg-green-600 '
                              }`}
                            >
                              {event.eventName}
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{event.eventName}</DialogTitle>
                              <DialogDescription>
                                Starts:{' '}
                                {`${(tableData.start + i)
                                  .toString()
                                  .padStart(2, '0')}:00`}
                                <br />
                                Ends:{' '}
                                {`${(tableData.start + i + event.length - 1)
                                  .toString()
                                  .padStart(2, '0')}:00`}
                                <br />
                                Area: {event.area}
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </td>
                    );
                  })
                }
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
