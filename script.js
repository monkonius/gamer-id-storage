document.getElementById('add').onsubmit = () => {
    const tbody = document.querySelector('tbody');
    const platform = document.getElementById('platform');
    const id = document.getElementById('id');

    let row = document.createElement('tr');
    let cell1 = document.createElement('td');
    let cell2 = document.createElement('td');

    cell1.innerHTML = platform.value;
    cell2.innerHTML = id.value;
    platform.value = '';
    id.value = '';

    row.appendChild(cell1);
    row.appendChild(cell2);
    tbody.append(row);

    return false;
}