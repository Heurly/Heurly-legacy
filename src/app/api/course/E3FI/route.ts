import { SUMMARY_MAP } from "@/course-config.json"

export async function POST(request: Request) {
  const { data } = await request.json();
  const icalReplaced: Record<string, any> = replaceSummary(data);
    
  return new Response(icalReplaced as BodyInit, { headers: {"Content-Type": "application/json"} });
}

function replaceSummary(icalData: Record<string, any>): Record<string, any> {
  for (const key in icalData) {
    icalData[key] = SUMMARY_MAP[icalData[key].SUMMARY as keyof typeof SUMMARY_MAP];
  }

  return icalData;
}