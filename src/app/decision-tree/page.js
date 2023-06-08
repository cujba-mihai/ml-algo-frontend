"use client";
import { useState } from 'react';
import { Image } from 'antd';
const DecisionTree = () => {
    const [imgSrc, setImgSrc] = useState(null);
    const [steps, setSteps] = useState([]);
    const [conclusion, setConclusion] = useState({});
    const [dataPoints, setDataPoints] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Convert the inputted data points into an array of tuples
        const parsedDataPoints = dataPoints.split('),').map(dp => {
            dp = dp.replace('(', '').replace(')', '').trim();
            const [x, y] = dp.split(',').map(num => eval(num.trim()));
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
        setSteps(data.steps);
        setConclusion(data.conclusion);
    };

    return (
        <>
            <h1>Decision Tree</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Data points (format: (x1, y1), (x2, y2), ...):
                    <input type="text" value={dataPoints} onChange={(e) => setDataPoints(e.target.value)} required />
                </label>
                <button type="submit">Submit</button>
            </form>
            {imgSrc &&
                <Image
                    width={200}
                    src={`${imgSrc}`}
                />
            }
            <div>
                <h2>Steps:</h2>
                <ul>
                    {steps.map((step, index) => (
                        <li key={index}>
                            Feature: {step.feature}, Threshold: {step.threshold}, Left Child: {step.left_child}, Right Child: {step.right_child}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Conclusion:</h2>
                Number of classes: {conclusion.num_classes}
                <br />
                Class labels: {conclusion.class_labels && conclusion.class_labels.join(', ')}
            </div>
        </>
    );
}

export  default  DecisionTree;