/* ============================
 useEffect: 
 making recursive API call
    * gets called whenever the dependecy array or userList changes
    * you can recursively call api and push data to this list
 ============================ */

 useEffect(() => {
        if(userList.Users != null){
        console.log("useEffect userList")
        console.log(userList)
        console.log("userList size")
        console.log(userList.Users.length)
        pageUsersList(userList)
        console.log("contacts")
        console.log(contacts)
        }
    }, [userList]);

    // API calling and setting up a consition so that it stops after reaching certain state
    const pageUsersList = async (userList) => {
        var tempList = {...userList};

        if(tempList.PaginationToken === "") {
            console.log("last page reached...")
            // setState({ ...state, isLoading: false })
            return;
        }
        try {
            const apiData = await API.graphql({
                query: listUsersPaging,
                variables: {
                    PaginationToken: userList.PaginationToken,
                    UserPoolId: Auth.userPool.userPoolId
                },
                errorPolicy: "all",
            })s
                console.log("apiData")
                console.log(JSON.stringify (apiData))
                tempList.Users = [
                    ...tempList.Users,
                    ...JSON.parse(apiData.data.listUsersPaging).Users,
                ];

                // //Checks for new pagingation token and updates
                if (JSON.parse(apiData.data.listUsersPaging).PaginationToken) {
                    tempList.PaginationToken = JSON.parse(
                        apiData.data.listUsersPaging
                    ).PaginationToken;
                } else {
                    tempList.PaginationToken = "";
                }
                setUserList(tempList);
        } catch (e) {
            console.log(e);
        }
    }