import type { ComponentType } from "react";
import {
  OverviewMock,
  CalendarMock,
  AvailabilityMock,
  WaitlistMock,
} from "./schedule";
import { PatientsMock, ServicesMock, RemindersMock, PatientProfileMock } from "./patients";
import { InvoicesMock, AnalyticsMock } from "./finance";
import {
  ProfileMock,
  AccountMock,
  PlansMock,
  InviteMock,
  UsersMock,
} from "./account";

const mocks: Record<string, ComponentType> = {
  overview: OverviewMock,
  calendar: CalendarMock,
  availability: AvailabilityMock,
  waitlist: WaitlistMock,
  patients: PatientsMock,
  "patient-profile": PatientProfileMock,
  services: ServicesMock,
  reminders: RemindersMock,
  invoices: InvoicesMock,
  analytics: AnalyticsMock,
  profile: ProfileMock,
  account: AccountMock,
  plans: PlansMock,
  invite: InviteMock,
  users: UsersMock,
};

export function TopicMock({ slug }: { slug: string }) {
  const Mock = mocks[slug];
  if (!Mock) return null;
  return <Mock />;
}
