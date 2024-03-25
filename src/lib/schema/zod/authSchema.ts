import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email address');

const passwordSchema = z
	.string()
	.min(8, { message: 'Password must be at least 8 characters long' })
	.regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
	.regex(/\d/, { message: 'Password must contain at least one number' })
	.regex(/\*?_-!~\$%\^&/, { message: 'Password must contain at least one special character' });

export function validateEmail(email: string): { state: 'valid' | 'invalid'; errorMsg: string } {
	const parseResult = emailSchema.safeParse(email);
	if (parseResult.success == true)
		return {
			state: 'valid',
			errorMsg: ''
		};
	else
		return {
			errorMsg: parseResult.error.errors[0].message,
			state: 'invalid'
		};
}

export function validatePassword(password: string): {
	state: 'valid' | 'invalid';
	errorMsg: string;
} {
	const parseResult = passwordSchema.safeParse(password);
	if (parseResult.success == true) return { state: 'valid', errorMsg: '' };
	else return { state: 'invalid', errorMsg: parseResult.error.errors[0].message };
}
