// declarar uma array global
const itens = [];

// cria referência aos botões da página
const btAdicionarDados = document.querySelector("#btAdicionarDados");
const btAdicionarItem = document.querySelector("#btAdicionarItem");
const btDownload = document.querySelector("#btDownload");

function adicionarDados() {
  // criar elementos de entrada de campo da página
  const inNome = document.querySelector("#inNome");
  const inEndereco = document.querySelector("#inEndereco");
  const inNuit = document.querySelector("#inNuit");
  const inFacturaNumero = document.querySelector("#inFacturaNumero");

  // obtém e converte os dados
  let nome = inNome.value;
  let endereco = inEndereco.value;
  let nuit = Number(inNuit.value);
  let factura = Number(inFacturaNumero.value);

  // obtém a data atual
  const dataAtual = new Date();

  // cria uma cópia para não alterar a data original
  const data15 = new Date(dataAtual);
  data15.setDate(dataAtual.getDate() + 15);

  // obtém o dia atual
  const diaAtual = String(dataAtual.getDate()).padStart(2, "0");

  // obtém o dia + 15
  const diaLimite = data15.getDate();

  // obtém o mês
  const mesAtual = String(dataAtual.getMonth() + 1).padStart(2, "0"); // Mês com 2 dígitos

  // obtém o ano atual
  const anoAtual = dataAtual.getFullYear();

  // dia atual completo
  const dataHoje = `${diaAtual}/${mesAtual}/${anoAtual}`;

  // Extrai horas, minutos e segundos
  let horas = dataAtual.getHours();
  let minutos = dataAtual.getMinutes();

  const HoraAtual = `${horas}:${minutos}`;

  // Formata para sempre ter dois dígitos (ex: 09:05)
  horas = horas.toString().padStart(2, "0");
  minutos = minutos.toString().padStart(2, "0");

  // verificar os preenchimentos
  if (
    !nome ||
    !endereco ||
    nuit <= 0 ||
    isNaN(nuit) ||
    factura <= 0 ||
    isNaN(factura)
  ) {
    alert("Preencha os dados correctamente");
    inNome.focus();
    return;
  }

  // selecionar o elemento de saída
  const dados = document.querySelector("#outCliente");

  // criar o elemento (div)
  const novosDados = document.createElement("div");
  novosDados.innerHTML = `
  <p class="font-l">Exmo.(s) Sr.(s)</p>
  <p class="font-l"><strong>${nome}</strong></p>
  <p class="font-l">${endereco}</p>
  <p class="font-l">Nuit: <span>${nuit}</span></p>`;

  // inserido o elemento no html
  dados.appendChild(novosDados);

  // adicionar o número da factura
  const outFactura = document.querySelector("#outFactura");
  outFactura.textContent = "Factura N.º " + factura + "/" + anoAtual;

  // adicionar as datas
  const outData = document.querySelector("#outData");
  const outDataLimite = document.querySelector("#outDataLimite");
  const dataRodape = document.querySelector("#outEnderecoRodape");

  outData.textContent = `${diaAtual}/${mesAtual}/${anoAtual}`;
  outDataLimite.textContent = `${diaLimite}/${mesAtual}/${anoAtual}`;
  dataRodape.textContent = `N/ Morada ` + dataHoje + " / " + HoraAtual;

  // limpa campos e posiciona cursor em inNome
  inNome.value = "";
  inEndereco.value = "";
  inNuit.value = "";
  inFacturaNumero.value = "";
}
btAdicionarDados.addEventListener("click", adicionarDados);

function adicionarItem() {
  // cria referência aos elementos da páginca
  const inDescricao = document.querySelector("#inDescricao");
  const inQuantidade = document.querySelector("#inQuantidade");
  const inPreco = document.querySelector("#inPreco");

  // obtém e converte os dados
  let descricao = inDescricao.value;
  let quant = Number(inQuantidade.value);
  let preco = Number(inPreco.value);

  // verifica preenchimento dos campos
  if (!descricao || quant <= 0 || isNaN(quant) || preco <= 0 || isNaN(preco)) {
    alert("Informe corretamente os dados");
    inNome.focus();
    return;
  }

  // adiciona dados a array de objetos
  itens.push({ descricao: descricao, quant: quant, preco: preco });

  // limpa campos e posiciona cursor em inNome
  inDescricao.value = "";
  inQuantidade.value = "";
  inPreco.value = "";
  inDescricao.focus();

  listarItens(); // chama function que lista os Itens
}
btAdicionarItem.addEventListener("click", adicionarItem);

function listarItens() {
  let item = ""; // variável para concatenar

  for (let i = 0; i < itens.length; i++) {
    const { descricao, quant, preco } = itens[i];

    // Função utilitária para formatar valores monetários
    const formatarValor = (valor) =>
      new Intl.NumberFormat("pt-PT", {
        useGrouping: true,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(valor);

    item += `
    <div class="servicos-container">
      <div>
        <p class="font-m">ABS</p>
        <span class="separador-s"></span>
      </div>

      <div>
        <p class="font-m-s">${descricao}</p>
        <span class="separador-s"></span>
      </div>

      <div>
        <p class="font-m text-r">${quant.toString().padStart(2, "0")}</p>
        <span class="separador-s"></span>
      </div>

      <div>
        <p class="font-m text-r">UN</p>
        <span class="separador-s"></span>
      </div>

      <div>
        <p class="font-m text-r">${formatarValor(preco)}</p>
        <span class="separador-s"></span>
      </div>

      <div>
        <p class="font-m text-r">0,00</p>
        <span class="separador-s"></span>
      </div>

      <div>
        <p class="font-m text-r">16%</p>
        <span class="separador-s"></span>
      </div>

      <div>
        <p class="font-m text-r">${formatarValor(quant * preco)}</p>
        <span class="separador-s"></span>
      </div>
    </div>
  `;
  }

  document.querySelector("#outItens").innerHTML = item;

  calcular(); // chamar a function calcular
}

function calcular() {
  const formatarValor = (valor) =>
    new Intl.NumberFormat("pt-PT", {
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor);

  let totalSemIva = 0; // acumulador

  for (let i = 0; i < itens.length; i++) {
    totalSemIva += itens[i].quant * itens[i].preco;
  }

  // exibir valores formatados
  document.querySelector("#outTotalSemIva").textContent =
    formatarValor(totalSemIva);

  let valorIVA = totalSemIva * 0.16; // 16%
  let totalComIva = totalSemIva + valorIVA;

  document.querySelector("#outIva").textContent = formatarValor(valorIVA);
  document.querySelector("#outIvaDois").textContent = formatarValor(valorIVA);
  document.querySelector("#outTotal").textContent = formatarValor(totalComIva);
}

async function gerarPDF() {
  const elemento = document.querySelector("#fatura");
  const opcoes = {
    margin: 10,
    filename: "fatura.pdf",
    image: { type: "jpeg", quality: 0.95 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: "avoid" }, // evita quebras automáticas
  };
  html2pdf().set(opcoes).from(document.querySelector("#fatura")).save();

  // força caber numa página
  html2pdf()
    .from(document.querySelector("#fatura"))
    .set(opcoes)
    .toPdf()
    .get("pdf")
    .then(function (pdf) {
      const totalPages = pdf.internal.getNumberOfPages();
      if (totalPages > 1) {
        // encolhe o conteúdo para caber numa página
        pdf.deletePage(2); // remove páginas extras
      }
      pdf.save("fatura.pdf");
    });
}

btDownload.addEventListener("click", gerarPDF);
