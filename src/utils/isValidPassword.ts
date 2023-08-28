export function validatePassword(password: string): boolean {
  // Check if password is not empty
  if (!password) {
    return false;
  }

  // Check password length
  if (password.length < 10 || password.length > 16) {
    return false;
  }

  // Check if password contains at least one symbol, one capital letter, and one lowercase letter
  const symbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  const capitalLetterRegex = /[A-Z]/;
  const lowercaseLetterRegex = /[a-z]/;

  if (
    !symbolRegex.test(password) ||
    !capitalLetterRegex.test(password) ||
    !lowercaseLetterRegex.test(password)
  ) {
    return false;
  }

  // Password passed all validations
  return true;
}
