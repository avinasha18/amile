import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { Skeleton } from "@mui/material";
import { flask_domain } from "./actions/api";

function InterviewApp() {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [gotQuestion, setgotQuestion] = useState(false)
    const [gotResponse, setGotResponse] = useState(false);
    const [conversationHistory, setConversationHistory] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the first interview question
        axios
            .get(flask_domain + `/ask-question`)
            .then((res) => {
                const initialQuestion = res.data.question;
                setQuestion(initialQuestion);
                setgotQuestion(true);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleRecord = async () => {
        try {
            const res = await axios.post(flask_domain + `/transcribe`, {
                duration: 10,
                sample_rate: 16000,
                question: question,
                conversationHistory: conversationHistory,  // Pass the conversation history to the backend
            });

            if (res.data.response) {
                const newResponse = res.data.audio;
                setResponse(newResponse);
                setGotResponse(true);

                // Update conversation history
                const newHistory = [
                    ...conversationHistory,
                    { question: question, response: newResponse },
                ];
                setConversationHistory(newHistory);
                console.log(newHistory)
                // Set the next question
                setQuestion(res.data.response);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEnd = async () => {
        try {
            const res = await axios.post(flask_domain + `/feedback`, {
                conversation_history: conversationHistory,
            });
            const feedbackScore = res.data;
    
            // Navigate to the feedback page with the score
            navigate('/feedback', { state: { score: feedbackScore } });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="flex flex-row gap-96 md:gap-40">
                <div>
                    <p className="text-2xl font-semibold my-16">Question</p>
                    {
                        gotQuestion ? (
                            <p className="mt-16 text-xl tracking-wider">{question}</p>
                        ) : (
                            <div className="flex flex-col items-center">
                                <Skeleton animation="wave" className="animate-pulse" width={560} />
                                <Skeleton animation="wave" className="animate-pulse" width={460} />
                                <Skeleton animation="wave" className="animate-pulse" width={560} />
                                <Skeleton animation="wave" className="animate-pulse" width={460} />
                                <Skeleton animation="wave" className="animate-pulse" width={560} />
                            </div>
                        )
                    }
                </div>
                <div className="flex flex-col items-center gap-14">
                    <h1 className="text-5xl font-bold">AI Interviewer</h1>
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            height: "50px",
                            padding: "0px 20px"
                        }}
                        onClick={handleRecord}
                    >
                        Record Audio
                    </Button>
                    <p className="text-xl font-semibold">AI Response</p>
                    {gotResponse ? (
                        <p className="text-xl"> {response} </p>
                    ) : (
                        <div className="flex flex-col items-center">
                            <Skeleton animation="wave" className="animate-pulse" width={460} />
                            <Skeleton animation="wave" className="animate-pulse" width={560} />
                            <Skeleton animation="wave" className="animate-pulse" width={460} />
                        </div>
                    )}
                </div>
            </div>
            <Button
                variant="contained"
                sx={{
                    borderRadius: "20px",
                    height: "50px",
                    padding: "0px 20px",
                    float: "right",
                    marginTop: "100px"
                }}
                onClick={handleEnd}
            >
                End Interview
            </Button>
        </>
    );
}

export default InterviewApp;
