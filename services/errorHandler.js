class ErrorHandler {
    static handle(err, res) {
        let errorMessage = "Ha ocurrido un error en el proceso, vuelve a iniciar la consulta";
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        
    }
}

module.exports = ErrorHandler;
