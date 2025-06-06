import { Handle } from "reactflow";

const StartingNode = ({ data }) => (
  <div className="relative bg-white rounded-lg p-4 shadow-md border-2 w-64">
    <Handle
      type="target"
      position="top"
      className="w-4 h-4 bg-teal-500 rounded-full -top-2"
      style={{ width: 10, height: 10, background: "#0080ff" }}
    />
    <div className="flex items-center gap-3">
      <div className="text-xl">{data.icon}</div>
      <div className="flex-1">
        <div className="font-bold text-sm">{data.label}</div>
        <div className="text-xs text-gray-500">{data.subtitle}</div>
      </div>
      <button
        onClick={() => data.onAddNode(data.id)}
        className="ml-auto text-gray-500 hover:text-gray-700"
      >
        •••
      </button>
    </div>
    <Handle
      type="source"
      position="bottom"
      className="w-4 h-4 bg-teal-500 rounded-full -bottom-2"
      style={{ width: 10, height: 10, background: "#0080ff" }}
    />
  </div>
);

const AskName = ({ data }) => (
  <div className="relative bg-white rounded-lg p-4 shadow-md border-2 w-64">
    <Handle
      type="target"
      position="top"
      className="w-4 h-4 bg-teal-500 rounded-full -top-2"
      style={{ width: 10, height: 10, background: "#0080ff" }}
    />
    <div className="flex items-center gap-3">
      <div className="text-xl">{data.icon}</div>
      <div className="flex-1">
        <div className="font-bold text-sm">{data.label}</div>
        <div className="text-xs text-gray-500">{data.subtitle}</div>
      </div>
      <button
        onClick={() => data.onAddNode(data.id)}
        className="ml-auto text-gray-500 hover:text-gray-700"
      >
        •••
      </button>
    </div>
    <Handle
      type="source"
      position="bottom"
      className="w-4 h-4 bg-teal-500 rounded-full -bottom-2"
      style={{ width: 10, height: 10, background: "#0080ff" }}
    />
  </div>
);

const AskPhone = ({ data }) => (
  <div className="relative bg-white rounded-lg p-4 shadow-md border-2 w-64">
    <Handle
      type="target"
      position="top"
      className="w-4 h-4 bg-teal-500 rounded-full -top-2"
      style={{ width: 10, height: 10, background: "#0080ff" }}
    />
    <div className="flex items-center gap-3">
      <div className="text-xl">{data.icon}</div>
      <div className="flex-1">
        <div className="font-bold text-sm">{data.label}</div>
        <div className="text-xs text-gray-500">{data.subtitle}</div>
      </div>
      <button
        onClick={() => data.onAddNode(data.id)}
        className="ml-auto text-gray-500 hover:text-gray-700"
      >
        •••
      </button>
    </div>
    <Handle
      type="source"
      position="bottom"
      className="w-4 h-4 bg-teal-500 rounded-full -bottom-2"
      style={{ width: 10, height: 10, background: "#0080ff" }}
    />
  </div>
);

const AskEmail = ({ data }) => (
  <div className="relative bg-white rounded-lg p-4 shadow-md border-2 w-64">
    <Handle
      type="target"
      position="top"
      className="w-4 h-4 bg-teal-500 rounded-full -top-2"
      style={{ width: 10, height: 10, background: "#0080ff" }}
    />
    <div className="flex items-center gap-3">
      <div className="text-xl">{data.icon}</div>
      <div className="flex-1">
        <div className="font-bold text-sm">{data.label}</div>
        <div className="text-xs text-gray-500">{data.subtitle}</div>
      </div>
      <button
        onClick={() => data.onAddNode(data.id)}
        className="ml-auto text-gray-500 hover:text-gray-700"
      >
        •••
      </button>
    </div>
    <Handle
      type="source"
      position="bottom"
      className="w-4 h-4 bg-teal-500 rounded-full -bottom-2"
      style={{ width: 10, height: 10, background: "#0080ff" }}
    />
  </div>
);

export {StartingNode, AskName, AskPhone, AskEmail};

// const nodeTypes = {
//   startingPoint: ({ data }) => (
//     <div className="relative bg-white rounded-lg p-4 shadow-md border-2 w-64">
//       <Handle
//         type="target"
//         position="top"
//         className="w-4 h-4 bg-teal-500 rounded-full -top-2"
//         style={{ width: 10, height: 10, background: "#0080ff" }}
//       />
//       <div className="flex items-center gap-3">
//         <div className="text-xl">{data.icon}</div>
//         <div className="flex-1">
//           <div className="font-bold text-sm">{data.label}</div>
//           <div className="text-xs text-gray-500">{data.subtitle}</div>
//         </div>
//         <button
//           onClick={() => data.onAddNode(data.id)}
//           className="ml-auto text-gray-500 hover:text-gray-700"
//         >
//           •••
//         </button>
//       </div>
//       <Handle
//         type="source"
//         position="bottom"
//         className="w-4 h-4 bg-teal-500 rounded-full -bottom-2"
//         style={{ width: 10, height: 10, background: "#0080ff" }}
//       />
//     </div>
//   ),
//   askName: ({ data }) => (
//     <div className="relative bg-white rounded-lg p-4 shadow-md border-2 w-64">
//       <Handle
//         type="target"
//         position="top"
//         className="w-4 h-4 bg-teal-500 rounded-full -top-2"
//         style={{ width: 10, height: 10, background: "#0080ff" }}
//       />
//       <div className="flex items-center gap-3">
//         <div className="text-xl">{data.icon}</div>
//         <div className="flex-1">
//           <div className="font-bold text-sm">{data.label}</div>
//           <div className="text-xs text-gray-500">{data.subtitle}</div>
//         </div>
//         <button
//           onClick={() => data.onAddNode(data.id)}
//           className="ml-auto text-gray-500 hover:text-gray-700"
//         >
//           •••
//         </button>
//       </div>
//       <Handle
//         type="source"
//         position="bottom"
//         className="w-4 h-4 bg-teal-500 rounded-full -bottom-2"
//         style={{ width: 10, height: 10, background: "#0080ff" }}
//       />
//     </div>
//   ),
//   askPhone: ({ data }) => (
//     <div className="relative bg-white rounded-lg p-4 shadow-md border-2 w-64">
//       <Handle
//         type="target"
//         position="top"
//         className="w-4 h-4 bg-teal-500 rounded-full -top-2"
//         style={{ width: 10, height: 10, background: "#0080ff" }}
//       />
//       <div className="flex items-center gap-3">
//         <div className="text-xl">{data.icon}</div>
//         <div className="flex-1">
//           <div className="font-bold text-sm">{data.label}</div>
//           <div className="text-xs text-gray-500">{data.subtitle}</div>
//         </div>
//         <button
//           onClick={() => data.onAddNode(data.id)}
//           className="ml-auto text-gray-500 hover:text-gray-700"
//         >
//           •••
//         </button>
//       </div>
//       <Handle
//         type="source"
//         position="bottom"
//         className="w-4 h-4 bg-teal-500 rounded-full -bottom-2"
//         style={{ width: 10, height: 10, background: "#0080ff" }}
//       />
//     </div>
//   ),
// };
