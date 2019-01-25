(function (win, doc) {
  'use strict';
  /*
  Essa semana você terá dois desafios:
  1) Revisar todo o contéudo passado até aqui, e ver se você realmente entendeu
  tudo o que foi passado! Se tiver dúvidas, anote, e então abra issues,
  ou comente no seu pull request mesmo, que eu irei ajudá-lo a entender
  o que não ficou tão claro das aulas anteriores.
  É essencial que você entenda todo o conteúdo que foi passado até aqui,
  para que possamos prosseguir para a parte mais avançada do curso :D

  2) Estudar eventos!
  Acesse a página do MDN:
  https://developer.mozilla.org/en-US/docs/Web/Events#Categories

  Tente aplicar na prática alguns dos eventos que estão ali e coloque nesse
  desafio os experimentos legais que você conseguir desenvolver :D
  */
  var $name = doc.querySelector('[data-js="name"]');
  var $email = doc.querySelector('[data-js="email"]');
  var $language = doc.querySelector('[data-js="language"]');
  var $send = doc.querySelector('[data-js="send"]');

  $send.addEventListener('click', submitForm, false);

  function submitForm(event) {
    event.preventDefault();

    if (!confirm('Tem certeza que deseja enviar o formulário?'))
      return alert('Formulário não enviado!');

    if (validateForm())
      return alert('Enviado com sucesso!');
  }

  function validateForm() {
    var errors = [];

    if (!$name.value)
      errors.push('Nome deve ser preenchido!');

    if (!$email.value)
      errors.push('E-mail deve ser preenchido!');
    else {
      if (!isvalidEmail($email.value))
        errors.push('Entre com um e-mail válido!');
    }

    if (!$language.value)
      errors.push('Linguagem deve ser preenchida!');

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return false;
    }

    return true;
  }

  function isvalidEmail(email) {
    return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
  }
})(window, document);
