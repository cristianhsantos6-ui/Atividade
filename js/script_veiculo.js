// IMPORTANDO A FUNÇÃO DE CÁLCULO EXIGIDA PELA REGRA DE NEGÓCIO
import { calcularCustosVeiculo } from "./script_calculo.js";

const form = document.getElementById('form-veiculo');
const ListaVeiculos = document.getElementById('Lista-veiculos');

form.addEventListener('submit', function(event) {
    // EVITAR O RECARREGAMENTO DA PÁGINA (RF02 e fluxo da Aplicação)
    event.preventDefault();
    
    // CAPTURA DOS DADOS INSERIDOS PELO USUÁRIO
    const modelo = document.getElementById('modelo').value;
    const marca = document.getElementById('marca').value;
    const placa = document.getElementById('placa').value;
    const anofabricacao = parseInt(document.getElementById('ano').value);
    const valorMercado = parseFloat(document.getElementById('valor').value);
    const tipoCombustivel = document.querySelector('input[name="combustivel"]:checked').value;


    // EXECUTA OS CÁLCULOS ATRAVES DA FUNÇÃO IMPORTADA
    const resultados = calcularCustosVeiculo(valorMercado, anofabricacao, tipoCombustivel);

    // FORMATAÇÃO DE VALORES PARA MOEDA CORRENTE (R$) se não for string (como "Isento")
    const formatarMoeda = (valor) => typeof valor === 'number'
       ? valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})
       : valor;

       // CRIAÇÃO DINÂMICA DA LINHA (tr) e inserção na tabela ( Manipulação do  DOM)
       const novaLinha = document.createElement('tr');

       novaLinha.innerHTML = `
          <td><strong>${placa.toUpperCase()}</strong></td>
          <td>${modelo}</td>
          <td>${marca}</td>
          <td>${resultados.idade} anos</td>
          <td>${formatarMoeda(resultados.seguro)}</td>
          <td>${formatarMoeda(resultados.ipva)}</td>
          <td><strong>${formatarMoeda(resultados.total)}<strong></td>
          `;


          // ADICIONA O ELEMENTO CRIADO NA LISTA ABAIXO DO FORMULÁRIO
          ListaVeiculos.appendChild(novaLinha);


          // RF03 - Limpeza Automática do Formulário
          form.reset();
});

