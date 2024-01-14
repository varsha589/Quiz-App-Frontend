import React, { useState, useEffect } from "react";
import {  Document, Page } from "react-pdf";
import quizData from "../quizData";

function QuizCard() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = quizData[currentQuestionIndex];

  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(10);
  const [startTime, setStartTime] = useState(null);
  const [userResponses, setUserResponses] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const changeQuestion = () => {
    clearInterval(timer);
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionNumber(questionNumber + 1);
      setSelectedAnswer(null);
      setTimer(10);
      setStartTime(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    const endTime = new Date().getTime();
    const responseTime = endTime - startTime;
    const isCorrect = isCorrectAnswer(option);
    const response = {
      questionNumber,
      responseTime,
      correct: isCorrect,
    };
    setUserResponses([...userResponses, response]);
  };

  const isCorrectAnswer = (option) => {
    return option === currentQuestion.correct_answer;
  };

  useEffect(() => {
    if (timer > 0) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    } else {
      changeQuestion();
    }
  }, [timer, currentQuestion]);

  useEffect(() => {
    if (selectedAnswer === null) {
      setStartTime(new Date().getTime());
    }
  }, [selectedAnswer]);

  const downloadReport = () => {
    const pdfContent = (
      <Document>
        <Page>
          <h1>Quiz Report</h1>
          <ul>
            {userResponses.map((response, index) => (
              <li key={index}>
                Question {response.questionNumber}:{" "}
                {response.correct ? "Correct" : "Incorrect"} ({response.responseTime}ms)
              </li>
            ))}
          </ul>
        </Page>
      </Document>
    );

    const pdfBlob = new Blob([pdfContent], { type: "application/pdf" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = "quiz_report.pdf";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      <div className="bg-slate-200 rounded-lg shadow-md p-6 m-6">
        <h2 className="text-xl font-bold mb-4">
          Question {questionNumber}: {currentQuestion.question}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {[...currentQuestion.incorrect_answers, currentQuestion.correct_answer].map(
            (option, index) => (
              <button
                key={index}
                className={`${
                  selectedAnswer === option
                    ? isCorrectAnswer(option)
                      ? "bg-green-500"
                      : "bg-red-500"
                    : "bg-blue-500"
                } text-white py-2 px-3 rounded-md ${
                  selectedAnswer === null ? "hover:bg-blue-700" : ""
                } focus:outline-none focus:ring focus:border-blue-300`}
                onClick={() => handleAnswerClick(option)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            )
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-lg font-bold">Timer:</span> {timer}s
          </div>
          <button
            onClick={changeQuestion}
            className="bg-blue-400 py-2 px-3 rounded-lg hover:bg-blue-700 text-white"
          >
            Next
          </button>
        </div>
      </div>
      {quizFinished && (
        <div className="bg-slate-200 rounded-lg shadow-md p-6 m-6">
          <h3 className="text-lg font-bold mt-4">Your Responses:</h3>
          <ul>
            {userResponses.map((response, index) => (
              <li key={index}>
                Question {response.questionNumber}:{" "}
                {response.correct ? "Correct" : "Incorrect"} ({response.responseTime}ms)
              </li>
            ))}
          </ul>
          <div className="flex justify-end mt-4">
            <button
              onClick={downloadReport}
              className="bg-blue-400 py-2 px-3 rounded-lg hover:bg-blue-700 text-white"
            >
              Download Report
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default QuizCard;
