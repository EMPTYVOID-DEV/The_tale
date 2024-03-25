import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email address');

const passwordSchema = z
	.string()
	.min(8, { message: 'Password must be at least 8 characters long' })
	.regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
	.regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
	.regex(/\d/, { message: 'Password must contain at least one number' })
	.regex(/[!@#$%^&*(),.?"':{}|<>]/, {
		message: 'Password must contain at least one special character'
	});

const usernameSchema = z
	.string()
	.min(4, { message: 'Username need to be at least four characters long' });

export function validateUsername(username: string): {
	state: 'valid' | 'invalid';
	errorMsg: string;
} {
	const parseResult = usernameSchema.safeParse(username);
	if (parseResult.success == true) return { state: 'valid', errorMsg: '' };
	else return { state: 'invalid', errorMsg: parseResult.error.errors[0].message };
}

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
