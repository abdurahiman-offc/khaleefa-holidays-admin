/**
 * Validates a phone number. Accepts:
 * - Indian: 10 digits, optional 0 or +91 prefix
 * - International: 10–15 digits
 */
export function isValidPhone(phone: string): boolean {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) return false;
    // Indian: 10 digits, or 11 with leading 0, or 12 with 91
    if (digits.length === 11 && digits.startsWith("0")) return true;
    if (digits.length === 12 && digits.startsWith("91")) return true;
    if (digits.length === 10) return true;
    return digits.length >= 10 && digits.length <= 15;
}

export const PHONE_ERROR_MESSAGE = "Please enter a valid 10-digit phone number (e.g. 9846123456 or +91 9846123456).";
