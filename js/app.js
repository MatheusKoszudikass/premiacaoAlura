async function fetchData() {
    const apiUrl = 'https://primiacao-alura-api.vercel.app/';
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Erro ao fazer a requisição');
      }
      const data = await response.json();
      console.log('Dados recebidos:', data);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  }
  
  fetchData();

fetchData();

document.addEventListener('DOMContentLoaded', () => {
    const emojiButtons = document.querySelectorAll('.emoji-btn');
    const container = document.querySelector('.container');
    const confirmation = document.getElementById('confirmation');
    const chartContainer = document.querySelector('.chart-container'); // Adicionado para controle de exibição do gráfico

    // Contador para diferentes humores
    const moodCounts = {
        happy: 0,
        neutral: 0,
        sad: 0
    };

    // Inicializa o gráfico e mantém o gráfico oculto inicialmente
    const ctx = document.getElementById('moodChart').getContext('2d');
    const moodChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Alegre', 'Intermediário', 'Triste'],
            datasets: [{
                label: 'Número de Interações',
                data: [moodCounts.happy, moodCounts.neutral, moodCounts.sad],
                backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
                borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // Cor das bordas das barras
                borderWidth: 2, // Largura das bordas das barras
                barThickness: 40 // Largura das barras (em pixels)
            }]
        },
        options: {
            responsive: true, // Torna o gráfico responsivo
            maintainAspectRatio: false, // Permite que o gráfico ajuste seu tamanho para se adaptar ao contêiner
            layout: {
                padding: {
                    left: 50,
                    right: 50,
                    top: 10,
                    bottom: 10
                }
            },
            scales: {
                x: {
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1, // Ajusta o intervalo das marcas no eixo Y
                        maxTicksLimit: 5 // Limita o número de marcas visíveis no eixo Y
                    }
                }
            }
        }
    });
    

    // Oculta o contêiner do gráfico inicialmente
    chartContainer.style.display = 'none';

    emojiButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Adicionar a classe de animação ao container
            container.classList.add('fade-out-up');

            // Mostrar mensagem de confirmação após seleção
            confirmation.classList.remove('hidden');
            setTimeout(() => {
                confirmation.classList.add('hidden');
            }, 2000); // Mensagem visível por 2 segundos

            // Atualizar o contador e o gráfico
            const mood = button.getAttribute('data-mood');
            moodCounts[mood]++;
            moodChart.data.datasets[0].data = [moodCounts.happy, moodCounts.neutral, moodCounts.sad];
            moodChart.update();

            // Esperar a animação do contêiner terminar antes de exibir o gráfico
            container.addEventListener('animationend', () => {
                container.style.display = 'none'; // Ocultar o container após a animação

                // Mostrar o gráfico após a animação
                chartContainer.style.display = 'block';
            });
        });
    });
});
