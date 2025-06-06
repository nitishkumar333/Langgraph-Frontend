import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls
} from "reactflow";
import "reactflow/dist/style.css";
import { initialNodes, initialEdges } from "./store/initiaData.js";
import Chatbot from "./components/Chatbot.jsx";
import Popup from "./components/Popup.jsx";
import {StartingNode, AskName, AskPhone, AskEmail} from "./components/nodeTypes.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Toolbar from "./components/Toolbar.jsx";
import { Italic } from "lucide-react";

const nodeTypes = {
  startingPoint: StartingNode,
  askName: AskName,
  askPhone: AskPhone,
  askEmail: AskEmail
}

const WorkflowCanvas = ({nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange}) => {
  const [zoom, setZoom] = useState(100);
  const [popup, setPopup] = useState(null);

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) =>
        addEdge(
          { ...params, style: { stroke: "#00C4B4", strokeWidth: 2 } },
          eds
        )
      );
    },
    [setEdges]
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = event.target.getBoundingClientRect();
      const data = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: `${Date.now()}`,
        type: data.nodeType,
        position,
        data: {
          label: data.label,
          id: `${Date.now()}`,
          subtitle: data.subtitle,
          icon: data.icon
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onAddNode = (nodeId) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      setPopup({ nodeId, position: node.position });
    }
  };

  const onSelectNodeType = (nodeId, nodeType, label) => {
    const parentNode = nodes.find((n) => n.id === nodeId);
    if (!parentNode) return;

    const newNodeId = `${Date.now()}`;
    const newNode = {
      id: newNodeId,
      type: nodeType,
      position: { x: parentNode.position.x, y: parentNode.position.y + 150 },
      data: { label, id: newNodeId },
    };

    setNodes((nds) => nds.concat(newNode));
    setEdges((eds) =>
      eds.concat({
        id: `e${nodeId}-${newNodeId}`,
        source: nodeId,
        target: newNodeId,
        style: { stroke: "#00C4B4", strokeWidth: 2 },
      })
    );
    setPopup(null);
  };

  const styles = {
    backgroundSize: `${(20 * zoom) / 100}px ${(20 * zoom) / 100}px`,
    transform: `scale(${zoom / 100})`,
    transformOrigin: "0 0",
    height: `${(100 * 100) / zoom}%`,
    width: `${(100 * 100) / zoom}%`,
  };

  return (
    <div className="flex-1 h-[calc(100vh-56px)] relative">
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: { ...node.data, onAddNode },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{ type: "smoothstep" }}
        connectionLineType="smoothstep"
        style={styles}
        // fitView
      >
        <Background color="#4B5EAA" gap={14} variant="dots" size={2} />
        <Controls className="bottom-4 right-4 flex flex-col space-y-2" />
      </ReactFlow>
      {popup && (
        <Popup
          position={popup.position}
          onClose={() => setPopup(null)}
          onSelect={(nodeType, label) =>
            onSelectNodeType(popup.nodeId, nodeType, label)
          }
        />
      )}
    </div>
  );
};

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(()=>{
    const getDetails = async () => {
      const response = await fetch("http://127.0.0.1:8000/get-nodes-edges/");
      const res = await response.json();
      setNodes(res["nodes"]);
      setEdges(res["edges"]);
    }
    getDetails();
  },[]);

  return <div className="flex flex-col h-screen">
    <Toolbar nodes={nodes} edges={edges}/>
    <div className="flex flex-1">
      <ReactFlowProvider>
        <WorkflowCanvas nodes={nodes} setNodes={setNodes} onNodesChange={onNodesChange}
                        edges={edges} setEdges={setEdges} onEdgesChange={onEdgesChange}/>
      </ReactFlowProvider>
      <Sidebar />
    </div>
    <Chatbot />
  </div>
};

export default App;