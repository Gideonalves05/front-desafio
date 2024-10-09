import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import CreateAccount from './components/CreateAccount';
import AccountOverview from './components/AccountOverview';
import TransactionHistory from './components/TransactionHistory';
import TransferFunds from './components/TransferFunds';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';

function App() {

  return (
    <Router>
      <div className="App">
        <header>
          <div className="logo">Banco XYZ</div>
        </header>

        <main>
          <h1>Bem-vindo ao Banco XYZ</h1>
          <p>O acesso e gestão de suas contas agora nas mãos de nossos caixas. Rápido, seguro e simplificado.</p>

          <div className="buttons">
            <Link to="/criar-conta">
              <button className="btn create-account">Criar Nova Conta</button>
            </Link>
            <Link to="/visao-geral">
              <button className="btn">Visão Geral da Conta</button>
            </Link>
            <Link to="/historico-transacoes">
              <button className="btn">Histórico de Transações</button>
            </Link>
            <Link to="/transferencia-fundos">
              <button className="btn">Transferir Fundos</button>
            </Link>
            <Link to="/deposito">
              <button className="btn">Depósito</button>
            </Link>
            <Link to="/saque">
              <button className="btn">Saque</button>
            </Link>
          </div>

          <Routes>
          <Route path="/criar-conta" element={<CreateAccount />} />
          <Route path="/visao-geral" element={<AccountOverview />} />
          <Route path="/historico-transacoes" element={<TransactionHistory />} />
          <Route path="/transferencia-fundos" element={<TransferFunds />} />
          <Route path="/deposito" element={<Deposit numberAccount={0} />} />
          <Route path="/saque" element={<Withdraw id={''} />} />
        </Routes>
        </main>

        <footer>
          <a href="#">Sobre nós</a> | 
          <a href="#">Suporte</a> | 
          <a href="#">Termos e condições</a>
        </footer>

        
      </div>
    </Router>
  );
}

export default App;
