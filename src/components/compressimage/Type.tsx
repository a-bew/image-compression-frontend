import { Dispatch, SetStateAction } from "react";

// minutes * 60 + seconds
export interface TimeProp 
{
	[key: string]:number;
}

export type ShowDropdownMenuProp = {
	[key: string]: boolean;
} | null;

export interface ItemProps {
	uncompressedFile: string;
	compressedFile?: string;
	fileSize: string;  // in kb
	downloadLinK: string;
	id: string;
	timeLeft: TimeProp;
	setTimeLeft: any;
	showDropdownMenu:ShowDropdownMenuProp;
	setShowDropdownMenu:  Dispatch<SetStateAction<ShowDropdownMenuProp>>;
	// countdown: null | {minutesLeft:number, secondsLeft:number};
}

export interface TableRowProps {
	item: ItemProps;
	index: number;
}

