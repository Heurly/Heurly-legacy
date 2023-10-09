export const PLANIF_ENDPOINT = (modules: number[]) =>
    `https://planif.esiee.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=${modules.join(',')}&projectId=11&calType=ical&nbWeeks=52`;