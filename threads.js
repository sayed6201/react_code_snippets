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