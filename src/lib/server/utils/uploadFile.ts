import { put } from '@vercel/blob';
import path from 'path';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import { writeFile } from 'fs/promises';
import { dev } from '$app/environment';

export function uploadFile(file: File, name: string, subsystem: string) {
	if (dev) return localUpload(file, name, subsystem);
	return vercelUpload(file, name, subsystem);
}

async function vercelUpload(file: File, name: string, subsystem: string) {
	const filePath = path.join(subsystem, name);
	const { url } = await put(filePath, file, {
		access: 'public',
		token: BLOB_READ_WRITE_TOKEN,
		cacheControlMaxAge: 0,
		addRandomSuffix: false
	});
	return url;
}

async function localUpload(file: File, name: string, subsystem: string) {
	const filePath = path.join('static', subsystem, name);
	const arryaBuffer = await file.arrayBuffer();
	await writeFile(filePath, Buffer.from(arryaBuffer));
	return `/${subsystem}/${name}`;
}
