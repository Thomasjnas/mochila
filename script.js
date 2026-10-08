const btnmenu = document.getElementById('btn-menu');
const menulateral = document.querySelector('.menu-lateral');

btnmenu.addEventListener('click', function(){
    menulateral.classList.toggle('expandir')
})

const bancoLivros = ["Dom Casmurro", "A Era das Revoluções", "Olga", "A volta ao mundo em 80 dias", "A cabeça do santo", "Capitães de areia"];

function buscarEListarSugestoes() {
    const termo = document.getElementById('input-busca').value.toLowerCase();
    const caixa = document.getElementById('caixa-sugestoes');
    
    const iframe = document.querySelector('.conteudo-centro');
    if (iframe && iframe.contentDocument) {
        const cards = iframe.contentDocument.querySelectorAll('.card-livro');
        
        cards.forEach(card => {
            const titulo = card.querySelector('.titulo-livro').innerText.toLowerCase();
            if (titulo.includes(termo)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    caixa.innerHTML = ''; 
    
    if (termo.length > 0) {
        const sugestoesFiltradas = bancoLivros.filter(livro => livro.toLowerCase().includes(termo));
        
        if (sugestoesFiltradas.length > 0) {
            caixa.style.display = 'block'; 
            
            sugestoesFiltradas.forEach(sugestao => {
                const item = document.createElement('div');
                item.innerText = sugestao;
                item.style.padding = '10px 15px';
                item.style.cursor = 'pointer';
                item.style.color = '#333';
                item.style.fontSize = '14px';
                
                item.onclick = function() {
                    document.getElementById('input-busca').value = sugestao;
                    caixa.style.display = 'none';
                    buscarEListarSugestoes(); 
                };
                
                item.onmouseenter = () => item.style.backgroundColor = '#f4f6f9';
                item.onmouseleave = () => item.style.backgroundColor = 'white';
                
                caixa.appendChild(item);
            });
        } else {
            caixa.style.display = 'none';
        }
    } else {
        caixa.style.display = 'none';
    }
}

document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-container')) {
        const caixa = document.getElementById('caixa-sugestoes');
        if (caixa) caixa.style.display = 'none';
    }
});

function definirModo(modo) {
    localStorage.setItem('projeto_mac_modo', modo);
    const iframeCentro = document.querySelector('.conteudo-centro');
    if (iframeCentro) {
        iframeCentro.src = 'mochilaprof.html';
    }
}