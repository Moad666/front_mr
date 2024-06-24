import React from 'react';

const CustomNode = ({ id, data, deleteNode }) => {
  return (
    <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5, position: 'relative', background: '#fff' }}>
      <div>{data.label}</div>
      <button
        onClick={() => deleteNode(id)}
        style={{ position: 'absolute', top: 5, right: 5, background: 'red', color: '#fff', border: 'none', borderRadius: '50%', cursor: 'pointer' }}
      >
        X
      </button>
    </div>
  );
};

export default CustomNode;