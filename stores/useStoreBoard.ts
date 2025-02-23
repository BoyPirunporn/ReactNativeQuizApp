import { storageFirebase } from '@/config/firebaseConfig';
import { FirebaseService } from '@/services/firebaseService';
import { create } from 'zustand';
import useStoreLoading from './useStoreLoading';
import useStoreAuth from './useStoreAuth';

const storage = new FirebaseService(storageFirebase);

interface StoreBoard {
    boardRef?: string;
    boards: Array<IBoard>;
    setBoard: (board: MasterBoard) => void;
    remove: (id: string) => Promise<void>;
    fetchBoard: () => Promise<void>;
    topTree: IBoard[];
}


const useStoreBoard = create<StoreBoard>()
    ((set, get) => ({
        boards: [],
        topTree: [],
        setBoard: async (board: MasterBoard) => {
            const query = storage.queryWhere<MasterBoard>("boards", "playerName", "==", board.playerName);
            const id = await storage.getByPlayerName(query);
            if (id) {
                await storage.update(id, board);
            } else {
                await storage.save(
                    {
                        name: "boards"
                    },
                    { ...board }
                );
            }
            get().fetchBoard();
        },
        remove: async (id: string) => {
            await storage.delete(id);
            get().fetchBoard();
        },
        fetchBoard: async () => {
            useStoreLoading.getState().setLoading();
            try {
                const boards = await storage.get<IBoard>("boards");
                const mapBoard: IBoard[] = boards.docs.sort((a, b) => a.data().score - b.data().score).map(c => ({ ...c.data(), id: c.id }));
                const ranks = rankAndRearrange(mapBoard);
                set({ boards: ranks, topTree: ranks.slice(0, 3) });

            } catch (error) {
                console.log(error);
            } finally {
                useStoreLoading.getState().setLoading();
            }
        }
    }),
    );


const rankAndRearrange = (data: IBoard[]) => {
    const sorted = [...data].sort((a, b) => b.score - a.score);
    if (sorted.length < 3) return sorted;
    return [sorted[1], sorted[0], sorted[2], ...sorted.slice(3)];
};


export default useStoreBoard;