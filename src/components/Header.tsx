import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="flex justify-between items-center bg-gray-800 shadow px-6 py-3">
      <h1 className="text-xl text-white font-bold">Dashboard App</h1>

      <div className="flex items-center gap-3">
        <img src="" alt="avatar" className="w-8 h-8 rounded-full"></img>
        <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
