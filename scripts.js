

// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const expenseQuantity = document.querySelector("aside header p span");
const expenseTotal = document.querySelector("aside header h2");

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul");

// Regex para aceitar apenas input numéricos
amount.oninput = () => {

  // Obtém o valor do input e remove caracteres não numéricos
  let value = amount.value.replace(/\D/g, "");

  // Transformar em centavos
  value = Number(value) / 100;

  // Atualiza o valor no input
  amount.value = formatCurrencyBRL(value);

  //  console.log(value);

}

// Formatar o valor em Reais
function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
  return value;

}

// Captura o evento de submit do formulário para obter os valores
form.onsubmit = (event) => {
  // Previne o comportamento padrão de recarregar a página em submit
  event.preventDefault();

  //Cria um objeto com os detalhes
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    create_at: new Date()
  }
  //console.log(newExpense)

  expenseAdd(newExpense)
}

// Criação do Item
function expenseAdd(newExpense) {

  try {
    // throw new Error("Erro de teste")
    // Lançando um erro para confirmar o fluxo


    // Criação do li para colocar na ul
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // Criação do ícone da categoria
    const expenseIcon = document.createElement("img")

    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", `Ícone de despesa do tipo ${newExpense.category_name}`)

    // Criação da Informação da despesa
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    // Criação da span com valor
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`
    // expenseAmount.innerHTML = `<small>R$</small>${amount.value}`
    // Não seria mais fácil escrever dessa forma ?

    // Criação do ícone remover
    const removeImage = document.createElement("img");
    removeImage.classList.add("remove-icon")
    removeImage.setAttribute("src", "./img/remove.svg")
    removeImage.setAttribute("alt", "remover")

    // Criação do Contador de número de despesas
    /* 
    const expenseCount = document.querySelector("aside");
    expenseCount = ""
    */


    // Adiciona informações ao item
    expenseItem.append(expenseIcon); // Adicionando o ícone ao Item
    expenseInfo.append(expenseName, expenseCategory) // Adicionando o nome e a categoria à despesa
    expenseItem.append(expenseInfo); // Adicionando a informação com nome e categoria ao Item
    expenseItem.append(expenseAmount); // Adicionando o valor ao Item
    expenseItem.append(removeImage); // Adicionando o ícone de remover

    // Adiciona o Item na lista
    expenseList.append(expenseItem); // Adicionando o Item à ul

    /*
    // Usando o innerHTML
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");
    expenseItem.innerHTML =
           `
           <img src="img/${newExpense.category_id}.svg" alt="Ícone de despesa do tipo ${newExpense.category_name}" />
           <div class="expense-info">
             <strong>${newExpense.expense}</strong>
             <span>${newExpense.category_name}</span>
           </div>
           <span class="expense-amount"><small>R$</small>${newExpense.amount}</span>
           <img src="./img/remove.svg" alt="remover" class="remove-icon" />
           `
           expenseList.append(expenseItem);
     */

    updateTotals()

  } catch (error) {
    alert("Não foi possível lançar a despesa")
    console.log(error)
  }
}

// Atualiza os dados totais
function updateTotals() {
  try {

    // Recupera todos os itens (li) da lista
    const items = expenseList.children

    // Atualiza o contador de itens
    expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

    // Outra forma de fazer
    // if (items.length <= 1) { expenseQuantity.textContent = `${items} despesas` } else { expenseQuantity.textContent = `${items} despesa` }

    // Percorrer os itens
    let total = 0;

    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount")

      // Remover caracteres não numéricos e substitui a vírgula pelo ponto
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

      // Converte o valor para float
      value = parseFloat(value);

      //Apenas para garantir, verifica se é um número válido.
      if (isNaN(value)) {
        return alert("Não foi possível calcular o total. O valor não parece ser um número.")
      }

      total += Number(value);

    }

    // Criação da span para adicionar o R$ formatado.
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    // Formata o valor e retira o R$
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    // Limpa o conteúdo
    expenseTotal.textContent = "";


    expenseTotal.append(symbolBRL, total);



    /*
    const parcial = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

    expenseTotal.innerHTML = `<small>R$</small>${parcial}`
    */


  } catch (error) {
    console.log(error)
    alert("Não foi possível atualizar os totais.")
  }
}

// Captura o clique do botão remover





























