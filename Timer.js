//1 sec delay.....
setTimeout(() => {
    fetch('http://localhost:8000/blogs')
    .then(res => {
      return res.json();
    })
    .then(data => {
      setIsPending(false);
      setBlogs(data);
    })
  }, 1000);