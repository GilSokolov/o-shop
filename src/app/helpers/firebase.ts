import { DocumentChangeAction } from '@angular/fire/firestore';

export interface FireDoc {
    data: {};
    id: string;
}

export function firePayload(array: DocumentChangeAction<any>[]) {
    return array.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
    });
}

export function DocToMap(array: DocumentChangeAction<any>[]) {
    return array.reduce((items, item) => {
        items[item.payload.doc.id] = item.payload.doc.data();
        return items;
    }, {});
}
