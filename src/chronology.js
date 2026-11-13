import {thinkers} from "./data.js";
/**
 * Timeline placement, in calendar years. Negative years represent BCE.
 * "traditional" is an era of association, NOT an individual's lifetime.
 * Approximate dates should not be interpreted as exact.
 */
const ranges={
  "carl-jung": {
    "start": 1875,
    "end": 1961,
    "certainty": "documented"
  },
  "sigmund-freud": {
    "start": 1856,
    "end": 1939,
    "certainty": "documented"
  },
  "william-james": {
    "start": 1842,
    "end": 1910,
    "certainty": "documented"
  },
  "viktor-frankl": {
    "start": 1905,
    "end": 1997,
    "certainty": "documented"
  },
  "daniel-kahneman": {
    "start": 1934,
    "end": 2024,
    "certainty": "documented"
  },
  "alan-watts": {
    "start": 1915,
    "end": 1973,
    "certainty": "documented"
  },
  "terence-mckenna": {
    "start": 1946,
    "end": 2000,
    "certainty": "documented"
  },
  "ram-dass": {
    "start": 1931,
    "end": 2019,
    "certainty": "documented"
  },
  "jiddu-krishnamurti": {
    "start": 1895,
    "end": 1986,
    "certainty": "documented"
  },
  "nagarjuna": {
    "start": 150,
    "end": 250,
    "certainty": "approximate"
  },
  "plato": {
    "start": -428,
    "end": -348,
    "certainty": "approximate"
  },
  "aristotle": {
    "start": -384,
    "end": -322,
    "certainty": "documented"
  },
  "hypatia": {
    "start": 350,
    "end": 415,
    "certainty": "approximate"
  },
  "laozi": {
    "start": -600,
    "end": -500,
    "certainty": "traditional"
  },
  "baruch-spinoza": {
    "start": 1632,
    "end": 1677,
    "certainty": "documented"
  },
  "friedrich-nietzsche": {
    "start": 1844,
    "end": 1900,
    "certainty": "documented"
  },
  "albert-camus": {
    "start": 1913,
    "end": 1960,
    "certainty": "documented"
  },
  "confucius": {
    "start": -551,
    "end": -479,
    "certainty": "documented"
  },
  "albert-einstein": {
    "start": 1879,
    "end": 1955,
    "certainty": "documented"
  },
  "richard-feynman": {
    "start": 1918,
    "end": 1988,
    "certainty": "documented"
  },
  "alan-turing": {
    "start": 1912,
    "end": 1954,
    "certainty": "documented"
  },
  "ada-lovelace": {
    "start": 1815,
    "end": 1852,
    "certainty": "documented"
  },
  "marie-curie": {
    "start": 1867,
    "end": 1934,
    "certainty": "documented"
  },
  "carl-sagan": {
    "start": 1934,
    "end": 1996,
    "certainty": "documented"
  },
  "ibn-al-haytham": {
    "start": 965,
    "end": 1040,
    "certainty": "approximate"
  },
  "galileo-galilei": {
    "start": 1564,
    "end": 1642,
    "certainty": "documented"
  },
  "salvador-dali": {
    "start": 1904,
    "end": 1989,
    "certainty": "documented"
  },
  "m-c-escher": {
    "start": 1898,
    "end": 1972,
    "certainty": "documented"
  },
  "pablo-picasso": {
    "start": 1881,
    "end": 1973,
    "certainty": "documented"
  },
  "hilma-af-klint": {
    "start": 1862,
    "end": 1944,
    "certainty": "documented"
  },
  "leonardo-da-vinci": {
    "start": 1452,
    "end": 1519,
    "certainty": "documented"
  },
  "frida-kahlo": {
    "start": 1907,
    "end": 1954,
    "certainty": "documented"
  },
  "johann-sebastian-bach": {
    "start": 1685,
    "end": 1750,
    "certainty": "documented"
  },
  "ludwig-van-beethoven": {
    "start": 1770,
    "end": 1827,
    "certainty": "documented"
  },
  "antonio-vivaldi": {
    "start": 1678,
    "end": 1741,
    "certainty": "documented"
  },
  "john-coltrane": {
    "start": 1926,
    "end": 1967,
    "certainty": "documented"
  },
  "pauline-oliveros": {
    "start": 1932,
    "end": 2016,
    "certainty": "documented"
  },
  "bell-hooks": {
    "start": 1952,
    "end": 2021,
    "certainty": "documented"
  },
  "w-e-b-du-bois": {
    "start": 1868,
    "end": 1963,
    "certainty": "documented"
  },
  "hannah-arendt": {
    "start": 1906,
    "end": 1975,
    "certainty": "documented"
  },
  "octavia-e-butler": {
    "start": 1947,
    "end": 2006,
    "certainty": "documented"
  },
  "marshall-mcluhan": {
    "start": 1911,
    "end": 1980,
    "certainty": "documented"
  }
};
export const chronologies=thinkers.map(t=>({...t,...ranges[t.id]}));
export const eras=[
{id:"all",label:"All centuries",start:-650,end:2030,focus:1850,description:"From the classical world to the present."},
{id:"classical",label:"Ancient world",start:-650,end:550,focus:-400,description:"Philosophical traditions before and during classical antiquity."},
{id:"reformation",label:"Renaissance & early modern",start:900,end:1820,focus:1640,description:"From early optics and art to the foundations of modern science."},
{id:"modern",label:"Modern thought",start:1750,end:1960,focus:1915,description:"The crowded meeting ground of art, science, psychology, and social ideas."},
{id:"recent",label:"20th century onward",start:1900,end:2030,focus:1960,description:"Recent voices that shaped the questions we still ask."}
];
export const overlaps=(mind,year)=>mind.certainty!=="traditional"&&mind.start<=year&&mind.end>=year;
export const sharedYears=(a,b)=>a.certainty==="traditional"||b.certainty==="traditional"?null:Math.max(0,Math.min(a.end,b.end)-Math.max(a.start,b.start)+1);
export function yearLabel(year){return year<0?Math.abs(year)+" BCE":year+" CE"}
export function rangeLabel(mind){return mind.certainty==="traditional"?"Traditionally placed in 6th c. BCE":mind.years}
