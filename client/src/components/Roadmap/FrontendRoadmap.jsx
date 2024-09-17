import { useState, useCallback } from 'react';
import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';

// Define a custom node component with improved styling
const CustomNode = ({ data }) => {
    return (
        <div className="custom-node">
            <Handle type="target" position={Position.Top} id="left" />
            <div className="node-content">
                {data.label}
            </div>
            <Handle type="source" position={Position.Bottom} id="right" />
        </div>
    );
};

// Define custom styles for nodes with a modern design
const customStyles = `
/* Custom styles for nodes */
.custom-node {
  background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%); /* Lighter gradient colors */
  border: 1px solid #ccc; /* Light border color */
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Softer shadow */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 250px;
  height: 80px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  color: #333; /* Darker text color for contrast */
}

.custom-node:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Slightly darker shadow on hover */
}

.node-content {
  text-align: center;
  font-size: 20px; /* Adjusted font size */
  font-weight: bold;
  color: #6B73FF; /* Darker text color for better readability */
  letter-spacing: 0.5px; /* Adjusted letter-spacing */
}

/* Custom styles for handles */
.react-flow__handle {
  background: transparent; /* Remove background */
  border: none; /* Remove border */
  width: 0; /* Set width to 0 */
  height: 0; /* Set height to 0 */
}

.react-flow_handle-left, .react-flowhandle-right, .react-flowhandle-top, .react-flow_handle-bottom {
  top: 50%;
  transform: translateY(-50%);
}

/* Remove any hover effect if present */
.react-flow__handle:hover {
  background: transparent; /* Remove background on hover */
  transform: scale(1); /* Ensure no scale transformation */
}

/* Custom styles for edges */
.react-flow__edge {
  stroke-width: 4px; /* Increased thickness of edges */
}

.react-flow__edge-path {
  stroke: #6B73FF; /* Change to a prominent color for edges */
  stroke-width: 4px; /* Ensure stroke-width matches the .react-flow__edge */
  stroke-linecap: round;
  stroke-linejoin: round;
}

.react-flow__arrowhead {
  fill: #6B73FF; /* Matching color for arrowheads */
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
    {
        id: '1',
        data: { label: 'Frontend Development' },
        position: { x: 300, y: 0 },
        type: 'customNode', // Use the custom node type
    },
    {
        id: '2',
        data: { label: 'CSS FRAMEWORKS' },
        position: { x: 900, y: 200 },
        type: 'customNode',
    },
    {
        id: '3',
        data: { label: 'tailwind css, bootstrap ' },
        position: { x: 900, y: 400 },
        type: 'customNode',
    },
    {
        id: '4',
        data: { label: 'HTML Basics' },
        position: { x: -300, y: 100 },
        type: 'customNode',
    },
    {
        id: '5',
        data: { label: 'HTML' },
        position: { x: 300, y: 200 },
        type: 'customNode',
    },
    {
        id: '6',
        data: { label: 'CSS' },
        position: { x: 300, y: 400 },
        type: 'customNode',
    },
    {
        id: '7',
        data: { label: 'CSS CONCEPTS' },
        position: { x: -200, y: 500 },
        type: 'customNode',
    },
    {
        id: '8',
        data: { label: 'JS Concepts' },
        position: { x: 900, y: 600 },
        type: 'customNode',
    },
    {
        id: '10',
        data: { label: 'Basic of HTML, Forms and Validations, Semantic Tags, Accessibility' },
        position: { x: -300, y: 300 },
        type: 'customNode',
    },
    {
        id: '11',
        data: { label: 'Learn Basic, Layouts, Flex and Grid, Responsive Design, CSS Display' },
        position: { x: -200, y: 700 },
        type: 'customNode',
    },
    {
        id: '12',
        data: { label: 'Basic working, Operators, Loops, Functions, Array' },
        position: { x: 900, y: 800 },
        type: 'customNode',
    },
    {
        id: '13',
        data: { label: 'JS' },
        position: { x: 300, y: 600 },
        type: 'customNode',
    },
    {
        id: '14',
        data: { label: 'JS FRAMEWORKS' },
        position: { x: -200, y: 900 },
        type: 'customNode',
    },
    {
        id: '15',
        data: { label: 'react, next, angular, nodejs, jquery' },
        position: { x: -200, y: 1100 },
        type: 'customNode',
    },
    {
        id: '16',
        data: { label: 'VCS' },
        position: { x: 300, y: 900 },
        type: 'customNode',
    },
    {
        id: '17',
        data: { label: 'VCS-HOSTING' },
        position: { x: 300, y: 1100 },
        type: 'customNode',
    },
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
        <div style={{ width: '100%', height: '600px' }}>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                fitView
                nodeTypes={{ customNode: CustomNode }} // Register the custom node type
                zoomOnScroll={false}  // Disable zooming on scroll
                panOnScroll={false}   // Disable panning on scroll
                zoomOnPinch={false}   // Disable zooming on pinch
                panOnDrag={false}     // Disable panning on drag
                elementsSelectable={false}  // Disable selecting elements
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default FrontendRoadmap;