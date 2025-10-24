

// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

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


function expenseAdd(newExpense) {

  try {
    // throw new Error("Erro de teste")
    // Lançando um erro para confirmar o fluxo

    // Criação do li para colocar na ul
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // Criação do ícone da categoria



  } catch (error) {
    alert("Não foi possível lançar a despesa")
    console.log(error)
  }
}


























