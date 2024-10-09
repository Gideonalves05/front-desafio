import * as React from 'react';
import { useState, FormEvent } from 'react';
import './CreateAccount.css';

const CreateAccount: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();


    
    try {
      const response = await fetch('/users/createAccount', { // Usando fetch com proxy
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          cpfAccount: cpf,
          password,
        }),
      });

      alert( JSON.stringify({
          firstName,
          lastName,
          cpfAccount: cpf,
          password,}),)

      if (response.ok) {
        const data = await response.json();
        alert('Conta criada com sucesso!');
        console.log('Resposta do servidor:', data);
      } else {
        alert('Erro ao criar conta');
        console.error('Erro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      alert('Ocorreu um erro ao criar a conta.');
    }
  };

 

  return (
    <div className="create-account-container">
      <h2>Criar Nova Conta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">Nome:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">Sobrenome:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            maxLength={14}
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn create-account-btn">Criar Conta</button>
      </form>
    </div>
  );
}

export default CreateAccount;
