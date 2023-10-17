import { CourseEvent, ModuleChoice } from "@/app/(layoutNavbar)/edt/types";
import { API_URL } from "@/config/const";
import ApiFilter from "@/utils/apiFilter";

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
