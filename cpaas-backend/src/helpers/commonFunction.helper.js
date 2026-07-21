const nullCheck = (value) => {
  if (value === "null" || value === "" || value === undefined) {
    return null;
  }
  return value;
};



const safeDecode = (value) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const  capitalizeFirstLetter=(str)=> {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}


const  getOrdinalRank=(rank)=> {
  if (rank % 100 >= 11 && rank % 100 <= 13) {
    return `${rank}th`;
  }

  switch (rank % 10) {
    case 1:
      return `${rank}st`;
    case 2:
      return `${rank}nd`;
    case 3:
      return `${rank}rd`;
    default:
      return `${rank}th`;
  }
}




module.exports = { nullCheck, safeDecode,capitalizeFirstLetter,getOrdinalRank };


