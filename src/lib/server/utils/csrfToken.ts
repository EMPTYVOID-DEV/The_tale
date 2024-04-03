import jwt, { type JwtPayload } from 'jsonwebtoken';
import { JWT_KEY } from '$env/static/private';

export function createCsrfToken(userId: string) {
	return jwt.sign({ id: userId }, JWT_KEY, {
		allowInsecureKeySizes: false,
		expiresIn: 60 * 60 * 7
	});
}

export function verifyCsrfToken(token: string) {
	try {
		const decoded = jwt.verify(token, JWT_KEY) as JwtPayload;
		return decoded.id;
	} catch (error) {
		return null;
	}
}
