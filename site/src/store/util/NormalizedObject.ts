export interface NormalizedObjects<T> {
    byId: { [key: string]: T };
    allIds: number[];
}