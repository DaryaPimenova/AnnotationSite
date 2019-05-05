function getOptions(input, href, additional) {
    return fetch(`${href}?q=${input}${additional ? '&' + additional : ''}`, {credentials: 'same-origin'})
        .then((response) => {
            return response.json()
        }).then((json) => {
            let options = [];
            for (let style of json) {
                options.push({
                    value: style.pk,
                    label: style.title
                });
            }
            return options;
        });
}

export const getStyleOptions = (input) => getOptions(input, '/api/styles/');

export const getTechniqueOptions = (input) => getOptions(input, '/api/techniques/');

export function errorMessageToString(errors) {
    let errorMessage = 'Неизвестная ошибка';

    if (Array.isArray(errors) && errors.length > 0) {
        errorMessage = errors.join('<br />')
    } else if (typeof(errors) === 'string' && errors.length > 0) {
        errorMessage = errors;
    } else if (typeof(errors) === 'object') {
        let error_messages = [];
        for (const prop in errors) {
            if (errors.hasOwnProperty(prop)) {
                error_messages.push(`${prop}: ${errors[prop]}`);
            }
        }
        errorMessage = error_messages.join('<br />');
    }
    return errorMessage
}

export function swalError(errors) {
    swal({
        title: 'Ошибка!',
        text: errorMessageToString(errors),
        html: true,
        type: 'error'
    });
}
