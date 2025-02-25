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
    categories: string[]

}

const CATEGORIES = [
    "General Knowledge",
    "Entertainment: Books",
    "Entertainment: Film",
    "Entertainment: Music",
    "Entertainment: Musicals & Theatres",
    "Entertainment: Television",
    "Entertainment: Video Games",
    "Entertainment: Board Games",
    "Science & Nature",
    "Science: Computers",
    "Science: Mathematics",
    "Mythology",
    "Sports",
    "Geography",
    "History",
    "Politics",
    "Art",
    "Celebrities",
    "Animals",
    "Vehicles",
    "Entertainment: Comics",
    "Science: Gadgets",
    "Entertainment: Japanese Anime & Manga",
    "Entertainment: Cartoon & Animations",
]

const useStoreQuestion = create<StoreQuestion>()(
    (set, get) => {
        return ({
            categories: CATEGORIES,
            question: [],
            asnwers: [],
            loading: false,
            totalQuestion: 20,
            playerName: "",
            currentQuestion: 0,
            flag: "INIT",
            nextQuestion: () => {
                if (get().currentQuestion === get().question.length - 1) {
                    return;
                }
                let current = get().currentQuestion;
                current++
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
                const response = await fetch(`https://opentdb.com/api.php?amount=${get().totalQuestion}&type=multiple`, {
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
                }))
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


    questions.forEach((q: IQuestion) => {
        console.log(q.correctAnswer)
    })
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