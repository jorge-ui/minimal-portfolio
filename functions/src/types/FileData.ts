interface Metadata {
	firebaseStorageDownloadTokens: string;
}

interface FileData {
	kind: string;
	id: string;
	selfLink: string;
	mediaLink: string;
	name: string;
	bucket: string;
	generation: string;
	metageneration: string;
	contentType: string;
	storageClass: string;
	size: string;
	md5Hash: string;
	contentDisposition: string;
	crc32c: string;
	etag: string;
	timeCreated: Date;
	updated: Date;
	timeStorageClassUpdated: Date;
	metadata: Metadata;
}

export default FileData;