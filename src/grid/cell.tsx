import React from "react";

const Cell: React.FC<{
    rowIndex: number;
    colIndex: number;
    color?: string;
}> = ({ color }) => {
    return <div style={{ backgroundColor: color }}></div>;
};

export default Cell;
