export function detectClient() {
  const ua = navigator.userAgent;

  // Detect browser and version
  const browsers = [
    [/Edg\/(\d+)/, "Edge"],
    [/OPR\/(\d+)/, "Opera"],
    [/Chrome\/(\d+)/, "Chrome"],
    [/Firefox\/(\d+)/, "Firefox"],
    [/Version\/(\d+).+Safari/, "Safari"],
  ];

  let browser: string | RegExp = "Unknown";
  let version = "";
  for (const [regex, name] of browsers) {
    const match = ua.match(regex);
    if (match) {
      browser = name;
      version = match[1];
      break;
    }
  }

  // Detect OS
  let os = "Unknown";
  if (/Windows NT/.test(ua)) os = "Windows";
  else if (/Mac OS X/.test(ua)) os = "macOS";
  else if (/Android/.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";
  else if (/Linux/.test(ua)) os = "Linux";

  // Detect device type
  let device = "desktop";
  if (/Mobi|Android/i.test(ua)) device = "mobile";
  else if (/iPad/.test(ua) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua))) device = "tablet";

  return { browser, version, os, device };
}
