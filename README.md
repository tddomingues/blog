<h1 align="center">
  Blog de Tecnologia
</h1>

## RESULTADO

https://github.com/user-attachments/assets/2ead32cf-b008-4fc7-bbab-9fa43b55c987

## DESCRIÇÃO

Este é um blog simples focado na área de tecnologias. Ele permite a criação, edição, deleção e leitura de postagens, curtidas e comentários, com funcionalidades específicas para diferentes níveis de usuários, como admin e usuário.

## FUNCIONALIDADES

- Admin: Pode criar, editar, deletar e visualizar postagens e comentários.
- Usuário: Pode visualizar postagens e interagir com elas curtindo e comentando.
- Interação com postagens: Usuários podem curtir e comentar nas postagens.
- Sistema de busca: Os usuários podem buscar postagens pelo título ou conteúdo.
- Cadastro e Login: Utiliza autenticação com o Next-Auth para realizar login e registro de usuários. Além de logar com o Google e ter verificação de e-mail.
- Middleware: Protege rotas específicas para impedir acesso não autorizado com base nos tokens de usuário (JWT).
- Integração de paginação na página principal.

## TECNOLOGIAS/LIBS

- Next.js (com TypeScript): Framework React para construção de interfaces server-side e client-side.
- Next-Auth: Autenticação e autorização de usuários.
- Prisma: ORM utilizado para comunicação com o banco de dados PostgreSQL.
- bcryptjs: Para criptografia de senhas no momento do registro e login.
- React-Hook-Form: Gerenciamento de formulários de maneira otimizada.
- Shadcn/ui: Conjunto de componentes acessíveis e estilizados.
- Tailwind CSS: Framework de CSS para estilização rápida e eficiente.
- Axios: Para fazer requisições HTTP.
- Zod: Validação de dados nos formulários e schemas.
- Lucide React: Conjunto de ícones leves e personalizáveis.
- Date-Fns: Manipulação de datas.
  
## 

## INSTALAÇÃO
### Clone o repositório:
```bash 
git clone https://github.com/tddomingues/blog.git
````

### Instale as dependências:
```bash
npm install
````

### Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
````

### Iniciar:
```bash
npm run dev
````

## DESENVOLVEDOR

[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tiago-domingues-4089b5123/)
