function setAttributes(elem, attrs) {
    for (const key in attrs) {
        elem.setAttribute(key, attrs[key]);
    }
}

document.getElementById('add').onsubmit = () => {
    const tbody = document.querySelector('tbody');
    const platform = document.getElementById('platform');
    const id = document.getElementById('id');

    const button = document.createElement('button');
    button.append('Delete');
    setAttributes(button, {
        'class': 'delete',
        'type': 'button'
    });

    let row = document.createElement('tr');
    let cell1 = document.createElement('td');
    let cell2 = document.createElement('td');
    let cell3 = document.createElement('td');

    cell1.innerHTML = platform.value;
    cell2.innerHTML = id.value;
    cell3.innerHTML = button.outerHTML;
    platform.value = '';
    id.value = '';

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    tbody.append(row);

    return false;
}