É possível salvar informações em um arquivo de texto, abri-lo e salvar novamente usando **JavaScript**, **HTML** e **CSS**, mas com algumas limitações, já que o JavaScript rodando no navegador tem restrições de segurança para acessar diretamente o sistema de arquivos do usuário.

No entanto, você pode usar a **API File** do JavaScript, juntamente com o `FileReader` para ler arquivos e a API `Blob` para gerar e baixar arquivos. O que você não pode fazer diretamente no navegador é salvar ou modificar arquivos no sistema de arquivos sem a intervenção do usuário. Ou seja, você pode permitir que o usuário baixe o arquivo e, em seguida, reabra e modifique, mas não pode fazer isso de forma automática sem a interação do usuário.

### Como funcionaria?

1. **Salvar dados em um arquivo de texto**: Usando a API `Blob` do JavaScript para criar um arquivo e permitir que o usuário o baixe.
2. **Abrir o arquivo**: Usando o `FileReader` para ler o conteúdo de um arquivo carregado pelo usuário.
3. **Salvar novamente**: Permitir que o usuário edite os dados e salve novamente o arquivo.

### Exemplo prático:

#### 1. HTML: Interface simples para o usuário carregar e salvar arquivos

```html
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Salvar e Abrir Arquivo</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    input, button {
      margin: 10px 0;
    }
  </style>
</head>
<body>
  <h1>Salvar e Abrir Arquivo de Texto</h1>
  
  <!-- Botões para salvar e abrir o arquivo -->
  <button id="saveBtn">Salvar Dados em Arquivo</button>
  <input type="file" id="fileInput" />
  <button id="openBtn">Abrir Arquivo</button>
  
  <textarea id="fileContent" rows="10" cols="50" placeholder="Conteúdo do arquivo será exibido aqui..."></textarea>

  <script src="script.js"></script>
</body>
</html>
```

#### 2. JavaScript: Lógica para abrir, editar e salvar novamente

```javascript
document.getElementById('saveBtn').addEventListener('click', () => {
  const content = document.getElementById('fileContent').value;
  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');
  
  // Criar o link para download
  link.href = URL.createObjectURL(blob);
  link.download = 'meuarquivo.txt';
  link.click();
});

document.getElementById('openBtn').addEventListener('click', () => {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  
  if (file) {
    const reader = new FileReader();
    
    reader.onload = function(event) {
      // Exibir o conteúdo do arquivo no textarea
      document.getElementById('fileContent').value = event.target.result;
    };
    
    // Ler o arquivo como texto
    reader.readAsText(file);
  }
});
```

#### Como funciona?

* **Salvar Arquivo**: Quando você clica no botão "Salvar Dados em Arquivo", ele cria um arquivo de texto com o conteúdo do `textarea` e oferece ao usuário a opção de fazer o download.
* **Abrir Arquivo**: Quando o usuário escolhe um arquivo para abrir (via o `input[type="file"]`), o conteúdo desse arquivo é lido e exibido na caixa de texto para edição.

### Limitações:

* Não é possível salvar diretamente no sistema de arquivos do usuário sem interação, por questões de segurança.
* O arquivo precisa ser baixado pelo usuário, editado e reaberto manualmente para novas edições.

Se você precisar de uma solução mais avançada que envolva manipulação de arquivos no servidor, seria necessário usar uma linguagem de back-end (como Node.js, Python, PHP, etc.) que tenha acesso ao sistema de arquivos.
