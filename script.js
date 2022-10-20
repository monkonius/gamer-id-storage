if (!localStorage.getItem('entries')) {
    let entries = [];
    localStorage.setItem('entries', JSON.stringify(entries));
}

function setAttributes(elem, attrs) {
    for (const key in attrs) {
        elem.setAttribute(key, attrs[key]);
    }
}

function deleteEntry(button) {
    button.parentElement.parentElement.remove();
}

document.getElementById('add').onsubmit = () => {
    const tbody = document.querySelector('tbody');
    const platform = document.getElementById('platform');
    const id = document.getElementById('id');

    const button = document.createElement('button');
    button.append('Delete');
    setAttributes(button, {
        'class': 'delete',
        'type': 'button',
        'onclick': 'deleteEntry(this)'
    });

    let row = document.createElement('tr');
    let cell1 = document.createElement('td');
    let cell2 = document.createElement('td');
    let cell3 = document.createElement('td');

    cell1.innerHTML = platform.value;
    cell2.innerHTML = id.value;
    cell3.innerHTML = button.outerHTML;
    
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    tbody.append(row);
    
    let data = JSON.parse(localStorage.entries);
    data.push({ 'platform': platform.value, 'id': id.value })
    localStorage.setItem('entries', JSON.stringify(data));
    
    platform.value = '';
    id.value = '';
    
    return false;
}