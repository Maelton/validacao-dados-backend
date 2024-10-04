var express = require('express');
var router = express.Router();

const validDDDs = [11, 21, 31, 41, 51, 61, 71, 81, 82, 91, 92, 93, 94, 95, 96, 97, 98, 99];

// Função para validar email
function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email); // Verifica se o email tem formato correto
}

// Função para validar data de nascimento
function isValidDate(dateString) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/; // Verifica o formato dd/mm/yyyy
    if (!regex.test(dateString)) {
      return false;
    }
  
    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    // Verifica se a data de nascimento é maior que a data atual
    const today = new Date();
    if (date > today) {
        return false; // A data de nascimento não pode ser no futuro
    }

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}  

// POST /users para realizar as validações
router.post('/', function(req, res, next) {
  const { nomeAluno, nascimento, nomeMae, nomePai, telefone, email, serie, turno, atividades } = req.body;

  // 1. Verificar campos obrigatórios
  if (!nomeAluno || !nascimento || !nomeMae || !nomePai || !telefone || !email || !serie || !turno) {
    return res.status(400).send('<h1>Erro: Todos os campos são obrigatórios.</h1>');
  }

  // 2. Validar data de nascimento
  if (!isValidDate(nascimento)) {
    return res.status(400).send('<h1>Erro: Data de nascimento inválida.</h1>');
  }

  // 3. Validar formato de e-mail
  if (!isValidEmail(email)) {
    return res.status(400).send('<h1>Erro: E-mail inválido.</h1>');
  }

  // 4. Validar telefone (DDD)
  const ddd = telefone.substring(1, 3);
  if (!validDDDs.includes(Number(ddd))) {
    return res.status(400).send('<h1>Erro: DDD inválido. Insira um DDD válido do Brasil.</h1>');
  }

  // 5. Validar que no máximo 3 atividades extracurriculares foram selecionadas
  const atividadesSelecionadas = Array.isArray(atividades) ? atividades : [atividades];
  if (atividadesSelecionadas.length > 3) {
    return res.status(400).send('<h1>Erro: Você só pode selecionar no máximo 3 atividades extracurriculares.</h1>');
  }

  // Se todas as validações forem bem-sucedidas, envia resposta de sucesso
  res.send('<h1>Cadastro realizado com sucesso!</h1>');
});

module.exports = router;
