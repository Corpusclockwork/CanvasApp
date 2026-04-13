export interface UserDetails {
    id: number;
    name: string;
    colour: string,
    ownedCanvasIds: number[];
    collabCanvasIds: number[];
}

export interface CanvasDetails {
    id: number;
    name: string;
    size: [number, number],
    thumbnail: string;
    dateCreated: Date;
    lastEdited: Date;
    ownerId: number,
    collaboratorIds: number[];
}

export interface BasicUserDetails {
    id: number;
    username: string;
    colour: string
}