import * as React from 'react';
import { useState } from 'react';
import './Deposit.css';

interface DepositProps {
  numberAccount: number; // Alterado para number
}

const Deposit: React.FC<DepositProps> = () => {
  const [numberAccount, setNumberAccount] = useState<number>();
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleDeposit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`/deposit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numberAccount: numberAccount, // O número da conta como número
          amount: parseFloat(amount), // O valor do depósito como número
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      setSuccessMessage(`Depósito de R$ ${amount} realizado com sucesso na conta ${numberAccount}!`);
      setAmount('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Erro ao realizar o depósito.');
      } else {
        setError('Erro ao realizar o depósito.');
      }
    }
  };

  return (
    <div className="deposit-container">
      <h2>Depósito em Conta</h2>
      <form onSubmit={handleDeposit}>
        <div>
          <label htmlFor="numberAccount">Número da conta:</label>
          <input
            type="number"
            id="numberAccount"
            value={numberAccount}
            onChange={(e) => setNumberAccount(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label htmlFor="amount">Valor (R$):</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit" className="btn deposit-btn">Depositar</button>
      </form>
    </div>
  );
};

export default Deposit;
