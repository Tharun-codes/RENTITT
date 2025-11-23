// client/components/loader.js

export function showLoading() {
  const loadingEl = document.getElementById('loadingText');
  if (loadingEl) {
    loadingEl.classList.remove('hidden');
    loadingEl.textContent = 'Loading listings...';
  }
}

export function hideLoading() {
  const loadingEl = document.getElementById('loadingText');
  if (loadingEl) {
    loadingEl.classList.add('hidden');
  }
}

export function showError(message) {
  const errorEl = document.getElementById('errorText');
  if (errorEl) {
    errorEl.classList.remove('hidden');
    errorEl.textContent = message || 'Something went wrong';
  }
}

export function hideError() {
  const errorEl = document.getElementById('errorText');
  if (errorEl) {
    errorEl.classList.add('hidden');
    errorEl.textContent = '';
  }
}
