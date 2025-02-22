
interface IFireAuthService {
    signIn: (email: string, password: string) => Promise<any>;
    signUp: (email: string, password: string) => Promise<any>;
    signOut: () => Promise<any>;
    onAuthStateChanged: () => Promise<any>;
}
export default class FireAuthService implements IFireAuthService {
    async signIn(email: string, password: string) {

    };
    async signUp(email: string, password: string) { }
    async signOut() { }
    async onAuthStateChanged() { }

}