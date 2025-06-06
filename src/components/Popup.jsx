const Popup = ({ onClose, onSelect, position }) => (
  <div
    className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10"
    style={{ top: position.y + 50, left: position.x }}
  >
    <h3 className="text-sm font-semibold mb-2">Add a new node</h3>
    <div className="space-y-2">
      <button
        className="w-full text-left p-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200"
        onClick={() => onSelect("askName", "What's your name?")}
      >
        Ask for a name
      </button>
      <button
        className="w-full text-left p-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200"
        onClick={() => onSelect("askPhone", "Ask for a phone")}
      >
        Ask for a phone
      </button>
    </div>
    <button
      className="mt-2 w-full text-center text-sm text-gray-500 hover:text-gray-700"
      onClick={onClose}
    >
      Cancel
    </button>
  </div>
);

export default Popup;
