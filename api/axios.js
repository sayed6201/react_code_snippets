================================
GET- Axios Fetching data on page reload
================================
  //only shows when there is data
    return (
    data.length > 0 && 
      <MUIDataTable
        title={"Employee"}
        data={data}
        columns={columns}
        options={options}
      />
  );

// EDIT: -> getting data

const HomeComponent = () => {
  const [data, setData] = React.useState([])

  useEffect(() => {
    axios
      .get(configData.SERVER_URL + "/api/getEmployeeList")
      .then((res) => {
        setData(res.data)
      })
  })

  return (
    {data.length > 0 && 
      <EmployeeComponent data={data} />
    }
  )
}