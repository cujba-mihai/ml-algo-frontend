import { useEffect, useState } from 'react';

export const DecisionTree = () => {
    const [imgSrc, setImgSrc] = useState(null);
    const [dataPoints, setDataPoints] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Convert the inputted data points into an array of tuples
        const parsedDataPoints = dataPoints.split(',').map(dp => {
            const [x, y] = dp.split(' ').map(Number);
            return [x, y];
        });

        const response = await fetch(`${process.env.SERVER_URL}/decision_tree`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data_points: parsedDataPoints }),
        });

        const data = await response.json();
        setImgSrc(data.decision_tree_image);
    };


    return (
        <>
            <h1>K-MEANS</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Data points (format: x1 y1,x2 y2,...):
                    <input type="text" value={dataPoints} onChange={(e) => setDataPoints(e.target.value)} required />
                </label>
                <button type="submit">Submit</button>
            </form>
            {imgSrc && <img src={imgSrc} alt="Decision Tree" />}
        </>
    );
}
