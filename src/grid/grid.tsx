import React, { useEffect, useState } from "react";
import Cell from "./cell";

const Grid: React.FC<{ rows: number; cols: number; defaultColor: string }> = ({
    rows,
    cols,
    defaultColor,
}) => {
    // Predefined sets of trail colors
    const colorSets = [
        [
            "rgb(83,248,0)",
            "rgb(40,212,0)",
            "rgb(0,165,0)",
            "rgb(0,120,1)",
            "rgb(0,85,0)",
            "rgb(0,43,1)",
        ],
        [
            "rgb(248,83,0)",
            "rgb(212,40,0)",
            "rgb(165,0,0)",
            "rgb(120,0,1)",
            "rgb(85,0,0)",
            "rgb(43,0,1)",
        ],
        [
            "rgb(0,83,248)",
            "rgb(0,40,212)",
            "rgb(0,0,165)",
            "rgb(0,0,120)",
            "rgb(0,0,85)",
            "rgb(0,0,43)",
        ],
    ];
    const [trailColorsIdx, setTrailColorsIdx] = useState<number>(0);
    // const [trailColors, setTrailColors] = useState<string[]>(colorSets[0]);

    useEffect(() => {
        const colorTrailIntervalId = setInterval(() => {
            setTrailColorsIdx((p) => (p + 1) % colorSets.length);
        }, 2000);

        return () => clearInterval(colorTrailIntervalId);
    }, []);

    const grid = Array.from({ length: rows }, () => Array(cols).fill(0));
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
                                ? colorSets[trailColorsIdx][
                                      stripes.findIndex((p) => p === colIndex)
                                  ]
                                : defaultColor
                        }
                        key={`${rowIndex}-${colIndex}-${cell}`}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                    />
                ))
            )}
        </div>
    );
};

export default Grid;
