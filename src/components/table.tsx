import { TableData } from '@/lib/types';
import data from '../data.json';
import { EventInfo } from './event-info';

const tableData: TableData = data;

export const Table = () => {
  return (
    <div className="overflow-auto width-full h-[calc(100svh-72px)] md:h-[calc(100svh-56px-72px)]">
      <table className="[&_th]:border-t-[1.5px] [&_th]:border-b [&_th]:border-r [&_td]:border-b [&_td]:border-r [&_th:first-child]:border-l [&_td:first-child]:border-l [&>*>*>*]:border-border print:[&>*>*>*]:border-black print:[&>*>*>*]:text-black print:table-fixed size-full border-separate border-spacing-0">
        <thead>
          <tr className="h-12">
            <th className="w-12 min-w-12 sticky -left-[0.5px] -top-[0.5px] bg-background z-30">
              Time
            </th>
            {tableData.areas.map((area) => (
              <th
                key={area}
                className="min-w-48 sticky -top-[0.5px] bg-background z-10"
              >
                {area}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: tableData.end - tableData.start }).map(
            (_, i) => (
              <tr key={i} className="h-12">
                <td className="sticky -left-[0.5px] bg-background z-20">
                  {`${(tableData.start + i).toString().padStart(2, '0')}:00`}
                </td>
                {
                  // create number of columns equal to number of areas
                  Array.from({ length: tableData.areas.length })
                    .map((_, j) => {
                      const event = tableData.events.find(
                        (event) =>
                          event.startTime === tableData.start + i &&
                          event.area === tableData.areas[j]
                      );

                      if (!event) {
                        // get the nearest above event
                        let nearestAboveEvent:
                          | (typeof tableData.events)[number]
                          | undefined;
                        tableData.events.forEach((event) => {
                          if (
                            event.startTime <= tableData.start + i &&
                            event.area === tableData.areas[j]
                          ) {
                            nearestAboveEvent = event;
                          }
                        });

                        if (
                          nearestAboveEvent &&
                          nearestAboveEvent.startTime +
                            nearestAboveEvent.length >
                            tableData.start + i
                        ) {
                          return;
                        }
                        return <td key={j}></td>;
                      }

                      return (
                        <td
                          key={j}
                          rowSpan={event.length}
                          className="relative"
                        >
                          <EventInfo event={event} tableData={tableData} i={i} />
                        </td>
                      );
                    })
                    .filter(Boolean)
                }
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
