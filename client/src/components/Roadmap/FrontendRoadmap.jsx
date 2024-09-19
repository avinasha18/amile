import { useState, useCallback } from 'react';
import ReactFlow, { applyNodeChanges, applyEdgeChanges, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import { FaCode, FaCss3Alt, FaHtml5, FaJsSquare, FaReact } from 'react-icons/fa';

// Define a custom node component with improved styling and icons
const CustomNode = ({ data }) => {
    const iconMap = {
        'Frontend Development': <FaCode />,
        'CSS Frameworks': <FaCss3Alt />,
        'Tailwind CSS, Bootstrap': <FaCss3Alt />,
        'HTML Basics': <FaHtml5 />,
        'HTML': <FaHtml5 />,
        'CSS': <FaCss3Alt />,
        'CSS Concepts': <FaCss3Alt />,
        'JS Concepts': <FaJsSquare />,
        'HTML Forms, Semantic Tags': <FaHtml5 />,
        'CSS Layouts, Flex, Grid': <FaCss3Alt />,
        'JS Operators, Loops, Arrays': <FaJsSquare />,
        'JavaScript': <FaJsSquare />,
        'JS Frameworks': <FaReact />,
        'React, Next, Angular': <FaReact />,
        'VCS': <FaCode />,
        'VCS Hosting': <FaCode />
    };

    return (
        <div className="custom-node">
            <Handle type="target" position={Position.Top} id="left" />
            <div className="node-content">
                {iconMap[data.label]}
                <div>{data.label}</div>
            </div>
            <Handle type="source" position={Position.Bottom} id="right" />
        </div>
    );
};

// Define custom styles for nodes with a modern design
const customStyles = `
/* Custom styles for nodes */
.custom-node {
  background: #fff;
  border: 2px solid gray; /* Added border */
  border-radius: 12px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 300px; /* Increased width */
  height: 100px; /* Increased height */
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  color: #333;
}

.custom-node:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.node-content {
  text-align: center;
  font-size: 30px; /* Increased font size */
  font-weight: bold;
  color: #6B73FF;
  letter-spacing: 0.5px;
}

.node-content > div {
  margin-top: 8px;
  font-size: 26px; /* Adjust text size for label */
}

/* Custom styles for handles */

/* Custom styles for edges */
.react-flow__edge {
  stroke-width: 4px;
}

.react-flow__edge-path {
  stroke: #6B73FF;
  stroke-width: 4px;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Optional: Add animation to edges */
.react-flow__edge-animated {
  animation: dash 1.5s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -1000;
  }
}
`;

// Insert styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = customStyles;
document.head.appendChild(styleSheet);

const initialNodes = [
    { id: '1', data: { label: 'Frontend Development' }, position: { x: 300, y: 0 }, type: 'customNode' },
    { id: '2', data: { label: 'CSS Frameworks' }, position: { x: 900, y: 200 }, type: 'customNode' },
    { id: '3', data: { label: 'Tailwind CSS, Bootstrap' }, position: { x: 900, y: 400 }, type: 'customNode' },
    { id: '4', data: { label: 'HTML Basics' }, position: { x: -300, y: 100 }, type: 'customNode' },
    { id: '5', data: { label: 'HTML' }, position: { x: 300, y: 200 }, type: 'customNode' },
    { id: '6', data: { label: 'CSS' }, position: { x: 300, y: 400 }, type: 'customNode' },
    { id: '7', data: { label: 'CSS Concepts' }, position: { x: -200, y: 500 }, type: 'customNode' },
    { id: '8', data: { label: 'JS Concepts' }, position: { x: 900, y: 600 }, type: 'customNode' },
    { id: '10', data: { label: 'HTML Forms, Semantic Tags' }, position: { x: -300, y: 300 }, type: 'customNode' },
    { id: '11', data: { label: 'CSS Layouts, Flex, Grid' }, position: { x: -200, y: 700 }, type: 'customNode' },
    { id: '12', data: { label: 'JS Operators, Loops, Arrays' }, position: { x: 900, y: 800 }, type: 'customNode' },
    { id: '13', data: { label: 'JavaScript' }, position: { x: 300, y: 600 }, type: 'customNode' },
    { id: '14', data: { label: 'JS Frameworks' }, position: { x: -200, y: 900 }, type: 'customNode' },
    { id: '15', data: { label: 'React, Next, Angular' }, position: { x: -200, y: 1100 }, type: 'customNode' },
    { id: '16', data: { label: 'VCS' }, position: { x: 300, y: 900 }, type: 'customNode' },
    { id: '17', data: { label: 'VCS Hosting' }, position: { x: 300, y: 1100 }, type: 'customNode' },
];

const initialEdges = [
    { id: '1-5', source: '1', target: '5', type: 'smoothstep', animated: true },
    { id: '5-4', source: '5', target: '4', type: 'smoothstep' },
    { id: '2-3', source: '2', target: '3', type: 'smoothstep' },
    { id: '6-2', source: '6', target: '2', type: 'smoothstep' },
    { id: '5-6', source: '5', target: '6', type: 'smoothstep', animated: true },
    { id: '6-7', source: '6', target: '7', type: 'smoothstep' },
    { id: '6-13', source: '6', target: '13', type: 'smoothstep', animated: true },
    { id: '3-9', source: '3', target: '9', type: 'smoothstep' },
    { id: '4-10', source: '4', target: '10', type: 'smoothstep' },
    { id: '7-11', source: '7', target: '11', type: 'smoothstep' },
    { id: '8-12', source: '8', target: '12', type: 'smoothstep' },
    { id: '13-8', source: '13', target: '8', type: 'smoothstep' },
    { id: '13-14', source: '13', target: '14', type: 'smoothstep' },
    { id: '14-15', source: '14', target: '15', type: 'smoothstep' },
    { id: '13-16', source: '13', target: '16', type: 'smoothstep', animated: true },
    { id: '16-17', source: '16', target: '17', type: 'smoothstep', animated: true },
];

function FrontendRoadmap() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{
                width: '80%',
                maxWidth: '1200px',
                margin: '0 auto',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <ReactFlow
                    nodes={nodes}
                    onNodesChange={onNodesChange}
                    edges={edges}
                    onEdgesChange={onEdgesChange}
                    fitView
                    nodeTypes={{ customNode: CustomNode }}
                    zoomOnScroll={false}
                    panOnScroll={false}
                    zoomOnPinch={false}
                    panOnDrag={false}
                    elementsSelectable={false}
                    nodesDraggable={false}
                    edgesUpdatable={false}
                    interactive={false}
                />
            </div>
        </div>
    );
}

export default FrontendRoadmap;