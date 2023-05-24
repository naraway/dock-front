import { atom } from 'jotai';
import { Interceptor } from '../../models';

export const interceptorsAtom = atom<Interceptor[]>([]);
