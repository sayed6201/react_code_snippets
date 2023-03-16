// ====================================================================
//  WEB app event capturer functions:
// ====================================================================


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


  const getAppOpeningTime = async() => {
    const res = await getDoc(doc(db, "visits", "opens"));
    let num = parseInt(res?.data()?.num)
    console.log('getAppOpeningTime', num)
    setTotalVisits(num)
  }

  const getNewUserEventData = async() => {
    const collectionId = `${getCurrentDateData()[1]}-${getCurrentDateData()[2]}`
    const res = await getDoc(doc(db, "new-users", collectionId));
    if(res.exists()){
      setNewUserNUmber(res.data()?.data.length)
      console.log('setNewUserNUmber', res.data()?.data.length)
    }else{
      setNewUserNUmber(0)
    }
  }

  const getUniqueUserAppOpeningTime = async() => {
    const res = await getDoc(doc(db, "unique-visits", "visits"));
    const userVisitMap = res?.data()?.visitPerUser
    const num =  Object.keys(userVisitMap).length
    console.log('getUniqueUserAppOpeningTime', userVisitMap)
    console.log('getUniqueUserAppOpeningTime length ', num)
    setNumberOfVisitedUniqueUser(num)
  }

  const getVisitPerOSEvent = async() => {
    const res = await getDoc(doc(db, "device", "num"));
    let deviceMap = res?.data()?.data
    console.log('visitPerOSEvent',deviceMap)
    setVisitPerOS(deviceMap)
  }

  const getUniqueUserVisitPerOSEvent = async() =>{
    const resAndroid = await getDoc(doc(db, "device", 'android'));
    let mapUsersDeviceAndroid = resAndroid?.data()?.data
    const resIos = await getDoc(doc(db, "device", 'ios'));
    let mapUsersDeviceIos = resIos?.data()?.data

    const numOfAndroidUser = Object.keys(mapUsersDeviceAndroid).length
    const numOfIOSUser = Object.keys(mapUsersDeviceIos).length

    console.log('mapUsersDeviceAndroid',numOfAndroidUser)
    console.log('mapUsersDeviceIos',numOfIOSUser)

    setUniqueVisiterPerOSAndroid(numOfAndroidUser)
    setUniqueVisiterPerIOS(numOfIOSUser)

  }

  const getDayWiseVisitsEvents = async() => {

    console.log('getDayWiseVisitsEvents')

    const collectionId = `${getCurrentDateData()[1]}-${getCurrentDateData()[2]}`
    const dayNum = getCurrentDateData()[3]+''
    const res = await getDoc(doc(db,"day-visits", collectionId));

    let dayMap  = null 
    if(res.exists()) {

     dayMap  = res?.data()?.day
     let dayArray = []
     for(let i =1; i<=7; i++){
       dayArray[i-1] = parseInt(dayMap[i]  ?? 0 )
     }

     console.log('dayArray', dayArray)
     setWeeklyTraffic(dayArray)

    }else{
      setWeeklyTraffic([])
    }
  }

  const getMonthlyVisitEvents = async() => {
    let monthMap = new Map()
    const thisYear = getCurrentDateData()[2]+''
    console.log('thisYear',thisYear)

    const querySnapshot = await getDocs(collection(db, "visit-month"));
    querySnapshot.forEach((doc) => {
      if(thisYear === `${doc.id.toString().split('-')[1]}`){
        console.log(`months -> ${doc.id.toString().split('-')[0]}`)
        monthMap.set(`${doc.id.toString().split('-')[0]}`,parseInt(doc?.data()?.num))
      }
    });
    console.log(`monthMap`,monthMap);
    setMonthlyTrafficData( getMonthlyTrafficDataArr(monthMap))
  }

  const [currentMonthsData, setCurrentMonthsData] = useState()

  const getCurrentMonthsVisitData = async() => {
    const collectionId = `${getCurrentDateData()[1]}-${getCurrentDateData()[2]}`
    const res = await getDoc(doc(db, "visit-month", collectionId));
    if(res.exists()){
      setCurrentMonthsData(parseInt(res.data()?.num))
    }else{
      setCurrentMonthsData(0)
    }
  }

  const [currentYearData, setCurrentYearData] = useState()
  const getCurrentYearsVisitData = async() => {
    const collectionId = `${getCurrentDateData()[2]}`
    const res = await getDoc(doc(db, "visit-year", collectionId));
    if(res.exists()){
      setCurrentYearData(parseInt(res.data()?.num))
    }else{
      setCurrentYearData(0)
    }
  }

  const getMonthlyTrafficDataArr = (mapData)=>{
    console.log('mapdata',mapData)
    const currentMonth = getCurrentDateData()[1]+''
    let monthlyArr = [
    ]
    for (let i = 1; i <= currentMonth; i++) {
      monthlyArr[i-1] = mapData.get(i+'')
    }

    console.log('monthlyArr', monthlyArr)
    return monthlyArr
  }

  const yearlyVisitEvents = async() => {
    const collectionId = `${getCurrentDateData()[2]}`
    const querySnapShot = await getDocs(collection(db,"visit-year"));
    let yearLabel = []
    let yearlyTraffic = []

    querySnapShot.forEach((doc)=> {
      yearLabel.push(doc?.id+"")
      yearlyTraffic.push(parseInt(doc?.data()?.num) ?? 0)
    })

    console.log('yearLabel',yearLabel)
    console.log('yearlyTraffic',yearlyTraffic)

    setYearLabel(yearLabel)
    setYearlyTraffic(yearlyTraffic)
    
  }



