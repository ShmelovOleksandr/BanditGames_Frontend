export interface Player {
    playerId: string;
    username: string;
    color: string;
}

export interface PieceData {
    x: number;
    y: number;
    isKing: boolean;
    pieceColor: string;
}

export interface GameState {
    isFinished: boolean;
    winnerId: string;
    isDraw: boolean;
    currentPlayer: string;
    players: Player[];
    pieces: PieceData[];
}
