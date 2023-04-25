// promise timer
await new Promise(resolve => setTimeout(resolve, 2000))



// running multiple async function parallelly
const getAnalyTicsData = async() =>{
    await Promise.all([
      getAppOpeningTime(),
      getMonthlyVisitEvents(),
      getDayWiseVisitsEvents(),
      getUniqueUserAppOpeningTime(),
      getVisitPerOSEvent(),
      getUniqueUserVisitPerOSEvent(),
      yearlyVisitEvents(),
      getNewUserEventData(),
      getCurrentMonthsVisitData(),
      getCurrentYearsVisitData()
    ]);
  }