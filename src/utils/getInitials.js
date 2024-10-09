const getInitials = (name) => {
  const words = name.trim().split(" ");
  //groupName has more than one words.
  if(words.length > 1) {
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  } 
  //groupName has one word.
    return words[0].substring(0, 2).toUpperCase();
}

export default getInitials;