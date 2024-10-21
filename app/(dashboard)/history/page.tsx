import HistoryChart from '@/components/HistoryChart'
import { getUserByClerkId } from '@/utils/auth'
import { db } from '@/utils/db'
import React from 'react'

const getData = async () => {
    const user = await getUserByClerkId()
    const analyses = await db.analysis.findMany({
      where: {
        userId: user!.id,
      },
      orderBy: {
        createdAt: 'asc',
      },
    }) 
    // const total = analyses.reduce((acc, curr) => {
    //   return acc + curr.sentimentScore
    // }, 0)
    // const average = total / analyses.length
    // return { analyses, average }

    const sum = analyses.reduce((acc, current) => (acc + current.sentimentScore), 0)
    const avg = Math.round(sum / analyses.length)
    return { analyses, average: avg }
  }
const HistoryPage = async () => {
  const { average, analyses } = await getData();

  console.log(analyses);
  
  return (
    <div className="w-full h-full">
      <div>{`Avg. Sentinent ${average}`}</div>
      <div className="w-full h-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

export default HistoryPage