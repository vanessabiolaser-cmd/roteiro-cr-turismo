// Netlify Function: salvar-roteiro
// Recebe os dados completos do roteiro (perfis, extensões, fotos, vídeos)
// e guarda numa "gaveta" (Netlify Blobs), devolvendo um código curto (id).
// Esse id é o único dado que precisa viajar na URL compartilhada.

const { getStore } = require('@netlify/blobs');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método não permitido' };
  }

  try {
    const dados = JSON.parse(event.body);

    // Gera um código curto e único para esta gaveta.
    const id = Math.random().toString(36).substring(2, 10);

    const store = getStore('roteiros-cr-turismo');
    await store.setJSON(id, dados);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    };
  } catch (erro) {
    return {
      statusCode: 500,
      body: JSON.stringify({ erro: 'Não foi possível salvar o roteiro.' })
    };
  }
};
