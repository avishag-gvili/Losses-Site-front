const validateEmail = (email: string) => {
    const re =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
};

const validatePhoneNumber = (phoneNumber: string): boolean => {
    // בדיקה אם המספר הוא ספרות בלבד ואורך המספר בין 9 ל-15 תווים
    return /^[0-9]{9,15}$/.test(phoneNumber);
};
const validatePassword = (password: string) => {
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    
    return password.length >= 8 && hasNumber && hasUppercase && hasLowercase && hasSpecialCharacter;
};
export { validateEmail, validatePassword ,validatePhoneNumber};