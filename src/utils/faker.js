import { faker } from '@faker-js/faker';

// Generar datos de prueba 

export const generateClients = (count) => {
    const clients = [];
    for (let i = 0; i < count; i++) {
        const letters = faker.string.alphanumeric({ length: 3, casing: 'upper', exclude: '0123456789' });
        const numbers = faker.string.alphanumeric({ length: 3, exclude: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' }); 
        clients.push({
            entrada: faker.date.recent(),
            estado: "prospect",
            observacion: "",
            nombre: faker.person.firstName(),
            apellido: faker.person.lastName(),
            cedula: faker.string.numeric({ length: 5}),
            fecha_nacimiento: faker.date.birthdate({ mode: 'age', min: 18, max: 65 }),
            correo: faker.internet.email(),
            celular: faker.phone.number(),
            genero: faker.person.sex(),
            ciudad: faker.location.city(),
            placa: `${letters}${numbers}`,
            modelo: faker.string.numeric({ length: 4}),
            valor_asegurado: faker.commerce.price({ min: 30000000, max: 100000000 , dec: 0, symbol: '$' }),
            allianz: faker.commerce.price({ min: 1000000, max: 5000000 , dec: 0, symbol: '$' }),
            solidaria_full: faker.commerce.price({ min: 1000000, max: 5000000 , dec: 0, symbol: '$' }),
            equidad_full: faker.commerce.price({ min: 1000000, max: 5000000 , dec: 0, symbol: '$' }),
            hdi: faker.commerce.price({ min: 1000000, max: 5000000 , dec: 0, symbol: '$' }),
            bolivar_full: faker.commerce.price({ min: 1000000, max: 5000000 , dec: 0, symbol: '$' }),
            sbs_full: faker.commerce.price({ min: 1000000, max: 5000000 , dec: 0, symbol: '$' }),
            equidad_seguros_livianos: faker.commerce.price({ min: 1000000, max: 5000000 , dec: 0, symbol: '$' }),
            solidaria_livianos: faker.commerce.price({ min: 1000000, max: 5000000 , dec: 0, symbol: '$' }),
            axa: faker.commerce.price({ min: 1000000, max: 5000000 , dec: 0, symbol: '$' }),
            sbs_liviano: faker.commerce.price({ min: 1000000, max: 5000000 , dec: 0, symbol: '$' }),
            bolivar_basico: faker.commerce.price({ min: 1000000, max: 5000000 , dec: 0, symbol: '$' }),
            mapfre:faker.commerce.price({ min: 1000000, max: 5000000 , dec: 0, symbol: '$' }),
            liberty:faker.commerce.price({ min: 1000000, max: 5000000 , dec: 0, symbol: '$' }),          
        });
    }
    return clients;
};
