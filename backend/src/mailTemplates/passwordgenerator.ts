function generatePassword(length: number, options: { includeUppercase?: boolean; includeLowercase?: boolean; includeNumbers?: boolean; includeSpecial?: boolean; } = {}): string {
    const {
        includeUppercase = true,
        includeLowercase = true,
        includeNumbers = true,
        includeSpecial = true,
    } = options;

    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let charset = '';
    if (includeLowercase) charset += lowercaseChars;
    if (includeUppercase) charset += uppercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSpecial) charset += specialChars;

    if (charset.length === 0) {
        throw new Error('At least one character set must be selected.');
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    return password;
}

// Example usage
const passwordLength = 12; // Set the desired password length
const passwordOptions = {
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecial: true,
};

const generatedPassword = generatePassword(passwordLength, passwordOptions);
console.log(`Generated Password: ${generatedPassword}`);
export default generatePassword;