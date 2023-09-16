"use client"
import { Typography,Box,Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { handleAmountChange, handleScoreChange } from '@/redux/actions'

const page = () => {
  const { score } = useSelector(state => state)
  const router = useRouter();
  const dispatch = useDispatch()
  const handlebackToSetting = () =>{
    dispatch(handleScoreChange(0))
    dispatch(handleAmountChange(50))
    router.push('/')
  }
  return (

    <Box mt={30} textAlign={"center"}>
      <Typography variant="h3" fontWeight="bold" mb={3}>
        Final Score {score}
        </Typography>
        <Button variant="outlined" onClick={handlebackToSetting}>
          Back to quiz
        </Button>
    </Box>
  )
}

export default page

