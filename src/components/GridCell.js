import React from 'react';

const GridCell = ({ brightness, color }) => {
    // Set the background color based on brightness (illuminated or not)
    const backgroundColor = brightness ? color : 'black';

    return (
        <div
            style={{
                width: '20px', // Width of each grid cell
                height: '20px', // Height of each grid cell
                backgroundColor: backgroundColor, // Color of the cell
                transition: 'background-color 0.2s ease-in-out', // Smooth color transition
                border: '1px solid #222', // Optional: thin border for cells
            }}
        />
    );
};

export default GridCell;
