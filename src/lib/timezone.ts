import { formatInTimeZone, fromZonedTime, toZonedTime } from "date-fns-tz";
import type { Locale } from "date-fns";

export const CLINIC_TIME_ZONE = "Asia/Baghdad";

export function formatClinicTime(
  date: Date | string | number,
  pattern: string,
  options?: { locale?: Locale }
): string {
  return formatInTimeZone(new Date(date), CLINIC_TIME_ZONE, pattern, options);
}

export function clinicParse(dateStr: string, timeStr: string): Date {
  return fromZonedTime(`${dateStr} ${timeStr}`, CLINIC_TIME_ZONE);
}

export function toClinicZone(date: Date | string | number): Date {
  return toZonedTime(new Date(date), CLINIC_TIME_ZONE);
}