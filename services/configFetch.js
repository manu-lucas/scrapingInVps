 const configFetch = async (rut, rutRL, claveRL) => {
    try {
        const data = {
            "RutUsuario": rutRL,
            "PasswordSII": claveRL,
            "RutEmpresa": rut,
            "Ambiente": 1,
            "Detallado": false
        };
        
        const username = "api";
        const password = "7904-R070-6386-3462-2079";
        const base64Credentials = btoa(`${username}:${password}`);
        
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization': `Basic ${base64Credentials}`,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        };
        return fetchOptions
    } catch (error) {
        console.error('Error in configFetch', error);
        throw error;
    }
};

module.exports = configFetch