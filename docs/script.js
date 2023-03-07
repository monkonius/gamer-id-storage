function setAttributes(elem, attrs) {
    for (const key in attrs) {
        elem.setAttribute(key, attrs[key]);
    }
}

function copyEntry(button) {
    const trow = button.parentElement.parentElement;
    const platform = trow.children[1].innerHTML;
    const id = trow.children[2].innerHTML;

    navigator.clipboard.writeText(id);
    alert(`Copied ${platform} ID: ${id}`);
}

function editEntry(button) {
    const trow = button.parentElement.parentElement;
    const platform = document.getElementById('platform');
    const id = document.getElementById('id');

    platform.focus();
    platform.value = trow.children[1].innerHTML;
    id.value = trow.children[2].innerHTML;

    deleteEntry(button);
}

function deleteEntry(button) {
    const data = JSON.parse(localStorage.entries);
    const trow = button.parentElement.parentElement;
    const platform = trow.children[1].innerHTML;

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

    tableSort();
}

function createTableRow(number, platform, id) {
    const tbody = document.querySelector('tbody');

    const copy = document.createElement('button');
    copy.append('Copy');
    setAttributes(copy, {
        'class': 'btn copy',
        'type': 'button',
        'onclick': 'copyEntry(this)'
    })

    const edit = document.createElement('button');
    edit.append('Edit');
    setAttributes(edit, {
        'class': 'btn edit',
        'type': 'button',
        'onclick': 'editEntry(this)'
    })

    const del = document.createElement('button');
    del.append('Delete');
    setAttributes(del, {
        'class': 'btn delete',
        'type': 'button',
        'onclick': 'deleteEntry(this)'
    });

    const row = tbody.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);

    cell1.innerHTML = number;
    cell2.innerHTML = platform;
    cell3.innerHTML = id;
    cell4.append(copy, edit, del);
    setAttributes(cell4, {
        'class': 'options'
    });
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
    
    for (const index in data) {
        createTableRow(+index + 1, data[index].platform, data[index].id);
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

    data.push({ 'platform': platform.value, 'id': id.value })
    localStorage.setItem('entries', JSON.stringify(data));

    platform.value = '';
    id.value = '';

    tableSort();

    const notif = document.getElementById('notif');
    const message = document.getElementById('notif-message');

    message.innerHTML = 'Entry saved';
    notif.classList.toggle('show');
    notif.classList.toggle('hide');

    setTimeout(() => {
        notif.classList.toggle('show');
        notif.classList.toggle('hide');
    }, 2000);
    
    return false;
}

tableSort();