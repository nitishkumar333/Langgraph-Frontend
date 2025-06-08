import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import { initialNodes, initialEdges } from "./store/initiaData.js";
import Chatbot from "./components/Chatbot.jsx";
import NodePropertiesPanel from "./components/NodePropertiesPanel.jsx";
import {
  StartingNode,
  AskName,
  AskPhone,
  AskEmail,
  AIAgentNode,
  MessageNode,
  ConditionalNode,
} from "./components/nodeTypes.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import { toast, Toaster } from "react-hot-toast";

// Define custom node types
const nodeTypes = {
  startingPoint: StartingNode,
  askName: AskName,
  askPhone: AskPhone,
  askEmail: AskEmail,
  aiAgent: AIAgentNode,
  message: MessageNode,
  condition: ConditionalNode,
};

const WorkflowCanvas = ({
  nodes,
  setNodes,
  onNodesChange,
  edges,
  setEdges,
  onEdgesChange,
}) => {
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) =>
        addEdge(
          { ...params, style: { stroke: "#00C4B4", strokeWidth: 2 } },
          eds
        )
      );
      toast.success("Nodes connected successfully!");
    },
    [setEdges]
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance) {
        console.error("ReactFlow instance not initialized.");
        toast.error("Failed to add node: Canvas not ready.");
        return;
      }

      const reactFlowBounds = event.target.getBoundingClientRect();
      const data = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `${Date.now()}`,
        type: data.nodeType,
        position,
        data: {
          label: data.label,
          id: `${Date.now()}`,
          subtitle: data.subtitle,
          icon: data.icon,
          ...(data.nodeType === "aiAgent" && {
            prompt: data.prompt || "",
            tools: data.tools || [], // Ensure tools is an array, even if empty
            model: data.model || "gpt-3.5-turbo",
          }),
          ...(data.nodeType === "message" && {
            message: data.message || "",
          }),
          ...(data.nodeType === "condition" && {
            condition: data.condition || "",
          }),
        },
      };

      setNodes((nds) => nds.concat(newNode));
      toast.success(`${data.label} node added!`);
    },
    [setNodes, reactFlowInstance]
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onNodeClick = useCallback((event, node) => {
    event.stopPropagation();
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onUpdateNodeData = useCallback(
    (nodeId, newData) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, ...newData } }
            : node
        )
      );
      setSelectedNode((prev) =>
        prev && prev.id === nodeId
          ? { ...prev, data: { ...prev.data, ...newData } }
          : prev
      );
      toast.success("Node properties updated!");
    },
    [setNodes]
  );

  const onAddNodeFromExisting = useCallback(
    (parentNodeId, newNodeType, label, subtitle, icon, additionalData = {}) => {
      const parentNode = nodes.find((n) => n.id === parentNodeId);
      if (!parentNode) {
        console.error(`Parent node with ID ${parentNodeId} not found.`);
        toast.error("Failed to add new node.");
        return;
      }

      const newNodeId = `${Date.now()}`;
      const newNode = {
        id: newNodeId,
        type: newNodeType,
        position: { x: parentNode.position.x, y: parentNode.position.y + 150 },
        data: {
          label,
          id: newNodeId,
          subtitle,
          icon,
          ...additionalData,
          // Ensure tools is initialized for aiAgent when adding from existing
          ...(newNodeType === "aiAgent" && { tools: additionalData.tools || [] }),
        },
      };

      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) =>
        eds.concat({
          id: `e${parentNodeId}-${newNodeId}`,
          source: parentNodeId,
          target: newNodeId,
          style: { stroke: "#00C4B4", strokeWidth: 2 },
          animated: true,
        })
      );
      toast.success(`Connected new ${label} node!`);
    },
    [nodes, setNodes, setEdges]
  );

  return (
    <div className="flex-1 h-[calc(100vh-56px)] relative">
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: { ...node.data, onAddNode: onAddNodeFromExisting },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
          style: { stroke: "#00C4B4", strokeWidth: 2 },
        }}
        connectionLineType="smoothstep"
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
      >
        <Background color="#4B5EAA" gap={14} variant="dots" size={2} />
        <Controls className="bottom-4 right-4 flex flex-col space-y-2" />
      </ReactFlow>
      {selectedNode && (
        <NodePropertiesPanel
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          onUpdateNodeData={onUpdateNodeData}
        />
      )}
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/get-nodes-edges/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const res = await response.json();
        const loadedNodes = res.nodes.map(node => {
          if (node.type === 'aiAgent' && !node.data.tools) {
            return { ...node, data: { ...node.data, tools: [] } };
          }
          return node;
        });
        setNodes(loadedNodes);
        setEdges(res.edges);
        toast.success("Workflow loaded successfully!");
      } catch (error) {
        console.error("Error fetching nodes and edges:", error);
        toast.error("Failed to load workflow. Using default data.");
        setNodes(initialNodes);
        setEdges(initialEdges);
      }
    };
    getDetails();
  }, [setNodes, setEdges]);

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans antialiased text-gray-800 bg-gray-50">
      <Navbar nodes={nodes} edges={edges} />
      <div className="flex flex-1">
        <ReactFlowProvider>
          <WorkflowCanvas
            nodes={nodes}
            setNodes={setNodes}
            onNodesChange={onNodesChange}
            edges={edges}
            setEdges={setEdges}
            onEdgesChange={onEdgesChange}
          />
        </ReactFlowProvider>
        <Sidebar />
      </div>
    </div>
  );
};

export default App;