import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullCode: {
    html: `<!DOCTYPE html>
<html lang="en">

<head>
     <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AMILE - Interview and Learning Expert</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
   
    <div class="container">
        <h1>AMILE - Advanced Machine for Interview and Learning Expert</h1>
        <div class="feature">
            <h2>Diverse Interview Simulation</h2>
            <p>Practice technical, behavioral, and HR interviews.</p>
            <button class="btn" onclick="showFeedback('interview')">Start Mock Interview</button>
            <div id="interviewFeedback" class="feedback">Mock Interview Started!</div>
        </div>
        <div class="feature">
            <h2>Real-time Feedback</h2>
            <p>Get detailed, instant feedback on your responses.</p>
            <button class="btn" onclick="showFeedback('feedback')">Get Feedback</button>
            <div id="feedbackFeedback" class="feedback">Feedback Generated!</div>
        </div>
    </div>

</body>
<script src="script.js"></script>

</html>`,
    css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

 body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
            text-align: center;
        }
        .container {
            padding: 2rem;
        }
        .feature {
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
            margin: 1rem auto;
            max-width: 400px;
        }
        .feature h2 {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
        }
        .feature p {
            font-size: 1rem;
            color: #555;
        }
        .btn {
            background-color: #007bff;
            color: white;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 1rem;
        }
        .btn:hover {
            background-color: #0056b3;
        }
        .feedback {
            display: none;
            color: green;
            margin-top: 1rem;
        }`,
    javascript: `  function showFeedback(type) {
            if (type === 'interview') {
                document.getElementById('interviewFeedback').style.display = 'block';
            } else if (type === 'feedback') {
                document.getElementById('feedbackFeedback').style.display = 'block';
            }
        }`,
  },
  currentLanguage: "html",
};

const compilerSlice = createSlice({
  name: "compiler",
  initialState,
  reducers: {
    updateCurrentLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
    updateCodeValue: (state, action) => {
      state.fullCode[state.currentLanguage] = action.payload;
    },
  },
});

export const { updateCurrentLanguage, updateCodeValue } = compilerSlice.actions;
export default compilerSlice.reducer;
