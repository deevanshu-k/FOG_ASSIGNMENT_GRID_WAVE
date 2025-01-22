import React, { useEffect, useState } from "react";
import Cell from "./cell";

const Grid: React.FC = () => {
    const rows = 15; // Number of rows
    const cols = 20; // Number of columns
    const defaultColor = "#000";
    const trailColors = [
        "rgb(83,248,0)",
        "rgb(40,212,0)",
        "rgb(0,165,0)",
        "rgb(0,120,1)",
        "rgb(0,85,0)",
        "rgb(0,43,1)",
    ]; // Fading trail colors

    const [grid, setGrid] = useState<string[][]>(
        Array.from({ length: rows }, () => Array(cols).fill(defaultColor))
    );
    const [currCol, setCurrCol] = useState<number>(19);

    useEffect(() => {
        let dir = -1; // Initial direction

        const t = setInterval(() => {
            setCurrCol((prevCol) => {
                const nextCol = prevCol + dir;
                if (nextCol === cols) dir = -1; // Reverse at the right edge
                if (nextCol === -1) dir = 1; // Reverse at the left edge
                updateGrid(nextCol, dir); // Update the grid with trail effect
                return nextCol;
            });
        }, 100); // 200 milliseconds

        const updateGrid = (col: number, dir: number) => {
            setGrid(() => {
                // Initialize a new grid with the default color
                let newGrid = Array.from({ length: rows }, () =>
                    Array(cols).fill(defaultColor)
                );

                for (let k = 0; k < trailColors.length; k++) {
                    // Calculate the column index for the trail
                    const idx = col - k * dir;

                    // Ensure the index stays within bounds
                    if (idx >= 0 && idx < cols) {
                        newGrid = newGrid.map((r) => {
                            r[idx] = trailColors[k];
                            return r;
                        });
                    }
                }

                return newGrid;
            });
        };

        return () => clearInterval(t); // Cleanup on unmount
    }, []);
    return (
        <div className="grid grid-cols-20 gap-2 aspect-[20/15] h-[95vh]">
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <Cell
                        color={cell}
                        key={`${rowIndex}-${colIndex}`}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                    />
                ))
            )}
        </div>
    );
};

export default Grid;
