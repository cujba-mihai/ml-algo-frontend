"use client";
import { Button, Input, message } from 'antd';
import axios from 'axios';
import {useState} from "react";
import AprioriResponse from "@/components/AprioriResponse";

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

    const handleSend = () => {
        if (!inputValue) {
            return;
        }
        let transactionLines = [];
        let parsedTransactions = [];
        const countNewLines = inputValue.split('\n').length;

        if(countNewLines > 3) {
            transactionLines = inputValue.split('\n').map(val => val.trim()).filter(Boolean);
            parsedTransactions = transactionLines.map(line => line.trim().split(/\s|,\s/));
        } else {
            transactionLines = inputValue.split(/(?<=\w)\s|(?<=\w)\n/);
            parsedTransactions = transactionLines.map(group => group.trim().split(", ").filter(letter => letter.trim() !== ''));
        }

        const data = {
            transactions: parsedTransactions,
            min_support: parseFloat('0.2'),
            min_confidence: parseFloat('0.65'),
            min_lift: parseFloat('1'),
            min_length: parseInt('2')
        }

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.SERVER_URL}/apriori`.split('/').filter(Boolean).join('/'),
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios.request(config).then(response => {
            console.log(response.data);
            setResult(response.data);
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <div>
            <Input.TextArea
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Insert your input data here..."
                autoSize={{ minRows: 3, maxRows: 5 }}
            />
            <Button onClick={handleSend} type="primary" style={{ margin: '10px 0' }}>
                Send data
            </Button>

             <AprioriResponse result={result || null} />
        </div>
    );
}
