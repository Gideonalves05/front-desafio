import * as React from 'react';
import { useState } from 'react';
import './TransactionHistory.css';

interface Transaction {
  id: number;
  amount: number;
  timestamp: string;
  transactionType: string;
  numberAccount: number;
  targetAccount: number | null;
}

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [numberAccount, setNumberAccount] = useState<string>(''); // Gerenciar o número da conta

  const handleFetchTransactions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/statements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numberAccount: parseInt(numberAccount),
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar o histórico de transações');
      }

      const data = await response.json();
      setTransactions(data);
    } catch (error: unknown) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evitar o reload da página
    handleFetchTransactions(); // Chamar a função de busca
  };

  return (
    <div className="transaction-history-container">
      <h2>Histórico de Transações</h2>

      {/* Formulário para digitar o número da conta */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="numberAccount">Número da Conta:</label>
        <input
          type="number"
          id="numberAccount"
          value={numberAccount}
          onChange={(e) => setNumberAccount(e.target.value)}
          required
        />
        <button type="submit" className="btn">Buscar Transações</button>
      </form>

      {loading && <div>Carregando...</div>}

      {error && <div className="error-message">Erro: {error}</div>}

      {/* Tabela de transações */}
      {transactions.length > 0 && (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Data</th>
              <th>Tipo</th>
              <th>Valor (R$)</th>
              <th>Conta de Destino</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                <td>{transaction.transactionType}</td>
                <td>{transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td>{transaction.targetAccount ? transaction.targetAccount : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {transactions.length === 0 && !loading && !error && (
        <div>Nenhuma transação encontrada.</div>
      )}
    </div>
  );
};

export default TransactionHistory;
