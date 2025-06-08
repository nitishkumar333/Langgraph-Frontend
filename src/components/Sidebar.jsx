import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Bot,
  MessageSquare,
  User,
} from "lucide-react";

const Sidebar = () => {
  // State to manage the expansion/collapse of sidebar sections
  const [expandedSections, setExpandedSections] = useState({
    messages: true,
    questions: true,
    aiTools: true,
  });

  /**
   * Handles the drag start event for draggable node items.
   * Sets the data for the drag event, including node type and initial properties.
   */
  const onDragStartHandler = (event, nodeType, label, subtitle, icon, additionalData = {}) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType, label, subtitle, icon, ...additionalData })
    );
    event.dataTransfer.effectAllowed = "move"; // Specifies the drag effect
  };

  /**
   * Toggles the expanded state of a sidebar section.
   */
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  /**
   * Reusable component for section headers in the sidebar.
   */
  const SectionHeader = ({ title, isExpanded, onToggle, icon: Icon }) => (
    <div
      className="flex items-center justify-between px-4 py-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
      onClick={onToggle}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon size={16} className="text-gray-600" />}
        <span className="font-medium text-gray-800">{title}</span>
      </div>
      {isExpanded ? (
        <ChevronDown size={20} className="text-gray-500" />
      ) : (
        <ChevronRight size={20} className="text-gray-500" />
      )}
    </div>
  );

  /**
   * Reusable component for draggable node items in the sidebar.
   */
  const DraggableItem = ({ nodeType, label, subtitle, icon, emoji, additionalData = {} }) => (
    <div
      className="flex items-center justify-between px-6 py-2 hover:bg-blue-50 cursor-grab active:cursor-grabbing border-l-4 border-transparent hover:border-blue-400 transition-all duration-150 ease-in-out"
      onDragStart={(event) =>
        onDragStartHandler(event, nodeType, label, subtitle, emoji || icon, additionalData)
      }
      draggable // Make the div draggable
    >
      <div className="flex items-center gap-3">
        {emoji ? (
          <span className="text-lg">{emoji}</span>
        ) : (
          icon && React.createElement(icon, { size: 18, className: "text-blue-600" }) // Render Lucide icon
        )}
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
    </div>
  );

  return (
    <aside className="w-80 bg-white border-l border-gray-200 overflow-hidden flex flex-col shadow-lg">
      {/* Draggable Node Sections */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="py-2">
          {/* AI Tools Section */}
          <SectionHeader
            title="AI Tools"
            isExpanded={expandedSections.aiTools}
            onToggle={() => toggleSection("aiTools")}
            icon={Bot}
          />
          {expandedSections.aiTools && (
            <div className="py-1">
              <DraggableItem
                nodeType="aiAgent"
                label="AI Agent"
                subtitle="Intelligent response agent"
                icon={Bot}
                additionalData={{
                  prompt: "You are a helpful assistant.",
                  tools: [],
                  model: "gpt-3.5-turbo",
                }}
              />
            </div>
          )}

          {/* Messages Section */}
          <SectionHeader
            title="Messages"
            isExpanded={expandedSections.messages}
            onToggle={() => toggleSection("messages")}
            icon={MessageSquare}
          />
          {expandedSections.messages && (
            <div className="py-1">
              <DraggableItem
                nodeType="message"
                label="Send Message"
                subtitle="Send a message to user"
                emoji="💬"
                additionalData={{ message: "Hello! How can I help you today?" }}
              />
            </div>
          )}

          {/* Questions Section */}
          <SectionHeader
            title="Questions"
            isExpanded={expandedSections.questions}
            onToggle={() => toggleSection("questions")}
            icon={User}
          />
          {expandedSections.questions && (
            <div className="py-1">
              <DraggableItem
                nodeType="askName"
                label="Ask for Name"
                subtitle="What's your name?"
                emoji="👤"
              />
              <DraggableItem
                nodeType="askEmail"
                label="Ask for Email"
                subtitle="What's your email?"
                emoji="✉️"
              />
              <DraggableItem
                nodeType="askPhone"
                label="Ask for Phone"
                subtitle="What's your number?"
                emoji="📱"
              />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
