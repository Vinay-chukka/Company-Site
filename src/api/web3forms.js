const endpoint = 'https://api.web3forms.com/submit';
const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();

export class ContactSubmissionError extends Error {}

export async function submitContact(formData) {
  if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
    return { sent: false };
  }

  formData.set('access_key', accessKey);
  formData.set('subject', 'New project enquiry · PageOrgin');
  formData.set('from_name', 'PageOrgin Website');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: formData,
    signal: AbortSignal.timeout(20000),
  });
  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.success) {
    throw new ContactSubmissionError(response.status === 429
      ? 'Too many requests. Please wait a moment and try again.'
      : 'Your message could not be sent. Please try again.');
  }

  return { sent: true };
}
