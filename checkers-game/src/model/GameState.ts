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
    currentPlayer: string;
    players: Player[];
    pieces: PieceData[];
}
