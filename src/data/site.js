export const navigation = [
  ['Home', '#home'],
  ['Services', '#services'],
  ['Projects', '#projects'],
  ['About', '#about'],
  ['Pricing', '#pricing'],
  ['Contact', '#contact'],
];

export const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'hello@example.com';
export const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '');

export function art(name) {
  return import.meta.env.BASE_URL + 'art/' + name + '.webp';
}

export function selectService(name) {
  window.dispatchEvent(new CustomEvent('pageorgin:project-type', { detail: name }));
}

export function selectPlan(name) {
  window.dispatchEvent(new CustomEvent('pageorgin:pricing-plan', { detail: name }));
}
