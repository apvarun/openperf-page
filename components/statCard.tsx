import React, { useState } from "react";

interface IStats {
  list: Array<[string, number]>;
  heading: string;
  listHeadings: [string, string];
  disableCapitalize?: boolean;
}

export default function StatCard(props: IStats) {
  const [all, toggleAll] = useState(false);
  const list = props.list
    .slice(0, 10)
    .sort(([, value1], [, value2]) => (value1 > value2 ? -1 : 1));

  return (
    <div className="bg-gray-100 rounded p-4 shadow-xl flex flex-col">
      <h2 className="text-xl font-semibold">{props.heading}</h2>
      <ul>
        <li className="px-1 py-2 flex justify-between text-gray-500 text-xs">
          <span>{props.listHeadings[0]}</span>
          <span>{props.listHeadings[1]}</span>
        </li>
        {list.map(([key, users]) => (
          <li className="px-1 py-2 flex justify-between" key={key}>
            <span className={props.disableCapitalize ? "" : "capitalize"}>
              {key}
            </span>
            <span>{users}</span>
          </li>
        ))}
      </ul>
      {props.list.length > 10 && (
        <button
          className="mt-auto block my-2 mx-auto rounded w-full opacity-25 hover:opacity-100 py-1 px-4 hover:bg-gray-200 transition-all duration-200"
          onClick={() => toggleAll(true)}
        >
          View All
        </button>
      )}

      <div
        className={`transition-opacity duration-200 opacity-${
          all ? 100 : 0
        } z-10 ${
          all ? "" : "pointer-events-none"
        } fixed w-full h-full top-0 left-0 flex items-center justify-center`}
      >
        <div
          className={`${
            all ? "modal-overlay opacity-50" : "opacity-0"
          } absolute w-full h-full bg-gray-900`}
        ></div>

        {all && (
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto p-4">
            <div className="text-lg font-semibold mb-2 uppercase">
              All {props.listHeadings[0]}s
            </div>
            <ul
              style={{ maxHeight: "75vh" }}
              className="overflow-scroll pr-4 pl-2 py-2 border-gray-200 border-2 rounded"
            >
              <li className="px-1 py-2 flex justify-between text-gray-500 text-xs">
                <span>{props.listHeadings[0]}</span>
                <span>{props.listHeadings[1]}</span>
              </li>
              {props.list.map(([key, users]) => (
                <li className="px-1 py-2 flex justify-between" key={key}>
                  <span className={props.disableCapitalize ? "" : "capitalize"}>
                    {key}
                  </span>
                  <span>{users}</span>
                </li>
              ))}
            </ul>
            <button
              className={`ml-auto mt-2 block px-6 py-1 rounded bg-gray-700 hover:bg-gray-800 text-white transition-colors duration-200`}
              onClick={() => toggleAll(false)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
