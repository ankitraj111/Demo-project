const apiUrl = "http://localhost:8080/api/users";

function loadUsers() {
    fetch(apiUrl)
        .then(resp => resp.json())
        .then(users => {
            const list = document.getElementById('userList');
            list.innerHTML = '';
            users.forEach(user => {
                let li = document.createElement('li');
                li.innerHTML = `${user.name} (${user.email})
                    <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Edit</button>
                    <button onclick="deleteUser(${user.id})">Delete</button>`;
                list.appendChild(li);
            });
        });
}

function addUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    fetch(apiUrl, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
    }).then(() => loadUsers());
}

function editUser(id, currName, currEmail) {
    const name = prompt("Edit Name:", currName);
    const email = prompt("Edit Email:", currEmail);
    if (name && email) {
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email })
        }).then(() => loadUsers());
    }
}

function deleteUser(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    }).then(() => loadUsers());
}

window.onload = loadUsers;