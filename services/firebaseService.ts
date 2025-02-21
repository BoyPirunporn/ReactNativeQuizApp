import {
    Firestore,
    collection,
    DocumentData,
    addDoc,
    getDocs,
    getDoc,
    setDoc,
    doc,
    QuerySnapshot,
    CollectionReference,
    deleteDoc,
    updateDoc,
    PartialWithFieldValue,
    query,
    where,
    WhereFilterOp,
    Query,
} from "firebase/firestore";

interface IFirebaseService {
    get: <T>(collectionName: string, ...args: string[]) => Promise<QuerySnapshot<T, DocumentData>>;
    save: <T>(c: { name: string, args?: string[] }, data: T) => Promise<string>;
    delete: (id: string) => Promise<void>;
    update: <T>(id: string, data: T) => Promise<void>;
    queryWhere: <T>(collectionName: string, field: string, op: WhereFilterOp, value: string) => Query<T, DocumentData>;
    getByPlayerName: <T>(q: Query<T, DocumentData>) => Promise<string | null>
}

export class FirebaseService implements IFirebaseService {
    constructor(private readonly storeFirebase: Firestore) { }
    async get<T>(collectionName: string, ...args: string[]): Promise<QuerySnapshot<T, DocumentData>> {
        return await getDocs(this._getCollection<T>(collectionName, ...args));
    }

    _getCollection<T>(name: string, ...args: string[]): CollectionReference<T, DocumentData> {
        return collection(this.storeFirebase, name, ...args) as CollectionReference<T, DocumentData>;
    }
    async save<T>({
        name,
        args = [],
    }: {
        name: string;
        args?: string[]
    }, data: T): Promise<string> {
        const result = await addDoc(this._getCollection<T>(name, ...args), data);
        return result.id;
    }

    queryWhere<T>(collectionName: string, field: string, op: WhereFilterOp, value: string) {
        return query(this._getCollection<T>(collectionName), where(field, op, value));
    }

    async upsert<T extends PartialWithFieldValue<DocumentData>>(collectionName: string, data: T) {
        const docRef = doc(this.storeFirebase, collectionName);
        await setDoc(docRef, data, { merge: true });
    }
    async delete(id: string) {
        await deleteDoc(doc(this.storeFirebase, "boards", id));
    }

    async update(id: string, data: any) {
        await updateDoc(doc(this.storeFirebase, "boards", id), data);
    }

    async getByPlayerName<T>(q: Query<T, DocumentData>): Promise<string | null> {
        const _doc = await getDocs(q);
        if (!_doc.empty) {
            return _doc.docs[0].id;
        }
        return null;
    }

}