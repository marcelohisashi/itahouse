// Seleção dos elementos do formulário
const form = document.getElementById("feedbackForm")
const feedbackDisplay = document.getElementById("exibirFeedback")

// Carregar feedbacks do LocalStorage na inicialização
window.onload = () => {
  carregarFeedbacks()
}

// Evento de envio do formulário
form.addEventListener("submit", (event) => {
  event.preventDefault() // Impede o comportamento padrão de recarregar a página

  // Capturar os valores dos campos
  const nome = document.getElementById("nome").value
  const prato = document.getElementById("prato").value
  const avaliacao = document.getElementById("avaliacao").value
  const criticas = document.getElementById("criticas").value

  // Criar um objeto de feedback
  const feedback = {
    nome,
    prato,
    avaliacao,
    criticas,
    data: new Date().toLocaleString(), // Adicionar data e hora
  }

  // Salvar no LocalStorage
  salvarFeedback(feedback)

  // Limpar o formulário
  form.reset()

  // Atualizar a exibição
  carregarFeedbacks()
})

// Função para salvar feedback no LocalStorage
function salvarFeedback(feedback) {
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || []
  feedbacks.push(feedback) // Adiciona o novo feedback à lista
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks)) // Salva de volta no LocalStorage
}

// Função para carregar e exibir os feedbacks
function carregarFeedbacks() {
  feedbackDisplay.innerHTML = "" // Limpa a exibição
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || []

  if (feedbacks.length === 0) {
    feedbackDisplay.innerHTML = "<p>Nenhum feedback enviado ainda.</p>"
    return
  }

  feedbacks.forEach((feedback) => {
    const feedbackItem = document.createElement("div")
    feedbackItem.classList.add("feedback-item")
    feedbackItem.innerHTML = `
      <p><strong>Nome:</strong> ${feedback.nome}</p>
      <p><strong>Prato:</strong> ${feedback.prato}</p>
      <p><strong>Avaliação:</strong> ${feedback.avaliacao}</p>
      <p><strong>Críticas:</strong> ${feedback.criticas}</p>
      <p><em>Enviado em: ${feedback.data}</em></p>
      <hr>
    `
    feedbackDisplay.appendChild(feedbackItem)
  })
}
