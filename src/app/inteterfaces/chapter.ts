import { DocumentReference } from '@firebase/firestore-types';

//import { Student } from "./student";

export interface Chapter {
    code:string,
    name: string,
    questions: DocumentReference
}
