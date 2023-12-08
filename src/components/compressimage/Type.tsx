// minutes * 60 + seconds
export interface TimeProp 
{
	[key: string]:number;
}

interface ItemProps {
	uncompressedFile: string;
	compressedFile?: string;
	fileSize: string;  // in kb
	downloadLinK: string;
	id: string;
	timeLeft: TimeProp;
	setTimeLeft: any;

	// countdown: null | {minutesLeft:number, secondsLeft:number};
}

export interface TableRowProps {
	item: ItemProps;
	index: number;
}

