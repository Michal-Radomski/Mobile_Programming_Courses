import dayjs from "dayjs";

export function calculateBiorhythms(birthDate: string, targetDate: string) {
  return {
    physical: calculateBiorhythm(birthDate, targetDate, 23),
    emotional: calculateBiorhythm(birthDate, targetDate, 28),
    intellectual: calculateBiorhythm(birthDate, targetDate, 33),
  };
}

export function calculateBiorhythmSeries(birthDate: string, centralDate: string, range: number) {
  const series = [];
  const centralDay = dayjs(centralDate);
  for (let diff = -range; diff <= range; diff++) {
    const targetDay = centralDay.add(diff, "day");
    const biorhythms = calculateBiorhythms(birthDate, targetDay as any);
    series.push({ date: targetDay.format("D MMM"), ...biorhythms });
  }
  return series;
}

function calculateBiorhythm(birthDate: string, targetDate: string, cycle: number) {
  const birthDay = dayjs(birthDate);
  const targetDay = dayjs(targetDate);
  const diff = targetDay.diff(birthDay, "day");
  return Math.sin((2 * Math.PI * diff) / cycle);
}
