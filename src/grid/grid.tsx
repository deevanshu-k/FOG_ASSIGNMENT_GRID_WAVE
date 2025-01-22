import React, { useEffect, useState } from "react";
import Cell from "./cell";

const Grid: React.FC<{ rows: number; cols: number; defaultColor: string }> = ({
    rows,
    cols,
    defaultColor,
}) => {
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
    const [stripes, setStripes] = useState<number[]>([
        cols - 6,
        cols - 5,
        cols - 4,
        cols - 3,
        cols - 2,
        cols - 1,
    ]);

    useEffect(() => {
        const dir: number[] = [-1, -1, -1, -1, -1, -1];
        const t = setInterval(() => {
            setStripes((p) => {
                return p.map((n, i) => {
                    const next = n + dir[i];
                    if (next === cols) dir[i] = -1;
                    if (next === -1) dir[i] = 1;
                    return next;
                });
            });
        }, 100);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="grid grid-cols-20 gap-2 aspect-[20/15] h-[95vh]">
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <Cell
                        color={
                            stripes.includes(colIndex)
                                ? trailColors[
                                      stripes.findIndex((p) => p === colIndex)
                                  ]
                                : "black"
                        }
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
