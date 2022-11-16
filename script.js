function setAttributes(elem, attrs) {
    for (const key in attrs) {
        elem.setAttribute(key, attrs[key]);
    }
}

function copyEntry(button) {
    const trow = button.parentElement.parentElement;
    const platform = trow.children[0].innerHTML;
    const id = trow.children[1].innerHTML;

    navigator.clipboard.writeText(id);
    alert(`Copied ${platform} ID: ${id}`);
}

function editEntry(button) {
    const trow = button.parentElement.parentElement;
    const platform = document.getElementById('platform');
    const id = document.getElementById('id');

    platform.focus();
    platform.value = trow.children[0].innerHTML;
    id.value = trow.children[1].innerHTML;

    deleteEntry(button);
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

    const copy = document.createElement('button');
    copy.append('Copy');
    setAttributes(copy, {
        'class': 'copy',
        'type': 'button',
        'onclick': 'copyEntry(this)'
    })

    const edit = document.createElement('button');
    edit.append('Edit');
    setAttributes(edit, {
        'class': 'edit',
        'type': 'button',
        'onclick': 'editEntry(this)'
    })

    const del = document.createElement('button');
    del.append('Delete');
    setAttributes(del, {
        'class': 'delete',
        'type': 'button',
        'onclick': 'deleteEntry(this)'
    });

    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    const cell3 = document.createElement('td');
    const cell4 = document.createElement('td');
    const cell5 = document.createElement('td');

    cell1.innerHTML = platform;
    cell2.innerHTML = id;
    cell3.innerHTML = copy.outerHTML;
    cell4.innerHTML = edit.outerHTML;
    cell5.innerHTML = del.outerHTML;

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);
    tbody.append(row);
}

function tableSort() {
    const data = JSON.parse(localStorage.entries);
    data.sort((a, b) => {
        const platformA = a.platform.toUpperCase();
        const platformB = b.platform.toUpperCase();
        if (platformA < platformB) return -1;
        if (platformA > platformB) return 1;
        return 0;
    });

    const tbody = document.querySelector('tbody');
    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild);
    }
    
    for (const entry of data) {
        createTableRow(entry.platform, entry.id);
    }
}

if (!localStorage.getItem('entries')) {
    const entries = [];
    localStorage.setItem('entries', JSON.stringify(entries));
}

document.getElementById('add').onsubmit = () => {
    const platform = document.getElementById('platform');
    const id = document.getElementById('id');
    const data = JSON.parse(localStorage.entries);

    for (const entry of data) {
        if (platform.value.toUpperCase() === entry.platform.toUpperCase()) {
            alert('That entry already exists');
            return false;
        }
    }

    createTableRow(platform.value, id.value);

    data.push({ 'platform': platform.value, 'id': id.value })
    localStorage.setItem('entries', JSON.stringify(data));

    platform.value = '';
    id.value = '';

    tableSort();

    return false;
}

tableSort();