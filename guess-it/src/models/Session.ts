
export interface Session {
    sessionId: string;
}


export interface Response {
    sessionId: string;
    currentPlayerId: string;
    isFinished: boolean;
    winnerId: string;
}