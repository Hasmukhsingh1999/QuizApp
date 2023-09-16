"use client";
import React, { useState, useEffect } from "react";
import SelectField from "./SelectField";
import { Box, Button } from "@mui/material";
import TextFieldComp from "./TextFieldComp";
import { getData } from "@/utils/constants";
import { all_api } from "@/utils/api";
import Link from "next/link";
// Event handlers cannot be passed to client component props

const difficultyOptions = [
  { id: "easy", name: "Easy" },
  { id: "medium", name: "Medium" },
  { id: "hard", name: "Hard" },
];

const typesOptions = [
  { id: "multiple", name: "Multiple Choise" },
  { id: "Boolean", name: "True/False" },
];

const Settings = () => {
  const [showQuiz, setshowQuiz] = useState([]);
  const fetchApi = async () => {
    try {
      const resp = await getData(all_api);
      console.log(resp);
      setshowQuiz(resp);
    } catch (error) {
      console.log("Message", error);
    }
  };
  useEffect(() => {
   
    fetchApi();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <SelectField options={showQuiz.trivia_categories} label="Category" />
      <SelectField options={difficultyOptions} label="Mode" />
      <SelectField options={typesOptions} label="Type" />
      <TextFieldComp />
      <Box mt={3} width="100%">
        <Link href={"/routes/questions"}>
          <Button fullWidth variant="contained" type="submit">
            Get Started
          </Button>
        </Link>
      </Box>
    </form>
  );
};

export default Settings;
