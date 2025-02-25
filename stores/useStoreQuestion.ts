import { create } from 'zustand';
import useStoreBoard from './useStoreBoard';
import useStoreLoading from './useStoreLoading';
import he from 'he';
interface StoreQuestion {
    loading: boolean;
    question: IQuistionExtend[];
    clearQuestionState: () => void;
    asnwers: Array<IAnswer>;
    score: IScore | null;
    findAnswers: (id: string) => IAnswer | null;
    compare: () => Promise<IScore>;
    onSelect: (v: string, id: string, correct: string) => void;
    onValidate: () => boolean;
    setQuestion: () => void;
    setLoading: () => void;
    onSubmit: boolean;
    playerName: string;
    setPlayerName: (p: string) => void;
    totalQuestion: number;
    currentQuestion: number;
    nextQuestion: () => void;
    prveQuestion: () => void;
    flag: "VIEW" | "INIT",
    categories: {
        id: number;
        label: string;
    }[],
    category: {
        id: number,
        label: string;
    };
    setCategory: (c: {
        id: number,
        label: string;
    }) => void;

}

const CATEGORIES = [
    { id: 10, label: "Entertainment: Books" },
    { id: 11, label: "Entertainment: Film" },
    { id: 12, label: "Entertainment: Music" },
    { id: 13, label: "Entertainment: Musicals & Theatres" },
    { id: 144, label: "Entertainment: Television" },
    { id: 15, label: "Entertainment: Video Games" },
    { id: 16, label: "Entertainment: Board Games" },
    { id: 17, label: "Science & Nature" },
    { id: 18, label: "Science: Computers" },
    { id: 19, label: "Science: Mathematics" },
    { id: 20, label: "Mythology" },
    { id: 21, label: "Sports" },
    { id: 22, label: "Geography" },
    { id: 23, label: "History" },
    { id: 24, label: "Politics" },
    { id: 25, label: "Art" },
    { id: 26, label: "Celebrities" },
    { id: 27, label: "Animals" },
    { id: 28, label: "Vehicles" },
    { id: 29, label: "Entertainment: Comics" },
    { id: 30, label: "Science: Gadgets" },
    { id: 31, label: "Entertainment: Japanese Anime & Manga" },
    { id: 32, label: "Entertainment: Cartoon & Animations" },
];

const useStoreQuestion = create<StoreQuestion>()(
    (set, get) => {
        return ({
            categories: CATEGORIES,
            category: CATEGORIES[0],
            question: [],
            asnwers: [],
            loading: false,
            totalQuestion: 20,
            playerName: "",
            currentQuestion: 0,
            flag: "INIT",
            setCategory: (category: {
                id: number,
                label: string;
            }) => set({ category }),
            nextQuestion: () => {
                if (get().currentQuestion === get().question.length - 1) {
                    return;
                }
                let current = get().currentQuestion;
                current++;
                return set({ currentQuestion: current });
            },
            prveQuestion: () => {
                if (get().currentQuestion === 0) return;
                let current = get().currentQuestion;
                current--;
                set({ currentQuestion: current });
            },
            setPlayerName: (name: string) => {
                set({ playerName: name });
            },
            score: null,
            onSubmit: false,
            clearQuestionState: () => set({
                loading: false,
                playerName: "",
                question: [],
                asnwers: [],
                onSubmit: false,
                currentQuestion: 0,
                flag: "INIT",
            }),
            setLoading: () => set({ loading: !get().loading }),
            setQuestion: async () => {
                useStoreLoading.getState().setLoading(true);
                set({
                    asnwers: []
                });
                await delay(2 * 1000);
                const response = await fetch(`https://opentdb.com/api.php?amount=${get().totalQuestion}&type=multiple&category=${get().category}`, {
                    method: "GET"
                });

                const json = await response.json();
                const questions = json.results.map((e: any) => ({
                    type: e.type,
                    difficulty: e.difficulty,
                    category: e.category,
                    question: e.question,
                    correctAnswer: e.correct_answer,
                    chooses: e.incorrect_answers
                }));
                set({ question: randomQuestion(get().totalQuestion, questions) });
                useStoreLoading.getState().setLoading(false);
                return Promise.resolve();
            },
            findAnswers: (id: string) => {
                const asnwer = get().asnwers.find(asw => asw.id === id);
                if (!asnwer) return null;
                return asnwer;
            },
            onSelect: (v: string, id: string, correct: string) => {
                const exists = get().asnwers.find(a => a.id === id);
                set({
                    asnwers: exists ? get().asnwers.map(e => {
                        if (e.id === id) {
                            e.asnwer = v;
                        }
                        return e;
                    }) : [...get().asnwers, { id, asnwer: v, correct }]
                });
            },
            compare: async (): Promise<IScore> => {
                useStoreLoading.getState().setLoading(true);
                const correct = get().asnwers.reduce((prv, cur) => prv += cur.correct === cur.asnwer ? 1 : 0, 0);
                const incorrect = get().asnwers.reduce((prv, cur) => prv += cur.correct !== cur.asnwer ? 1 : 0, 0);
                const score = {
                    result: String(`${correct}/${get().question.length}`),
                    correct,
                    incorrect,
                };
                set({
                    score
                });
                useStoreBoard.getState().setBoard({
                    score: score.correct,
                    playerName: useStoreQuestion.getState().playerName!,
                    answer: get().asnwers,
                    questions: get().question
                });
                useStoreQuestion.getState().clearQuestionState();
                useStoreLoading.getState().setLoading(false);
                return score;
            },
            onValidate: () => {
                if (get().asnwers.length !== get().question.length) return false;
                return true;
            }
        });
    });


const delay = (duration: number) => new Promise(resolve => { setTimeout(resolve, duration); });
const randomQuestion = (count: number, questions: IQuestion[]): IQuistionExtend[] => {
    // let tmp = [...questions];
    // let limit = count;
    const decodeHtmlEntities = (text: string) => {
        return text
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&rsquo;/g, "'")
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&deg;/g, "°");
    };
    const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

    const getRandomChoices = (question: IQuestion): string[] => {
        const randomIndex = getRandomInt(4);
        let choices = [...question.chooses];

        if (choices.length < 4) {
            choices.splice(randomIndex, 0, question.correctAnswer);
        }

        return choices.map(v => he.decode(v));
    };
    // Shuffle the questions array randomly
    // for (let i = tmp.length - 1; i > 0; i--) {
    //     const j = getRandomInt(i + 1);
    //     [tmp[i], tmp[j]] = [tmp[j], tmp[i]];
    // }

    const mapQuestionField = questions.map((q: IQuestion, index) => {
        const chooses = getRandomChoices(q);
        return {
            id: String(index + 1),
            ...q,
            question: he.decode(q.question),
            chooses
        };
    });

    return mapQuestionField;
};

export default useStoreQuestion;