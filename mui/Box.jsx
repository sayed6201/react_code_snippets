<Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
    <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
    <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
    {title}
    </Typography>
    <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
    <Link to={`/channel/${channelId}`}>
        <Typography variant={{ sm: "subtitle1", md: 'h6' }}  color="#fff" >
        {channelTitle}
        <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
        </Typography>
    </Link>
    <Stack direction="row" gap="20px" alignItems="center">
        <Typography variant="body1" sx={{ opacity: 0.7 }}>
        {parseInt(viewCount).toLocaleString()} views
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.7 }}>
        {parseInt(likeCount).toLocaleString()} likes
        </Typography>
    </Stack>
    </Stack>
</Box>