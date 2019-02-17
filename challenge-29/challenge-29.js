(function (doc, $) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  var app = (function () {
    return {
      init: function init() {
        this.companyInfo();
        this.initEvents();
      },
      initEvents: function initEvents() {
        $('[data-js="form-register"]').on('submit', this.handleSubmit);
      },
      handleSubmit: function handleSubmit(event) {
        event.preventDefault();
        var $tableCar = $('[data-js="table-car"]').get();
        $tableCar.appendChild(app.createNewCar());
      },
      createNewCar: function createNewCar() {
        var $fragment = doc.createDocumentFragment();
        var $tr = doc.createElement('tr');
        var $tdImage = doc.createElement('td');
        var $image = doc.createElement('img');
        var $tdBrand = doc.createElement('td');
        var $tdYear = doc.createElement('td');
        var $tdLicensePlate = doc.createElement('td');
        var $tdColor = doc.createElement('td');

        $image.src = $('[data-js="image"]').get().value;
        $tdImage.appendChild($image);
        $tdBrand.textContent = $('[data-js="brand-model"]').get().value;
        $tdYear.textContent = $('[data-js="year"]').get().value;
        $tdLicensePlate.textContent = $('[data-js="license-plate"]').get().value;
        $tdColor.textContent = $('[data-js="color"]').get().value;

        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdLicensePlate);
        $tr.appendChild($tdColor);

        return $fragment.appendChild($tr);
      },
      companyInfo: function companyInfo() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'company.json', true);
        ajax.send(null);
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
      },
      getCompanyInfo: function getCompanyInfo() {
        if (!app.isReady.call(this))
          return;

        var data = JSON.parse(this.responseText);
        var $companyName = $('[data-js="company-name"]').get();
        var $companyPhone = $('[data-js="company-phone"]').get();
        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;
      },
      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      }
    };
  })();

  app.init();
  /*
  function app() {
    var $formCarRegistration = new DOM('[data-js="form-car-registration"]');
    var $inputCarImageUrl = new DOM('[data-js="input-car-imageUrl"]');
    var $inputCarBrandModel = new DOM('[data-js="input-car-brandModel"]');
    var $inputCarYear = new DOM('[data-js="input-car-year"]');
    var $inputCarLicensePlate = new DOM('[data-js="input-car-licensePlate"]');
    var $inputCarColor = new DOM('[data-js="input-car-color"]');
    var cars = [];
    var ajax = new XMLHttpRequest();

    $formCarRegistration.on('submit', handleSubmitFormCarRegistration);

    function handleSubmitFormCarRegistration(event) {
      event.preventDefault();

      if (validateForm()) {
        insertCar();
        updateCarList();
      }
    }

    function validateForm() {
      var errors = [];

      var imageUrl = $inputCarImageUrl.get()[0].value;

      if (!imageUrl)
        errors.push('Imagem do carro deve ser preenchida.');
      else {
        if (!isValidUrl(imageUrl))
          errors.push('Imagem do carro deve ser uma URL válida.');
      }

      if (!$inputCarBrandModel.get()[0].value)
        errors.push('Marca / Modelo deve ser preenchido.');

      if (!$inputCarYear.get()[0].value)
        errors.push('Ano deve ser preenchido.');

      if (!$inputCarLicensePlate.get()[0].value)
        errors.push('Placa deve ser preenchida.');

      if (!$inputCarColor.get()[0].value)
        errors.push('Cor deve ser preenchida.');

      if (errors.length > 0)
        alert(errors.join('\n'));

      return errors.length === 0;
    }

    function isValidUrl(url) {
      var pattern = /(?:http|https):\/\/(?:\w+:{0,1}\w*)?(?:\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/g;
      return pattern.test(url);
    }

    function insertCar() {
      var car = {
        imageUrl: $inputCarImageUrl.get()[0].value,
        brandModel: $inputCarBrandModel.get()[0].value,
        year: $inputCarYear.get()[0].value,
        licensePlate: $inputCarLicensePlate.get()[0].value,
        color: $inputCarColor.get()[0].value
      };

      cars.push(car);
    }

    function updateCarList() {
      var fragment = doc.createDocumentFragment();

      cars.forEach(function (item) {
        var markup = '<div class="item">' +
          '  <div class="item-image">' +
          '    <img src="' + item.imageUrl + '" alt="' + item.brandModel + '" title="' + item.brandModel + '" />' +
          '  </div>' +
          '  <div class="item-info">' +
          '    <p><strong>Marca / Modelo:</strong> ' + item.brandModel + '</p>' +
          '    <p><strong>Ano:</strong> ' + item.year + '</p>' +
          '    <p><strong>Placa:</strong> ' + item.licensePlate + '</p>' +
          '    <p><strong>Cor:</strong> ' + item.color + '</p>' +
          '  </div>' +
          '</div>';

        var temp = document.createElement('div');
        temp.innerHTML = markup;

        fragment.appendChild(temp);
      });

      var $list = new DOM('[data-js="car-list"]');
      $list.get()[0].appendChild(fragment);
    }

    function loadCompanyInfo() {
      ajax.open('GET', 'company.json');
      ajax.send(null);
      ajax.addEventListener('readystatechange', handleReadyStateChange);
    }

    function handleReadyStateChange() {
      if (isRequestOk())
        fillPageHeader();
    }

    function isRequestOk() {
      return ajax.readyState === 4 && ajax.status === 200;
    }

    function fillPageHeader() {
      var $titleCompany = new DOM('[data-js="title-company"]');
      var data = parseData();

      if (data)
        $titleCompany.get()[0].textContent = data.name + ' - ' + data.phone;
    }

    function parseData() {
      var result = null;

      try {
        result = JSON.parse(ajax.responseText);
      }
      catch (e) {
        result = null;
      }

      return result;
    }

    loadCompanyInfo();
  }

  app();
  */
})(document, window.DOM);
