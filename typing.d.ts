interface IQuestion {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correctAnswer: string;
    chooses: string[];
}

interface MasterBoard {
    score: number;
    playerName: string;
    answer?: IAnswer[];
    questions?: IQuestion[];
}
interface IBoard extends MasterBoard {
    id: string;
}

interface IQuistionExtend extends IQuestion {
    id: string;
}
interface IAnswer {
    id: string;
    asnwer: string;
    correct: string;
}
interface IScore {
    correct: number;
    incorrect: number;
    result: string;
}