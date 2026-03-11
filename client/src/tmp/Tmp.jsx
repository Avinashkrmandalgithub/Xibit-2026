import React from 'react'
import { socket } from '../socket/socket.js'
import { useEffect } from 'react';

const Tmp = () => {
    const sendQuery = () => {
        console.log("Sending socket query...");
        socket.emit("query", {
            apiKey: "b3fb3177-a9ff-4ed5-9939-5753cec54724",
            query: "who is tarapada skills",
        });
        console.log("Socket query emitted");
    };

    useEffect(() => {
        const onResponse = (payload) => {
            console.log("Socket Response:", payload);
        };

        socket.on("response", onResponse);

        return () => {
            socket.off("response", onResponse);
        };
    }, []);
    return (
        <div
            onClick={sendQuery}
            style={{ padding: "20px", background: "lightblue", cursor: "pointer" }}
        >
            Click to send socket query
        </div>
    )
}

export default Tmp