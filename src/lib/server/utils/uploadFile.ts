import { put } from '@vercel/blob';
import path from 'path';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export async function uploadFile(file: File, name: string, subsystem: string) {
	const filePath = path.join(subsystem, name);
	const { url } = await put(filePath, file, {
		access: 'public',
		token: BLOB_READ_WRITE_TOKEN
	});
	return url;
}
