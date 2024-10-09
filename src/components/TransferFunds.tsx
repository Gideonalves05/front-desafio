import * as React from 'react';
import { useState } from 'react';
import './TransferFunds.css';

const TransferFunds: React.FC = () => {
  const [senderAccount, setSenderAccount] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  const handleTransfer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`/transfer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderAccount: senderAccount,
          recipientAccount: recipientAccount,
          amount: parseFloat(amount), // Converte o valor para número
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      setSuccessMessage(`Á transferência enviada por ${senderAccount} de R$ ${amount} para a conta ${recipientAccount} realizada com sucesso!`);
      setSenderAccount('');
      setRecipientAccount('');
      setAmount('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Erro ao realizar a transferência.');
      } else {
        setError('Erro ao realizar a transferência.');
      }
    }
  };

  return (
    <div className="transfer-funds-container">
      <h2>Transferir Fundos</h2>
      <form onSubmit={handleTransfer}>
      <div>
          <label htmlFor="senderAccount">Conta do Remetente:</label>
          <input
            type="text"
            id="senderAccount"
            value={senderAccount}
            onChange={(e) => setSenderAccount(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="recipientAccount">Conta de Destino:</label>
          <input
            type="text"
            id="recipientAccount"
            value={recipientAccount}
            onChange={(e) => setRecipientAccount(e.target.value)}
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

        <button type="submit" className="btn transfer-btn">Transferir</button>
      </form>
    </div>
  );
};

export default TransferFunds;
