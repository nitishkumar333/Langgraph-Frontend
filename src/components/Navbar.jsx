import React, { useState } from "react";
import {
  ChevronLeft, // For the back arrow
  Bot, // For the bot icon
  Play, // For "Test this bot"
  Trash2, // For "Delete history" (Trash2 looks a bit cleaner)
  Send, // For "Publish"
  Palette, // For Design tab
  Settings, // For Settings tab
  Share2, // For Share tab
  BarChart2, // For Analyze tab
  FileCog, // For Build tab (or use a different one if preferred)
} from "lucide-react";
import { toast } from "react-hot-toast"; // For stylish notifications

const Toolbar = ({ nodes, edges }) => {
  // State to manage the active navigation tab
  const [activeTab, setActiveTab] = useState("Build");

  /**
   * Handles testing the current chatbot workflow.
   * Sends the current nodes and edges to a backend API for testing.
   * Displays toast notifications for success or failure.
   */
  const handleTestBot = async () => {
    toast.loading("Testing bot...", { id: "testBotToast" }); // Show loading toast
    try {
      const response = await fetch("http://127.0.0.1:8000/nodes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }), // Send current workflow data
      });

      if (!response.ok) {
        throw new Error("Failed to test bot");
      }

      const data = await response.json();
      console.log("Bot Test Response:", data);
      toast.success("Bot tested successfully!", { id: "testBotToast" }); // Success toast
    } catch (error) {
      console.error("Error testing bot:", error);
      toast.error(`Error testing bot: ${error.message || 'Unknown error'}`, { id: "testBotToast" }); // Error toast
    }
  };

  /**
   * Handles deleting the bot's history (likely from the backend).
   * Displays toast notifications for success or failure.
   */
  const handleDeleteHistory = async () => {
    toast.loading("Deleting history...", { id: "deleteHistoryToast" }); // Show loading toast
    try {
      const response = await fetch("http://127.0.0.1:8000/delete-history/");

      if (!response.ok) {
        throw new Error("Failed to delete history");
      }

      const data = await response.json();
      console.log("Deleted history response:", data);
      toast.success("Chat history deleted!", { id: "deleteHistoryToast" }); // Success toast
    } catch (error) {
      console.error("Error deleting history:", error);
      toast.error(`Error deleting history: ${error.message || 'Unknown error'}`, { id: "deleteHistoryToast" }); // Error toast
    }
  };

  /**
   * Handles publishing the chatbot.
   * Placeholder for actual deployment logic.
   */
  const handlePublish = () => {
    toast.info("Publishing chatbot...", { id: "publishBotToast" });
    // Simulate an async operation
    setTimeout(() => {
      toast.success("Chatbot published!", { id: "publishBotToast" });
      console.log("Publishing workflow:", { nodes, edges });
    }, 1500);
  };

  return (
    <header className="flex items-center px-4 py-2 bg-white border-b border-gray-200 shadow-sm">
      {/* Back Button */}
      <button
        className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
        title="Go back"
      >
        <ChevronLeft size={24} strokeWidth={2.5} />
      </button>

      {/* Bot Title and Icon */}
      <div className="flex items-center ml-4">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-2 shadow-sm">
          <Bot className="text-purple-600" size={24} />
        </div>
        <h1 className="text-lg font-semibold text-gray-800">New bot</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="ml-auto flex space-x-1 rounded-full bg-gray-100 p-1 shadow-inner">
        {[
          { name: "Build", icon: FileCog },
          { name: "Design", icon: Palette },
          { name: "Settings", icon: Settings },
          { name: "Share", icon: Share2 },
          { name: "Analyze", icon: BarChart2 },
        ].map((tab) => (
          <button
            key={tab.name}
            className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium transition-all duration-200
              ${activeTab === tab.name
                ? "bg-purple-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-200"
              }`}
            onClick={() => setActiveTab(tab.name)}
            title={tab.name}
          >
            <tab.icon size={16} />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="ml-4 flex space-x-3">
        <button
          className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
          onClick={handleTestBot}
          title="Test your chatbot workflow"
        >
          <Play size={18} />
          <span>Test bot</span>
        </button>
        <button
          className="flex items-center gap-2 border border-red-300 rounded-md px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 shadow-sm"
          onClick={handleDeleteHistory}
          title="Delete chatbot history"
        >
          <Trash2 size={18} />
          <span>Delete history</span>
        </button>
        <button
          className="flex items-center gap-2 bg-purple-600 text-white rounded-md px-4 py-2 hover:bg-purple-700 transition-colors duration-200 shadow-md"
          onClick={handlePublish}
          title="Publish your chatbot"
        >
          <Send size={18} />
          <span>Publish</span>
        </button>
      </div>
    </header>
  );
};

export default Toolbar;
