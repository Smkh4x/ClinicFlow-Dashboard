export const P = [
  ["Amina El Idrissi", "BK482913", "+212 661 204 817", "1988-03-14", "12 Rue Ibn Sina, Casablanca"],
  ["Youssef Benani", "BE317745", "+212 662 918 340", "1975-11-02", "45 Bd Zerktouni, Casablanca"],
  ["Salma Tazi", "JA220381", "+212 670 553 192", "1996-07-21", "8 Av. Hassan II, Rabat"],
  ["Omar Cherkaoui", "BH904422", "+212 655 730 046", "1962-01-30", "23 Rue Allal Ben Abdellah, Fès"],
  ["Nadia Lahlou", "BJ118876", "+212 664 281 903", "2001-09-09", "3 Rue Moulay Youssef, Casablanca"],
  ["Karim Alaoui", "BL556120", "+212 661 407 755", "1983-05-17", "90 Bd Anfa, Casablanca"],
  ["Hind Berrada", "BK730914", "+212 668 119 268", "1970-12-04", "17 Rue Oued Zem, Rabat"],
  ["Reda Mansouri", "BE662301", "+212 673 845 521", "1992-02-26", "6 Rue de Marseille, Casablanca"]
].map((r, i) => ({
  id: i,
  n: r[0],
  cin: r[1],
  ph: r[2],
  bd: r[3],
  ad: r[4]
}));

export const A = [
  ["09:00", 0, "Confirmed", "Annual check-up"],
  ["09:30", 3, "Confirmed", "Blood pressure follow-up"],
  ["10:15", 2, "Pending", "Skin rash consultation"],
  ["11:00", 5, "Pending", "Lab results review"],
  ["11:45", 1, "Confirmed", "Vaccination"],
  ["14:00", 4, "Cancelled", "General consultation"],
  ["15:30", 6, "Pending", "Prescription renewal"],
  ["16:15", 7, "Confirmed", "Post-op follow-up"]
].map((r, i) => ({
  t: r[0] as string,
  p: r[1] as number,
  s: r[2] as string,
  r: r[3] as string,
  d: `2026-09-${String(30 - (i % 3) * 2).padStart(2, '0')}`
}));

export const pat = (id: number) => P.find(p => p.id === id) || P[0];
