/*========================================================
crolling to bottom in chat screen
========================================================*/


const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    ></div>