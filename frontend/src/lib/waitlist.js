// Simple waitlist stored in localStorage (mock backend for now)

const KEY = "vizarto_waitlist";

export const getWaitlist = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};

export const addToWaitlist = ({ email, plan, audience }) => {
  const list = getWaitlist();
  const exists = list.find((e) => e.email === email && e.plan === plan);
  if (exists) return { ok: false, reason: "duplicate" };
  const entry = {
    id: crypto.randomUUID?.() || String(Date.now()),
    email,
    plan,
    audience,
    createdAt: new Date().toISOString(),
  };
  list.push(entry);
  localStorage.setItem(KEY, JSON.stringify(list));
  return { ok: true, entry };
};

export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
