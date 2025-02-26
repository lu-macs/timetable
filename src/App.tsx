import data from './data.json';

const tableData = data as {
  start: number;
  end: number;
  areas: string[];
  events: {
    id: number;
    eventType: string;
    area: string;
    eventName: string;
    startTime: number;
    length: number;
  }[];
};

const App = () => {
  return (
    <div className="overflow-auto">
      <table
        className="table-fixed [&>*>*>*]:border [&>*>*>*]:border-black"
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
                        <button className="bg-blue-500 absolute inset-1 rounded">
                          {event.eventName}
                        </button>
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

export default App;
