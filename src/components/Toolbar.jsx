import { useState } from "react";

const Toolbar = ({nodes, edges}) => {
  const handleTestBot = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/nodes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error("Failed to test bot");
      }

      const data = await response.json();
      console.log("Bot Test Response:", data);
    } catch (error) {
      console.error("Error testing bot:", error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/delete-history/");

      if (!response.ok) {
        throw new Error("Failed to delete history");
      }

      const data = await response.json();
      console.log("Deleted history");
    } catch (error) {
      console.error("Error deleting history:", error);
    }
  };
  return (
    <>
      <header className="flex items-center px-4 py-2 bg-white border-b border-gray-200">
        <button className="text-purple-500 mr-4">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-2">
            <span className="text-purple-500 text-lg">🤖</span>
          </div>
          <h1 className="text-lg font-medium">New bot</h1>
        </div>

        <div className="ml-auto flex space-x-2">
          <div className="flex rounded-full bg-gray-100 px-2">
            <div className="py-2 px-4 bg-purple-500 text-white rounded-full">
              Build
            </div>
            <div className="py-2 px-4">Design</div>
            <div className="py-2 px-4">Settings</div>
            <div className="py-2 px-4">Share</div>
            <div className="py-2 px-4">Analyze</div>
          </div>
          <button
            className="border border-gray-300 rounded px-4 py-2"
            onClick={handleTestBot}
          >
            Test this bot
          </button>
          <button
            className="border border-gray-300 rounded px-4 py-2"
            onClick={handleDelete}
          >
            Delete history
          </button>
          <button className="bg-purple-600 text-white rounded px-4 py-2">
            Publish
          </button>
        </div>
      </header>
    </>
  );
};

export default Toolbar;