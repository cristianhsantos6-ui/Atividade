// FUNÇÃO QUE REALIZA OS CÁLCULOS DE SEGURO E IPVA 
export function calcularCustosVeiculo(valorMercado, anoFabricacao, tipoCombustivel) {
    const anoAtual = new Date().getFullYear();
    const idadeVeiculo = anoAtual - anoFabricacao;

    // SEGURO OBRIGATÓRIO FIXADO EM 10% DO VALOR DO VEICULO
    const valorSeguro = valorMercado * 0.10;

    // REGRA DE ALIQUOTA DO IPVA POR COMBUSTÍVEL
    let aliquotaIPVA = 0; 
    switch (tipoCombustivel) {
        case 'Gasolina':
            aliquotaIPVA = 0.20;
            break;
            case 'Etanol':
                aliquotaIPVA = 0.15;
                break;
                case 'Bicombustivel':
                    aliquotaIPVA = 0.10;
                    break;
                    case 'Hibrido':
                        aliquotaIPVA = 0.08;
                        break;
                        case 'Elétrico':
                            aliquotaIPVA = 0.02;
                            break;
                            default:
                                aliquotaIPVA = 0;
    }

    //REGRA DE ISENÇÃO: MAIS DE 20 ANOS DE FABRICAÇÃO FICA ISENTO
    let valorIPVA = 0;
    if (idadeVeiculo > 20) {
        valorIPVA = "Isento";
    } else{
        valorIPVA = valorMercado * aliquotaIPVA;
    }

    // VALOR FINAL (Licenciamento/total do custo obrigatório)
    let valorfinal = 0;
    if (valorIPVA === "Isento") {
        valorfinal = valorSeguro;
    } else {
        valorfinal = valorSeguro + valorIPVA;
    }

    return {
        idade: idadeVeiculo,
        seguro: valorSeguro,
        ipva: valorIPVA,
        total: valorfinal
    };
}