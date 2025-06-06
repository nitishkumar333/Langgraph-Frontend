const initialNodes = [
    {
      id: "1",
      type: "startingPoint",
      position: { x: 200, y: 50 },
      data: {
        label: "Starting point",
        id: "1",
        subtitle: "Where your bot begins",
        icon: "🏁",
      },
    },
    {
      id: "2",
      type: "askName",
      position: { x: 200, y: 200 },
      data: {
        label: "Ask for a name",
        id: "2",
        subtitle: "What's your name?",
        icon: "👤",
      },
    },
    {
      id: "3",
      type: "askPhone",
      position: { x: 400, y: 350 },
      data: {
        label: "Ask for a phone",
        id: "3",
        subtitle: "What's you number?",
        icon: "📱",
      },
    },
  ];

  const initialEdges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      style: { stroke: "#00C4B4", strokeWidth: 2 },
    },
    {
      id: "e2-3",
      source: "2",
      target: "3",
      style: { stroke: "#00C4B4", strokeWidth: 2 },
    },
  ];

export {initialNodes,initialEdges};

  