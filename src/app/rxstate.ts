import { BehaviorSubject } from "rxjs";
import { accumulate } from "./rxhelper";

// Electrons
export const emitElectronSubject$ = new BehaviorSubject<number>(0)
export const electronCount$ = accumulate(emitElectronSubject$.asObservable())