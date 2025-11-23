// server/utils/validateInput.js
export const validateLoginInput = ({ email }) => {
  if (!email) return { valid: false, error: 'Email is required' };
  if (!email.includes('@')) return { valid: false, error: 'Invalid email' };
  return { valid: true };
};
