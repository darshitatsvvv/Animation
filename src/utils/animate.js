export const calculateHorizontalBrightness = (index, cols, rows, timeOffset, waveDirection) => {
    console.log(`Calculating brightness for cell index: ${index}`);
    const row = Math.floor(index / cols);
    const col = index % cols;

    // Calculate the horizontal wave position
    const wavePosition = col + timeOffset * cols * waveDirection;
    const distance = Math.abs(wavePosition - col);

    // Calculate brightness based on the distance from the wave
    const brightness = Math.max(0, 1 - distance * 0.5); // Adjust the multiplier for smoother waves
    console.log(`Brightness for index ${index} (row: ${row}, col: ${col}): ${brightness}`);
    return brightness;
};

export const startHorizontalAnimation = (grid, cols, rows, animationDuration, callback, onCycleComplete) => {
    console.log('Starting horizontal wave animation...');
    let start;
    let waveDirection = 1; // 1 = left-to-right, -1 = right-to-left
    const animationRef = { current: null };

    const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = (timestamp - start) % animationDuration;
        const normalizedProgress = progress / animationDuration;

        // Trigger callback when a cycle is complete
        if (progress === 0) {
            waveDirection *= -1; // Reverse direction
            console.log(`Cycle complete. Changing wave direction to: ${waveDirection}`);
            onCycleComplete();
        }

        const newGrid = grid.map((_, index) =>
            calculateHorizontalBrightness(index, cols, rows, normalizedProgress, waveDirection)
        );

        callback(newGrid);
        animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return animationRef;
};

export const stopAnimation = (animationRef) => {
    if (animationRef.current) {
        console.log('Stopping animation...');
        cancelAnimationFrame(animationRef.current);
    }
};