// ====================================================================
//Mobile app event capturer functions:
// ====================================================================

const newUserEventDataFetch = async() => {
    console.log('newUserEvent')
    const querySnapshot = await getDocs(collection(db, "new-users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }

  const updateAppOpeningTime = async() => {
    const res = await getDoc(doc(db, "visits", "opens"));
    let num = parseInt(res?.data()?.num)
    num += 1    
    await updateDoc(doc(db, "visits", 'opens'), {
      'num' : num
    });
  }

  const updateUniqueUserAppOpeningTime = async() => {

    const userName= user?.username
    const res = await getDoc(doc(db, "unique-visits", "visits"));
    let userVisitMap = res?.data()?.visitPerUser

    if(!userVisitMap[userName]){
      userVisitMap[userName] = '1'
    }else{
      let num = parseInt(userVisitMap[userName])
      num += 1
      userVisitMap[userName] = num+''
    }
    console.log('userVisitMap', userVisitMap)

    await updateDoc(doc(db, "unique-visits", "visits"), {
      'visitPerUser' : userVisitMap
    });
  }

  const visitPerOSEvent = async() =>{

    const res = await getDoc(doc(db, "device", "num"));
    let deviceMap = res?.data()?.data

    console.log('deviceMaopp',deviceMap)
   
    if (Platform.OS === 'ios') {
      let num = parseInt(deviceMap['ios'])
      num += 1
      deviceMap['ios'] = num
    } else if (Platform.OS === 'android') {
      let num = parseInt(deviceMap['android'])
      num += 1
      deviceMap['android'] = num
    }
    console.log('deviceMap', deviceMap)

    await updateDoc(doc(db,"device", "num"), {
      data : deviceMap
    });

  }

  const uniqueUserVisitPerOSEvent = async() =>{

    const userName= user?.username
    const docId = Platform.OS

    console.log('docId-docId',docId)

    const res = await getDoc(doc(db, "device", docId));
    let mapUsersDevice = res?.data()?.data

    if(mapUsersDevice[userName]){
      let num = parseInt(mapUsersDevice[userName])
      num += 1
      mapUsersDevice[userName] = num
    }else{
      mapUsersDevice[userName] = '1'
    }

    console.log('mapUsersDevice',mapUsersDevice)

    await updateDoc(doc(db,"device", docId), {
      data : mapUsersDevice
    });

  }

  const dayWiseVisitsEvents = async() => {
    const collectionId = `${getCurrentDateData()[1]}-${getCurrentDateData()[2]}`

    const dayNum = getCurrentDateData()[3]+''
    const res = await getDoc(doc(db,"day-visits", collectionId));

    if(!res.exists()) {

      await setDoc(doc(db,"day-visits", collectionId), { 
        'day' : {
          [dayNum] : '1'
        }
      });
    }else{
      let dayMap  = res?.data()?.day
      if(!dayMap[dayNum]){
        dayMap[dayNum+''] = '1'
      }else{
        let num = parseInt(dayMap[dayNum+''])
        num += 1
        dayMap[dayNum+'']  = num
      }
      console.log('dayMap[]', dayMap)

      await updateDoc(doc(db, "day-visits", collectionId), {
        'day' : dayMap
      });
    }
  }

  const monthlyVisitEvents = async() => {


    const collectionId = `${getCurrentDateData()[1]}-${getCurrentDateData()[2]}`

    const res = await getDoc(doc(db,"visit-month", collectionId));

    if(!res.exists()) {

      await setDoc(doc(db,"visit-month", collectionId), { 
        'num' : '1'
      });
    }else{
      let num  = parseInt(res?.data()?.num)
      num += 1
      await updateDoc(doc(db, "visit-month", collectionId), {
        'num' : num
      });
    }
  }

  const yearlyVisitEvents = async() => {


    const collectionId = `${getCurrentDateData()[2]}`

    const res = await getDoc(doc(db,"visit-year", collectionId));

    if(!res.exists()) {

      await setDoc(doc(db,"visit-year", collectionId), { 
        'num' : '1'
      });
    }else{
      let num  = parseInt(res?.data()?.num)
      num += 1
      await updateDoc(doc(db, "visit-year", collectionId), {
        'num' : num
      });
    }
  }
