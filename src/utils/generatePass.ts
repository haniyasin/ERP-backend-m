export function generateRandomPassword(): string {
  const length: number = Math.floor(Math.random() * 7) + 10; // Random length between 10 and 16
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const symbols = '!@#$%^&*()';
  const numbers = '0123456789';
  let password = '';

  // Select one random character from each character set
  const randomUppercase: string = uppercaseLetters.charAt(
    Math.floor(Math.random() * uppercaseLetters.length),
  );
  const randomLowercase: string = lowercaseLetters.charAt(
    Math.floor(Math.random() * lowercaseLetters.length),
  );
  const randomSymbol: string = symbols.charAt(
    Math.floor(Math.random() * symbols.length),
  );
  const randomNumber: string = numbers.charAt(
    Math.floor(Math.random() * numbers.length),
  );

  // Add the selected characters to the password
  password += randomUppercase;
  password += randomLowercase;
  password += randomSymbol;
  password += randomNumber;

  // Add random characters until the password reaches the desired length
  const remainingLength: number = length - 4;
  for (let i = 0; i < remainingLength; i++) {
    const randomIndex: number = Math.floor(
      Math.random() *
        (uppercaseLetters.length +
          lowercaseLetters.length +
          symbols.length +
          numbers.length),
    );
    if (randomIndex < uppercaseLetters.length) {
      password += uppercaseLetters.charAt(randomIndex);
    } else if (
      randomIndex <
      uppercaseLetters.length + lowercaseLetters.length
    ) {
      password += lowercaseLetters.charAt(
        randomIndex - uppercaseLetters.length,
      );
    } else if (
      randomIndex <
      uppercaseLetters.length + lowercaseLetters.length + symbols.length
    ) {
      password += symbols.charAt(
        randomIndex - uppercaseLetters.length - lowercaseLetters.length,
      );
    } else {
      password += numbers.charAt(
        randomIndex -
          uppercaseLetters.length -
          lowercaseLetters.length -
          symbols.length,
      );
    }
  }

  // Shuffle the password characters randomly
  const passwordArray: string[] = password.split('');
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }

  return passwordArray.join('');
}
