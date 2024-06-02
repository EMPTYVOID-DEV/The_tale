import { ZodSchema, z } from 'zod';
import type { ActionStatus } from './types.global';

export const emailSchema = z.string().email('Invalid email address');

export const isNumberSchema = z.string().max(1).regex(/^\d$/);

export const passwordSchema = z
	.string()
	.min(8, { message: 'Password must be at least 8 characters long' })
	.regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
	.regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
	.regex(/\d/, { message: 'Password must contain at least one number' })
	.regex(/[!@#$%^&*(),.?"':{}|<>]/, {
		message: 'Password must contain at least one special character'
	});

export const usernameSchema = z
	.string()
	.min(4, {
		message: 'Username must at least 4 characters long'
	})
	.max(28, { message: 'Username must be no bigger than 28 characters' });

export const writingNameSchema = z
	.string()
	.min(4, { message: 'Writing name must be at least four letters' })
	.max(48, { message: 'Writing name must no bigger than 48 letters' });

export const descriptionSchema = z.string().refine(
	(val) => {
		const wordCount = val.trim().split(/\s+/).length;
		return wordCount <= 200;
	},
	{ message: 'The word count exceeded 160' }
);

export const referenceTitleSchema = z
	.string()
	.min(4, { message: 'Title need to be at least four letters.' })
	.max(18, { message: 'Title length must be no bigger than 18 letters.' });

export const hrefSchema = z.string().regex(/^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\/[\w.-]*)*\/?$/, {
	message: 'Reference link needs to be a url.'
});

export const sectionNameSchema = z
	.string()
	.min(3, { message: 'Section name must be at least 3 letters long' })
	.max(24, { message: "Section name lenght can't exceed 24 letters" });

export function getValidator(schema: ZodSchema): (text: string) => ActionStatus {
	return (text: string) => {
		const parseResult = schema.safeParse(text);
		if (parseResult.success == true) return { state: 'valid', errorMsg: '' };
		else return { state: 'invalid', errorMsg: parseResult.error.errors[0].message };
	};
}
