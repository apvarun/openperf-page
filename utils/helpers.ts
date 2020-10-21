export const num = (value: number) => new Intl.NumberFormat().format(value);
export const percent = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);

export const time = (value: string) => {
  const input = parseFloat(value);
  let hours = Math.floor(input / 3600);
  let minutes = Math.floor((input - hours * 3600) / 60);
  let seconds = input - hours * 3600 - minutes * 60;

  return `${hours ? `${hours}h` : ""} ${minutes ? `${minutes}m` : ""} ${
    seconds ? `${seconds.toFixed(0)}s` : ""
  }`;
};
