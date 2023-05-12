export const PLANIF_ENDPOINT =
  "https://planif.esiee.fr/jsp/custom/modules/plannings/anonymous_cal.jsp";

export interface EDTData {}

export function URLBuilder(url: string, params: { [key: string]: string }) {
    let newUrl = url;
    for (const [key, value] of Object.entries(params)) {
        newUrl = newUrl.replace(`:${key}`, value);
    }
    return newUrl;
}