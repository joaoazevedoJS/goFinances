import { FC } from 'react';
import { FiX } from 'react-icons/fi';
import Modal from 'react-modal';

import { useTransactions } from '../../hooks/transactions';

import { Container } from './styles';

const NewTransactionsModal: FC = () => {
  const {
    isNewTransactionModalOpen,
    handleCloseModalTransaction,
  } = useTransactions();

  return (
    <Modal
      isOpen={isNewTransactionModalOpen}
      onRequestClose={handleCloseModalTransaction}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <FiX
        onClick={handleCloseModalTransaction}
        className="react-modal-button-close"
      />

      <Container>
        <h2>Cadastrar transação</h2>

        <input placeholder="Título" />
        <input type="number" placeholder="Valor" />
        <input placeholder="Categoria" />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
};

export { NewTransactionsModal };
