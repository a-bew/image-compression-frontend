interface ItemProps {
	uncompressedFile: string;
	compressedFile?: string;
	fileSize: string;  // in kb
	downloadLinK?: string;
}

export interface TableRowProps {
	item: ItemProps;
	index: number;
}

