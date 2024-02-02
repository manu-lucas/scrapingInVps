function agregarOpcionEjecutivo() {
    const customOption = document.getElementById('custom-option');
    const select = document.getElementById('opcionesEjecutivo');
    const customValue = customOption.innerText.trim();
    if (customValue !== '') {
        const option = document.createElement('option');
        option.value = customValue;
        option.text = customValue;
        select.add(option);
        customOption.innerText = '';
    }
}
