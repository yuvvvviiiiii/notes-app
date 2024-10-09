const formatDateAndTime = (date = Date.now()) => {
  const newDate = new Date(date);

  const formatDate = newDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: "numeric",
  })

  const formatTime = newDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  })

  console.log("Date:",formatDate, "Time:", formatTime);
  return {
    date: formatDate,
    time: formatTime,
  }

};

export default formatDateAndTime;