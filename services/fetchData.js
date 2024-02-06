 const fetchData = async (url, rut, rutRL, claveRL) => {
    try {
        const raw = {
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
            body: JSON.stringify(raw),
            headers: {
                'Authorization': `Basic ${base64Credentials}`,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        };

        const response = await fetch(url, fetchOptions);
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            return data;
        } else {
            // Handle non-JSON response, or unexpected content-type
            console.error(`Unexpected content type: ${contentType}`);
            return null; // Or handle appropriately based on your requirements
        }
    } catch (error) {
        console.error('Error in fetchData:', error);
        throw error;
    }
};


module.exports = fetchData