import * as React from 'react';
import { useState } from 'react';
import './AccountOverview.css';

interface AccountData {
  firstName: string;
  lastName: string;
  cpfAccount: string;
  numberAccount: string;
  balance: number;
}

const AccountOverview: React.FC = () => {
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cpfAccount, setCpfAccount] = useState<string>(''); // Estado para armazenar o CPF

  const fetchAccountData = async () => {
    try {
      const response = await fetch(`/users/getId`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cpfAccount: cpfAccount,
        }),
      });
      console.log("passou pelo getId") // Enviar CPF como parâmetro de consulta

      if (!response.ok) {
        throw new Error('Erro ao buscar os dados da conta');
      }

      const data = await response.json();
      setAccountData(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Erro desconhecido');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir o comportamento padrão de recarregar a página
    fetchAccountData(); // Chamar a função para buscar dados da conta
  };

  if (error) {
    return <div className="account-overview-container">Erro: {error}</div>;
  }

  if (!accountData) {
    return (
      <div className="account-overview-container">
        <h2>Visão Geral da Conta</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="cpf">Digite seu CPF:</label>
          <input
            type="text"
            id="cpf"
            value={cpfAccount}
            max={11}
            onChange={(e) => setCpfAccount(e.target.value)}
            required
          />
          <button type="submit" className="btn">Buscar Dados da Conta</button>
        </form>
      </div>
    );
  }

  return (
    <div className="account-overview-container">
      <h2>Visão Geral da Conta</h2>
      <div className="account-info">
        <p><strong>Nome:</strong> {accountData.firstName} {accountData.lastName}</p>
        <p><strong>CPF:</strong> {accountData.cpfAccount}</p>
        <p><strong>Número da Conta:</strong> {accountData.numberAccount}</p>
        <p><strong>Saldo Atual:</strong> R$ {accountData.balance.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default AccountOverview;
