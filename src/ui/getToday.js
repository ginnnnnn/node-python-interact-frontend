const getToday = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = ("0" + (now.getMonth() + 1)).slice(-2);
  const d = ("0" + now.getDate()).slice(-2);
  const today = `${y}/${m}/${d}`;
  return today;
};

export default getToday;
