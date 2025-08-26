// Menu Mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Scroll Suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Fechar menu mobile se estiver aberto
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainMenu.classList.contains('active')) {
                    mainMenu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            header.style.background = 'var(--white)';
        }
    });

    // Adicionar esta função para verificar se há uma seleção na etapa atual
    function checkSelection() {
        const currentStep = document.querySelector('.builder-step.active');
        const hasSelection = currentStep.querySelector('.option-card.selected');
        const nextBtn = document.getElementById('next-btn');
        
        // Habilitar ou desabilitar o botão com base na seleção
        nextBtn.disabled = !hasSelection;
        
        // Aplicar estilos visuais ao botão
        if (nextBtn.disabled) {
            nextBtn.classList.add('btn-disabled');
        } else {
            nextBtn.classList.remove('btn-disabled');
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        // Builder steps navigation
        const steps = document.querySelectorAll('.builder-step');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const finalizeBtn = document.getElementById('finalize-btn');
        const summarySection = document.querySelector('.builder-summary');
        
        let currentStep = 1;
        const totalSteps = steps.length;
        
        // Selected options
        const selectedOptions = {
            type: null,
            storage: null,
            validity: null
        };
        
        // Prices for validity options
        const prices = {
            '12 meses': 324.40,
            '36 meses': 412.40
        };
        
        // Navigation functions
        function updateNavigation() {
            prevBtn.disabled = currentStep === 1;
            
            if (currentStep === totalSteps) {
                nextBtn.style.display = 'none';
                finalizeBtn.style.display = 'inline-block';
                showSummary();
            } else {
                nextBtn.style.display = 'inline-block';
                finalizeBtn.style.display = 'none';
                summarySection.classList.remove('show');
            }
            
            // Verificar seleção atual
            checkSelection();
        }
        
        function showStep(step) {
            steps.forEach(s => s.classList.remove('active'));
            document.querySelector(`.builder-step[data-step="${step}"]`).classList.add('active');
            currentStep = step;
            updateNavigation();
        }
        
        function showSummary() {
            document.getElementById('summary-type').textContent = selectedOptions.type || 'Não selecionado';
            document.getElementById('summary-storage').textContent = selectedOptions.storage || 'Não selecionado';
            document.getElementById('summary-validity').textContent = selectedOptions.validity || 'Não selecionado';
            
            if (selectedOptions.validity && prices[selectedOptions.validity]) {
                document.getElementById('summary-price').textContent = `R$ ${prices[selectedOptions.validity].toFixed(2)}`;
            } else {
                document.getElementById('summary-price').textContent = 'R$ 0,00';
            }
            
            summarySection.classList.add('show');
        }
        
        // Event listeners for navigation
        nextBtn.addEventListener('click', function() {
            if (currentStep < totalSteps) {
                showStep(currentStep + 1);
            }
        });
        
        prevBtn.addEventListener('click', function() {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
        });
        
        // Option selection
        document.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', function() {
                const step = this.closest('.builder-step').dataset.step;
                const value = this.dataset.value;
                
                // Remove selected class from siblings
                this.parentNode.querySelectorAll('.option-card').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Store selected value
                if (step === '1') {
                    selectedOptions.type = value;
                } else if (step === '2') {
                    selectedOptions.storage = value;
                } else if (step === '3') {
                    selectedOptions.validity = value;
                }
                
                // Verificar seleção para habilitar/desabilitar o botão
                checkSelection();
            });
        });
        
        // Finalize button
        finalizeBtn.addEventListener('click', function() {
            // Here you would typically submit the form or redirect to checkout
            alert('Pedido finalizado! Redirecionando para o checkout...');
            console.log('Selected options:', selectedOptions);
        });
        
        // Initialize
        showStep(1);
        finalizeBtn.style.display = 'none';
        
        // Verificar seleção inicial
        checkSelection();
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Dados completos baseados nos links fornecidos
        const products = {
            // e-CPF
            "e-CPF": {
                "No celular (A1)": {
                    "12 meses": { price: 186.90, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA1PFR107&grupo=PUBLI&cod_rev=110256" }
                },
                "No computador (A1)": {
                    "12 meses": { price: 128.96, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA1PFR104&grupo=ESPED&cod_rev=110256" }
                },
                "Na nuvem (A3)": {
                    "12 meses": { price: 207.81, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PFRRID105&grupo=CPBRB&cod_rev=110256" },
                    "36 meses": { price: 291.96, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PFRRID305&grupo=CPBRB&cod_rev=110256" }
                },
                "Certificado + token (A3)": {
                    "12 meses": { price: 291.96, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PFR103&grupo=CPBRB&cod_rev=110256" },
                    "36 meses": { price: 371.16, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PFR303&grupo=CPBRB&cod_rev=110256" }
                },
                "Certificado + cartão e leitora (A3)": {
                    "12 meses": { price: 291.96, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PFR102&grupo=CPBRB&cod_rev=110256" },
                    "36 meses": { price: 371.16, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PFR302&grupo=CPBRB&cod_rev=110256" }
                },
                "Certificado + cartão (A3)": {
                    "12 meses": { price: 173.16, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PFR101&grupo=CPBRB&cod_rev=110256" },
                    "36 meses": { price: 247.41, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PFR301&grupo=CPBRB&cod_rev=110256" }
                },
                "Certificado necessário token/cartão (A3)": {
                    "12 meses": { price: 168.21, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PFR100&grupo=CPBRB&cod_rev=110256" },
                    "36 meses": { price: 227.61, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PFR300&grupo=CPBRB&cod_rev=110256" }
                }
            },
            
            // e-CNPJ
            "e-CNPJ": {
                "No celular (A1)": {
                    "12 meses": { price: 274.90, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA1PJR107&grupo=PUBLI&cod_rev=110256" }
                },
                "No computador (A1)": {
                    "12 meses": { price: 189.68, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA1PJR104&grupo=ESPED&cod_rev=110256" }
                },
                "Na nuvem (A3)": {
                    "12 meses": { price: 291.96, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJRRID105&grupo=CPBRB&cod_rev=110256" },
                    "36 meses": { price: 376.11, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJRRID305&grupo=CPBRB&cod_rev=110256" }
                },
                "Certificado + token (A3)": {
                    "12 meses": { price: 356.31, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJR103&grupo=CPBRB&cod_rev=110256" },
                    "24 meses": { price: 405.81, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJR203&grupo=CPBRB&cod_rev=110256" },
                    "36 meses": { price: 460.26, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJR303&grupo=CPBRB&cod_rev=110256" }
                },
                "Certificado + cartão e leitora (A3)": {
                    "12 meses": { price: 356.31, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJR102&grupo=CPBRB&cod_rev=110256" },
                    "24 meses": { price: 405.81, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJR202&grupo=CPBRB&cod_rev=110256" },
                    "36 meses": { price: 460.26, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJR302&grupo=CPBRB&cod_rev=110256" }
                },
                "Certificado + cartão (A3)": {
                    "12 meses": { price: 237.51, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJR101&grupo=CPBRB&cod_rev=110256" },
                    "24 meses": { price: 301.86, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJR201&grupo=CPBRB&cod_rev=110256" },
                    "36 meses": { price: 341.46, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJR301&grupo=CPBRB&cod_rev=110256" }
                },
                "Certificado necessário token/cartão (A3)": {
                    "12 meses": { price: 247.41, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJR100&grupo=CPBRB&cod_rev=110256" },
                    "24 meses": { price: 277.11, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJR200&grupo=CPBRB&cod_rev=110256" },
                    "36 meses": { price: 316.71, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJR300&grupo=CPBRB&cod_rev=110256" }
                }
            },
            
            // e-CNPJ PME
            "e-CNPJ PME": {
                "No computador (A1)": {
                    "12 meses": { price: 219.90, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA1PJRPE104&grupo=PUBLI&cod_rev=110256" }
                },
                "Certificado + token (A3)": {
                    "18 meses": { price: 373.90, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJRPE1803&grupo=PUBLI&cod_rev=110256" }
                },
                "Certificado necessário token/cartão (A3)": {
                    "18 meses": { price: 203.40, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJRPE1800&grupo=PUBLI&cod_rev=110256" },
                    "36 meses": { price: 274.90, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJRPE300&grupo=PUBLI&cod_rev=110256" }
                }
            },
            
            // NF-e
            "NF-e": {
                "No computador (A1)": {
                    "12 meses": { price: 258.40, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA1PJMNFE104&grupo=ACMVR&cod_rev=110256" }
                },
                "Certificado + cartão/leitora (A3)": {
                    "36 meses": { price: 494.90, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJMNFE302&grupo=ACMVR&cod_rev=110256" }
                },
                "Certificado + cartão (A3)": {
                    "36 meses": { price: 395.90, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJMNFE301&grupo=ACMVR&cod_rev=110256" }
                },
                "Certificado + token (A3)": {
                    "36 meses": { price: 494.90, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJMNFE303&grupo=ACMVR&cod_rev=110256" }
                },
                "Certificado necessário token/cartão (A3)": {
                    "36 meses": { price: 368.40, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJMNFE300&grupo=ACMVR&cod_rev=110256" }
                }
            },
            
            // CT-e
            "CT-e": {
                "No computador (A1)": {
                    "12 meses": { price: 258.40, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA1PJMCTE104&grupo=ACMVR&cod_rev=110256" }
                },
                "Certificado + token (A3)": {
                    "36 meses": { price: 555.40, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJMCTE303&grupo=ACMVR&cod_rev=110256" }
                },
                "Certificado + cartão e leitora (A3)": {
                    "36 meses": { price: 555.40, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJMCTE302&grupo=ACMVR&cod_rev=110256" }
                },
                "Certificado + cartão (A3)": {
                    "36 meses": { price: 395.90, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJMCTE301&grupo=ACMVR&cod_rev=110256" }
                },
                "Certificado necessário token/cartão (A3)": {
                    "36 meses": { price: 368.40, link: "https://pagamento.certisign.com.br/productRedirect?produto=EX-CERA3PJMCTE300&grupo=ACMVR&cod_rev=110256" }
                }
            }
        };

        // Elementos DOM
        const storageOptions = document.getElementById('storage-options');
        const validityOptions = document.getElementById('validity-options');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const steps = document.querySelectorAll('.builder-step');
        const progressSteps = document.querySelectorAll('.progress-step');
        
        // Estado
        let currentStep = 1;
        let selectedType = '';
        let selectedStorage = '';
        let selectedValidity = '';
        let selectedLink = '';

        // Mapeamento de ícones para armazenamento
        const storageIcons = {
            'No celular (A1)': 'mobile-alt',
            'No computador (A1)': 'laptop',
            'Na nuvem (A3)': 'cloud',
            'Certificado + token (A3)': 'key',
            'Certificado + cartão e leitora (A3)': 'id-card',
            'Certificado + cartão (A3)': 'credit-card',
            'Certificado necessário token/cartão (A3)': 'microchip',
            'Certificado + cartão/leitora (A3)': 'id-card'
        };

        // Atualizar resumo
        function updateSummary() {
            document.getElementById('summary-type').textContent = selectedType || 'Não selecionado';
            document.getElementById('summary-storage').textContent = selectedStorage || 'Não selecionado';
            document.getElementById('summary-validity').textContent = selectedValidity || 'Não selecionado';
            
            if (selectedType && selectedStorage && selectedValidity) {
                const price = products[selectedType][selectedStorage][selectedValidity].price;
                document.getElementById('summary-price').textContent = `R$ ${price.toFixed(2).replace('.', ',')}`;
                selectedLink = products[selectedType][selectedStorage][selectedValidity].link;
            } else {
                document.getElementById('summary-price').textContent = 'R$ 0,00';
            }
        }

        // Atualizar barra de progresso
        function updateProgressBar() {
            progressSteps.forEach(step => {
                const stepNum = parseInt(step.dataset.step);
                step.classList.remove('active', 'completed');
                
                if (stepNum < currentStep) {
                    step.classList.add('completed');
                } else if (stepNum === currentStep) {
                    step.classList.add('active');
                }
            });
        }

        // Renderizar opções de armazenamento
        function renderStorageOptions() {
            storageOptions.innerHTML = '';
            
            if (!selectedType || !products[selectedType]) return;
            
            Object.keys(products[selectedType]).forEach(storage => {
                const card = document.createElement('div');
                card.className = 'option-card';
                card.dataset.value = storage;
                
                card.innerHTML = `
                    <div class="option-icon">
                        <i class="fas fa-${storageIcons[storage] || 'hdd'}"></i>
                    </div>
                    <h4>${storage}</h4>
                    <div class="option-check">
                        <i class="fas fa-check"></i>
                    </div>
                `;
                
                storageOptions.appendChild(card);
            });
        }

        // Renderizar opções de validade
        function renderValidityOptions() {
            validityOptions.innerHTML = '';
            
            if (!selectedType || !selectedStorage || !products[selectedType][selectedStorage]) return;
            
            Object.keys(products[selectedType][selectedStorage]).forEach(validity => {
                const price = products[selectedType][selectedStorage][validity].price;
                
                const card = document.createElement('div');
                card.className = 'option-card';
                card.dataset.value = validity;
                
                card.innerHTML = `
                    <div class="option-icon">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <h4>${validity}</h4>
                    <p class="price">À vista: R$ ${price.toFixed(2).replace('.', ',')}</p>
                    <div class="option-check">
                        <i class="fas fa-check"></i>
                    </div>
                `;
                
                validityOptions.appendChild(card);
            });
        }

        // Navegação entre passos
        function goToStep(step) {
            steps.forEach(s => s.classList.remove('active'));
            document.querySelector(`.builder-step[data-step="${step}"]`).classList.add('active');
            currentStep = step;
            
            // Atualizar estado dos botões
            prevBtn.disabled = (step === 1);
            
            // Se estiver no último passo (3), mudar o botão próximo para "Finalizar"
            if (step === 3) {
                nextBtn.innerHTML = 'Finalizar <i class="fas fa-check"></i>';
                nextBtn.disabled = !selectedValidity;
            } else {
                nextBtn.innerHTML = 'Próximo <i class="fas fa-arrow-right"></i>';
                nextBtn.disabled = false;
            }
            
            // Verificar seleção para habilitar/desabilitar o botão
            checkSelection();
            
            updateProgressBar();
        }

        // Selecionar opção
        function selectOption(step, value) {
            // Remover seleção anterior
            document.querySelectorAll(`.builder-step[data-step="${step}"] .option-card`).forEach(card => {
                card.classList.remove('selected');
            });
            
            // Adicionar seleção atual
            const currentCard = document.querySelector(`.builder-step[data-step="${step}"] .option-card[data-value="${value}"]`);
            if (currentCard) {
                currentCard.classList.add('selected');
            }
        }

        // Event Listeners
        document.querySelectorAll('.builder-step[data-step="1"] .option-card').forEach(card => {
            card.addEventListener('click', () => {
                selectedType = card.dataset.value;
                selectedStorage = '';
                selectedValidity = '';
                selectOption(1, selectedType);
                renderStorageOptions();
                updateSummary();
                goToStep(2);
            });
        });

        storageOptions.addEventListener('click', (e) => {
            const card = e.target.closest('.option-card');
            if (card) {
                selectedStorage = card.dataset.value;
                selectedValidity = '';
                selectOption(2, selectedStorage);
                renderValidityOptions();
                updateSummary();
                goToStep(3);
            }
        });

        validityOptions.addEventListener('click', (e) => {
            const card = e.target.closest('.option-card');
            if (card) {
                selectedValidity = card.dataset.value;
                selectOption(3, selectedValidity);
                updateSummary();
                // Habilitar o botão de finalizar
                nextBtn.disabled = false;
                // Verificar seleção para habilitar/desabilitar o botão
                checkSelection();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) goToStep(currentStep - 1);
        });

        nextBtn.addEventListener('click', () => {
            if (currentStep === 1) {
                if (selectedType) {
                    goToStep(2);
                } else {
                    alert('Por favor, selecione um tipo de certificado');
                }
            } else if (currentStep === 2) {
                if (selectedStorage) {
                    goToStep(3);
                } else {
                    alert('Por favor, selecione um tipo de armazenamento');
                }
            } else if (currentStep === 3) {
                if (selectedLink) {
                    // Abre o link em nova guia
                    window.open(selectedLink, '_blank', 'noopener,noreferrer');
                    
                    // Reseta o construtor para a primeira etapa
                    selectedType = '';
                    selectedStorage = '';
                    selectedValidity = '';
                    selectedLink = '';
                    
                    // Limpa seleções visuais
                    clearSelections();
                    
                    // Atualiza o resumo
                    updateSummary();
                    
                    // Volta para o passo 1
                    goToStep(1);
                } else {
                    alert('Por favor, selecione uma validade antes de finalizar');
                }
            }
        });

        // Função para limpar seleções visuais
        function clearSelections() {
            document.querySelectorAll('.option-card.selected').forEach(card => {
                card.classList.remove('selected');
            });
        }

        // Inicialização
        updateSummary();
        updateProgressBar();
        
        // Verificar seleção inicial
        checkSelection();
    });