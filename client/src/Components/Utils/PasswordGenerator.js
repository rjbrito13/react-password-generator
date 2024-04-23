export const generateRandomPassword = (length, checkboxState) => {
  let charset = "";
  let password = "";

  if (checkboxState.uppercase) {
    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (checkboxState.lowercase) {
    charset += "abcdefghijklmnopqrstuvwxyz";
  }
  if (checkboxState.numbers) {
    charset += "0123456789";
  }
  if (checkboxState.symbols) {
    charset += "!@#$%^&*()_+";
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};
