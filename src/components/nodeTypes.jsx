import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import {
  Bot,
  MessageSquare,
  Phone,
  Mail,
  User,
  Zap,
  Plus, // Used for the "Add Node" button
} from "lucide-react";

/**
 * BaseNode component provides a consistent structure and styling for all custom nodes.
 * It includes handles for connections and a hover-activated "Add Node" button.
 */
const BaseNode = ({ data, children, bgColor, borderColor, textColor }) => {
  // State to control visibility of the "Add Node" button on hover
  const [showAddButton, setShowAddButton] = useState(false);

  return (
    <div
      className={`relative ${bgColor} rounded-lg p-4 shadow-md border-2 ${borderColor} w-64 min-h-[80px] flex flex-col`}
      onMouseEnter={() => setShowAddButton(true)} // Show button on mouse enter
      onMouseLeave={() => setShowAddButton(false)} // Hide button on mouse leave
    >
      {/* Target Handle for incoming connections (top) */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-700"
        style={{ width: 10, height: 10, background: "#0080ff", borderColor: "#0066cc" }}
      />
      {/* Content specific to each node type */}
      <div className={`flex-grow ${textColor}`}>
        {children}
      </div>
      {/* Source Handle for outgoing connections (bottom) */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-700"
        style={{ width: 10, height: 10, background: "#0080ff", borderColor: "#0066cc" }}
      />
      {/* "Add Node" button appears on hover */}
      {/* The StartingNode (id '1') is typically the root and might not need an "Add Node" button for children in the same way */}
      {showAddButton && data.id !== "1" && (
        <button
          onClick={() => data.onAddNode(data.id, 'message', 'New Message', 'Default message content', '💬', {message: 'Hello there!'})}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 p-1 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          title="Add new node"
        >
          <Plus size={16} />
        </button>
      )}
    </div>
  );
};

/**
 * NodeHeader component provides a consistent header structure for all nodes.
 */
const NodeHeader = ({ icon: Icon, emoji, label, subtitle, labelColor, subtitleColor }) => (
  <div className="flex items-center gap-3 mb-2">
    {/* Display emoji or Lucide icon */}
    {emoji ? (
      <span className="text-xl">{emoji}</span>
    ) : (
      Icon && <Icon className="w-5 h-5" />
    )}
    <div className="flex-1">
      {/* Node label and subtitle */}
      <div className={`font-bold text-sm ${labelColor}`}>{label}</div>
      <div className={`text-xs ${subtitleColor}`}>{subtitle}</div>
    </div>
  </div>
);

// --- Specific Node Components ---

const StartingNode = ({ data }) => (
  <BaseNode
    data={data}
    bgColor="bg-green-50"
    borderColor="border-green-300"
    textColor="text-green-800"
  >
    <NodeHeader
      emoji={data.icon || "🚀"}
      label={data.label}
      subtitle={data.subtitle}
      labelColor="text-green-800"
      subtitleColor="text-green-600"
    />
    <div className="text-xs text-green-700 mt-2">
      This is the entry point of your chatbot flow.
    </div>
  </BaseNode>
);

const AskName = ({ data }) => (
  <BaseNode
    data={data}
    bgColor="bg-blue-50"
    borderColor="border-blue-300"
    textColor="text-blue-800"
  >
    <NodeHeader
      icon={User}
      label={data.label || "Ask Name"}
      subtitle={data.subtitle || "Collect user's name"}
      labelColor="text-blue-800"
      subtitleColor="text-blue-600"
    />
  </BaseNode>
);

const AskPhone = ({ data }) => (
  <BaseNode
    data={data}
    bgColor="bg-purple-50"
    borderColor="border-purple-300"
    textColor="text-purple-800"
  >
    <NodeHeader
      icon={Phone}
      label={data.label || "Ask Phone"}
      subtitle={data.subtitle || "Collect phone number"}
      labelColor="text-purple-800"
      subtitleColor="text-purple-600"
    />
  </BaseNode>
);

const AskEmail = ({ data }) => (
  <BaseNode
    data={data}
    bgColor="bg-orange-50"
    borderColor="border-orange-300"
    textColor="text-orange-800"
  >
    <NodeHeader
      icon={Mail}
      label={data.label || "Ask Email"}
      subtitle={data.subtitle || "Collect email address"}
      labelColor="text-orange-800"
      subtitleColor="text-orange-600"
    />
  </BaseNode>
);

const AIAgentNode = ({ data }) => (
  <BaseNode
    data={data}
    bgColor="bg-gradient-to-br from-purple-50 to-pink-50"
    borderColor="border-purple-300"
    textColor="text-gray-800" // General text color for AI Agent body
  >
    <NodeHeader
      icon={Bot}
      label={data.label || "AI Agent"}
      subtitle={data.subtitle || "Intelligent response agent"}
      labelColor="text-purple-800"
      subtitleColor="text-purple-600"
    />

    <div className="space-y-2 mt-2">
      {data.prompt && (
        <div className="bg-purple-100 p-2 rounded text-xs">
          <div className="font-semibold text-purple-800">Prompt:</div>
          <div className="text-purple-700 line-clamp-2">{data.prompt}</div>
        </div>
      )}

      {data.model && (
        <div className="bg-purple-100 p-2 rounded text-xs">
          <div className="font-semibold text-purple-800">Model:</div>
          <div className="text-purple-700">{data.model}</div>
        </div>
      )}

      {data.tools && data.tools.length > 0 && (
        <div className="bg-pink-100 p-2 rounded text-xs">
          <div className="font-semibold text-pink-800">Tools:</div>
          <div className="text-pink-700 flex flex-wrap gap-1">
            {data.tools.map((tool, idx) => (
              <span key={idx} className="inline-block bg-pink-200 px-1.5 py-0.5 rounded text-xs">
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </BaseNode>
);

const MessageNode = ({ data }) => (
  <BaseNode
    data={data}
    bgColor="bg-teal-50"
    borderColor="border-teal-300"
    textColor="text-teal-800"
  >
    <NodeHeader
      icon={MessageSquare}
      label={data.label || "Send Message"}
      subtitle={data.subtitle || "Send a message to user"}
      labelColor="text-teal-800"
      subtitleColor="text-teal-600"
    />
    {data.message && (
      <div className="mt-2 bg-teal-100 p-2 rounded text-xs text-teal-700 line-clamp-3">
        {data.message}
      </div>
    )}
  </BaseNode>
);

const ConditionalNode = ({ data }) => (
  <BaseNode
    data={data}
    bgColor="bg-yellow-50"
    borderColor="border-yellow-300"
    textColor="text-yellow-800"
  >
    <NodeHeader
      icon={Zap}
      label={data.label || "Condition"}
      subtitle={data.subtitle || "Branch based on condition"}
      labelColor="text-yellow-800"
      subtitleColor="text-yellow-600"
    />
    {data.condition && (
      <div className="mt-2 bg-yellow-100 p-2 rounded text-xs text-yellow-700 line-clamp-2">
        If: {data.condition}
      </div>
    )}
    {/* Additional handles for true/false branches */}
    <Handle
      type="source"
      position={Position.Right}
      id="true"
      className="w-3 h-3 bg-green-500 rounded-full border border-green-700"
      style={{ width: 8, height: 8, background: "#10b981", borderColor: "#065F46", top: "35%" }}
      title="True" // Accessibility title
    />
    <Handle
      type="source"
      position={Position.Right}
      id="false"
      className="w-3 h-3 bg-red-500 rounded-full border border-red-700"
      style={{ width: 8, height: 8, background: "#ef4444", borderColor: "#B91C1C", top: "65%" }}
      title="False" // Accessibility title
    />
  </BaseNode>
);

export {
  StartingNode,
  AskName,
  AskPhone,
  AskEmail,
  AIAgentNode,
  MessageNode,
  ConditionalNode,
};
