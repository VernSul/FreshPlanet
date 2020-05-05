import fs from 'fs';



const createRead= (table) => {
    const read = fs.readFileSync(`${__dirname}/data/${table}.json`, 'utf-8');
    return JSON.parse(read);

};

const createWrite = (table, data) => {
    return fs.writeFileSync(`${__dirname}/data/${table}.json`, JSON.stringify(data));
 
 

}


export const forumDB = () => createRead('forums');
export const messageDB = () => createRead('messages');
export const userDB = () => createRead('users');

export const forumWrite = (data) => createWrite('forums', data);
export const messageWrite = (data) => createWrite('messages', data);
export const userWrite = (data) => createWrite('users', data);