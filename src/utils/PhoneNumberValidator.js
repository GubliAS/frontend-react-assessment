import { parsePhoneNumberFromString } from 'libphonenumber-js';

// Validate a phone number. Returns boolean.
export function isValidPhone(value, defaultCountry = 'GH') {
  if (!value) return false;
  const str = String(value).trim();
  // try parse with country first (handles local formats like 0241234567)
  try {
    const phoneNumber = parsePhoneNumberFromString(str, defaultCountry);
    return !!(phoneNumber && phoneNumber.isValid());
  } catch (e) {
    return false;
  }
}

// Normalize to E.164 (or null if invalid)
export function toE164(value, defaultCountry = 'GH') {
  const phoneNumber = parsePhoneNumberFromString(String(value).trim(), defaultCountry);
  return phoneNumber && phoneNumber.isValid() ? phoneNumber.number : null;
}