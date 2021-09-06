import TreeMap from 'ts-treemap';
import { Tile } from '@/mystore/types';

const treeMap = new TreeMap<number, string>();
treeMap.set(10, 'abc');
treeMap.set(5, 'def');
treeMap.set(0, 'ghi');
console.log(...treeMap.keys());

const map = new TreeMap<number, TreeMap<number, Tile>>((a: number, b: number) => a - b);
