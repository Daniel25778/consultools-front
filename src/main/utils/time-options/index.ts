export const timeOptions = Array.from({ length: 96 }).map((_, i) => {
  const hour = Math.floor(i / 4)
    .toString()
    .padStart(2, '0');
  const minute = ((i % 4) * 15).toString().padStart(2, '0');
  const time = `${hour}:${minute}`;
  return { label: time, value: time };
});
