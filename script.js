function setAttributes(elem, attrs) {
    for (const key in attrs) {
        elem.setAttribute(key, attrs[key]);
    }
}

function deleteEntry(button) {
    const data = JSON.parse(localStorage.entries);
    const trow = button.parentElement.parentElement;
    const platform = trow.firstElementChild.innerHTML;

    let index = -1;
    for (const key in data) {
        if (data[key].platform === platform) {
            index = key;
        }
    }
    if (index > -1) {
        data.splice(index, 1);
    }

    trow.remove();
    localStorage.setItem('entries', JSON.stringify(data));
}

function createTableRow(platform, id) {
    const tbody = document.querySelector('tbody');

    const button = document.createElement('button');
    button.append('Delete');
    setAttributes(button, {
        'class': 'delete',
        'type': 'button',
        'onclick': 'deleteEntry(this)'
    });

    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    const cell3 = document.createElement('td');

    cell1.innerHTML = platform;
    cell2.innerHTML = id;
    cell3.innerHTML = button.outerHTML;

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    tbody.append(row);
}

if (!localStorage.getItem('entries')) {
    const entries = [];
    localStorage.setItem('entries', JSON.stringify(entries));
}

const data = JSON.parse(localStorage.entries);
for (const entry of data) {
    createTableRow(entry.platform, entry.id);
}

document.getElementById('add').onsubmit = () => {
    const platform = document.getElementById('platform');
    const id = document.getElementById('id');
    createTableRow(platform.value, id.value);

    const data = JSON.parse(localStorage.entries);
    data.push({ 'platform': platform.value, 'id': id.value })
    localStorage.setItem('entries', JSON.stringify(data));

    platform.value = '';
    id.value = '';

    return false;
}