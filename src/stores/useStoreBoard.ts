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
    topTree: (IBoard | undefined)[];
}


const useStoreBoard = create<StoreBoard>()
    ((set, get) => ({
        boards: [],
        topTree: [undefined,undefined,undefined],
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
            useStoreLoading.getState().setLoading(true);
            try {
                const boards = await storage.get<IBoard>("boards");
                const mapBoard: IBoard[] = boards.docs.sort((a, b) => a.data().score - b.data().score).map(c => ({ ...c.data(), id: c.id }));
                if(!mapBoard.length) return;
                if (mapBoard.length <= 3) {
                    mapBoard.sort((a, b) => b.score - a.score);
                    if (mapBoard.length === 1) {
                        set({ topTree: [undefined, mapBoard[0], undefined] });
                    }
                    else if (mapBoard.length === 2) {
                        set({ topTree: [mapBoard[1], mapBoard[0], undefined] });
                    }
                    else if (mapBoard.length === 3) {
                        set({ topTree: [mapBoard[1], mapBoard[0], mapBoard[2]] });
                    }
                } 
                
                const ranks = rankAndRearrange(mapBoard);
                    set({ boards: ranks });


            } catch (error) {
                console.log(error);
            } finally {
                useStoreLoading.getState().setLoading(false);
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