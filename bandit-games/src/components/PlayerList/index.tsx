import { useState, useMemo } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
} from "@nextui-org/react";
import { usePaginatedPlayers } from "@/hooks/usePaginatedPlayers";

export default function PlayerList() {
    const { players, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
        usePaginatedPlayers();
    const rowsPerPage = 10;
    const [page, setPage] = useState(1);

    // Total pages for client-side pagination
    const totalPages = useMemo(
        () => Math.ceil(players.length / rowsPerPage),
        [players.length]
    );

    // Slice data for current page
    const paginatedPlayers = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return players.slice(start, start + rowsPerPage);
    }, [page, players]);

    return (
        <div className="p-6 bg-gray-800 text-black rounded-lg shadow-md">
            <h3 className="text-white text-xl font-bold mb-4">Our players information table:</h3>
            <Table
                aria-label="Paginated Player List"
                classNames={{
                    wrapper: "min-h-[222px]",
                }}
            >
                <TableHeader>
                    <TableColumn key="playerId">PLAYER ID</TableColumn>
                    <TableColumn key="playerName">NAME</TableColumn>
                    <TableColumn key="age">AGE</TableColumn>
                    <TableColumn key="gender">GENDER</TableColumn>
                    <TableColumn key="country">COUNTRY</TableColumn>
                    <TableColumn key="city">CITY</TableColumn>
                    <TableColumn key="churn">CHURN RATE</TableColumn>
                    <TableColumn key="firstMoveWinProbability">WIN PROBABILITY</TableColumn>
                    <TableColumn key="playerClass">PLAYER CLASS</TableColumn>
                </TableHeader>
                <TableBody items={paginatedPlayers}>
                    {(item) => (
                        <TableRow key={item.playerId}>
                            <TableCell>{item.playerId}</TableCell>
                            <TableCell>{item.playerName}</TableCell>
                            <TableCell>{item.age}</TableCell>
                            <TableCell>{item.gender}</TableCell>
                            <TableCell>{item.country}</TableCell>
                            <TableCell>{item.city}</TableCell>
                            <TableCell>{item.churn.toFixed(2)}</TableCell>
                            <TableCell>{item.firstMoveWinProbability.toFixed(2)}</TableCell>
                            <TableCell>{item.playerClass}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="mt-4 flex justify-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="secondary"
                    page={page}
                    total={totalPages}
                    onChange={(page) => setPage(page)}
                />
            </div>

            {isLoading && <p className="text-center mt-4">Loading data...</p>}

            {hasNextPage && !isLoading && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => fetchNextPage()}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? "Loading more..." : "Load More Data"}
                    </button>
                </div>
            )}
        </div>
    );
}
