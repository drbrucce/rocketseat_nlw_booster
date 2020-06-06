import Knex from "knex";

export async function seed(knex: Knex){
    return await knex("items").insert([
        { title:'Baterias', image:'baterias.svg' },
        { title:'Eletrônicos', image:'eletronicos.svg' },
        { title:'Lâmpadas', image:'lampadas.svg' },
        { title:'Óleo', image:'oleo.svg' },
        { title:'Orgânicos', image:'organicos.svg' },
        { title:'Papeis/Papelão', image:'papeis-papelao.svg' },
    ]);
};
