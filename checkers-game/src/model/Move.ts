import {Position} from "@/model/Position.ts";

export interface Move {
    moveType: string;
    initialPosition: Position;
    intermediatePosition: Position[];
    finalPosition: Position;
}