export default function timeTransfer(time) {
  // const time = new Date("2024-1-3");
  // console.log("time", time);
  const year = time.getFullYear();
  const month = time.getMonth();
  const day = time.getDate();
  const timeTransfered = `${year}-${
    month + 1 < 10 ? "0" + (month + 1) : month + 1
  }-${day < 10 ? "0" + day : day}`;
  return timeTransfered;
}
