import React, { useState, useEffect } from 'react';
import GridCell from './GridCell';
import { colors } from '../utils/colors';

const Grid = ({ rows = 10, cols = 20 }) => {
    const [grid, setGrid] = useState(Array(rows * cols).fill(0)); // Initialize the grid
    const [colorIndex, setColorIndex] = useState(0); // Track current color index
    const [direction, setDirection] = useState(1); // Direction: 1 for right, -1 for left
    const [currentCol, setCurrentCol] = useState(0); // Current column position
    const animationSpeed = 200; // Speed of animation (ms per frame)

    useEffect(() => {
        const animate = () => {
            setGrid((prevGrid) => {
                const newGrid = Array(rows * cols).fill(0); // Reset grid
                for (let row = 0; row < rows; row++) {
                    const index = row * cols + currentCol; // Calculate index for each row's active column
                    newGrid[index] = 1; // Set brightness to 1 for active cells
                }
                return newGrid;
            });

            setCurrentCol((prevCol) => {
                if (direction === 1 && prevCol >= cols - 1) {
                    // Change direction and color when reaching the last column
                    setDirection(-1);
                    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
                    return cols - 2; // Start moving back
                } else if (direction === -1 && prevCol <= 0) {
                    // Change direction when reaching the first column
                    setDirection(1);
                    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
                    return 1; // Start moving forward
                }
                return prevCol + direction; // Move in the current direction
            });
        };

        const interval = setInterval(animate, animationSpeed);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [direction, currentCol, cols, rows, animationSpeed]);

    return (
        <div
            className="grid-container"
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 20px)`, // Define columns dynamically
                gridTemplateRows: `repeat(${rows}, 20px)`, // Define rows dynamically
                gap: '1px', // Add spacing between cells
                justifyContent: 'center', // Center the grid
                alignItems: 'center',
            }}
        >
            {grid.map((brightness, index) => (
                <GridCell
                    key={index}
                    brightness={brightness}
                    color={colors[colorIndex]}
                />
            ))}
        </div>
    );
};

export default Grid;
