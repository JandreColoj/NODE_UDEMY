const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
                     .options({ 
                        'base': {
                           alias: 'b',
                           demandOption: true,
                           default: '100',
                           describe: 'La base de la multiplicacion',
                           type: 'number'
                       },
                       'listar': {
                           alias: 'l',
                           demandOption: false,
                           default: false,
                           describe: 'Lista la multiplicacion',
                           type: 'boolean'
                       },
                       'limite': {
                           alias: 'm',
                           demandOption: false,
                           default: 10,
                           describe: 'Limite de la tabla de multiplicar',
                           type:'number'
                        },
                     }) 
                     .check((argv, options) => {
                         
                        if (isNaN(argv.base)) {
                          throw new Error("La base debe ser un numero.")
                        }

                        return true ;

                     }).argv;


module.exports = argv;