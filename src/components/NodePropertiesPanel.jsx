import React, { useState, useEffect } from "react";
import { X, Save, PlusCircle, Trash } from "lucide-react";
import { toast } from "react-hot-toast";

const NodePropertiesPanel = ({ node, onClose, onUpdateNodeData }) => {
  // State to hold a copy of the node's data for editing in the form
  const [nodeData, setNodeData] = useState(node.data);

  // useEffect to update the form's state when a different node is selected (props.node changes)
  useEffect(() => {
    // Initialize tools as an empty array if it's not present or null
    if (node.type === "aiAgent" && !node.data.tools) {
      setNodeData({ ...node.data, tools: [] });
    } else {
      setNodeData(node.data);
    }
  }, [node]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("variable.")) {
      setNodeData((prev) => ({
        ...prev,
        variable: {
          ...prev.variable,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      setNodeData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleToolChange = (index, value) => {
    const newTools = [...nodeData.tools];
    newTools[index] = value;
    setNodeData((prev) => ({ ...prev, tools: newTools }));
  };

  const addTool = () => {
    setNodeData((prev) => ({ ...prev, tools: [...prev.tools, ""] }));
  };

  const removeTool = (index) => {
    setNodeData((prev) => ({
      ...prev,
      tools: prev.tools.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateNodeData(node.id, nodeData);
  };

  if (!node) return null;

  return (
    <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl border-l border-gray-200 z-10 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          Node Properties - {node.data.label}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
          title="Close panel"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2 mb-4 text-gray-600">
            {/* {node.data.icon && (
              <span className="text-2xl">{node.data.icon}</span>
            )} */}
            <span className="font-bold">{node.data.label} Node</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Node ID:
            </label>
            <input
              type="text"
              value={node.id}
              disabled
              className="w-full p-2 border border-gray-200 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Label:
            </label>
            <input
              type="text"
              name="label"
              value={nodeData.label || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle:
            </label>
            <input
              type="text"
              name="subtitle"
              value={nodeData.subtitle || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {node.type === "aiAgent" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prompt:
                </label>
                <textarea
                  name="prompt"
                  value={nodeData.prompt || ""}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model:
                </label>
                <select
                  name="model"
                  value={nodeData.model || "gpt-3.5-turbo"}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="gpt-4">GPT-4</option>
                  <option value="claude-3">Claude 3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tools:
                </label>
                {/* Ensure nodeData.tools is an array before mapping */}
                {(nodeData.tools || []).map((tool, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tool}
                      onChange={(e) => handleToolChange(index, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                      placeholder={`Tool ${index + 1} name`}
                    />
                    <button
                      type="button"
                      onClick={() => removeTool(index)}
                      className="p-2 text-red-500 hover:text-red-700 rounded-md hover:bg-red-50 transition-colors"
                      title="Remove tool"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTool}
                  className="mt-2 w-full flex items-center justify-center gap-2 py-2 border border-dashed border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <PlusCircle size={16} /> Add Tool
                </button>
              </div>
            </>
          )}

          {node.type === "message" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message:
              </label>
              <textarea
                name="message"
                value={nodeData.message || ""}
                onChange={handleChange}
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter the message to send to the user"
              ></textarea>
            </div>
          )}
        </form>
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <Save size={20} /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default NodePropertiesPanel;