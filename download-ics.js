// public/js/download-ics.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('icsForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));
    const res = await fetch('/download-ics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const icsText = await res.text();
    const blob = new Blob([icsText], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'event.ics';
    a.click();
    URL.revokeObjectURL(url);
  });
});