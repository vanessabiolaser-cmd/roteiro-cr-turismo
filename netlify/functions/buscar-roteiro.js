// Netlify Function: buscar-roteiro
// Recebe um código curto (id) pela URL e devolve os dados completos
// do roteiro (perfis, extensões, fotos, vídeos) guardados na "gaveta".

const { getStore } = require('@netlify/blobs');

exports.handler = async function (event) {
  const id = event.queryStringParameters && event.queryStringParameters.id;

  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ erro: 'Faltou o código do roteiro.' }) };
  }

  try {
    const store = getStore('roteiros-cr-turismo');
    const dados = await store.get(id, { type: 'json' });

    if (!dados) {
      return { statusCode: 404, body: JSON.stringify({ erro: 'Roteiro não encontrado.' }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    };
  } catch (erro) {
    return {
      statusCode: 500,
      body: JSON.stringify({ erro: 'Não foi possível buscar o roteiro.' })
    };
  }
};
