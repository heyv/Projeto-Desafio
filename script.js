let jogo = 4;
let minT = 10;
let maxT = 24;
let rMin = 1;
let rMax = 1;

let novoMax = null;
let novominT = null;

let valueInput = null;
let btn = null;
let novoPl = null;

window.addEventListener('load', () => {
  valueInput = document.querySelector('#value');
  btn = document.querySelector('#btn');
  novoPl = document.querySelector('#novoPl');

  clearValueInput();
  addEvents();
});

function addEvents() {
  valueInput.addEventListener('keyup', button);
  btn.addEventListener('click', () => sum(valueInput.value.trim()));
}

function button(event) {
  const btt = event.target.value.trim();
  const length = btt.length;
  if (length < 1) {
    valueInput.value = '';
    valueInput.focus();

    return;
  }
  if (event.key == 'Enter') {
    sum(btt);
  }
}

function sum(newValue) {
  if (newValue < 0 || newValue >= 1000) {
    valueInput.value = '';
    valueInput.focus();
    incorrect();
    return;
  } else if (isNaN(newValue)) {
    valueInput.value = '';
    valueInput.focus();
    incorrect();
    return;
  }

  if (newValue === '') {
    return;
  } else {
    const placar = newValue;

    //================= Cálculo do valor mínimo =================//
    if (placar == minT && jogo == 4) {
      novominT = minT;
      calculo(placar);
    } else if (placar < minT && placar < novominT && jogo > 4) {
      novominT = placar;
      rMin++;
      calculo(placar);
    } else if (placar == novominT) {
      novominT = novominT;
      calculo(placar);
    } else if (placar < minT && placar > novominT) {
      novominT = novominT;
      calculo(placar);
    } else if (placar > novominT && placar < minT) {
      novominT = novominT;
      calculo(placar);
    } else if (placar > minT) {
      if (novominT == null) {
        novominT = minT;
      } else {
        novominT = novominT;
      }
      calculo(placar);
    } else if (placar == minT) {
      novominT = novominT;
      calculo(placar);
    }
  }

  valueInput.value = '';
  valueInput.focus();
}

//================= Cálculo do valor mínimo =================//
function calculo(placar) {
  if (placar > 99 && placar < novoMax) {
    novoMax = placar;
    rMax++;
  } else if (placar == maxT && jogo == 4) {
    novoMax = maxT;
  } else if (placar > novoMax && placar > maxT) {
    if (jogo > 4) {
      novoMax = placar;
      rMax++;
    } else {
      novoMax = placar;
      rMax++;
    }
  } else if (placar > maxT && jogo == 4) {
    novoMax = placar;
    rMax++;
  } else if (placar > maxT && placar > novoMax) {
    novoMax = placar;
    rMax++;
  }

  jogo++;
  newValue = placar;
  ajustar(newValue, novoMax);
}

function ajustar(newValue, novoMax) {
  if (novominT == null) {
    novominT = minT;
  }
  if (novoMax == null) {
    novoMax = maxT;
  }
  if (newValue < minT && jogo == 5) {
    novominT = newValue;
    rMin++;
  }

  const staticHTML = `
  <tr>
    <td>${jogo}</td>
    <td>${newValue}</td>
    <td>${novominT}</td>
    <td>${novoMax}</td>
    <td>${rMin}</td>
    <td>${rMax}</td>
  </tr>
      `;

  staticsHTML = staticHTML;

  staticsHTML += '</div>';
  novoPl.innerHTML += staticsHTML;
  valueInput.value = '';
  valueInput.focus();
}

function clearValueInput() {
  valueInput.value = '';
  valueInput.focus();
}

function incorrect() {
  alert('Por favor digite apenas números inteiros e positivos!');
}
