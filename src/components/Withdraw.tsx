import * as React from 'react';
const { useState } = React;
import './Withdraw.css';

interface WithdrawProps {
  id: string; // ID que será passado para a URL da API
}

const Withdraw: React.FC<WithdrawProps> = () => {
  const [numberAccount, setNumberAccount] = useState<number>();
  const [amount, setAmount] = useState<string>('');

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/withdrawal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount, numberAccount: numberAccount }),
      });

      if (!response.ok) {
        throw new Error('Erro ao realizar saque');
      }

      await response.json();
      console.log('Valor sacado:', amount);
      alert(`Saque de R$ ${amount} realizado com sucesso!`);
    } catch (error) {
      console.error('Erro:', error);
      alert('Falha ao realizar saque. Tente novamente.');
    }
  };

  return (
    <div className="withdraw-container">
      <h2>Saque em Conta</h2>
      <form onSubmit={handleWithdraw}>
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
        <button type="submit" className="btn withdraw-btn">Sacar</button>
      </form>
    </div>
  );
};

export default Withdraw;
