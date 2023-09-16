// Import statements for React, Redux, and other dependencies
"use client";
import React, { useEffect, useState } from "react";
import { getData } from "@/utils/constants";
import { Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { handleScoreChange } from "@/redux/actions";

const Page = () => {
  const [showQue, setshowQue] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  // const [score, setscore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score
  } = useSelector((state) => state);

  // Build the API URL based on user selections
  let get_amount_api = `https://opentdb.com/api.php?amount=${amount_of_question}`;

  if (question_category) {
    get_amount_api += `&category=${question_category}`;
  }

  if (question_difficulty) {
    get_amount_api += `&difficulty=${question_difficulty}`;
  }

  if (question_type) {
    get_amount_api += `&type=${question_type}`;
  }

  // Function to fetch questions from the API
  const fetchApi = async () => {
    try {
      const resp = await getData(get_amount_api);
      if (!resp || !resp.results || resp.results.length === 0) {
        throw new Error("No questions available");
      }
      setshowQue(resp);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  // Function to handle user's answer selection
  const handleClickAnswer = (e) => {
    const question = showQue.results[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      console.log(e.target.textContent === question.correct_answer)
      dispatch(handleScoreChange(score + 1));
    }
    if (questionIndex + 1 < showQue.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      router.push('/routes/scores'); 
    }
  };

  // Function to generate random index for answer options
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  // State to store answer options for the current question
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (showQue?.results && showQue.results.length > 0) {
      const question = showQue.results[questionIndex];
      const answer = [...question.incorrect_answers];
      answer.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answer);
    }
  }, [showQue, questionIndex]);

  return (
    <Box
    textAlign={"center"}
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh" 
  >
    {showQue.results && showQue.results.length > 0 ? (
      <>
        <Typography variant="h4">Question {questionIndex + 1}</Typography>
        <Typography mt={5}>
          {showQue.results[questionIndex].question}
        </Typography>
        {options.map((data, id) => (
          <Box mt={2} key={id}>
            <Button onClick={handleClickAnswer} variant="contained">
              {data}
            </Button>
          </Box>
        ))}
  
        <Box mt={2} variant="contained" color="primary">
          Score: {score}/{showQue.results.length}
        </Box>
      </>
    ) : (
      <Typography variant="h4">Loading...</Typography>
    )}
  </Box>
  
  );
};

export default Page;

