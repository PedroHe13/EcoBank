// Configuração do IndexedDB
let db;
const request = indexedDB.open("UserDB", 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;
    const store = db.createObjectStore("users", { keyPath: "username" });
    store.createIndex("password", "password", { unique: false });
};

request.onsuccess = function(event) {
    db = event.target.result;
    console.log("Banco de dados aberto com sucesso!");
};

request.onerror = function(event) {
    console.error("Erro ao abrir o banco de dados:", event.target.errorCode);
};

// Alternar entre Login e Cadastro
document.getElementById("showRegister").addEventListener("click", function() {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("registerSection").style.display = "block";
});

document.getElementById("showLogin").addEventListener("click", function() {
    document.getElementById("registerSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
});

// Cadastro
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    const message = document.getElementById("registerMessage");

    const transaction = db.transaction(["users"], "readwrite");
    const store = transaction.objectStore("users");

    // Verifica se o usuário já existe
    const request = store.get(username);
    request.onsuccess = function() {
        if (request.result) {
            message.textContent = "Usuário já existe!";
            message.style.color = "red";
        } else {
            // Adiciona o novo usuário
            store.add({ username: username, password: password });
            message.textContent = "Cadastro realizado com sucesso! Faça login.";
            message.style.color = "green";
            setTimeout(() => {
                document.getElementById("registerSection").style.display = "none";
                document.getElementById("loginSection").style.display = "block";
            }, 1000);
        }
    };
});

// Login
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    const transaction = db.transaction(["users"], "readonly");
    const store = transaction.objectStore("users");
    const request = store.get(username);

    request.onsuccess = function() {
        if (request.result && request.result.password === password) {
            localStorage.setItem("loggedUser", username); // Armazena o usuário logado
            window.location.href = "profile.html"; // Redireciona para a página de perfil
        } else {
            message.textContent = "Usuário ou senha incorretos!";
            message.style.color = "red";
        }
    };
});