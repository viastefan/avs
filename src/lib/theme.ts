/** Theme resolution.
 *
 *  The site follows the clock unless a visitor has said otherwise: from
 *  18:00 until 07:00 it renders dark, in between light. A visitor's own
 *  choice is stored and always wins. */

export type ThemeChoice = "auto" | "light" | "dark";
export type Theme = "light" | "dark";

export const NIGHT_FROM = 18;
export const NIGHT_UNTIL = 7;

export const THEME_KEY = "theme";

/** Dark from 18:00 through 06:59, light for the rest of the day. */
export function themeForHour(hour: number): Theme {
  return hour >= NIGHT_FROM || hour < NIGHT_UNTIL ? "dark" : "light";
}

export function resolveTheme(choice: ThemeChoice, now: Date = new Date()): Theme {
  return choice === "auto" ? themeForHour(now.getHours()) : choice;
}

export function readChoice(): ThemeChoice {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark" || stored === "auto") return stored;
  } catch {
    /* private mode — fall through to auto */
  }
  return "auto";
}

export function writeChoice(choice: ThemeChoice) {
  try {
    if (choice === "auto") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, choice);
  } catch {
    /* nothing to do — the attribute below still applies for this visit */
  }
}

export function applyTheme(choice: ThemeChoice, now: Date = new Date()) {
  const root = document.documentElement;
  root.setAttribute("data-theme", resolveTheme(choice, now));
  root.toggleAttribute("data-theme-auto", choice === "auto");
}

/** Runs before paint so the first frame is already in the right theme. */
export const themeBootScript = `(function(){try{
var s=localStorage.getItem("${THEME_KEY}");
var c=(s==="light"||s==="dark")?s:"auto";
var h=new Date().getHours();
var t=c==="auto"?((h>=${NIGHT_FROM}||h<${NIGHT_UNTIL})?"dark":"light"):c;
var r=document.documentElement;
r.setAttribute("data-theme",t);
if(c==="auto")r.setAttribute("data-theme-auto","");
}catch(e){}})();`;
