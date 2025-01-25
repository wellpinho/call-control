export const removeSpacesAndSpecialCharacters = (value: string) =>
    value.replace(/[^a-zA-Z0-9]/g, "");

export const phoneValidation = (value: string) => {
    const phoneRegExp = /^\(?\d{2}\)?\s?9\d{4}-?\d{4}$/;
    const phone = value.match(phoneRegExp);

    return phone;
};
