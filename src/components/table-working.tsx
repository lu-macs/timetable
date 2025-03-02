'use client';

import * as React from 'react';

export default function ScheduleTable() {
  const scheduleData = [
    {
      time: '09:00',
      area1: null,
      area2: null,
      area3: null,
      area4: null,
    },
    {
      time: '10:00',
      area1: null,
      area2: { text: 'have fun', color: 'blue', rowSpan: 2 },
      area3: null,
      area4: null,
    },
    {
      time: '11:00',
      area1: null,
      area2: null,
      area3: { text: 'have fun', color: 'green' },
      area4: null,
    },
    {
      time: '12:00',
      area1: { text: 'have fun', color: 'green', rowSpan: 2 },
      area2: null,
      area3: null,
      area4: null,
    },
    {
      time: '16:00',
      area1: null,
      area2: null,
      area3: null,
      area4: null,
    },
  ];

  const processedData = React.useMemo(() => {
    const result = [...scheduleData];
    result.forEach((row, rowIndex) => {
      Object.keys(row).forEach((key) => {
        if (key !== 'time' && row[key]?.rowSpan) {
          for (let i = 1; i < row[key].rowSpan; i++) {
            if (rowIndex + i < result.length) {
              result[rowIndex + i][key] = {
                ...result[rowIndex + i][key],
                skip: true,
              };
            }
          }
        }
      });
    });
    return result;
  }, []);

  return (
    <div className="w-full overflow-x-auto bg-gray-100 p-4">
      <table className="w-full border-collapse bg-[#0a0a20] text-white">
        <thead>
          <tr className="h-12 border-b border-gray-700">
            <th className="w-12 min-w-[3rem] border-r border-gray-700 px-2 text-left">
              Time
            </th>
            <th className="w-[calc(25%-3rem/4)] min-w-[12rem] border-r border-gray-700 px-4 text-center">
              area1
            </th>
            <th className="w-[calc(25%-3rem/4)] min-w-[12rem] border-r border-gray-700 px-4 text-center">
              area2
            </th>
            <th className="w-[calc(25%-3rem/4)] min-w-[12rem] border-r border-gray-700 px-4 text-center">
              area3
            </th>
            <th className="w-[calc(25%-3rem/4)] min-w-[12rem] border-r border-gray-700 px-4 text-center">
              area4
            </th>
          </tr>
        </thead>
        <tbody>
          {processedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="min-h-12 border-b border-gray-700">
              <td className="w-12 min-w-[3rem] border-r border-gray-700 px-2 py-2">
                {row.time}
              </td>

              {!row.area1?.skip && (
                <td
                  className="w-[calc(25%-3rem/4)] min-w-[12rem] border-r border-gray-700 px-4 py-2"
                  rowSpan={row.area1?.rowSpan || 1}
                >
                  {row.area1 && (
                    <div
                      className={`flex h-full w-full items-center justify-center rounded p-2 ${
                        row.area1.color === 'blue'
                          ? 'bg-blue-500'
                          : row.area1.color === 'green'
                          ? 'bg-green-500'
                          : ''
                      }`}
                    >
                      {row.area1.text}
                    </div>
                  )}
                </td>
              )}

              {!row.area2?.skip && (
                <td
                  className="w-[calc(25%-3rem/4)] min-w-[12rem] border-r border-gray-700 px-4 py-2"
                  rowSpan={row.area2?.rowSpan || 1}
                >
                  {row.area2 && (
                    <div
                      className={`flex h-full w-full items-center justify-center rounded p-2 ${
                        row.area2.color === 'blue'
                          ? 'bg-blue-500'
                          : row.area2.color === 'green'
                          ? 'bg-green-500'
                          : ''
                      }`}
                    >
                      {row.area2.text}
                    </div>
                  )}
                </td>
              )}

              {!row.area3?.skip && (
                <td
                  className="w-[calc(25%-3rem/4)] min-w-[12rem] border-r border-gray-700 px-4 py-2"
                  rowSpan={row.area3?.rowSpan || 1}
                >
                  {row.area3 && (
                    <div
                      className={`flex h-full w-full items-center justify-center rounded p-2 ${
                        row.area3.color === 'blue'
                          ? 'bg-blue-500'
                          : row.area3.color === 'green'
                          ? 'bg-green-500'
                          : ''
                      }`}
                    >
                      {row.area3.text}
                    </div>
                  )}
                </td>
              )}

              {!row.area4?.skip && (
                <td
                  className="w-[calc(25%-3rem/4)] min-w-[12rem] border-r border-gray-700 px-4 py-2"
                  rowSpan={row.area4?.rowSpan || 1}
                >
                  {row.area4 && (
                    <div
                      className={`flex h-full w-full items-center justify-center rounded p-2 ${
                        row.area4.color === 'blue'
                          ? 'bg-blue-500'
                          : row.area4.color === 'green'
                          ? 'bg-green-500'
                          : ''
                      }`}
                    >
                      {row.area4.text}
                    </div>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
