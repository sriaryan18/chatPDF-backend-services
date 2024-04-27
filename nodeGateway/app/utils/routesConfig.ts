import fs from 'fs';
import YAML from 'yaml';

const baseDir = __dirname.split('/');
baseDir.splice(baseDir.length - 1);
const fileName = 'routes.yaml';
const routeiFile = `${baseDir.join('/')}/${fileName}`;


const readFile = (fileName:string) : object => {
    const file : string  = fs.readFileSync(fileName,'utf-8');
    const parsedYaml = YAML.parse(file);
    return parsedYaml.services;

}

export const getRoutesConfig = () => {
    console.log('ROUTES config')
    return readFile(routeiFile);
}



export const routesConfig = getRoutesConfig();



