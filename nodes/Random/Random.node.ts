import type {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    IHttpRequestOptions,
} from 'n8n-workflow';

import { NodeOperationError } from 'n8n-workflow';

export class Random implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Random',
        name: 'random',
        icon: 'file:icon.svg',
        group: ['transform'],
        version: 1,
        description: 'True Random Number Generator usando random.org',
        defaults: {
            name: 'Random',
        },
        // MELHORIA: Usar 'main' é mais simples que NodeConnectionType.Main
        inputs: ['main'],
        outputs: ['main'],
        credentials: [],
        properties: [
            {
                displayName: 'True Random Number Generator',
                name: 'operationInfo',
                type: 'notice',
                default: '',
                description: 'Gera um inteiro aleatório verdadeiro usando random.org.',
            },
            {
                displayName: 'Min',
                name: 'min',
                type: 'number',
                typeOptions: { numberPrecision: 0 },
                default: 1,
                description: 'Valor mínimo (inteiro, inclusivo).',
                required: true,
            },
            {
                displayName: 'Max',
                name: 'max',
                type: 'number',
                typeOptions: { numberPrecision: 0 },
                default: 60,
                description: 'Valor máximo (inteiro, inclusivo).',
                required: true,
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            const min = this.getNodeParameter('min', i) as number;
            const max = this.getNodeParameter('max', i) as number;

            if (!Number.isInteger(min) || !Number.isInteger(max)) {
                throw new NodeOperationError(this.getNode(), 'Min e Max precisam ser inteiros.', {
                    itemIndex: i,
                });
            }
            if (min > max) {
                throw new NodeOperationError(this.getNode(), 'Min deve ser menor ou igual a Max.', {
                    itemIndex: i,
                });
            }

            const requestOptions: IHttpRequestOptions = {
                method: 'GET',
                url: 'https://www.random.org/integers/',
                qs: {
                    num: 1,
                    min,
                    max,
                    col: 1,
                    base: 10,
                    format: 'plain',
                    rnd: 'new',
                },
                headers: {
                    'User-Agent': 'n8n-random-node/1.0',
                },
                json: false, // Esperamos texto puro, não JSON
            };

            // MELHORIA: Usar o helper nativo do n8n para requisições HTTP
            const responseData = await this.helpers.httpRequest(requestOptions);
            
            const trimmed = String(responseData).trim();
            const value = Number.parseInt(trimmed, 10);

            if (!Number.isInteger(value)) {
                throw new NodeOperationError(
                    this.getNode(),
                    `Resposta inválida do random.org: "${trimmed}"`,
                    {
                        itemIndex: i,
                    },
                );
            }
            if (value < min || value > max) {
                throw new NodeOperationError(
                    this.getNode(),
                    `Número fora do intervalo [${min}, ${max}]: ${value}`,
                    {
                        itemIndex: i,
                    },
                );
            }
            
            // O json que será a saída do nó
            const result = {
                json: {
                    value,
                    min,
                    max,
                    source: 'random.org',
                    timestamp: new Date().toISOString(),
                },
                // Adiciona o pareamento com o item de entrada, boa prática
                pairedItem: { item: i },
            };

            returnData.push(result);
        }

        // MELHORIA: `prepareOutputData` é a forma moderna de retornar os dados
        return this.prepareOutputData(returnData);
    }
}