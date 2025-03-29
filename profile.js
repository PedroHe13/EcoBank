document.addEventListener("DOMContentLoaded", function () {
    // Array com URLs de imagens (pessoas e personagens de games)
    const profilePictures = [
        "https://imgs.search.brave.com/XpO8yaih_w3sXovrEVUnCjFpHeTz8j7PhKBJ3_e63Nk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQw/MDYwNzQ0MC9waG90/by9sb25kb24tZW5n/bGFuZC1saW9uZWwt/bWVzc2ktb2YtYXJn/ZW50aW5hLWxvb2tz/LW9uLXByaW9yLXRv/LXRoZS0yMDIyLWZp/bmFsaXNzaW1hLW1h/dGNoLWJldHdlZW4u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PU9XNlI4Z1lhS1Zt/VlRUVi10ME4tUFpf/Qkt6S2ZNN1FUQUV1/aHBsUXdPN1U9",
        "https://imgs.search.brave.com/G8Y-yuy_ly_AjdS6MrGHpAZrrUVxgsCVtMA2yC_2R1E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzYwLzM2/L2Q5LzYwMzZkOTQ1/YThmMjhkNzJmMGM0/NzIxY2JiY2MxMzRj/LmpwZw",
        "https://imgs.search.brave.com/oteWKnfiNedU-svOVdkyHmUAg9lNLiiMENz6VvaBJe4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9k/L2Q3L0NyaXN0aWFu/b19Sb25hbGRvX3Bs/YXlpbmdfZm9yX0Fs/X05hc3NyX0ZDX2Fn/YWluc3RfUGVyc2Vw/b2xpcyxfU2VwdGVt/YmVyXzIwMjNfKGNy/b3BwZWQpLmpwZw",
        "https://imgs.search.brave.com/RnkHrTWHxyKhaXyviXR6q7cxkj_3cZLSzKplXHMiNuk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zb25p/Y3N1cGVyc3RhcnMu/Y29tL2ltZy9jaGFy/YWN0ZXJzL3Nvbmlj/X29mZi5qcGc",
        "https://imgs.search.brave.com/QBSbp83hu6hxP1B7R0FORiq2wRfbq1HASNHFwi-OPYg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/b21lLmx0L1JDdG53/ZkR3WW5BYlY1ckpJ/LURkM2tJUWQ4Yz0v/NzcweDAvc21hcnQv/dXBsb2Fkcy9jb250/ZXVkby9mb3Rvcy96/ZWxkYV9vY2FyaW5h/X29mX3RpbWVfbGlu/a19zdXNwcmVzby5q/cGc",
        "https://imgs.search.brave.com/M8s_ww-Uv-rC0Lli73lWZX5eyV5T3or-8rxS9Vw99DM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9waWNz/LmNyYWl5b24uY29t/LzIwMjQtMDktMTQv/cUxHYkhUTnpSVmFX/dGZpMzBuSE5oUS53/ZWJw",
        "https://imgs.search.brave.com/LqMf0IhmXhDgImrtG9KSkgy0yIZZBBTp6zueXQ4dUZY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvbWlu/ZWNyYWZ0LXN0ZXZl/LXRhbWVkLXdvbGYt/d25uemp4ZDB4eTZz/MXgzMi5qcGc"
    ];

    // Função para selecionar uma imagem aleatória
    function setRandomProfilePic() {
        const randomIndex = Math.floor(Math.random() * profilePictures.length);
        const profilePic = document.getElementById("profilePic");
        if (profilePic) {
            profilePic.src = profilePictures[randomIndex];
        }
    }

    // Executa a função ao carregar a página
    setRandomProfilePic();

    // Carrega o usuário logado
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
        const greeting = document.getElementById("greeting");
        const usernameDisplay = document.getElementById("usernameDisplay");
        if (greeting && usernameDisplay) {
            greeting.textContent = `Olá, ${loggedUser}!`;
            usernameDisplay.textContent = loggedUser;
        }
    } else {
        window.location.href = "index.html";
    }

    // Função para formatar valores em moeda
    function formatCurrency(value, currency = "BRL") {
        if (currency === "BRL") {
            return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else {
            return `US$ ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
    }

    // Toggle do saldo
    const balanceElement = document.getElementById("balance");
    const toggleBalanceButton = document.getElementById("toggleBalance");
    let isBalanceVisible = true;

    if (balanceElement && toggleBalanceButton) {
        toggleBalanceButton.addEventListener("click", function () {
            if (isBalanceVisible) {
                balanceElement.textContent = "••••••••••••";
                toggleBalanceButton.textContent = "Mostrar Saldo";
            } else {
                const currency = toggleCurrencyButton.textContent.includes("USD") ? "BRL" : "USD";
                const value = currency === "BRL" ? balanceElement.dataset.valueBrl : balanceElement.dataset.valueUsd;
                balanceElement.textContent = formatCurrency(parseFloat(value), currency);
                toggleBalanceButton.textContent = "Ocultar Saldo";
            }
            isBalanceVisible = !isBalanceVisible;
        });
    }

    // Toggle entre BRL e USD
    const toggleCurrencyButton = document.getElementById("toggleCurrency");
    let isBRL = true;

    if (toggleCurrencyButton && balanceElement) {
        toggleCurrencyButton.addEventListener("click", function () {
            isBRL = !isBRL;
            toggleCurrencyButton.textContent = isBRL ? "Conta Internacional (USD)" : "Conta Nacional (BRL)";
            const value = isBRL ? balanceElement.dataset.valueBrl : balanceElement.dataset.valueUsd;
            const currency = isBRL ? "BRL" : "USD";
            if (isBalanceVisible) {
                balanceElement.textContent = formatCurrency(parseFloat(value), currency);
            }
            const investmentItems = document.querySelectorAll("#investmentList li");
            investmentItems.forEach(item => {
                item.classList.toggle("hidden", item.dataset.currency !== currency);
            });
        });
    }

    // Modal de Operações
    const operationModal = document.getElementById("operationModal");
    const operationModalTitle = document.getElementById("operationModalTitle");
    const operationModalContent = document.getElementById("operationModalContent");

    if (operationModal && operationModalTitle && operationModalContent) {
        function showOperationModal(title, content) {
            operationModalTitle.textContent = title;
            operationModalContent.innerHTML = content;
            operationModal.classList.remove("form-hidden");
            operationModal.classList.add("modal-slide-in");
            setTimeout(() => operationModal.classList.remove("modal-slide-in"), 500);
        }

        window.closeModal = function (modalId) {
            const modal = document.getElementById(modalId);
            modal.classList.add("form-hidden");
        };

        const operationsContent = {
            stockMarket: `
                <p>A Bolsa de Valores permite investir em ações de empresas listadas, com potencial de alta rentabilidade.</p>
                <h4>Opções de Compra:</h4>
                <ul>
                    <li>Ações Tech (R$ 50.000.000,00) - <button onclick="buyItem('Ações Tech', 50000000, 'BRL')">Comprar</button></li>
                    <li>Ações Energia (R$ 30.000.000,00) - <button onclick="buyItem('Ações Energia', 30000000, 'BRL')">Comprar</button></li>
                    <li>Ações Saúde (R$ 20.000.000,00) - <button onclick="buyItem('Ações Saúde', 20000000, 'BRL')">Comprar</button></li>
                </ul>
            `,
            buyShares: `
                <p>Compre cotas de fundos gerenciados por especialistas para diversificar seus investimentos.</p>
                <h4>Opções de Compra:</h4>
                <ul>
                    <li>Fundo Imobiliário (R$ 10.000.000,00) - <button onclick="buyItem('Fundo Imobiliário', 10000000, 'BRL')">Comprar</button></li>
                    <li>Fundo de Ações (R$ 15.000.000,00) - <button onclick="buyItem('Fundo de Ações', 15000000, 'BRL')">Comprar</button></li>
                    <li>Fundo Multimercado (R$ 25.000.000,00) - <button onclick="buyItem('Fundo Multimercado', 25000000, 'BRL')">Comprar</button></li>
                </ul>
            `,
            giftCards: `
                <p>Adquira gift cards para uso imediato ou como presente, com opções em várias plataformas.</p>
                <h4>Opções de Compra:</h4>
                <ul>
                    <li>Gift Card Amazon (R$ 1.000.000,00) - <button onclick="buyItem('Gift Card Amazon', 1000000, 'BRL')">Comprar</button></li>
                    <li>Gift Card Netflix (R$ 500.000,00) - <button onclick="buyItem('Gift Card Netflix', 500000, 'BRL')">Comprar</button></li>
                    <li>Gift Card Steam (R$ 750.000,00) - <button onclick="buyItem('Gift Card Steam', 750000, 'BRL')">Comprar</button></li>
                </ul>
            `,
            currencyExchange: `
                <p>Converta seu saldo entre moedas com taxas competitivas (1 BRL = 0.20 USD / 1 USD = 5 BRL).</p>
                <h4>Opções de Conversão:</h4>
                <ul>
                    <li>Converter R$ 10.000.000,00 para USD - <button onclick="convertCurrency(10000000, 'BRL', 0.20)">Converter</button></li>
                    <li>Converter US$ 2.000.000,00 para BRL - <button onclick="convertCurrency(2000000, 'USD', 5)">Converter</button></li>
                    <li>Converter Personalizado - <input type="number" id="customAmount" placeholder="Valor"><button onclick="convertCustom()">Converter</button></li>
                </ul>
            `
        };

        window.buyItem = function (name, value, currency) {
            const balanceKey = currency === "BRL" ? "valueBrl" : "valueUsd";
            const currentBalance = parseFloat(balanceElement.dataset[balanceKey]);
            if (value <= currentBalance) {
                balanceElement.dataset[balanceKey] = currentBalance - value;
                if (isBalanceVisible && currency === (isBRL ? "BRL" : "USD")) {
                    balanceElement.textContent = formatCurrency(currentBalance - value, currency);
                }
                const investmentList = document.getElementById("investmentList");
                const newItem = document.createElement("li");
                newItem.textContent = `${name} - ${formatCurrency(value, currency)}`;
                newItem.dataset.currency = currency;
                newItem.classList.toggle("hidden", currency !== (isBRL ? "BRL" : "USD"));
                investmentList.appendChild(newItem);
                operationModalContent.innerHTML = `<p>Compra de ${name} realizada com sucesso!</p>`;
                setTimeout(() => operationModal.classList.add("form-hidden"), 2000);
            } else {
                operationModalContent.innerHTML = `<p>Saldo insuficiente em ${currency}!</p>`;
                setTimeout(() => operationModal.classList.add("form-hidden"), 2000);
            }
        };

        window.convertCurrency = function (amount, fromCurrency, rate) {
            const toCurrency = fromCurrency === "BRL" ? "USD" : "BRL";
            const fromKey = fromCurrency === "BRL" ? "valueBrl" : "valueUsd";
            const toKey = toCurrency === "BRL" ? "valueBrl" : "valueUsd";
            const currentBalance = parseFloat(balanceElement.dataset[fromKey]);
            const convertedValue = amount * rate;

            if (amount <= currentBalance) {
                balanceElement.dataset[fromKey] = currentBalance - amount;
                balanceElement.dataset[toKey] = parseFloat(balanceElement.dataset[toKey]) + convertedValue;
                if (isBalanceVisible && fromCurrency === (isBRL ? "BRL" : "USD")) {
                    balanceElement.textContent = formatCurrency(currentBalance - amount, fromCurrency);
                }
                operationModalContent.innerHTML = `<p>Convertido ${formatCurrency(amount, fromCurrency)} para ${formatCurrency(convertedValue, toCurrency)}!</p>`;
                setTimeout(() => operationModal.classList.add("form-hidden"), 2000);
            } else {
                operationModalContent.innerHTML = `<p>Saldo insuficiente em ${fromCurrency}!</p>`;
                setTimeout(() => operationModal.classList.add("form-hidden"), 2000);
            }
        };

        window.convertCustom = function () {
            const amount = parseFloat(document.getElementById("customAmount").value);
            if (!amount) return;
            const rate = isBRL ? 0.20 : 5;
            convertCurrency(amount, isBRL ? "BRL" : "USD", rate);
        };

        document.querySelectorAll(".operations-buttons button").forEach(button => {
            button.addEventListener("click", function () {
                const operationId = this.id;
                showOperationModal(this.textContent, operationsContent[operationId]);
            });
        });
    }

    // Formulário de Investimento
    const showInvestmentFormButton = document.getElementById("showInvestmentForm");
    const investmentForm = document.getElementById("investmentForm");
    const newInvestmentForm = document.getElementById("newInvestmentForm");
    const cancelInvestmentButton = document.getElementById("cancelInvestment");

    if (showInvestmentFormButton && investmentForm && newInvestmentForm && cancelInvestmentButton) {
        showInvestmentFormButton.addEventListener("click", function () {
            investmentForm.classList.remove("form-hidden");
        });

        cancelInvestmentButton.addEventListener("click", function () {
            investmentForm.classList.add("form-hidden");
            newInvestmentForm.reset();
        });

        newInvestmentForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("investmentName").value;
            const value = parseFloat(document.getElementById("investmentValue").value);
            const currency = isBRL ? "BRL" : "USD";
            const balanceKey = currency === "BRL" ? "valueBrl" : "valueUsd";
            const currentBalance = parseFloat(balanceElement.dataset[balanceKey]);

            if (value <= currentBalance) {
                balanceElement.dataset[balanceKey] = currentBalance - value;
                if (isBalanceVisible) {
                    balanceElement.textContent = formatCurrency(currentBalance - value, currency);
                }
                const investmentList = document.getElementById("investmentList");
                const newItem = document.createElement("li");
                newItem.textContent = `${name} - ${formatCurrency(value, currency)}`;
                newItem.dataset.currency = currency;
                newItem.classList.toggle("hidden", currency !== (isBRL ? "BRL" : "USD"));
                investmentList.appendChild(newItem);
                investmentForm.classList.add("form-hidden");
                newInvestmentForm.reset();
            } else {
                alert("Saldo insuficiente!");
            }
        });
    }

    // Modal de Anúncios
    const adModal = document.getElementById("adModal");
    const adModalTitle = document.getElementById("adModalTitle");
    const adModalContent = document.getElementById("adModalContent");

    if (adModal && adModalTitle && adModalContent) {
        function showAdModal(title, content) {
            adModalTitle.textContent = title;
            adModalContent.innerHTML = content !== undefined ? content : "<p>Conteúdo não encontrado.</p>";
            adModal.classList.remove("form-hidden");
            adModal.classList.add("modal-slide-in");
            setTimeout(() => adModal.classList.remove("modal-slide-in"), 500);
        }

        // Mapeamento direto com os títulos completos do HTML
        const adContent = {
            "🌱 Fundo Verde": `
                <p>O Fundo Verde é um investimento sustentável que financia projetos de energia renovável, reflorestamento e tecnologias limpas.</p>
                <ul>
                    <li><strong>Retorno Esperado:</strong> Até 12% ao ano</li>
                    <li><strong>Investimento Mínimo:</strong> R$ 5.000.000,00</li>
                    <li><strong>Prazo:</strong> 5 anos</li>
                    <li><strong>Impacto:</strong> Redução de 10.000 toneladas de CO₂ por ano</li>
                </ul>
            `,
            "💧 Eco-Crédito": `
                <p>Financie a construção ou reforma de casas ecológicas com materiais sustentáveis e energia solar.</p>
                <ul>
                    <li><strong>Taxa de Juros:</strong> 3% ao ano</li>
                    <li><strong>Valor Máximo:</strong> R$ 20.000.000,00</li>
                    <li><strong>Prazo:</strong> Até 15 anos</li>
                    <li><strong>Benefícios:</strong> Isenção de taxas em reformas certificadas</li>
                </ul>
            `,
            "🌍 Viagem Sustentável": `
                <p>Adquira pacotes de viagem para destinos ecológicos, com hotéis sustentáveis e atividades de baixo impacto.</p>
                <ul>
                    <li><strong>Custo Médio:</strong> R$ 2.000.000,00 por pacote</li>
                    <li><strong>Cashback:</strong> 10% em Gift Cards</li>
                    <li><strong>Destinos:</strong> Amazônia, Costa Rica, Noruega</li>
                    <li><strong>Inclui:</strong> Transporte carbono neutro</li>
                </ul>
            `
        };

        document.querySelectorAll(".learn-more").forEach(button => {
            button.addEventListener("click", function () {
                const adElement = this.closest(".ad");
                const adTitle = adElement.querySelector("h3").textContent.trim();
                
                // Para depuração
                console.log("Título extraído:", adTitle);
                console.log("Conteúdo encontrado:", adContent[adTitle]);

                showAdModal(adTitle, adContent[adTitle]);
            });
        });
    }

    // Logout
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("loggedUser");
            window.location.href = "index.html";
        });
    }
});