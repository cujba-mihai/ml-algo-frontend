"use client";
import React, { useState } from "react";
import { Input, Button, List, Image } from "antd";
import axios from "axios";

const KMeans = () => {
    const [imgSrc, setImgSrc] = useState([]);
    const [iterations, setIterations] = useState([]);
    const [dataPoints, setDataPoints] = useState('');
    const [nClusters, setNClusters] = useState(2);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Convert the inputted data points into an array of tuples
        const parsedDataPoints = dataPoints.split('),').map(dp => {
            dp = dp.replace('(', '').replace(')', '').trim();
            const [x, y] = dp.split(',').map(num => eval(num.trim()));
            return [x, y];
        });

        const response = await fetch(`${process.env.SERVER_URL}/decision_tree/kmeans`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data_points: parsedDataPoints, n_clusters: nClusters }),
        });

        const data = await response.json();
        setIterations(data.iterations);
        const images = data.iterations.map(i => i.plot_image);
        setImgSrc(images);
    };

    return (
        <>
            <h1>K-Means</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Data points (format: (x1, y1), (x2, y2), ...):
                    <input type="text" value={dataPoints} onChange={(e) => setDataPoints(e.target.value)} required />
                </label>
                <label>
                    Number of clusters:
                    <input type="number" value={nClusters} onChange={(e) => setNClusters(e.target.value)} min={2} required />
                </label>
                <button type="submit">Submit</button>
            </form>
            {iterations.map((iteration, index) => (
                <div key={index}>
                    <h2>Iteration {index + 1}</h2>
                    <img src={`${imgSrc[index]}`} alt={`Iteration ${index + 1}`} />
                    <div>
                        Centroids: {iteration.centroids.map(c => `(${c[0]}, ${c[1]})`).join(', ')}
                    </div>
                </div>
            ))}
        </>
    );
};

export default KMeans;
