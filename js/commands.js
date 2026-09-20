"use strict";

/*
 * COMMANDS
 * =========================================================
 *
 * Adicione novos comandos nesta constante.
 *
 * Estrutura:
 * {
 *   category: "Categoria",
 *   command: "comando",
 *   description: "Descrição do comando"
 * }
 *
 * As categorias são criadas automaticamente.
 */

const COMMANDS = [
  // SYSTEM
  {
    category: "Sistema",
    command: "poweroff",
    description: "Desliga a máquina",
  },
  {
    category: "Sistema",
    command: "reboot",
    description: "Reinicia a máquina",
  },
  {
    category: "Sistema",
    command: "top",
    description: "Mostra processos em execução",
  },
  {
    category: "Sistema",
    command: "htop",
    description: "Versão interativa do top",
  },
  {
    category: "Sistema",
    command: "df -h",
    description: "Mostra o uso de disco",
  },
  {
    category: "Sistema",
    command: "free -h",
    description: "Mostra o uso de memória",
  },

  // NAVIGATION
  {
    category: "Navegação",
    command: "pwd",
    description: "Mostra o diretório atual",
  },
  {
    category: "Navegação",
    command: "ls",
    description: "Lista arquivos e diretórios",
  },
  {
    category: "Navegação",
    command: "cd <dir>",
    description: "Entra em um diretório",
  },

  // FILES
  {
    category: "Arquivos",
    command: "mkdir <dir>",
    description: "Cria um novo diretório",
  },
  {
    category: "Arquivos",
    command: "touch <file>",
    description: "Cria um arquivo vazio",
  },
  {
    category: "Arquivos",
    command: "cp <src> <dest>",
    description: "Copia arquivos",
  },
  {
    category: "Arquivos",
    command: "mv <src> <dest>",
    description: "Move ou renomeia arquivos",
  },
  {
    category: "Arquivos",
    command: "rm <file>",
    description: "Remove um arquivo",
  },
  {
    category: "Arquivos",
    command: "rm -rf <dir>",
    description: "Remove um diretório recursivamente",
  },
  {
    category: "Arquivos",
    command: "tail -f <file>",
    description: "Acompanha as últimas linhas de um arquivo",
  },

  // PERMISSIONS
  {
    category: "Permissões",
    command: "chmod +x <file>",
    description: "Torna um arquivo executável",
  },
  {
    category: "Permissões",
    command: "chown user:group <file>",
    description: "Altera o proprietário e o grupo do arquivo",
  },

  // NETWORK
  {
    category: "Rede",
    command: "ping <host>",
    description: "Testa a conectividade com um host",
  },
  {
    category: "Rede",
    command: "ip a",
    description: "Mostra os endereços IP da máquina",
  },

  // PACKAGES
  {
    category: "Pacotes",
    command: "apt update",
    description: "Atualiza a lista de pacotes",
  },
  {
    category: "Pacotes",
    command: "apt upgrade",
    description: "Atualiza os pacotes instalados",
  },
  {
    category: "Pacotes",
    command: "apt install <pkg>",
    description: "Instala um pacote",
  },

  // DOCKER
  {
    category: "Docker",
    command: "docker ps",
    description: "Lista os containers em execução",
  },
  {
    category: "Docker",
    command: "docker logs <container>",
    description: "Mostra os logs de um container",
  },
  {
    category: "Docker",
    command: "docker exec -it <container> bash",
    description: "Acessa o terminal de um container",
  },
];
