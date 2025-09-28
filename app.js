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
