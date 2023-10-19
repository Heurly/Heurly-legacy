import { CourseEvent, ModuleChoice } from "@/app/(layoutNavbar)/edt/types";
import { API_URL } from "@/config/const";
import ApiFilter from "@/utils/apiFilter";

export type EdtData = {
  data: CourseEvent[];
  first: Date;
  last: Date;
};

export async function fetchEDTData(
  dateFilter: ApiFilter<number>,
  modules: ModuleChoice[],
  fromServer: boolean = false,
): Promise<CourseEvent[]> {
  if (modules == undefined || modules.length <= 0) return [];

  const payload = {
    dateFilter: dateFilter,
    modules: modules.map((m) => m.code),
  };

  const endpoint = `${
    fromServer ? process.env.NEXTAUTH_URL : ""
  }${API_URL}/edt`;
  const data = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  try {
    const resp = await data.json();

    return resp.VCALENDAR[0].VEVENT as CourseEvent[];
  } catch (e) {
    console.log(
      "[ERROR] Failed to retrieve EDT data fetching from: " + API_URL + "/edt",
    );
  }

  return [];
}

export function isSameCourse(c1: CourseEvent, c2: CourseEvent) {
  return (
    c1.DTSTART == c2.DTSTART &&
    c1.DTEND == c2.DTEND &&
    c1.SUMMARY == c2.SUMMARY &&
    c1.DESCRIPTION == c2.DESCRIPTION &&
    c1.LOCATION == c2.LOCATION
  );
}
