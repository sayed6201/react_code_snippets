<>
<Typography sx={{color:'white', fontSize:28, fontWeight:'bold'}}>
Videos will diplay here
</Typography>

<Typography 
    variant="subtitle1" 
    fontWeight="bold" 
    color="#FFF">
        {/* only showing first 60 chars */}
    {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
</Typography>

<Typography variant="h6">
          {channelDetail?.snippet?.title}{' '}
          <CheckCircleIcon sx={{ fontSize: '14px', color: 'gray', ml: '5px' }} />
        </Typography>

</>