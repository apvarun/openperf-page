import React from "react";

export default function Header(props) {
  return (
    <header className="text-gray-700 body-font mb-16">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <a className="flex lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
          <span className="text-3xl font-extrabold">{props.site}</span>
        </a>
      </div>
    </header>
  );
}
