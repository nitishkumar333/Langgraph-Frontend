import {
  PlusCircle,
  Search,
  Maximize2,
  Minimize2,
  RefreshCw,
  Save,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ onDragStart }) => {
  const onDragStartHandler = (event, nodeType, label, subtitle, icon) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType, label, subtitle, icon })
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-80 bg-white border-l border-gray-200 overflow-auto flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      <div className="p-4 border-b border-gray-200">
        <button className="w-full flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-500 rounded">
          <span>Build it for me ✨</span>
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="py-2">
          <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <span className="font-medium">Messages</span>
            <ChevronRight size={20} />
          </div>
          <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <span className="font-medium">Questions</span>
            <ChevronRight size={20} />
          </div>
          <div
            className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onDragStart={(event) =>
              onDragStartHandler(
                event,
                "askName",
                "Ask for a name",
                "What's your name?",
                "👤"
              )
            }
            draggable
          >
            <span className="font-medium">Ask for Name</span>
            <ChevronRight size={20} />
          </div>
          <div
            className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onDragStart={(event) =>
              onDragStartHandler(
                event,
                "askEmail",
                "Ask for a email",
                "What's your email?",
                "✉️"
              )
            }
            draggable
          >
            <span className="font-medium">Ask for Email</span>
            <ChevronRight size={20} />
          </div>
          <div
            className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onDragStart={(event) =>
              onDragStartHandler(
                event,
                "askPhone",
                "Ask for a phone",
                "What's you number?",
                "📱"
              )
            }
            draggable
          >
            <span className="font-medium">Ask for Phone</span>
            <ChevronRight size={20} />
          </div>
          <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <span className="font-medium">Logic</span>
            <ChevronRight size={20} />
          </div>
          <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <span className="font-medium">Integrations</span>
            <ChevronRight size={20} />
          </div>
          <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <span className="font-medium">Inbox & Builder tools</span>
            <ChevronRight size={20} />
          </div>
          <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <span className="font-medium">Low code</span>
            <ChevronRight size={20} />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
